/**
 * ═══════════════════════════════════════════════════════════════
 *  DEKH LE! INDIA — SURGICAL PATCH  (content-only, no redesign)
 * ═══════════════════════════════════════════════════════════════
 *
 *  HOW TO USE THIS FILE
 *  ────────────────────
 *  Each change is a clearly labelled FIND → REPLACE block.
 *  Open the file listed in "FILE:", search for FIND exactly
 *  (Ctrl+F / Cmd+F in VS Code), paste the REPLACE content.
 *  Nothing else in the codebase is touched.
 *
 *  FILE MOST CHANGES LIVE IN:  app/page.jsx  (or pages/index.jsx)
 * ═══════════════════════════════════════════════════════════════
 */


/* ─────────────────────────────────────────────────────────────
   CHANGE 1 — LANGUAGE UPDATE
   FILE: app/page.jsx
   Remove "Tamil", rewrite language string everywhere it appears.
   ───────────────────────────────────────────────────────────── */

// ── 1A: Film meta tags (the pill row below the pillars) ─────
// FIND:
"Hindi & English"
// REPLACE WITH:
"English, Hindi, Odia, Assamese & other Indian languages"

// ── 1B: Hero stats / languages strip (if you added it in v2) ─
// FIND the full language list line:
{["Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "English"].map(l => (
  <span key={l} className="lang-tag">{l}</span>
))}
// REPLACE WITH:
{["English", "Hindi", "Odia", "Assamese", "+ other Indian languages"].map(l => (
  <span key={l} className="lang-tag">{l}</span>
))}

// ── 1C: film-meta pill (second occurrence, plain string) ─────
// FIND:
"Hindi · Tamil · Telugu · Kannada · Malayalam · Bengali · English"
// REPLACE WITH:
"English · Hindi · Odia · Assamese · + other Indian languages"

// ── 1D: Timeline / Behind-the-scenes mention (if present) ────
// FIND:
"in Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali and English"
// REPLACE WITH:
"in English, Hindi, Odia, Assamese and other Indian languages"


/* ─────────────────────────────────────────────────────────────
   CHANGE 2 — HERO ANNOUNCEMENT (bold + highlighted)
   FILE: app/page.jsx
   The "Streaming on JioHotstar" line in the hero needs to become
   the bold announcement. Two places to update:
   ───────────────────────────────────────────────────────────── */

// ── 2A: The small text line inside hero-content ──────────────
// FIND:
<p className="hero-streaming">Streaming on JioHotstar · June 2026</p>
// REPLACE WITH:
<p className="hero-streaming">
  <strong style={{ color: "var(--accent2)", fontSize: "1rem", letterSpacing: "0.06em" }}>
    🎬 Releasing on Jio Hotstar — June 2026
  </strong>
</p>

// ── 2B: The announcement banner text (if you have the banner) ─
// FIND:
<strong>Releasing on Jio Hotstar</strong>
<span className="announcement-divider">·</span>
<span>June 2026</span>
// REPLACE WITH:  (makes it a single bold phrase, no divider)
<strong style={{ fontSize: "1rem", letterSpacing: "0.04em" }}>
  🎬 Releasing on Jio Hotstar — June 2026
</strong>

// ── 2C: Nav link text (if present) ───────────────────────────
// FIND:
"Streaming on JioHotstar"
// REPLACE WITH:
"Releasing on Jio Hotstar — June 2026"


/* ─────────────────────────────────────────────────────────────
   CHANGE 3 — SECTION DESCRIPTION UPDATE
   FILE: app/page.jsx  →  section id="story" (The Film section)
   ───────────────────────────────────────────────────────────── */

// FIND (exact existing paragraph):
Dekh Le! India chronicles the extraordinary journey of India's first blind women's national cricket team — from remote villages across six states to the World Games at Edgbaston, Birmingham.
// REPLACE WITH:
Dekh Le! India chronicles the extraordinary journey of India's first blind women's national cricket team — from remote villages across different states of India to the World Games at Edgbaston, UK.

// NOTE: If this is a JSX string, match the JSX exactly, e.g.:
// FIND:
<p className="section-body">
  <em>Dekh Le! India</em> chronicles the extraordinary journey of India's
  first blind women's national cricket team — from remote villages across six states
  to the World Games at Edgbaston, Birmingham.
</p>
// REPLACE WITH:
<p className="section-body">
  <em>Dekh Le! India</em> chronicles the extraordinary journey of India's
  first blind women's national cricket team — from remote villages across
  different states of India to the World Games at Edgbaston, UK.
</p>


/* ─────────────────────────────────────────────────────────────
   CHANGE 4 — STATES UPDATE  (Pillar 01)
   FILE: app/page.jsx  →  pillars array or JSX, first pillar
   ───────────────────────────────────────────────────────────── */

// ── 4A: If pillars are a JS array (const PILLARS or inline) ──
// FIND:
{ n: "01", title: "6 States, One Dream", body: "We travelled across Odisha, Maharashtra, Karnataka, Kerala, Jharkhand, and Uttar Pradesh — seeking players whose families had never seen them play." },
// REPLACE WITH:
{ n: "01", title: "10 States, One Dream", body: "Odisha, Maharashtra, Karnataka, Kerala, Andhra Pradesh, Telangana, Assam, Madhya Pradesh, Delhi and Gujarat — seeking players whose families had never seen them play." },

