import { useState } from "react";

/* ─── Design tokens from MHG Alpha Design System + live site ─── */
const C = {
  brand: "#0d7a9f",
  brandDark: "#065a75",
  brandBg: "#e8f6fa",
  primary: "#212121",
  secondary: "#424242",
  body: "#333",
  muted: "#6b7280",
  border: "#e5e7eb",
  borderDark: "#d1d5db",
  bg: "#ffffff",
  bgGray: "#f7f8fa",
  bgWarm: "#fafafa",
  green: "#16a34a",
  greenBg: "#f0fdf4",
  greenBorder: "#bbf7d0",
  red: "#dc2626",
  redBg: "#fef2f2",
  orange: "#d97706",
  orangeBg: "#fffbeb",
  orangeBorder: "#fde68a",
  black: "#111",
};
const font = "'Albert Sans', -apple-system, BlinkMacSystemFont, sans-serif";
const PASS_HASH = "VGhlLUZ1dHVyZS1CbG9n"; // base64 of the password

/* ═══════════════ PASSWORD GATE ═══════════════ */
function PasswordGate({ onUnlock }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    if (btoa(pw) === PASS_HASH) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(160deg, #f0f9fc 0%, #e0f2f7 40%, #fff 100%)`,
      fontFamily: font,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={{
        width: 400, padding: "40px 36px", background: "#fff", borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        textAlign: "center",
        animation: shake ? "shake 0.4s ease-in-out" : "fadeIn 0.5s ease-out",
      }}>
        <style>{`
          @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
          @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
          @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        `}</style>

        {/* Logo */}
        <div style={{ marginBottom: 8 }}>
          <svg width="48" height="48" viewBox="0 0 48 48">
            <rect width="48" height="48" rx="12" fill={C.brand} />
            <text x="24" y="30" textAnchor="middle" fill="#fff" fontFamily={font} fontSize="20" fontWeight="800">S</text>
          </svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: C.primary, marginBottom: 4 }}>SingSaver</div>
        <div style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>Blog Cross-Sell IA Prototype</div>

        <div style={{ fontSize: 13, color: C.muted, marginBottom: 12, textAlign: "left", fontWeight: 500 }}>Enter password to view prototype</div>

        <div style={{ position: "relative", marginBottom: 16 }}>
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false); }}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="Password"
            autoFocus
            style={{
              width: "100%", padding: "12px 16px", borderRadius: 10,
              border: `1.5px solid ${error ? C.red : C.border}`,
              fontSize: 15, fontFamily: font, outline: "none",
              background: error ? C.redBg : "#fff",
              boxSizing: "border-box",
              transition: "border-color 0.2s, background 0.2s",
            }}
          />
          {error && (
            <div style={{ fontSize: 12, color: C.red, textAlign: "left", marginTop: 6, fontWeight: 500 }}>
              Incorrect password. Please try again.
            </div>
          )}
        </div>

        <button onClick={handleSubmit} style={{
          width: "100%", padding: "12px 0", borderRadius: 10, border: "none",
          background: C.brand, color: "#fff", fontSize: 15, fontWeight: 600,
          cursor: "pointer", transition: "background 0.2s",
        }}
          onMouseOver={e => e.target.style.background = C.brandDark}
          onMouseOut={e => e.target.style.background = C.brand}
        >
          View Prototype
        </button>

        <div style={{ fontSize: 11, color: "#ccc", marginTop: 20 }}>
          MHG Alpha Design System · Internal Preview
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ REUSABLE COMPONENTS ═══════════════ */
const Link = ({ children, href = "#", style: s }) => (
  <a href={href} style={{ color: C.brand, textDecoration: "none", fontWeight: 500, ...s }}
    onMouseOver={e => e.target.style.textDecoration = "underline"}
    onMouseOut={e => e.target.style.textDecoration = "none"}>
    {children}
  </a>
);

const Tag = ({ children, color = C.brand, bg = C.brandBg }) => (
  <span style={{ fontSize: 11, fontWeight: 600, color, background: bg, padding: "2px 8px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>{children}</span>
);

const Divider = () => <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: "32px 0" }} />;

const LayerTag = ({ label, color, show }) => {
  if (!show) return null;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color, background: `${color}0D`, border: `1.5px dashed ${color}`, borderRadius: 4, padding: "3px 10px", marginBottom: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
      {label}
    </div>
  );
};

