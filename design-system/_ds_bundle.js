/* @ds-bundle: {"format":4,"namespace":"FarmologicDesignSystem_069f79","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"GoldRule","sourcePath":"components/core/GoldRule.jsx"},{"name":"Seal","sourcePath":"components/core/Seal.jsx"},{"name":"SectionLabel","sourcePath":"components/core/SectionLabel.jsx"},{"name":"CTABand","sourcePath":"components/display/CTABand.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"GlassCard","sourcePath":"components/display/Card.jsx"},{"name":"ProductCard","sourcePath":"components/display/ProductCard.jsx"},{"name":"SpecReadout","sourcePath":"components/display/SpecReadout.jsx"},{"name":"Stat","sourcePath":"components/display/SpecReadout.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Textarea","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Input.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"c74a423d5c0c","components/core/Button.jsx":"661be8cac4eb","components/core/GoldRule.jsx":"c71bf75a4af8","components/core/Seal.jsx":"a2a1434980f3","components/core/SectionLabel.jsx":"81f20fd12522","components/display/CTABand.jsx":"5ad671cafec8","components/display/Card.jsx":"fb3717022306","components/display/ProductCard.jsx":"439b5706a70c","components/display/SpecReadout.jsx":"1ed59df8dea2","components/forms/Input.jsx":"5fae5d01b0a6","ui_kits/website/Header.jsx":"32bdba5d5339"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FarmologicDesignSystem_069f79 = window.FarmologicDesignSystem_069f79 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function Badge({
  children,
  variant = 'outline',
  style
}) {
  const v = {
    outline: {
      border: '1px solid var(--border-gold)',
      color: 'var(--forest)',
      background: 'transparent'
    },
    solid: {
      border: '1px solid var(--forest)',
      color: 'var(--ivory)',
      background: 'var(--forest)'
    },
    dark: {
      border: '1px solid var(--border-gold)',
      color: 'var(--gold)',
      background: 'transparent'
    },
    tint: {
      border: '1px solid transparent',
      color: 'var(--forest)',
      background: 'var(--mist)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      fontSize: 10,
      letterSpacing: '.22em',
      textTransform: 'uppercase',
      padding: '7px 14px',
      borderRadius: 'var(--radius-pill)',
      display: 'inline-block',
      ...v[variant],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function Button({
  variant = 'primary',
  size = 'md',
  children,
  style,
  ...rest
}) {
  const [hov, setHov] = useState(false),
    [act, setAct] = useState(false);
  const pad = size === 'sm' ? '10px 20px' : size === 'lg' ? '18px 40px' : '14px 32px';
  const fs = size === 'sm' ? 11 : 12;
  const base = {
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: fs,
    letterSpacing: '.18em',
    textTransform: 'uppercase',
    padding: pad,
    border: '1px solid transparent',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    transition: 'all var(--dur-fast) var(--ease-out)',
    transform: act ? 'translateY(1px)' : hov ? 'translateY(-1px)' : 'none',
    display: 'inline-block'
  };
  const variants = {
    primary: {
      background: hov ? '#26492F' : 'var(--forest)',
      color: 'var(--ivory)'
    },
    gold: {
      background: hov ? '#D4B05C' : 'var(--gold)',
      color: 'var(--forest)'
    },
    outline: {
      background: hov ? 'var(--mist)' : 'transparent',
      color: 'var(--forest)',
      borderColor: 'var(--forest)'
    },
    'outline-dark': {
      background: hov ? 'rgba(246,244,238,.08)' : 'transparent',
      color: 'var(--ivory)',
      borderColor: 'rgba(246,244,238,.4)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--forest)',
      textDecoration: hov ? 'underline' : 'none',
      textUnderlineOffset: 6,
      padding: '6px 2px'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => {
      setHov(false);
      setAct(false);
    },
    onMouseDown: () => setAct(true),
    onMouseUp: () => setAct(false)
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/GoldRule.jsx
try { (() => {
function GoldRule({
  width = 64,
  align = 'left',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      borderTop: '1px solid var(--gold)',
      margin: align === 'center' ? '0 auto' : 0,
      ...style
    }
  });
}
Object.assign(__ds_scope, { GoldRule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/GoldRule.jsx", error: String((e && e.message) || e) }); }

// components/core/Seal.jsx
try { (() => {
function Seal({
  label = 'LAB-VERIFIED',
  sub = 'THE FARMOLOGIC STANDARD',
  size = 110,
  onDark = false,
  style
}) {
  const c = onDark ? 'var(--gold)' : 'var(--gold)';
  const txt = onDark ? 'var(--ivory)' : 'var(--forest)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      border: `1px solid ${c}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      textAlign: 'center',
      position: 'relative',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 5,
      borderRadius: '50%',
      border: `1px dotted ${c}`,
      opacity: .6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: size * .3,
      color: txt,
      lineHeight: 1
    }
  }, "F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: Math.max(7, size * .065),
      letterSpacing: '.24em',
      color: c,
      fontWeight: 600,
      padding: '0 10px'
    }
  }, label), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: Math.max(5, size * .045),
      letterSpacing: '.2em',
      color: txt,
      opacity: .6,
      padding: '0 12px'
    }
  }, sub));
}
Object.assign(__ds_scope, { Seal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Seal.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionLabel.jsx
try { (() => {
function SectionLabel({
  children,
  color = 'gold',
  align = 'left',
  style
}) {
  const colors = {
    gold: 'var(--gold)',
    forest: 'var(--forest)',
    leaf: 'var(--leaf-light)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: colors[color],
      textAlign: align,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/display/CTABand.jsx
try { (() => {
function CTABand({
  headline = 'Reserve your allocation from the first harvest.',
  sub = 'First cultivation begins September 2026. The first grow is genuinely limited.',
  cta = 'Request a Sample',
  onCta,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--gradient-dark)',
      padding: '72px 32px',
      textAlign: 'center',
      fontFamily: 'var(--font-body)',
      position: 'relative',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 16,
      border: '1px solid var(--border-gold)',
      pointerEvents: 'none',
      opacity: .6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: '.32em',
      color: 'var(--leaf-light)',
      fontWeight: 600
    }
  }, "FIRST HARVEST \xB7 DECEMBER 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(28px,4vw,44px)',
      fontWeight: 600,
      color: 'var(--ivory)',
      maxWidth: 640,
      margin: '16px auto 0',
      lineHeight: 1.15
    }
  }, headline), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      borderTop: '1px solid var(--gold)',
      margin: '20px auto'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: 'var(--text-on-dark-muted)',
      maxWidth: 480,
      margin: '0 auto 28px',
      lineHeight: 1.65
    }
  }, sub), /*#__PURE__*/React.createElement("button", {
    onClick: onCta,
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      padding: '16px 40px',
      background: 'var(--gold)',
      color: 'var(--forest)',
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer'
    }
  }, cta));
}
Object.assign(__ds_scope, { CTABand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/CTABand.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
const {
  useState
} = React;
function Card({
  children,
  goldFrame = false,
  hover = false,
  style
}) {
  const [hov, setHov] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: hover && hov ? 'var(--shadow-lift)' : 'var(--shadow-card)',
      transform: hover && hov ? 'translateY(-2px)' : 'none',
      transition: 'all var(--dur-fast) var(--ease-out)',
      padding: 'var(--space-6)',
      position: 'relative',
      ...style
    }
  }, goldFrame && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 12,
      border: '1px solid var(--border-gold)',
      pointerEvents: 'none'
    }
  }), children);
}
function GlassCard({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--glass-bg)',
      border: '1px solid var(--glass-border)',
      borderRadius: 'var(--radius-md)',
      backdropFilter: 'blur(var(--glass-blur))',
      WebkitBackdropFilter: 'blur(var(--glass-blur))',
      padding: 'var(--space-5)',
      color: 'var(--ivory)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card, GlassCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/ProductCard.jsx
try { (() => {
const {
  useState
} = React;
function ProductCard({
  name,
  form,
  benefits = [],
  spec,
  image,
  packColor = 'var(--forest)',
  onEnquire,
  style
}) {
  const [hov, setHov] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: hov ? 'var(--shadow-lift)' : 'var(--shadow-card)',
      transform: hov ? 'translateY(-3px)' : 'none',
      transition: 'all var(--dur-fast) var(--ease-out)',
      overflow: 'hidden',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: packColor,
      height: 180,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: {
      maxHeight: '80%',
      maxWidth: '80%',
      objectFit: 'contain'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      color: 'var(--ivory)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 44,
      lineHeight: 1
    }
  }, "F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      letterSpacing: '.3em',
      marginTop: 6,
      opacity: .8
    }
  }, "FARMOLOGIC"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 22px 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 24,
      fontWeight: 600,
      color: 'var(--forest)'
    }
  }, name), benefits.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: '.16em',
      color: 'var(--olive)',
      fontWeight: 600,
      marginTop: 6
    }
  }, benefits.join(' | ')), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      borderTop: '1px solid var(--gold)',
      margin: '12px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, form, spec ? ` · ${spec}` : ''), /*#__PURE__*/React.createElement("button", {
    onClick: onEnquire,
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 10,
      letterSpacing: '.18em',
      background: 'none',
      border: 'none',
      color: 'var(--forest)',
      cursor: 'pointer',
      textDecoration: hov ? 'underline' : 'none',
      textUnderlineOffset: 4,
      padding: 0
    }
  }, "PRICE ON REQUEST \u2192"))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/display/SpecReadout.jsx