// ── 4B: If pillars are inline JSX, find the h3 + p pair ──────
// FIND:
<h3>6 States, One Dream</h3>
<p>We travelled across Odisha, Maharashtra, Karnataka, Kerala, Jharkhand, and Uttar Pradesh — seeking players whose families had never seen them play.</p>
// REPLACE WITH:
<h3>10 States, One Dream</h3>
<p>Odisha, Maharashtra, Karnataka, Kerala, Andhra Pradesh, Telangana, Assam, Madhya Pradesh, Delhi and Gujarat — seeking players whose families had never seen them play.</p>

// ── 4C: Impact stats — "6 States Covered" counter ────────────
// FIND:
{ icon: "🗺️", n: "6",    l: "States Covered" },
// REPLACE WITH:
{ icon: "🗺️", n: "10",   l: "States Covered" },

// ── 4D: "Behind the Scenes" / timeline mentions of "six states"
// FIND:
"We crisscrossed six states tracking down blind women cricketers"
// REPLACE WITH:
"We crisscrossed ten states tracking down blind women cricketers"

// FIND:
"18 months. 6 states. One crew."
// REPLACE WITH:
"2.5 years. 10 states. One crew."


/* ─────────────────────────────────────────────────────────────
   CHANGE 5 — FILMING UPDATE  (Pillar 02)
   FILE: app/page.jsx  →  pillars array or JSX, second pillar
   ───────────────────────────────────────────────────────────── */

// ── 5A: If pillars are a JS array ────────────────────────────
// FIND:
{ n: "02", title: "500 Days of Filming", body: "18 months embedded with the team. On trains, in hostels, on dusty grounds. Every moment captured with two cameras and relentless dedication." },
// REPLACE WITH:
{ n: "02", title: "2.5 Years of Filmmaking", body: "110 hours of footage captured across 10 states — on trains, in hostels, on dusty grounds — edited to 70 minutes of inspiration." },

// ── 5B: If inline JSX ────────────────────────────────────────
// FIND:
<h3>500 Days of Filming</h3>
<p>18 months embedded with the team. On trains, in hostels, on dusty grounds. Every moment captured with two cameras and relentless dedication.</p>
// REPLACE WITH:
<h3>2.5 Years of Filmmaking</h3>
<p>110 hours of footage captured across 10 states — on trains, in hostels, on dusty grounds — edited to 70 minutes of inspiration.</p>

// ── 5C: Behind-the-scenes / timeline "18 months" mentions ────
// FIND:
"18 months embedded with the team"
// REPLACE WITH:
"2.5 years embedded with the team"

// FIND:
"18 months of editing, colour grading, and music composition later"
// REPLACE WITH:
"2.5 years of filming, editing, colour grading, and music composition later"

// ── 5D: Film meta pills row ───────────────────────────────────
// FIND:
"60 Minutes"
// REPLACE WITH:
"70 Minutes"


/* ─────────────────────────────────────────────────────────────
   CHANGE 6 — DONATION SECTION
   FILE: app/page.jsx  →  section id="donate" or cta-section
   Add the new line ABOVE the donate button.
   ───────────────────────────────────────────────────────────── */

// ── 6A: If using the btn-gold / Donate Now button ────────────
// FIND:
<a href="/contribute" className="btn-gold">💛 Donate Now</a>
// REPLACE WITH:
<p style={{ fontSize: "0.95rem", color: "var(--white)", fontStyle: "italic", marginBottom: "1rem", lineHeight: "1.6" }}>
  If you watched the film and loved it, you can do your bit and contribute here.
</p>
<a href="/contribute" className="btn-gold">💛 Donate Now</a>

// ── 6B: If using the "Contribute Now" button in donation-banner
// FIND:
<a href="/contribute" className="btn-gold">💛 Contribute Now</a>
// REPLACE WITH:
<p style={{ fontSize: "0.9rem", color: "var(--white)", fontStyle: "italic", marginBottom: "0.85rem", lineHeight: "1.65", borderLeft: "2px solid var(--accent)", paddingLeft: "0.85rem" }}>
  If you watched the film and loved it, you can do your bit and contribute here.
</p>
<a href="/contribute" className="btn-gold">💛 Contribute Now</a>

// ── 6C: Razorpay button (contribute/page.jsx) — add above cp-pay-btn
// FIND:
<button className="cp-pay-btn" onClick={handlePay} disabled={loading}>
// REPLACE WITH:
<p style={{ fontSize: "0.88rem", color: "#f0eee8", fontStyle: "italic", marginBottom: "0.85rem", lineHeight: "1.6" }}>
  If you watched the film and loved it, you can do your bit and contribute here.
</p>
<button className="cp-pay-btn" onClick={handlePay} disabled={loading}>


/* ─────────────────────────────────────────────────────────────
   CHANGE 7 — SIZZLE REEL SECTION: move immediately after hero
   FILE: app/page.jsx
   Cut the existing sizzle/watch cards block and paste it right
   after the closing </section> tag of the hero.
   ───────────────────────────────────────────────────────────── */