const BankSection = ({ bank, logo, rate, tenure, minDeposit, editorial, pros, cons, rateTable, expanded, onToggle }) => (
  <div style={{ marginBottom: 32 }}>
    <h3 style={{ fontSize: 20, fontWeight: 700, color: C.primary, margin: "0 0 16px" }}>{bank} fixed deposit rates</h3>
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 16, background: C.bg, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 8, background: "#f1f1f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: C.muted, border: `1px solid ${C.border}` }}>{logo}</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.primary }}>{bank} Fixed Deposit</div>
      </div>
      <div style={{ display: "flex", gap: 24, fontSize: 13 }}>
        <div><span style={{ color: C.muted }}>Interest Rate </span><strong style={{ color: C.brand, fontSize: 16 }}>{rate}</strong></div>
        <div><span style={{ color: C.muted }}>Min. Deposit </span><strong>S${minDeposit}</strong></div>
        <div><span style={{ color: C.muted }}>Min. Tenure </span><strong>{tenure}</strong></div>
      </div>
    </div>
    <h4 style={{ fontSize: 16, fontWeight: 700, color: C.primary, margin: "0 0 8px" }}>SingSaver's take</h4>
    <p style={{ fontSize: 15, lineHeight: "24px", color: C.body, margin: "0 0 16px" }}>{editorial}</p>
    <h4 style={{ fontSize: 16, fontWeight: 700, color: C.primary, margin: "0 0 10px" }}>{bank} Fixed Deposit Pros & Cons</h4>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.green, marginBottom: 6 }}>Pros</div>
        {pros.map((p, i) => <div key={i} style={{ fontSize: 14, color: C.body, lineHeight: "22px", marginBottom: 4, display: "flex", gap: 6 }}><span style={{ color: C.green, flexShrink: 0 }}>✓</span> {p}</div>)}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.red, marginBottom: 6 }}>Cons</div>
        {cons.map((c, i) => <div key={i} style={{ fontSize: 14, color: C.body, lineHeight: "22px", marginBottom: 4, display: "flex", gap: 6 }}><span style={{ color: C.red, flexShrink: 0 }}>✗</span> {c}</div>)}
      </div>
    </div>
    {rateTable && (
      <div>
        <button onClick={onToggle} style={{ width: "100%", padding: "10px 16px", border: `1px solid ${C.border}`, borderRadius: 8, background: C.bgGray, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14, fontWeight: 600, color: C.primary }}>
          Full List of FD Rates
          <span style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "0.2s", fontSize: 12 }}>▼</span>
        </button>
        {expanded && (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8, fontSize: 13 }}>
            <thead><tr style={{ background: C.bgGray }}>{["Tenure", "Interest rate (p.a.)", "Min. SGD deposit"].map((h, i) => <th key={i} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: C.muted, borderBottom: `2px solid ${C.borderDark}` }}>{h}</th>)}</tr></thead>
            <tbody>{rateTable.map((r, i) => <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}><td style={{ padding: "8px 12px", color: C.body }}>{r.tenure}</td><td style={{ padding: "8px 12px", fontWeight: 600, color: C.brand }}>{r.rate}</td><td style={{ padding: "8px 12px", color: C.body }}>{r.min}</td></tr>)}</tbody>
          </table>
        )}
      </div>
    )}
  </div>
);