try { (() => {
function SpecReadout({
  items = [],
  onDark = true,
  style
}) {
  const lbl = onDark ? 'var(--leaf-light)' : 'var(--olive)';
  const val = onDark ? 'var(--ivory)' : 'var(--forest)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      fontFamily: 'var(--font-body)',
      fontVariantNumeric: 'tabular-nums',
      flexWrap: 'wrap',
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: '.25em',
      color: lbl,
      fontWeight: 600
    }
  }, it.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 500,
      color: val,
      marginTop: 4,
      letterSpacing: '.04em'
    }
  }, it.value))));
}
function Stat({
  value,
  unit,
  label,
  onDark = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 52,
      lineHeight: 1,
      color: onDark ? 'var(--ivory)' : 'var(--forest)'
    }
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28
    }
  }, unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: '.2em',
      textTransform: 'uppercase',
      marginTop: 8,
      color: onDark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)'
    }
  }, label));
}
Object.assign(__ds_scope, { SpecReadout, Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/SpecReadout.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const labelStyle = {
  fontFamily: 'var(--font-body)',
  fontWeight: 600,
  fontSize: 11,
  letterSpacing: '.18em',
  textTransform: 'uppercase',
  color: 'var(--forest)',
  display: 'block',
  marginBottom: 8
};
const fieldStyle = onDark => ({
  fontFamily: 'var(--font-body)',
  fontSize: 15,
  padding: '13px 16px',
  width: '100%',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-sm)',
  outline: 'none',
  background: onDark ? 'rgba(246,244,238,.06)' : '#FFFFFF',
  border: onDark ? '1px solid rgba(246,244,238,.25)' : '1px solid var(--hairline)',
  color: onDark ? 'var(--ivory)' : 'var(--charcoal)'
});
function Input({
  label,
  onDark = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      ...labelStyle,
      color: onDark ? 'var(--leaf-light)' : 'var(--forest)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    style: {
      ...fieldStyle(onDark),
      ...style
    },
    onFocus: e => e.target.style.borderColor = 'var(--gold)',
    onBlur: e => e.target.style.borderColor = onDark ? 'rgba(246,244,238,.25)' : 'var(--hairline)'
  }, rest)));
}
function Textarea({
  label,
  onDark = false,
  rows = 4,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      ...labelStyle,
      color: onDark ? 'var(--leaf-light)' : 'var(--forest)'
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    style: {
      ...fieldStyle(onDark),
      resize: 'vertical',
      ...style
    },
    onFocus: e => e.target.style.borderColor = 'var(--gold)',
    onBlur: e => e.target.style.borderColor = onDark ? 'rgba(246,244,238,.25)' : 'var(--hairline)'
  }, rest)));
}
function Select({
  label,
  options = [],
  onDark = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      ...labelStyle,
      color: onDark ? 'var(--leaf-light)' : 'var(--forest)'
    }
  }, label), /*#__PURE__*/React.createElement("select", _extends({
    style: {
      ...fieldStyle(onDark),
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23C8A24A' stroke-width='1.5'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 16px center',
      ...style
    }
  }, rest), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o,
    style: {
      color: 'var(--charcoal)'
    }
  }, o))));
}
function Checkbox({
  label,
  onDark = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: onDark ? 'var(--ivory)' : 'var(--charcoal)',
      cursor: 'pointer',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    style: {
      width: 16,
      height: 16,
      accentColor: '#1E3D2B',
      margin: 0
    }
  }, rest)), label);
}
Object.assign(__ds_scope, { Input, Textarea, Select, Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
const {
  Button
} = window.FarmologicDesignSystem_069f79;
function SiteHeader({
  onCta
}) {
  const link = {
    fontFamily: 'var(--font-body)',
    fontSize: 12,
    letterSpacing: '.14em',
    fontWeight: 500,
    color: 'var(--forest)',
    textDecoration: 'none',
    textTransform: 'uppercase'
  };
  const go = id => e => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({
      top: el.offsetTop - 64,
      behavior: 'smooth'
    });
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(246,244,238,.92)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 32px',
      height: 76,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    onClick: go('top'),
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-full.png",
    alt: "Farmologic \u2014 Nature. Science. Wellness.",
    style: {
      height: 64
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 36,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    style: link,
    href: "#standard",
    onClick: go('standard')
  }, "The Standard"), /*#__PURE__*/React.createElement("a", {
    style: link,
    href: "#cordyceps",
    onClick: go('cordyceps')
  }, "Cordyceps"), /*#__PURE__*/React.createElement("a", {
    style: link,
    href: "#learn",
    onClick: go('learn')
  }, "Learn"), /*#__PURE__*/React.createElement("a", {
    style: link,
    href: "#about",
    onClick: go('about')
  }, "About"), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    size: "sm",
    onClick: onCta
  }, "Request a Sample"))));
}
function SiteFooter() {
  const col = {
    fontFamily: 'var(--font-body)',
    fontSize: 13,
    color: 'var(--text-on-dark-muted)',
    lineHeight: 2,
    display: 'flex',
    flexDirection: 'column'
  };
  const h = {
    fontSize: 10,
    letterSpacing: '.28em',
    color: 'var(--leaf-light)',
    fontWeight: 600,
    marginBottom: 10,
    fontFamily: 'var(--font-body)'
  };
  const a = {
    color: 'var(--text-on-dark-muted)',
    textDecoration: 'none'
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--forest-deep)',
      padding: '64px 32px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ivory)',
      display: 'inline-block',
      padding: '10px 18px',
      borderRadius: 2
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-full.png",
    alt: "Farmologic",
    style: {
      height: 88,
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--text-on-dark-muted)',
      maxWidth: 300,
      lineHeight: 1.7,
      marginTop: 18
    }
  }, "Harnessing nature through science to create premium wellness solutions for a better tomorrow.")), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("span", {
    style: h
  }, "SITE"), /*#__PURE__*/React.createElement("a", {
    style: a,
    href: "#standard"
  }, "The Standard"), /*#__PURE__*/React.createElement("a", {
    style: a,
    href: "#cordyceps"
  }, "Cordyceps"), /*#__PURE__*/React.createElement("a", {
    style: a,
    href: "#learn"
  }, "Learn"), /*#__PURE__*/React.createElement("a", {
    style: a,
    href: "#about"
  }, "About")), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("span", {
    style: h
  }, "TRADE"), /*#__PURE__*/React.createElement("a", {
    style: a,
    href: "#enquiry"
  }, "Bulk enquiry"), /*#__PURE__*/React.createElement("a", {
    style: a,
    href: "#enquiry"
  }, "Request COA"), /*#__PURE__*/React.createElement("a", {
    style: a,
    href: "#enquiry"
  }, "Reserve allocation")), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("span", {
    style: h
  }, "COMPANY"), /*#__PURE__*/React.createElement("span", null, "Bengaluru, India"), /*#__PURE__*/React.createElement("a", {
    style: a,
    href: "mailto:hello@farmologic.com"
  }, "hello@farmologic.com"), /*#__PURE__*/React.createElement("span", null, "FSSAI & AYUSH \xB7 on request"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '40px auto 0',
      paddingTop: 20,
      borderTop: '1px solid var(--border-hairline-on-dark)',
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      letterSpacing: '.12em',
      color: 'rgba(246,244,238,.4)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 FARMOLOGIC"), /*#__PURE__*/React.createElement("span", null, "NATURE. SCIENCE. WELLNESS.")));
}
Object.assign(window, {
  SiteHeader,
  SiteFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.GoldRule = __ds_scope.GoldRule;

__ds_ns.Seal = __ds_scope.Seal;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.CTABand = __ds_scope.CTABand;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.GlassCard = __ds_scope.GlassCard;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.SpecReadout = __ds_scope.SpecReadout;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Checkbox = __ds_scope.Checkbox;

})();
