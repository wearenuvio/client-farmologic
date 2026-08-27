"""Local preview that mirrors the vercel.json contract: cleanUrls, trailingSlash:false,
the custom 404 page, and the declared headers. Lets the clean-URL nav work locally."""
import http.server, socketserver, os, posixpath

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "site")
ROOT = os.path.abspath(ROOT)

class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def end_headers(self):
        # the four headers vercel.json declares but production is not serving
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        self.send_header("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
        if self.path.startswith("/assets/"):
            self.send_header("Cache-Control", "public, max-age=31536000, immutable")
        else:
            self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def translate_path(self, path):
        p = path.split("?", 1)[0].split("#", 1)[0]
        # trailingSlash:false — /about/ redirects, handled in send_head
        clean = p.rstrip("/") or "/"
        if clean == "/":
            return os.path.join(ROOT, "index.html")
        cand = os.path.join(ROOT, clean.lstrip("/"))
        if os.path.isfile(cand):
            return cand
        if os.path.isfile(cand + ".html"):      # cleanUrls
            return cand + ".html"
        return cand

    def send_head(self):
        p = self.path.split("?", 1)[0]
        if len(p) > 1 and p.endswith("/"):      # enforce trailingSlash:false
            self.send_response(308)
            self.send_header("Location", p.rstrip("/"))
            self.end_headers()
            return None
        if p.endswith(".html") and p != "/404.html":   # .html should 404, as in prod
            self.send_error(404)
            return None
        path = self.translate_path(self.path)
        if not os.path.isfile(path):
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            body = open(os.path.join(ROOT, "404.html"), "rb").read()
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            return __import__("io").BytesIO(body)
        return super().send_head()

    def log_message(self, *a): pass

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("127.0.0.1", 4321), H) as httpd:
    print("serving site/ on http://127.0.0.1:4321")
    httpd.serve_forever()