/* ═══════════════ MAIN BLOG PAGE ═══════════════ */
function BlogPage() {
  const [expandedBank, setExpandedBank] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showLayers, setShowLayers] = useState(true);
  const [trustExpanded, setTrustExpanded] = useState(false);

  return (
    <div style={{ fontFamily: font, background: C.bg, color: C.primary, minHeight: "100vh", animation: "slideUp 0.6s ease-out" }}>

      {/* Toggle */}
      <button onClick={() => setShowLayers(!showLayers)} style={{
        position: "fixed", bottom: 16, right: 16, zIndex: 999, padding: "8px 14px", borderRadius: 8,
        border: `1px solid ${C.border}`, background: showLayers ? C.primary : C.bg,
        color: showLayers ? "#fff" : C.primary, fontSize: 12, fontWeight: 600, cursor: "pointer",
        boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
      }}>
        {showLayers ? "Hide" : "Show"} UX Layers
      </button>

      {/* Nav */}
      <nav style={{ borderBottom: `1px solid ${C.border}`, background: C.bg, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: C.brand }}>SingSaver</div>
          <div style={{ display: "flex", gap: 24, fontSize: 14, fontWeight: 500, color: C.secondary }}>
            {["Credit Cards", "Insurance", "Loans", "Banking", "Investments", "Blog"].map((item, i) => (
              <span key={i} style={{ cursor: "pointer", color: item === "Banking" ? C.brand : C.secondary, fontWeight: item === "Banking" ? 600 : 500 }}>{item}</span>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 24px 80px" }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>
          <Link>Home</Link> / <Link>Banking</Link> / <span>Best Fixed Deposit Rates</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: "40px", color: C.black, margin: "0 0 8px" }}>
          Best Fixed Deposit Rates for 2026: Up to 1.55%
        </h1>
        <div style={{ fontSize: 14, color: C.muted, marginBottom: 16 }}>Updated: 16 Feb 2026</div>

        {/* Author */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.brandBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: C.brand }}>SS</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Written by <Link>SingSaver Team</Link></div>
            <div style={{ fontSize: 12, color: C.muted }}>Team</div>
          </div>
        </div>

        {/* Hero */}
        <div style={{ width: "100%", height: 220, borderRadius: 12, background: `linear-gradient(135deg, ${C.brandBg} 0%, #d1eef5 100%)`, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", color: C.brand, fontSize: 14, fontWeight: 500 }}>
          [Hero Image: Best Fixed Deposit Rates 2026]
        </div>

        {/* Disclaimer */}
        <p style={{ fontSize: 13, color: C.muted, fontStyle: "italic", lineHeight: "20px", marginBottom: 20 }}>
          The information on this page is for educational and informational purposes only and should not be considered financial or investment advice. Always do your own research or consult a licensed financial professional before making any financial decisions.
        </p>

        {/* Why Trust SingSaver */}
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 24, overflow: "hidden" }}>
          <button onClick={() => setTrustExpanded(!trustExpanded)} style={{ width: "100%", padding: "14px 16px", border: "none", background: C.bgGray, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, textAlign: "left" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.brand, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>S</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.primary }}>Why Trust SingSaver</div>
              {!trustExpanded && <div style={{ fontSize: 13, color: C.muted }}>Personal finance is not just about finding the cheapest products...</div>}
            </div>
            <span style={{ fontSize: 12, color: C.muted, transform: trustExpanded ? "rotate(180deg)" : "none", transition: "0.2s" }}>▼</span>
          </button>
          {trustExpanded && (
            <div style={{ padding: "12px 16px 16px", fontSize: 14, lineHeight: "22px", color: C.body }}>
              <p style={{ margin: "0 0 8px" }}>Personal finance is not just about finding the cheapest products, but also about making smart financial decisions.</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li style={{ marginBottom: 6 }}>SingSaver's expert team analyses and compares over <strong>350 financial products</strong> from more than 60 trusted institutions.</li>
                <li style={{ marginBottom: 6 }}>Every month, over <strong>2 million users</strong> visit SingSaver and Seedly.</li>
                <li>SingSaver is part of a company <strong>publicly listed on NASDAQ</strong> (NASDAQ: MNY).</li>
              </ul>
            </div>
          )}
        </div>

        {/* ═══ LAYER 1 ═══ */}
        <LayerTag label="Layer 1 — Answer the Question" color={C.brand} show={showLayers} />

        <p style={{ fontSize: 15, lineHeight: "26px", color: C.body, margin: "0 0 16px" }}>
          Looking to supercharge your savings? Fixed deposits (FDs) in Singapore could be your answer, boasting some of the market's most attractive interest rates. Right now, you can secure competitive rates across various tenures.
        </p>
        <p style={{ fontSize: 15, lineHeight: "26px", color: C.body, margin: "0 0 16px" }}>
          FDs help grow your savings with conditions: You deposit a fixed amount for a specified tenure, and in return, you receive a guaranteed interest rate. With higher FD rates, the account can offer better returns compared to regular savings accounts.
        </p>

        {/* Quick Summary */}
        <LayerTag label="New: Quick Summary" color="#0d7a9f" show={showLayers} />
        <div style={{ border: `1px solid ${C.brandBg}`, borderLeft: `4px solid ${C.brand}`, borderRadius: "0 8px 8px 0", padding: "14px 16px", marginBottom: 24, background: C.brandBg }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.brand, marginBottom: 8 }}>⚡ At a Glance — Best FD Rates (Feb 2026)</div>
          {[
            { label: "Best 3-month", bank: "HSBC", rate: "1.50% p.a.", note: "min. S$30,000 via app" },
            { label: "Best 6-month", bank: "SCB / Maybank", rate: "1.45% p.a.", note: "min. S$20,000–$25,000" },
            { label: "Best 9-month", bank: "HL Finance", rate: "1.50% p.a.", note: "min. S$20,000" },
            { label: "Best 12-month", bank: "RHB / Maybank", rate: "1.40–1.45% p.a.", note: "min. S$20,000" },
          ].map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "5px 0", borderBottom: i < 3 ? `1px solid rgba(13,122,159,0.15)` : "none" }}>
              <div style={{ fontSize: 13, color: C.body }}><strong style={{ color: C.brand }}>{p.label}:</strong> {p.bank} <span style={{ color: C.muted, fontSize: 12 }}>({p.note})</span></div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.brand, whiteSpace: "nowrap", marginLeft: 12 }}>{p.rate}</div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: C.muted, marginTop: 10, fontStyle: "italic" }}>
            Not sure if FDs are right for you? <a href="#decision-guide" style={{ color: C.brand, fontWeight: 600, textDecoration: "none" }}>See which option suits your situation ↓</a>
          </div>
        </div>

        {/* Saver-savvy tip */}
        <div style={{ background: C.orangeBg, border: `1px solid ${C.orangeBorder}`, borderRadius: 8, padding: "14px 16px", marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>Saver-savvy tip</div>
          <div style={{ fontSize: 14, lineHeight: "22px", color: C.body }}>Keep in mind that fixed deposit rates in Singapore can fluctuate, and the most attractive offers are often promotional. Stay informed by checking the latest rates on banks' websites.</div>
        </div>

        {/* Comparison table */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.black, margin: "0 0 16px" }}>Best fixed deposit rates for 2026</h2>
        <div style={{ overflowX: "auto", marginBottom: 8 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: C.bgGray, borderBottom: `2px solid ${C.borderDark}` }}>
                {["Products", "Interest Rate", "Min. Tenure", "Min. Deposit", ""].map((h, i) => <th key={i} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: C.muted, fontSize: 12 }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                { bank: "HSBC", rate: "1.50%", tenure: "3 months", min: "S$5,000" },
                { bank: "HL Finance", rate: "1.50%", tenure: "9 months", min: "S$20,000" },
                { bank: "SCB", rate: "1.45%", tenure: "6 months", min: "S$25,000" },
                { bank: "Maybank", rate: "1.45%", tenure: "6 months", min: "S$20,000" },
                { bank: "RHB", rate: "1.40%", tenure: "3 months", min: "S$20,000" },
                { bank: "ICBC", rate: "1.35%", tenure: "3 months", min: "S$500" },
                { bank: "CIMB", rate: "1.35%", tenure: "3 months", min: "S$10,000" },
                { bank: "BOC", rate: "1.35%", tenure: "3 months", min: "S$500" },
                { bank: "Citibank", rate: "1.30%", tenure: "3 months", min: "S$350,000" },
                { bank: "SIF", rate: "1.30%", tenure: "3 months", min: "S$1,000" },
                { bank: "OCBC", rate: "1.25%", tenure: "12 months", min: "S$20,000" },
                { bank: "UOB", rate: "1.20%", tenure: "6 months", min: "S$25,000" },
                { bank: "SBI", rate: "1.15%", tenure: "6 months", min: "S$50,000" },
                { bank: "DBS", rate: "1.00%", tenure: "12 months", min: "S$1,000" },
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: "#f1f1f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: C.muted, border: `1px solid ${C.border}`, flexShrink: 0 }}>{r.bank.slice(0, 2)}</div>
                    <Link style={{ fontWeight: 600, fontSize: 13 }}>{r.bank} Fixed Deposit</Link>
                  </td>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: C.brand }}>{r.rate}</td>
                  <td style={{ padding: "10px 12px", color: C.body }}>{r.tenure}</td>
                  <td style={{ padding: "10px 12px", color: C.body }}>{r.min}</td>
                  <td style={{ padding: "10px 12px" }}><button style={{ padding: "6px 16px", borderRadius: 6, border: "none", background: C.brand, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>Apply</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ═══ DECISION GUIDE ═══ */}
        <LayerTag label="New: Decision Guide — The Fork" color="#c2410c" show={showLayers} />
        <div id="decision-guide" style={{ border: `1px solid ${C.orangeBorder}`, borderRadius: 12, marginBottom: 32, overflow: "hidden" }}>
          <div style={{ background: C.orangeBg, padding: "14px 16px", borderBottom: `1px solid ${C.orangeBorder}` }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#92400e" }}>🎯 Which option suits you?</div>
            <div style={{ fontSize: 13, color: "#a16207", marginTop: 2 }}>Tap your situation below to see our recommendation.</div>
          </div>
          {[
            { id: "fd", icon: "🏦", sit: "I have S$20K+ and won't need it for 3–12 months", rec: "Fixed deposit is a great fit for you. Lock in the best rate from the table above.", action: "↑ Jump to comparison table" },
            { id: "liquid", icon: "💧", sit: "I want steady returns but need access to my money", rec: "A high-interest savings account may suit you better — comparable rates, no lock-in period.", action: "→ Compare High-Interest Savings Accounts" },
            { id: "growth", icon: "📈", sit: "I'm comfortable with some risk for higher returns", rec: "Low-risk investment accounts and robo-advisors may outperform FDs over 2+ years.", action: "→ Compare Investment Accounts on SingSaver" },
            { id: "premium", icon: "⭐", sit: "I have S$200K+ and want a full banking relationship", rec: "Priority banking bundles preferential FD rates with travel, insurance, and lifestyle perks.", action: "→ Compare Priority Banking on SingSaver" },
          ].map((opt, i) => (
            <div key={opt.id} style={{ borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
              <div onClick={() => setSelectedGuide(selectedGuide === opt.id ? null : opt.id)}
                style={{ padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10, background: selectedGuide === opt.id ? C.orangeBg : C.bg, transition: "background 0.15s" }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{opt.icon}</span>
                <div style={{ flex: 1, fontSize: 14, lineHeight: "20px", color: C.primary, fontWeight: 500 }}>"{opt.sit}"</div>
                <span style={{ color: C.muted, fontSize: 18, flexShrink: 0, lineHeight: 1, transform: selectedGuide === opt.id ? "rotate(90deg)" : "none", transition: "0.15s" }}>›</span>
              </div>
              {selectedGuide === opt.id && (
                <div style={{ padding: "0 16px 14px 46px" }}>
                  <div style={{ fontSize: 14, color: C.body, lineHeight: "22px", marginBottom: 6 }}>{opt.rec}</div>
                  <a href="#" style={{ fontSize: 14, fontWeight: 600, color: C.brand, textDecoration: "none" }}>{opt.action}</a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ═══ Bank breakdowns ═══ */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.black, margin: "0 0 8px" }}>Our picks for fixed deposit rates</h2>
        <p style={{ fontSize: 15, lineHeight: "26px", color: C.body, margin: "0 0 24px" }}>
          SingSaver reviews local banks and financial institutions, highlighting those with competitive FD offerings. Explore the best banks in Singapore for FDs for February 2026 below.
        </p>

        <BankSection bank="HSBC" logo="HS" rate="1.50%" tenure="3 months" minDeposit="5,000"
          editorial="HSBC currently offers promotional fixed deposit rates of up to 1.50% p.a. for a 3-month tenure with a minimum deposit of S$30,000 when placed via the HSBC Singapore App. The promotional rates are valid till 28 February 2026."
          pros={["Competitive rate of 1.50% via app", "Variety of tenures (1–24 months)", "Established global bank"]}
          cons={["Higher min for promo rate (S$30,000)", "Promo rates may change without notice", "Standard rates are lower"]}
          rateTable={[{ tenure: "1 month", rate: "0.65%", min: "S$5,000" }, { tenure: "3 months", rate: "0.85% – 1.50%", min: "S$5,000 – S$30,000" }, { tenure: "6 months", rate: "0.90%", min: "S$5,000 – S$30,000" }, { tenure: "12 months", rate: "0.90%", min: "S$5,000 – S$30,000" }]}
          expanded={expandedBank === "HSBC"} onToggle={() => setExpandedBank(expandedBank === "HSBC" ? null : "HSBC")}
        />

        <BankSection bank="RHB" logo="RH" rate="1.40%" tenure="3 months" minDeposit="20,000"
          editorial="RHB offers competitive FD rates across multiple tenures. Their 3-month and 6-month rates of 1.40% p.a. require a minimum deposit of S$20,000. A solid choice for consistent rates across short and medium tenures."
          pros={["Consistent rates across tenures", "Reasonable S$20K minimum", "Good short-term option"]}
          cons={["Smaller branch network", "Promotional rates may change", "Not the highest rate available"]}
          rateTable={[{ tenure: "3 months", rate: "1.40%", min: "S$20,000" }, { tenure: "6 months", rate: "1.40%", min: "S$20,000" }, { tenure: "12 months", rate: "1.35%", min: "S$20,000" }]}
          expanded={expandedBank === "RHB"} onToggle={() => setExpandedBank(expandedBank === "RHB" ? null : "RHB")}
        />

        <BankSection bank="Maybank" logo="MB" rate="1.45%" tenure="6 months" minDeposit="20,000"
          editorial="Maybank's highest available rate under the current SGD Time Deposit promotions is up to 1.45% p.a. for 9- and 12-month tenures when customers place fresh funds and meet the deposit bundle requirements. The standalone promotion offers 1.30% p.a."
          pros={["Up to 1.45% with deposit bundle", "Variety of tenures (6–12 months)", "Bundle deals available"]}
          cons={["High minimum deposit (S$20,000)", "Best rates require bundle conditions", "Promo rates subject to change"]}
          rateTable={[{ tenure: "6 months", rate: "1.30% (Standalone)", min: "S$20,000" }, { tenure: "9 months", rate: "1.45% (Bundle) / 1.30%", min: "S$20,000" }, { tenure: "12 months", rate: "1.45% (Bundle) / 1.30%", min: "S$20,000" }]}
          expanded={expandedBank === "Maybank"} onToggle={() => setExpandedBank(expandedBank === "Maybank" ? null : "Maybank")}
        />

        <p style={{ fontSize: 13, color: C.muted, fontStyle: "italic", marginBottom: 24 }}>
          [Additional bank breakdowns for BOC, CIMB, Citibank, DBS, HL Finance, ICBC, OCBC, SCB, SBI, SIF, UOB continue in full article]
        </p>

        <Divider />

        {/* ═══ LAYER 2 ═══ */}
        <LayerTag label="Layer 2 — Expand Consideration" color={C.green} show={showLayers} />

        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.black, margin: "0 0 8px" }}>Alternatives to fixed deposits</h2>
        <p style={{ fontSize: 15, lineHeight: "26px", color: C.body, margin: "0 0 24px" }}>
          While fixed deposits are popular for safe, predictable returns, several alternatives offer varying levels of risk and reward depending on your goals.
        </p>

        {[
          { title: "Singapore Savings Bonds (SSBs)", text: "SSBs are backed by the Singapore government and offer step-up interest rates over time. They're flexible, with no penalties for early withdrawals. The minimum investment is just S$500.", link: "» MORE: Fixed Deposits vs. Singapore Savings Bonds" },
          { title: "High-interest savings accounts", text: "Some high-yield savings accounts can offer returns on par with or even higher than short-term FDs. They often require meeting specific conditions like salary crediting or card spending, but offer full liquidity.", link: "» MORE: Best High-Interest Savings Accounts in Singapore" },
          { title: "Low-risk investment accounts", text: "Robo-advisors and fixed-income products offer steady returns with relatively low risk. Conservative portfolios may outperform FDs over 2+ years, though returns aren't guaranteed.", link: "» MORE: Compare Investment Accounts on SingSaver" },
          { title: "Priority banking", text: "If you're depositing S$200,000 or more, priority banking packages include preferential FD rates plus fee waivers, travel perks, insurance discounts, and dedicated relationship managers.", link: "» MORE: Compare Priority Banking on SingSaver" },
        ].map((s, i) => (
          <div key={i}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: C.primary, margin: "0 0 10px" }}>{s.title}</h3>
            <p style={{ fontSize: 15, lineHeight: "26px", color: C.body, margin: "0 0 8px" }}>{s.text}</p>
            <p style={{ fontSize: 14, marginBottom: 20 }}><Link style={{ fontWeight: 600 }}>{s.link}</Link></p>
          </div>
        ))}

        {/* Expert Take */}
        <LayerTag label="New: Expert Take (Variant B)" color="#7c3aed" show={showLayers} />
        <div style={{ borderLeft: `4px solid ${C.brand}`, padding: "14px 18px", marginBottom: 28, background: C.brandBg, borderRadius: "0 8px 8px 0" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.brand, marginBottom: 6 }}>SingSaver's Perspective — Banking Team</div>
          <p style={{ fontSize: 15, lineHeight: "24px", color: C.body, margin: 0 }}>
            At current rates of around 1.3–1.5% p.a., fixed deposits barely keep pace with inflation. They're still good for short-term capital preservation, but if your time horizon is longer, diversifying across T-bills, savings accounts, and a conservative investment portfolio will likely serve you better.
          </p>
        </div>

        <Divider />

        {/* ═══ LAYER 3 ═══ */}
        <LayerTag label="Layer 3 — Convert" color="#7c3aed" show={showLayers} />

        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.black, margin: "0 0 8px" }}>What to look for in a fixed deposit</h2>
        {[
          { label: "Types of fixed deposits:", text: "Banks in Singapore offer various options, including standard, foreign currency, and recurring fixed deposits." },
          { label: "Interest rates:", text: "Rates vary by bank and are influenced by tenure and deposit amount. Comparing rates is crucial to maximise returns." },
          { label: "Minimum deposit:", text: "Can range from as low as S$500 to S$200,000 or more depending on the bank and promotion." },
          { label: "Withdrawal penalties:", text: "FDs are designed to be held until maturity. Early withdrawal can result in reduced interest or administrative fees." },
        ].map((item, i) => (
          <p key={i} style={{ fontSize: 15, lineHeight: "26px", color: C.body, margin: "0 0 12px" }}>
            <strong>{item.label}</strong> {item.text}
          </p>
        ))}

        {/* Saver-Savvy Tip green */}
        <LayerTag label="New: Saver-Savvy Tip (Variant A)" color={C.green} show={showLayers} />
        <div style={{ background: C.greenBg, border: `1px solid ${C.greenBorder}`, borderRadius: 8, padding: "14px 16px", marginTop: 12, marginBottom: 28 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.green, marginBottom: 4 }}>💡 Saver-savvy tip</div>
          <div style={{ fontSize: 14, lineHeight: "22px", color: C.body }}>
            If you're depositing less than S$20,000, most promotional FD rates won't apply. Consider a <Link>high-interest savings account</Link> instead. Looking for stocks or other assets to complement your fixed deposits? <Link>Find the best online brokerage account</Link> with us.
          </div>
        </div>

        {/* Related reads */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.black, margin: "0 0 12px" }}>Related reads</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 32 }}>
          {["When Are Fixed Deposits Better Than Singapore Savings Bonds?", "Best Alternatives to Fixed Deposit Accounts in Singapore", "Fixed Deposits vs. Endowment Plans vs. Cash Management Accounts", "Best High-Interest Savings Accounts in Singapore", "How Much Money Should You Put in a Fixed Deposit Account?"].map((t, i) => <Link key={i} style={{ fontSize: 14, lineHeight: "22px" }}>{t}</Link>)}
        </div>

        {/* Compare CTA */}
        <LayerTag label="New: Compare on SingSaver" color="#7c3aed" show={showLayers} />
        <div style={{ background: C.bgGray, borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 12 }}>Looking for more ways to grow your savings?</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { label: "Savings Accounts", desc: "Best high-interest options" },
              { label: "Priority Banking", desc: "For deposits S$200K+" },
              { label: "Investment Accounts", desc: "Robo-advisors & more" },
              { label: "Brokerage Accounts", desc: "Stocks & ETFs" },
            ].map((item, i) => (
              <a key={i} href="#" style={{ display: "block", padding: "12px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, textDecoration: "none" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.brand }}>{item.label}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{item.desc}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div style={{ background: C.brandBg, borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.brand, marginBottom: 4 }}>Subscribe to our newsletter</div>
          <div style={{ fontSize: 13, color: C.body, marginBottom: 14 }}>Receive insightful articles, exclusive tips, and the latest financial news.</div>
          <div style={{ display: "flex", gap: 8, maxWidth: 400, margin: "0 auto" }}>
            <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, fontFamily: font, outline: "none", boxSizing: "border-box" }} />
            <button style={{ padding: "10px 20px", borderRadius: 8, border: "none", background: C.brand, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Subscribe</button>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ═══════════════ APP ROOT ═══════════════ */
export default function App() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      {unlocked ? <BlogPage /> : <PasswordGate onUnlock={() => setUnlocked(true)} />}
    </>
  );
}
