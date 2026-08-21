/* Trade enquiry endpoint.
 *
 * Runs as a Vercel Serverless Function at /api/enquiry. No dependencies and no
 * build step, so it fits the rest of the site: everything talks to plain REST
 * over fetch.
 *
 * Three sinks, tried in order. Whatever is configured runs; the log always runs,
 * so an enquiry is never silently dropped even with nothing set up:
 *
 *   1. Upstash Redis  — the durable record. Set UPSTASH_REDIS_REST_URL and
 *                       UPSTASH_REDIS_REST_TOKEN. Enquiries are pushed onto the
 *                       list `enquiries` and also kept as one key each.
 *   2. Resend         — emails the trade desk. Set RESEND_API_KEY, and
 *                       optionally ENQUIRY_TO and ENQUIRY_FROM.
 *   3. Console        — always. Structured single-line JSON, readable in the
 *                       Vercel dashboard under the function's logs.
 *
 * The response is 200 if at least one sink accepted the enquiry.
 */

const LIMITS = { company: 200, name: 120, email: 254, message: 4000 };
const TO = process.env.ENQUIRY_TO || 'trade@farmologic.com';
const FROM = process.env.ENQUIRY_FROM || 'Farmologic site <onboarding@resend.dev>';

/* Best-effort throttle. Serverless instances are per-region and recycled, so
   this stops a hammering script rather than a determined one. The honeypot and
   the required consent box do more work than this does. */
const seen = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip) {
  const now = Date.now();
  const hits = (seen.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  seen.set(ip, hits);
  if (seen.size > 5000) seen.clear();
  return hits.length > MAX_PER_WINDOW;
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return {};
}

function clean(value, max) {
  return String(value == null ? '' : value).trim().slice(0, max);
}

function validate(body) {
  const enquiry = {
    company: clean(body.company, LIMITS.company),
    name: clean(body.name, LIMITS.name),
    email: clean(body.email, LIMITS.email),
    message: clean(body.message, LIMITS.message),
  };
  const errors = [];
  if (!enquiry.company) errors.push('company');
  if (!enquiry.name) errors.push('name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(enquiry.email)) errors.push('email');
  if (!body.consent) errors.push('consent');
  return { enquiry, errors };
}

async function toRedis(record) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return false;

  const payload = JSON.stringify(record);
  const res = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([
      ['LPUSH', 'enquiries', payload],
      ['SET', `enquiry:${record.id}`, payload],
    ]),
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  return true;
}

async function toEmail(record) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  const rows = [
    ['Company', record.company],
    ['Name', record.name],
    ['Email', record.email],
    ['Message', record.message || '—'],
    ['Received', record.receivedAt],
    ['Page', record.page || '—'],
  ];

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: record.email,
      subject: `Trade enquiry — ${record.company}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
    }),
  });
  if (!res.ok) throw new Error(`resend ${res.status} ${await res.text()}`);
  return true;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const body = readBody(req);

  /* Bots fill every field they find. A human never sees this one. Answer 200 so
     the sender learns nothing from the response. */
  if (clean(body.company_website_hp, 200)) {
    return res.status(200).json({ ok: true });
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'rate_limited' });
  }

  const { enquiry, errors } = validate(body);
  if (errors.length) {
    return res.status(400).json({ ok: false, error: 'invalid', fields: errors });
  }

  const record = {
    ...enquiry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    receivedAt: new Date().toISOString(),
    page: clean(body.page, 300),
    ip,
    userAgent: clean(req.headers['user-agent'], 300),
  };

  const sinks = await Promise.allSettled([toRedis(record), toEmail(record)]);
  const stored = sinks.some((s) => s.status === 'fulfilled' && s.value === true);
  const failures = sinks.filter((s) => s.status === 'rejected').map((s) => String(s.reason));

  /* Always. If both sinks are unconfigured or down, this is the record. */
  console.log(JSON.stringify({ type: 'enquiry', stored, failures, ...record }));

  if (failures.length && !stored) {
    return res.status(502).json({ ok: false, error: 'delivery_failed' });
  }
  return res.status(200).json({ ok: true, id: record.id });
}