// ── 7A: ADD this mini sizzle strip right after </hero section>:
// PASTE AFTER:   </section>  {/* end of hero */}
// ─────────────────────────────────────────────────────────────

{/* ── SIZZLE STRIP — appears immediately after hero ── */}
<div style={{
  background: "linear-gradient(90deg, #081629 0%, #0d2044 50%, #081629 100%)",
  borderTop: "1px solid rgba(200,168,75,0.18)",
  borderBottom: "1px solid rgba(200,168,75,0.18)",
  padding: "2rem 1.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.5rem",
  flexWrap: "wrap",
}}>
  <p style={{ fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8a99b0" }}>
    Watch First
  </p>
  <a
    href="https://www.youtube.com/watch?v=h_JVTDhF6RY"
    target="_blank"
    rel="noreferrer"
    style={{
      display: "inline-flex", alignItems: "center", gap: "0.5rem",
      background: "#f0eee8", color: "#050d1a",
      padding: "0.65rem 1.4rem", borderRadius: "2px",
      fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.04em",
      transition: "all 0.3s",
    }}
  >
    🎬 Watch Sizzle Reel
  </a>
  <a
    href="https://www.youtube.com/watch?v=mgFde16-J7c"
    target="_blank"
    rel="noreferrer"
    style={{
      display: "inline-flex", alignItems: "center", gap: "0.5rem",
      border: "1px solid rgba(240,238,232,0.3)", color: "#f0eee8",
      padding: "0.65rem 1.4rem", borderRadius: "2px",
      fontSize: "0.82rem", letterSpacing: "0.04em",
      transition: "all 0.3s",
    }}
  >
    🎵 Watch Film Song
  </a>
</div>


/* ─────────────────────────────────────────────────────────────
   CHANGE 8 — CLEANUP
   ───────────────────────────────────────────────────────────── */

// ── 8A: Remove "2024" from film meta pills ────────────────────
// FIND (exact string in the .map() or JSX):
"Documentary60 MinutesHindi & English2024India"
// In JSX this will be individual <span> elements. Find and DELETE:
<span className="meta-tag">2024</span>
// or in array form, remove:
"2024",

// ── 8B: Remove "2024" from footer ────────────────────────────
// FIND:
Documentary Film · 2024
// REPLACE WITH:
Documentary Film · 2026

// ── 8C: Fix MLOFF → MLIFF ────────────────────────────────────
// FIND (in AWARDS array or JSX):
"MLOFF Manchester"
// REPLACE WITH:
"MLIFF Manchester"

// Also fix the display label if separate:
// FIND:
org: "MLOFF Manchester"
// REPLACE WITH:
org: "MLIFF Manchester"

// ── 8D: Remove "Kriti Film Club" — TWO places ─────────────────

// Place 1: AWARDS array (the award card entry)
// FIND AND DELETE the entire object:
{ icon: "🎪", title: "Delhi Premiere", org: "Kriti Film Club Delhi", year: "2026", type: "Premiere" },

// Place 2: Notable Screenings strip (impact section)
// FIND AND DELETE:
<span className="screening-tag">📍 Kriti Film Club · Delhi</span>
// or plain text version:
📍 Kriti Film Club · Delhi Premiere
// or in an array, remove:
"Kriti Film Club · Delhi",


/* ═══════════════════════════════════════════════════════════════
   QUICK REFERENCE — ALL CHANGES AT A GLANCE
   ═══════════════════════════════════════════════════════════════

   #  │ File             │ What changes
   ───┼──────────────────┼─────────────────────────────────────────
   1  │ page.jsx         │ Language string: remove Tamil, add Odia/Assamese
   2  │ page.jsx         │ Hero line: bold "Releasing on Jio Hotstar — June 2026"
   3  │ page.jsx         │ Section description: "six states" → "different states of India", "Birmingham" → "UK"
   4  │ page.jsx         │ Pillar 01: "6 States" → "10 States" + new state list
   4  │ page.jsx         │ Impact stat: 6 → 10 states covered
   4  │ page.jsx         │ Behind-scenes: "six states" → "ten states"
   5  │ page.jsx         │ Pillar 02: "500 Days" → "2.5 Years of Filmmaking" + new body
   5  │ page.jsx         │ "60 Minutes" → "70 Minutes" in meta pills
   5  │ page.jsx         │ "18 months" references → "2.5 years"
   6  │ page.jsx         │ Donate CTA: add italic line above button
   6  │ contribute/page  │ Same line above Razorpay button
   7  │ page.jsx         │ Add sizzle strip div immediately after hero </section>
   8  │ page.jsx         │ Delete <span>"2024"</span> from meta pills
   8  │ page.jsx/footer  │ "Documentary Film · 2024" → "Documentary Film · 2026"
   8  │ page.jsx         │ "MLOFF" → "MLIFF"
   8  │ page.jsx         │ Delete Kriti Film Club from awards array + screenings strip
   ═══╧══════════════════╧═════════════════════════════════════════
*/
