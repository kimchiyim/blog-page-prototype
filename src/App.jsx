import { useState } from "react";

/* ─── Design tokens ─── */
const C = {
  brand: "#0d7a9f", brandDark: "#065a75", brandBg: "#e8f6fa",
  primary: "#212121", secondary: "#424242", body: "#333", muted: "#6b7280",
  border: "#e5e7eb", borderDark: "#d1d5db", bg: "#ffffff", bgGray: "#f7f8fa",
  green: "#16a34a", greenBg: "#f0fdf4", greenBorder: "#bbf7d0",
  red: "#dc2626", redBg: "#fef2f2",
  orange: "#d97706", orangeBg: "#fffbeb", orangeBorder: "#fde68a",
  black: "#111", purple: "#7c3aed", purpleBg: "#f5f3ff",
};
const font = "'Albert Sans', -apple-system, BlinkMacSystemFont, sans-serif";
const PASS_HASH = "VGhlLUZ1dHVyZS1CbG9n";

/* ═══ PASSWORD GATE ═══ */
function PasswordGate({ onUnlock }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const handleSubmit = () => {
    if (btoa(pw) === PASS_HASH) { onUnlock(); }
    else { setError(true); setShake(true); setTimeout(() => setShake(false), 500); }
  };
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg, #f0f9fc 0%, #e0f2f7 40%, #fff 100%)", fontFamily: font }}>
      <div style={{ width: 400, padding: "40px 36px", background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", textAlign: "center", animation: shake ? "shake 0.4s" : "fadeIn 0.5s" }}>
        <div style={{ marginBottom: 8 }}>
          <svg width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill={C.brand} /><text x="24" y="30" textAnchor="middle" fill="#fff" fontFamily={font} fontSize="20" fontWeight="800">S</text></svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: C.primary, marginBottom: 4 }}>SingSaver</div>
        <div style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>Blog Cross-Sell IA Prototype</div>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 12, textAlign: "left", fontWeight: 500 }}>Enter password to view prototype</div>
        <input type="password" value={pw} onChange={e => { setPw(e.target.value); setError(false); }} onKeyDown={e => e.key === "Enter" && handleSubmit()} placeholder="Password" autoFocus
          style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${error ? C.red : C.border}`, fontSize: 15, fontFamily: font, outline: "none", background: error ? C.redBg : "#fff", boxSizing: "border-box", marginBottom: error ? 0 : 16 }} />
        {error && <div style={{ fontSize: 12, color: C.red, textAlign: "left", margin: "6px 0 10px", fontWeight: 500 }}>Incorrect password. Please try again.</div>}
        <button onClick={handleSubmit} style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: "none", background: C.brand, color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>View Prototype</button>
        <div style={{ fontSize: 11, color: "#ccc", marginTop: 20 }}>MHG Alpha Design System · Internal Preview</div>
      </div>
    </div>
  );
}

/* ═══ ANNOTATION PANEL — editorial guidance for each new component ═══ */
const ANNOTATIONS = {
  quickSummary: {
    component: "Quick Summary",
    layer: "Layer 1",
    why: "Users scanning comparison articles want the answer immediately. Analytics show most readers spend less than 15 seconds before deciding to stay or bounce. This box gives them the top picks in 3 seconds — reducing bounce and building trust that the article is up-to-date.",
    write: "List the single best rate for each major tenure (3-month, 6-month, 9-month, 12-month). Include the bank name, rate, and minimum deposit. Keep it factual — no selling. Update monthly when rates change.",
    skip: "Without a quick summary, readers must scroll through the entire table to find the best rate. Many won't — they'll bounce to a competitor who gives them the answer faster.",
    effort: "~15 min/month when updating rates",
    color: "#0d7a9f",
  },
  decisionGuide: {
    component: "Decision Guide",
    layer: "Between Layer 1 & 2",
    why: "Not every reader arriving at 'best FD rates' actually needs an FD. Some need liquidity, some want growth, some have enough for priority banking. This component self-segments users and routes them to the right product — increasing cross-sell without feeling pushy.",
    write: "Write 3-4 common reader situations as first-person statements ('I have S$20K and won't need it for 6 months'). Each situation gets a 1-2 sentence recommendation and a link to the relevant comparison page. Situations should be mutually exclusive.",
    skip: "Without this fork, readers who don't actually need an FD will either leave (lost opportunity) or apply for an FD that's wrong for them (poor experience). We also lose the most natural cross-sell point in the article.",
    effort: "Written once per article template, rarely needs updating",
    color: "#c2410c",
  },
  expertTake: {
    component: "Expert Take",
    layer: "Layer 2",
    why: "After showing alternatives, readers need a trusted voice to help them weigh options. This positions SingSaver as an advisor, not just an aggregator. It builds the editorial authority that keeps users coming back and distinguishes our content from AI-generated comparison sites.",
    write: "2-3 sentences of genuine editorial opinion from the banking/finance team. Should have a clear point of view (e.g. 'FDs barely keep pace with inflation right now'). Avoid marketing speak — be the honest friend. Attribute to a specific team or person if possible.",
    skip: "The article reads as purely transactional — just a table of rates. We miss the chance to build editorial trust and differentiate from competitors. Readers treat us as interchangeable with any other comparison site.",
    effort: "~10 min to draft, reviewed with banking team",
    color: "#7c3aed",
  },
  saverTip: {
    component: "Saver-Savvy Tip",
    layer: "Layer 3",
    why: "Many readers don't qualify for the headline rates (e.g. they have less than S$20K). Rather than letting them leave disappointed, this tip redirects them to a product they do qualify for — turning a potential dead-end into a conversion.",
    write: "Identify the most common mismatch between reader expectations and product requirements (e.g. minimum deposit too high). Offer a specific alternative product with a link to our comparison page. Keep it to 2-3 sentences, genuinely helpful tone.",
    skip: "Readers who don't meet the minimum deposit leave with nothing. We lose a conversion opportunity on a reader who was actively looking for a financial product — they just needed a different one.",
    effort: "~5 min, one short paragraph with a link",
    color: "#16a34a",
  },
  compareCTA: {
    component: "Compare on SingSaver",
    layer: "Layer 3",
    why: "Readers who've finished the article are in 'explore mode.' This grid gives them a clear next step across our product categories — extending their session and increasing the chance of at least one conversion. It replaces the random related links that currently sit here.",
    write: "Select 3-4 product categories most relevant to the article topic. Each card needs a category name and a short descriptor (5 words max). Link to the corresponding comparison page. Should feel like helpful navigation, not ads.",
    skip: "The article ends abruptly after the content. Readers who wanted to explore further have no guided path — they either leave or have to navigate the site themselves. We lose the easiest conversion moment.",
    effort: "Template — just select which 4 categories to show",
    color: "#7c3aed",
  },
};

function AnnotationPanel({ id, show }) {
  const [expanded, setExpanded] = useState(false);
  if (!show) return null;
  const a = ANNOTATIONS[id];
  if (!a) return null;
  return (
    <div style={{ marginBottom: 14 }}>
      <div onClick={() => setExpanded(!expanded)} style={{
        display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700,
        color: a.color, background: `${a.color}0D`, border: `1.5px dashed ${a.color}`,
        borderRadius: expanded ? "6px 6px 0 0" : 6, padding: "5px 12px",
        cursor: "pointer", letterSpacing: "0.04em", textTransform: "uppercase", userSelect: "none",
      }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: a.color }} />
        <span>NEW: {a.component}</span>
        <span style={{ marginLeft: 4, fontSize: 10, opacity: 0.7 }}>{a.layer}</span>
        <span style={{ marginLeft: 6, fontSize: 14, transform: expanded ? "rotate(180deg)" : "none", transition: "0.2s", lineHeight: 1 }}>&#9662;</span>
      </div>
      {expanded && (
        <div style={{ border: `1.5px dashed ${a.color}`, borderTop: "none", borderRadius: "0 6px 6px 6px", padding: "14px 16px", background: `${a.color}08`, fontSize: 13, lineHeight: "20px", color: "#333" }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: a.color, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>&#128204; Why this exists</div>
            <div>{a.why}</div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: a.color, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>&#9999;&#65039; What to write</div>
            <div>{a.write}</div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>&#9888;&#65039; If we skip this</div>
            <div style={{ color: "#991b1b" }}>{a.skip}</div>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#16a34a", fontWeight: 600, background: "#f0fdf4", padding: "4px 10px", borderRadius: 4, border: "1px solid #bbf7d0" }}>
            &#9201; Effort: {a.effort}
          </div>
        </div>
      )}
    </div>
  );
}

const LayerTag = ({ label, color, show }) => {
  if (!show) return null;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color, background: `${color}0D`, border: `1.5px dashed ${color}`, borderRadius: 4, padding: "3px 10px", marginBottom: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
      {label}
    </div>
  );
};

/* ═══ SHARED COMPONENTS ═══ */
const Link = ({ children, href = "#", style: s }) => (
  <a href={href} style={{ color: C.brand, textDecoration: "none", fontWeight: 500, ...s }}
    onMouseOver={e => e.target.style.textDecoration = "underline"} onMouseOut={e => e.target.style.textDecoration = "none"}>{children}</a>
);
const Divider = () => <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: "32px 0" }} />;

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
        {pros.map((p, i) => <div key={i} style={{ fontSize: 14, color: C.body, lineHeight: "22px", marginBottom: 4, display: "flex", gap: 6 }}><span style={{ color: C.green, flexShrink: 0 }}>&#10003;</span> {p}</div>)}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.red, marginBottom: 6 }}>Cons</div>
        {cons.map((c, i) => <div key={i} style={{ fontSize: 14, color: C.body, lineHeight: "22px", marginBottom: 4, display: "flex", gap: 6 }}><span style={{ color: C.red, flexShrink: 0 }}>&#10007;</span> {c}</div>)}
      </div>
    </div>
    {rateTable && (
      <div>
        <button onClick={onToggle} style={{ width: "100%", padding: "10px 16px", border: `1px solid ${C.border}`, borderRadius: 8, background: C.bgGray, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14, fontWeight: 600, color: C.primary }}>
          Full List of FD Rates <span style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "0.2s", fontSize: 12 }}>&#9660;</span>
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

/* ═══ MAIN BLOG PAGE ═══ */
function BlogPage() {
  const [expandedBank, setExpandedBank] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showLayers, setShowLayers] = useState(true);
  const [trustExpanded, setTrustExpanded] = useState(false);

  return (
    <div style={{ fontFamily: font, background: C.bg, color: C.primary, minHeight: "100vh", animation: "slideUp 0.6s ease-out" }}>
      <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
        {showLayers && (
          <div style={{ background: C.primary, color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: 11, lineHeight: "16px", maxWidth: 220, boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}>
            <strong>Editor mode ON</strong> — click the dashed <span style={{ color: "#fde68a" }}>NEW</span> tags to see editorial guidance for each component
          </div>
        )}
        <button onClick={() => setShowLayers(!showLayers)} style={{
          padding: "10px 16px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: showLayers ? C.primary : C.bg, color: showLayers ? "#fff" : C.primary,
          fontSize: 12, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
        }}>
          {showLayers ? "Editor Mode ON" : "Editor Mode OFF"}
        </button>
      </div>

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

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 24px 80px" }}>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}><Link>Home</Link> / <Link>Banking</Link> / <span>Best Fixed Deposit Rates</span></div>

        <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: "40px", color: C.black, margin: "0 0 8px" }}>Best Fixed Deposit Rates for 2026: Up to 1.55%</h1>
        <div style={{ fontSize: 14, color: C.muted, marginBottom: 16 }}>Updated: 16 Feb 2026</div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.brandBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: C.brand }}>SS</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Written by <Link>SingSaver Team</Link></div>
            <div style={{ fontSize: 12, color: C.muted }}>Team</div>
          </div>
        </div>

        <div style={{ width: "100%", height: 220, borderRadius: 12, background: `linear-gradient(135deg, ${C.brandBg} 0%, #d1eef5 100%)`, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", color: C.brand, fontSize: 14, fontWeight: 500 }}>[Hero Image: Best Fixed Deposit Rates 2026]</div>

        <p style={{ fontSize: 13, color: C.muted, fontStyle: "italic", lineHeight: "20px", marginBottom: 20 }}>The information on this page is for educational and informational purposes only and should not be considered financial or investment advice.</p>

        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 24, overflow: "hidden" }}>
          <button onClick={() => setTrustExpanded(!trustExpanded)} style={{ width: "100%", padding: "14px 16px", border: "none", background: C.bgGray, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, textAlign: "left" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.brand, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>S</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.primary }}>Why Trust SingSaver</div>
              {!trustExpanded && <div style={{ fontSize: 13, color: C.muted }}>Personal finance is not just about finding the cheapest products...</div>}
            </div>
            <span style={{ fontSize: 12, color: C.muted, transform: trustExpanded ? "rotate(180deg)" : "none", transition: "0.2s" }}>&#9660;</span>
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

        <LayerTag label="Layer 1 — Answer the Question" color={C.brand} show={showLayers} />

        <p style={{ fontSize: 15, lineHeight: "26px", color: C.body, margin: "0 0 16px" }}>Looking to supercharge your savings? Fixed deposits (FDs) in Singapore could be your answer, boasting some of the market's most attractive interest rates.</p>
        <p style={{ fontSize: 15, lineHeight: "26px", color: C.body, margin: "0 0 16px" }}>FDs help grow your savings with conditions: You deposit a fixed amount for a specified tenure, and in return, you receive a guaranteed interest rate.</p>

        <AnnotationPanel id="quickSummary" show={showLayers} />
        <div style={{ border: `1px solid ${C.brandBg}`, borderLeft: `4px solid ${C.brand}`, borderRadius: "0 8px 8px 0", padding: "14px 16px", marginBottom: 24, background: C.brandBg }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.brand, marginBottom: 8 }}>&#9889; At a Glance — Best FD Rates (Feb 2026)</div>
          {[
            { label: "Best 3-month", bank: "HSBC", rate: "1.50% p.a.", note: "min. S$30,000 via app" },
            { label: "Best 6-month", bank: "SCB / Maybank", rate: "1.45% p.a.", note: "min. S$20,000-$25,000" },
            { label: "Best 9-month", bank: "HL Finance", rate: "1.50% p.a.", note: "min. S$20,000" },
            { label: "Best 12-month", bank: "RHB / Maybank", rate: "1.40-1.45% p.a.", note: "min. S$20,000" },
          ].map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "5px 0", borderBottom: i < 3 ? "1px solid rgba(13,122,159,0.15)" : "none" }}>
              <div style={{ fontSize: 13, color: C.body }}><strong style={{ color: C.brand }}>{p.label}:</strong> {p.bank} <span style={{ color: C.muted, fontSize: 12 }}>({p.note})</span></div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.brand, whiteSpace: "nowrap", marginLeft: 12 }}>{p.rate}</div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: C.muted, marginTop: 10, fontStyle: "italic" }}>Not sure if FDs are right for you? <a href="#decision-guide" style={{ color: C.brand, fontWeight: 600, textDecoration: "none" }}>See which option suits your situation</a></div>
        </div>

        <div style={{ background: C.orangeBg, border: `1px solid ${C.orangeBorder}`, borderRadius: 8, padding: "14px 16px", marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>Saver-savvy tip</div>
          <div style={{ fontSize: 14, lineHeight: "22px", color: C.body }}>Keep in mind that fixed deposit rates in Singapore can fluctuate, and the most attractive offers are often promotional.</div>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.black, margin: "0 0 16px" }}>Best fixed deposit rates for 2026</h2>
        <div style={{ overflowX: "auto", marginBottom: 8 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead><tr style={{ background: C.bgGray, borderBottom: `2px solid ${C.borderDark}` }}>
              {["Products", "Interest Rate", "Min. Tenure", "Min. Deposit", ""].map((h, i) => <th key={i} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: C.muted, fontSize: 12 }}>{h}</th>)}
            </tr></thead>
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

        <AnnotationPanel id="decisionGuide" show={showLayers} />
        <div id="decision-guide" style={{ border: `1px solid ${C.orangeBorder}`, borderRadius: 12, marginBottom: 32, overflow: "hidden" }}>
          <div style={{ background: C.orangeBg, padding: "14px 16px", borderBottom: `1px solid ${C.orangeBorder}` }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#92400e" }}>Which option suits you?</div>
            <div style={{ fontSize: 13, color: "#a16207", marginTop: 2 }}>Tap your situation below to see our recommendation.</div>
          </div>
          {[
            { id: "fd", icon: "\uD83C\uDFE6", sit: "I have S$20K+ and won't need it for 3-12 months", rec: "Fixed deposit is a great fit for you. Lock in the best rate from the table above.", action: "Jump to comparison table" },
            { id: "liquid", icon: "\uD83D\uDCA7", sit: "I want steady returns but need access to my money", rec: "A high-interest savings account may suit you better — comparable rates, no lock-in period.", action: "Compare High-Interest Savings Accounts" },
            { id: "growth", icon: "\uD83D\uDCC8", sit: "I'm comfortable with some risk for higher returns", rec: "Low-risk investment accounts and robo-advisors may outperform FDs over 2+ years.", action: "Compare Investment Accounts on SingSaver" },
            { id: "premium", icon: "\u2B50", sit: "I have S$200K+ and want a full banking relationship", rec: "Priority banking bundles preferential FD rates with travel, insurance, and lifestyle perks.", action: "Compare Priority Banking on SingSaver" },
          ].map((opt, i) => (
            <div key={opt.id} style={{ borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
              <div onClick={() => setSelectedGuide(selectedGuide === opt.id ? null : opt.id)}
                style={{ padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10, background: selectedGuide === opt.id ? C.orangeBg : C.bg, transition: "background 0.15s" }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{opt.icon}</span>
                <div style={{ flex: 1, fontSize: 14, lineHeight: "20px", color: C.primary, fontWeight: 500 }}>"{opt.sit}"</div>
                <span style={{ color: C.muted, fontSize: 18, flexShrink: 0, lineHeight: 1, transform: selectedGuide === opt.id ? "rotate(90deg)" : "none", transition: "0.15s" }}>&rsaquo;</span>
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

        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.black, margin: "0 0 8px" }}>Our picks for fixed deposit rates</h2>
        <p style={{ fontSize: 15, lineHeight: "26px", color: C.body, margin: "0 0 24px" }}>SingSaver reviews local banks and financial institutions. Explore the best banks in Singapore for FDs for February 2026 below.</p>

        <BankSection bank="HSBC" logo="HS" rate="1.50%" tenure="3 months" minDeposit="5,000"
          editorial="HSBC currently offers promotional fixed deposit rates of up to 1.50% p.a. for a 3-month tenure with a minimum deposit of S$30,000 when placed via the HSBC Singapore App."
          pros={["Competitive rate of 1.50% via app", "Variety of tenures (1-24 months)", "Established global bank"]}
          cons={["Higher min for promo rate (S$30,000)", "Promo rates may change without notice", "Standard rates are lower"]}
          rateTable={[{ tenure: "1 month", rate: "0.65%", min: "S$5,000" }, { tenure: "3 months", rate: "0.85% - 1.50%", min: "S$5,000 - S$30,000" }, { tenure: "6 months", rate: "0.90%", min: "S$5,000 - S$30,000" }, { tenure: "12 months", rate: "0.90%", min: "S$5,000 - S$30,000" }]}
          expanded={expandedBank === "HSBC"} onToggle={() => setExpandedBank(expandedBank === "HSBC" ? null : "HSBC")}
        />
        <BankSection bank="RHB" logo="RH" rate="1.40%" tenure="3 months" minDeposit="20,000"
          editorial="RHB offers competitive FD rates across multiple tenures. Their 3-month and 6-month rates of 1.40% p.a. require a minimum deposit of S$20,000."
          pros={["Consistent rates across tenures", "Reasonable S$20K minimum", "Good short-term option"]}
          cons={["Smaller branch network", "Promotional rates may change", "Not the highest rate available"]}
          rateTable={[{ tenure: "3 months", rate: "1.40%", min: "S$20,000" }, { tenure: "6 months", rate: "1.40%", min: "S$20,000" }, { tenure: "12 months", rate: "1.35%", min: "S$20,000" }]}
          expanded={expandedBank === "RHB"} onToggle={() => setExpandedBank(expandedBank === "RHB" ? null : "RHB")}
        />
        <BankSection bank="Maybank" logo="MB" rate="1.45%" tenure="6 months" minDeposit="20,000"
          editorial="Maybank's highest available rate is up to 1.45% p.a. for 9- and 12-month tenures when customers meet the deposit bundle requirements."
          pros={["Up to 1.45% with deposit bundle", "Variety of tenures (6-12 months)", "Bundle deals available"]}
          cons={["High minimum deposit (S$20,000)", "Best rates require bundle conditions", "Promo rates subject to change"]}
          rateTable={[{ tenure: "6 months", rate: "1.30% (Standalone)", min: "S$20,000" }, { tenure: "9 months", rate: "1.45% (Bundle) / 1.30%", min: "S$20,000" }, { tenure: "12 months", rate: "1.45% (Bundle) / 1.30%", min: "S$20,000" }]}
          expanded={expandedBank === "Maybank"} onToggle={() => setExpandedBank(expandedBank === "Maybank" ? null : "Maybank")}
        />

        <p style={{ fontSize: 13, color: C.muted, fontStyle: "italic", marginBottom: 24 }}>[Additional bank breakdowns continue in full article]</p>

        <Divider />

        <LayerTag label="Layer 2 — Expand Consideration" color={C.green} show={showLayers} />

        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.black, margin: "0 0 8px" }}>Alternatives to fixed deposits</h2>
        <p style={{ fontSize: 15, lineHeight: "26px", color: C.body, margin: "0 0 24px" }}>While fixed deposits are popular for safe, predictable returns, several alternatives offer varying levels of risk and reward.</p>

        {[
          { title: "Singapore Savings Bonds (SSBs)", text: "SSBs are backed by the Singapore government and offer step-up interest rates. Flexible with no penalties for early withdrawals.", link: "Fixed Deposits vs. Singapore Savings Bonds" },
          { title: "High-interest savings accounts", text: "Some high-yield savings accounts offer returns on par with short-term FDs, with full liquidity.", link: "Best High-Interest Savings Accounts in Singapore" },
          { title: "Low-risk investment accounts", text: "Robo-advisors and fixed-income products offer steady returns. Conservative portfolios may outperform FDs over 2+ years.", link: "Compare Investment Accounts on SingSaver" },
          { title: "Priority banking", text: "For deposits of S$200,000+, priority banking includes preferential FD rates plus lifestyle perks.", link: "Compare Priority Banking on SingSaver" },
        ].map((s, i) => (
          <div key={i}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: C.primary, margin: "0 0 10px" }}>{s.title}</h3>
            <p style={{ fontSize: 15, lineHeight: "26px", color: C.body, margin: "0 0 8px" }}>{s.text}</p>
            <p style={{ fontSize: 14, marginBottom: 20 }}><Link style={{ fontWeight: 600 }}>{s.link}</Link></p>
          </div>
        ))}

        <AnnotationPanel id="expertTake" show={showLayers} />
        <div style={{ borderLeft: `4px solid ${C.brand}`, padding: "14px 18px", marginBottom: 28, background: C.brandBg, borderRadius: "0 8px 8px 0" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.brand, marginBottom: 6 }}>SingSaver's Perspective — Banking Team</div>
          <p style={{ fontSize: 15, lineHeight: "24px", color: C.body, margin: 0 }}>At current rates of around 1.3-1.5% p.a., fixed deposits barely keep pace with inflation. They're still good for short-term capital preservation, but if your time horizon is longer, diversifying across T-bills, savings accounts, and a conservative investment portfolio will likely serve you better.</p>
        </div>

        <Divider />

        <LayerTag label="Layer 3 — Convert" color={C.purple} show={showLayers} />

        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.black, margin: "0 0 8px" }}>What to look for in a fixed deposit</h2>
        {[
          { label: "Types of fixed deposits:", text: "Banks offer standard, foreign currency, and recurring fixed deposits." },
          { label: "Interest rates:", text: "Rates vary by bank and are influenced by tenure and deposit amount." },
          { label: "Minimum deposit:", text: "Can range from S$500 to S$200,000+ depending on the bank." },
          { label: "Withdrawal penalties:", text: "Early withdrawal can result in reduced interest or fees." },
        ].map((item, i) => (
          <p key={i} style={{ fontSize: 15, lineHeight: "26px", color: C.body, margin: "0 0 12px" }}><strong>{item.label}</strong> {item.text}</p>
        ))}

        <AnnotationPanel id="saverTip" show={showLayers} />
        <div style={{ background: C.greenBg, border: `1px solid ${C.greenBorder}`, borderRadius: 8, padding: "14px 16px", marginBottom: 28 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.green, marginBottom: 4 }}>Saver-savvy tip</div>
          <div style={{ fontSize: 14, lineHeight: "22px", color: C.body }}>If you're depositing less than S$20,000, most promotional FD rates won't apply. Consider a <Link>high-interest savings account</Link> instead. Looking for stocks or other assets? <Link>Find the best online brokerage account</Link> with us.</div>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.black, margin: "0 0 12px" }}>Related reads</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 32 }}>
          {["When Are Fixed Deposits Better Than Singapore Savings Bonds?", "Best Alternatives to Fixed Deposit Accounts", "Fixed Deposits vs. Endowment Plans vs. Cash Management Accounts", "Best High-Interest Savings Accounts in Singapore", "How Much Money Should You Put in a Fixed Deposit?"].map((t, i) => <Link key={i} style={{ fontSize: 14, lineHeight: "22px" }}>{t}</Link>)}
        </div>

        <AnnotationPanel id="compareCTA" show={showLayers} />
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
