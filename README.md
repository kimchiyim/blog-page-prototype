# SingSaver Blog Cross-Sell IA Prototype

Interactive prototype for the **SingSaver Blog Cross-Selling Information Architecture** project — Pattern 1 (Decision/Comparison) blog template, using the Fixed Deposit rates article as the reference case.

🔒 **Password Protected** — Enter the shared password to view.

## Quick Start

**Option A: Open directly**
Just open `index.html` in any modern browser. No build step needed.

**Option B: GitHub Pages**
1. Push this repo to GitHub
2. Go to **Settings → Pages → Source: main branch, / (root)**
3. Your prototype will be live at `https://<username>.github.io/<repo-name>/`

## What This Prototype Shows

### 3-Layer Bridge Model
A content structure that answers the user's question first, then naturally expands their consideration set, and finally routes them to the right product.

| Layer | Purpose | Components |
|-------|---------|------------|
| **Layer 1** — Answer the Question | Deliver what the user searched for | Quick Summary, Comparison Table, Bank Breakdowns |
| **Decision Guide** _(the fork)_ | Route users based on their situation | Interactive accordion between L1 and L2 |
| **Layer 2** — Expand Consideration | Surface alternatives they didn't search for | Alternatives section, Expert Take |
| **Layer 3** — Convert | Drive action on the right product | Saver-Savvy Tips, Compare CTAs, Related Reads |

### New Components (5 total)
1. **Quick Summary** — At-a-glance best picks box at top of article
2. **Reader Orientation** — Scope/freshness/audience context block _(not shown in this version)_
3. **Decision Guide** — "Which option suits you?" interactive fork
4. **Alternatives Bridge** — FD vs Savings / SSB / Investments / Priority Banking
5. **Smart Tips** — Saver-Savvy Tip (Variant A, green) + Expert Take (Variant B, teal)

### UX Layer Annotations
Toggle the **"Show/Hide UX Layers"** button (bottom-right) to see dashed labels marking which layer each section belongs to.

## Design System

Built with **MHG Alpha Design System** tokens:
- **Font:** Albert Sans (Medium 500, SemiBold 600, Bold 700, ExtraBold 800)
- **Colors:** Primary `#212121`, Secondary `#424242`, Brand `#0d7a9f`, Gray scale `#f7f8fa` → `#111`
- **Components:** Styled to match live [singsaver.com.sg/banking/blog/best-fixed-deposit-singapore](https://www.singsaver.com.sg/banking/blog/best-fixed-deposit-singapore)

## File Structure

```
├── index.html          ← Open this (standalone, no build needed)
├── src/
│   └── App.jsx         ← Source React component (for reference)
├── README.md           ← You are here
└── .gitignore
```

## Tech Stack

- React 18 (CDN)
- Babel Standalone (in-browser JSX transform)
- Zero dependencies, zero build step
- Works offline after first load (fonts cached)

## Context

This prototype is part of a broader UX initiative to improve cross-selling within SingSaver's blog content. The full project covers 3 blog patterns:

1. **Pattern 1: Decision/Comparison** ← _This prototype_
2. **Pattern 2: Educational/Explainer** — _(Planned)_
3. **Pattern 3: Lifestyle/Promo** — _(Planned)_

---

_Internal prototype — MHG Alpha Design System · Feb 2026_
