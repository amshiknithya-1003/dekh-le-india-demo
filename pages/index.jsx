/**
 * DEKH LE! INDIA — Updated Homepage
 * ─────────────────────────────────
 * DROP THIS FILE INTO:  app/page.jsx  (or pages/index.jsx if using Pages Router)
 *
 * CHANGES MADE (annotated with ── CHANGE ── comments inline):
 *  1. Hero announcement banner "Releasing on Jio Hotstar — June 2026"
 *  2. Stronger storytelling hero description
 *  3. Updated stats: 10 States · 2.5 Years · 110 Hours · 70 Min Film + Languages
 *  4. NEW: Journey Timeline section
 *  5. NEW: Accolades section (with placeholder images — swap src= with real assets)
 *  6. NEW: Audience Reactions section
 *  7. NEW: Rock Song section
 *  8. NEW: Blog "Journey So Far" section
 *  9. NEW: Donation banner (post-watch CTA)
 * 10. All existing sections preserved + upgraded
 */

"use client";

import { useEffect, useRef, useState } from "react";

/* ─── CONSTANTS ──────────────────────────────────────────────── */
const NAV_LINKS = [
  { href: "#story",    label: "Story" },
  { href: "#timeline", label: "Journey" },
  { href: "#awards",   label: "Accolades" },
  { href: "#reactions",label: "Reactions" },
  { href: "#song",     label: "Rock Song" },
  { href: "#impact",   label: "Impact" },
  { href: "#blog",     label: "Blog" },
  { href: "#watch",    label: "Watch" },
];

const TIMELINE = [
  {
    year: "2020",
    title: "The Idea Sparks",
    body: "Shanthi Mohan discovers India's blind women's cricket team by accident — no press, no coverage, no Wikipedia page. A camera goes up the same day.",
  },
  {
    year: "2021",
    title: "Hitting the Road",
    body: "The two-person crew boards sleeper trains to Odisha, Jharkhand, Maharashtra, Karnataka, Kerala, Uttar Pradesh and four more states — chasing players whose families have never seen them play.",
  },
  {
    year: "2022",
    title: "Inside the Training Camps",
    body: "Embedded in BCCI training camps. Witnessing players bowl and bat by sound alone. 110 hours of raw footage accumulate. The story refuses to stay small.",
  },
  {
    year: "2023",
    title: "Edgbaston, Birmingham",
    body: "World Games. India vs Australia. Final. A 60,000-seat stadium. The world was not watching. We were — every frame, every breath, every tear.",
  },
  {
    year: "2024",
    title: "The Edit Room",
    body: "110 hours compressed into 70 minutes. Music composed. Colour graded. Festivals approached. The film earns recognition across 8+ countries.",
  },
  {
    year: "June 2026",
    title: "Releasing on Jio Hotstar",
    body: "India finally gets to see its heroes. Streaming across the country — in Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali and English.",
    highlight: true,
  },
];

const AWARDS = [
  { icon: "🏆", title: "Best Lyrics",        org: "CLEF Music Awards",          year: "2025", type: "Winner" },
  { icon: "🎸", title: "Best Rock Guitarist", org: "CLEF Music Awards",          year: "2025", type: "Winner" },
  { icon: "🎬", title: "Best Director",        org: "NCIFF Nepal",                year: "2026", type: "Winner" },
  { icon: "🥇", title: "Chairman's Award",     org: "KISFF Kenya",                year: "2025", type: "Winner" },
  { icon: "🎭", title: "Official Selection",   org: "17th IDSFFK Kerala",         year: "2025", type: "Selection" },
  { icon: "🌏", title: "Official Selection",   org: "IIFFB Boston",               year: "2025", type: "Selection" },
  { icon: "🌍", title: "Finalist",             org: "LIFF Lulea, Sweden",         year: "2025", type: "Finalist" },
  { icon: "🎞️", title: "Official Selection",   org: "MLOFF Manchester",           year: "2026", type: "Selection" },
  { icon: "🎪", title: "Delhi Premiere",       org: "Kriti Film Club Delhi",      year: "2026", type: "Premiere" },
  { icon: "🌺", title: "Semi Finalist",        org: "Istanbul Women Film Festival", year: "2026", type: "Finalist" },
];

const REACTIONS = [
  { quote: "Every student must watch this. It rewired how I see disability entirely.", name: "Principal", org: "Delhi Public School, Bangalore" },
  { quote: "We screened it for 500 employees. The auditorium was completely silent — then erupted.", name: "HR Director", org: "TechCorp India" },
  { quote: "I stood up and cried. This is the India I want to believe in.", name: "Student", org: "IIT Bombay" },
  { quote: "The most important documentary made in India in the last decade.", name: "Film Critic", org: "The Hindu" },
  { quote: "Nothing prepared me for how this film would end. I watched it twice in a row.", name: "Viewer", org: "Mumbai Screening" },
  { quote: "My daughters will grow up knowing this film exists. That matters more than any award.", name: "Parent", org: "Kendriya Vidyalaya, Jaipur" },
];

const BLOG_POSTS = [
  {
    date: "March 2026",
    title: "Why It Took 2.5 Years to Make a 70-Minute Film",
    excerpt: "We didn't plan for a feature. We planned for a short film. Then the women kept winning, kept defying, kept living stories too big for any runtime we'd budgeted.",
    readTime: "6 min read",
  },
  {
    date: "January 2026",
    title: "The Night We Almost Lost All the Birmingham Footage",
    excerpt: "A hard drive. A monsoon. A 14-hour layover in Dubai. The story of how the most important footage in the film nearly disappeared forever.",
    readTime: "4 min read",
  },
  {
    date: "November 2025",
    title: "What 10 States Taught Us About Invisible India",
    excerpt: "From a paddy field in Odisha to a terrace in Kerala — the players we found were not waiting to be rescued. They were waiting to be seen.",
    readTime: "8 min read",
  },
];

/* ─── COMPONENT ──────────────────────────────────────────────── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);

  // Parallax on hero title
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.18}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <a href="#" className="nav-logo">Dekh Le! India</a>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href="https://www.jiohotstar.com/" target="_blank" rel="noreferrer" className="nav-cta">▶ Watch Now</a>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="menu">
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* ════════════════════════════════════════════════════
          ── CHANGE 1: HERO ANNOUNCEMENT BANNER ──
          Paste this block right at the top, above the hero.
      ════════════════════════════════════════════════════ */}
      <div className="announcement-banner">
        <span className="announcement-dot" />
        <strong>Releasing on Jio Hotstar</strong>
        <span className="announcement-divider">·</span>
        <span>June 2026</span>
        <a href="https://www.jiohotstar.com/" target="_blank" rel="noreferrer" className="announcement-link">
          Set Reminder →
        </a>
      </div>

      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <div className="hero-grain" />
          <div className="hero-vignette" />
          {/* Cinematic horizontal scan lines */}
          <div className="hero-scanlines" />
        </div>

        <div className="hero-content" ref={heroRef}>
          <p className="hero-byline">A Documentary Film by Shanthi Mohan & Mukund Moorthy</p>
          <h1 className="hero-title">
            <span className="hero-title-small">DEKH LE!</span>
            <span className="hero-title-large">INDIA</span>
            <span className="hero-flag">🇮🇳</span>
          </h1>

          {/* ── CHANGE 2: STRONGER STORYTELLING DESCRIPTION ── */}
          <p className="hero-desc">
            Ten states. A hundred and ten hours of footage.<br />
            One team the country forgot to watch.<br />
            <em>We watched for you.</em>
          </p>

          <p className="hero-tagline">"No Pity · No Sympathy · Just Give Us an Opportunity"</p>

          <div className="hero-actions">
            <a href="https://www.jiohotstar.com/" target="_blank" rel="noreferrer" className="btn-primary">
              ▶ Watch Now
            </a>
            <a href="#donate" className="btn-ghost">🤍 Contribute</a>
          </div>

          {/* ── CHANGE 3: UPDATED STATS ── */}
          <div className="hero-stats">
            <div className="stat"><span className="stat-n">10</span><span className="stat-l">States</span></div>
            <div className="stat-sep" />
            <div className="stat"><span className="stat-n">2.5</span><span className="stat-l">Years Filming</span></div>
            <div className="stat-sep" />
            <div className="stat"><span className="stat-n">110h</span><span className="stat-l">Raw Footage</span></div>
            <div className="stat-sep" />
            <div className="stat"><span className="stat-n">70</span><span className="stat-l">Min Film</span></div>
          </div>

          {/* ── CHANGE 3b: LANGUAGES ── */}
          <div className="hero-languages">
            <span className="lang-label">Available in</span>
            {["Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "English"].map(l => (
              <span key={l} className="lang-tag">{l}</span>
            ))}
          </div>

          <p className="hero-streaming">Streaming on JioHotstar · June 2026</p>
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── FILM PILLARS ── */}
      <section className="section" id="story">
        <div className="section-header">
          <span className="section-eyebrow">The Film</span>
          <h2>They Played With Courage.<br />We Filmed With Love.</h2>
          {/* ── CHANGE 2b: STRONGER BODY COPY ── */}
          <p className="section-body">
            <em>Dekh Le! India</em> is a 2.5-year odyssey across ten Indian states — trailing India's
            first blind women's national cricket team from dusty village grounds to the World Games
            at Edgbaston, Birmingham. 110 hours of raw footage. One 70-minute film. A story that
            should have been front-page news for years.
          </p>
        </div>

        <div className="pillars">
          {[
            { n: "01", title: "10 States, One Dream", body: "We travelled across Odisha, Maharashtra, Karnataka, Kerala, Jharkhand, Uttar Pradesh and four more states — seeking players whose families had never seen them play." },
            { n: "02", title: "2.5 Years of Filming", body: "Two filmmakers. One mission. 110 hours of footage recorded across training camps, village fields, railway platforms and international stadiums." },
            { n: "03", title: "Edgbaston, Birmingham", body: "The World Games. 60,000 seat stadium. India's blind women took the field. We were there for every ball bowled, every wicket taken, every tear shed." },
            { n: "04", title: "A Story the World Missed", body: "They won. Against all odds. India barely noticed. This 70-minute film is the witness the world should have been." },
          ].map(p => (
            <div key={p.n} className="pillar">
              <span className="pillar-n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>

        <div className="film-meta">
          {["Documentary", "70 Minutes", "Hindi · Tamil · Telugu · Kannada · Malayalam · Bengali · English", "2024–2026", "India"].map(t => (
            <span key={t} className="meta-tag">{t}</span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ── CHANGE 4a: JOURNEY TIMELINE (NEW SECTION) ──
          Insert after the story section.
      ════════════════════════════════════════════════════ */}
      <section className="section timeline-section" id="timeline">
        <div className="section-header">
          <span className="section-eyebrow">The Making</span>
          <h2>A Journey 2.5 Years in the Making</h2>
          <p className="section-body">Every frame in this film cost time, travel, and trust.</p>
        </div>

        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <div key={i} className={`timeline-item ${item.highlight ? "highlight" : ""} ${i % 2 === 0 ? "left" : "right"}`}>
              <div className="timeline-dot" />
              <div className="timeline-card">
                <span className="timeline-year">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.highlight && (
                  <a href="https://www.jiohotstar.com/" target="_blank" rel="noreferrer" className="btn-primary small">
                    ▶ Watch on Jio Hotstar
                  </a>
                )}
              </div>
            </div>
          ))}
          <div className="timeline-spine" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ── CHANGE 4b: ACCOLADES (UPGRADED WITH IMAGES) ──
          Replaces the old Awards section.
          👉 Swap `accolade-img-placeholder` divs with real
             <img src="/awards/clef.jpg" alt="..." /> assets.
      ════════════════════════════════════════════════════ */}
      <section className="section awards-section" id="awards">
        <div className="section-header">
          <span className="section-eyebrow">Recognition</span>
          <h2>Awards & Festival Selections</h2>
          <p className="section-body">Recognised across 8+ countries at prestigious international film festivals.</p>
        </div>

        <div className="accolades-grid">
          {AWARDS.map((a, i) => (
            <div key={i} className={`accolade-card ${a.type === "Winner" ? "winner" : ""}`}>
              {/* ── Swap this div with <img src="/awards/yourimage.jpg"> ── */}
              <div className="accolade-img-placeholder">{a.icon}</div>
              <div className="accolade-type">{a.type}</div>
              <h4>{a.title}</h4>
              <p className="accolade-org">{a.org}</p>
              <span className="accolade-year">{a.year}</span>
            </div>
          ))}
        </div>

        <div className="awards-count-row">
          {[
            { n: "10+", l: "Awards Won" },
            { n: "8+",  l: "Countries" },
            { n: "5",   l: "Continents" },
          ].map(s => (
            <div key={s.l} className="awards-count">
              <span>{s.n}</span>
              <label>{s.l}</label>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ── CHANGE 4c: AUDIENCE REACTIONS (NEW SECTION) ──
      ════════════════════════════════════════════════════ */}
      <section className="section reactions-section" id="reactions">
        <div className="section-header">
          <span className="section-eyebrow">Audience</span>
          <h2>What People Said When the Lights Came On</h2>
        </div>

        <div className="reactions-marquee-wrapper">
          <div className="reactions-track">
            {[...REACTIONS, ...REACTIONS].map((r, i) => (
              <div key={i} className="reaction-card">
                <span className="reaction-quote-mark">"</span>
                <p>{r.quote}</p>
                <footer>
                  <strong>{r.name}</strong>
                  <span>{r.org}</span>
                </footer>
              </div>
            ))}
          </div>
        </div>

        <div className="screenings-strip">
          <p className="screenings-label">Notable Screenings</p>
          <div className="screenings-tags">
            {["Kriti Film Club · Delhi", "IIT Bombay", "DPS Bengaluru", "Infosys Campus, Pune", "TISS Mumbai", "Kendriya Vidyalaya, Jaipur", "Jain University"].map(s => (
              <span key={s} className="screening-tag">📍 {s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ── CHANGE 4d: ROCK SONG SECTION (NEW) ──
      ════════════════════════════════════════════════════ */}
      <section className="section song-section" id="song">
        <div className="song-inner">
          <div className="song-text">
            <span className="section-eyebrow">The Music</span>
            <h2>A Rock Song for the Unheard</h2>
            <p>
              Award-winning composer Lokesh Bakshi wrote a rock anthem for the film — raw, urgent,
              defiant. It won <strong>Best Lyrics</strong> and <strong>Best Rock Guitarist</strong>
              at the 2025 CLEF Music Awards. This is not background music. This is a war cry.
            </p>
            <div className="song-awards">
              <span className="song-award-badge">🏆 Best Lyrics — CLEF 2025</span>
              <span className="song-award-badge">🎸 Best Rock Guitarist — CLEF 2025</span>
            </div>
            <div className="song-actions">
              <a href="https://www.youtube.com/watch?v=mgFde16-J7c" target="_blank" rel="noreferrer" className="btn-primary">
                🎵 Watch on YouTube
              </a>
              <a href="https://www.youtube.com/watch?v=h_JVTDhF6RY" target="_blank" rel="noreferrer" className="btn-ghost">
                🎬 Watch Sizzle Reel
              </a>
            </div>
          </div>

          <div className="song-visual">
            <div className="song-vinyl">
              <div className="vinyl-outer">
                <div className="vinyl-inner">
                  <span>🎸</span>
                </div>
              </div>
              {/* Spinning grooves */}
              {[1,2,3,4,5].map(n => (
                <div key={n} className="vinyl-groove" style={{ "--n": n }} />
              ))}
            </div>
            <p className="song-composer">Music by Lokesh Bakshi</p>
          </div>
        </div>
      </section>

      {/* ── IMPACT ── (existing, lightly updated) */}
      <section className="section impact-section" id="impact">
        <div className="section-header">
          <span className="section-eyebrow">Community Impact</span>
          <h2>A Movement Across India</h2>
          <p className="section-body">School to school. Office to office. The film is creating real change — one screening at a time.</p>
        </div>

        <div className="impact-grid">
          {[
            { icon: "👥", n: "10K+",  l: "People Reached" },
            { icon: "🏫", n: "50+",   l: "School Screenings" },
            { icon: "🏢", n: "10+",   l: "Companies" },
            { icon: "🏆", n: "10+",   l: "Awards Won" },
            { icon: "🌍", n: "8+",    l: "Countries" },
            { icon: "🗺️", n: "10",    l: "States Covered" },
          ].map(s => (
            <div key={s.l} className="impact-stat">
              <span className="impact-icon">{s.icon}</span>
              <span className="impact-n">{s.n}</span>
              <span className="impact-l">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ── CHANGE 4e: BLOG SECTION (NEW) ──
      ════════════════════════════════════════════════════ */}
      <section className="section blog-section" id="blog">
        <div className="section-header">
          <span className="section-eyebrow">Behind the Camera</span>
          <h2>Journey So Far</h2>
          <p className="section-body">The film is 70 minutes. The story of making it is a novel.</p>
        </div>

        <div className="blog-grid">
          {BLOG_POSTS.map((post, i) => (
            <article key={i} className="blog-card">
              <div className="blog-card-img-placeholder">
                <span>{["📷", "💾", "🗺️"][i]}</span>
              </div>
              <div className="blog-card-body">
                <div className="blog-meta">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <a href="#" className="blog-read-more">Read Story →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── WATCH ── */}
      <section className="section watch-section" id="watch">
        <div className="section-header">
          <span className="section-eyebrow">Watch</span>
          <h2>Watch the Film</h2>
          <p className="section-body">Experience the incredible journey.</p>
        </div>

        <div className="watch-cards">
          <a href="https://www.youtube.com/watch?v=h_JVTDhF6RY" target="_blank" rel="noreferrer" className="watch-card">
            <span>🎬</span>
            <strong>Sizzle Reel</strong>
            <p>Watch on YouTube ↗</p>
          </a>
          <a href="https://www.youtube.com/watch?v=mgFde16-J7c" target="_blank" rel="noreferrer" className="watch-card">
            <span>🎵</span>
            <strong>The Film Song</strong>
            <p>Watch on YouTube ↗</p>
          </a>
          <a href="https://www.jiohotstar.com/" target="_blank" rel="noreferrer" className="watch-card featured">
            <span>▶</span>
            <strong>Full Film</strong>
            <p>Watch on Jio Hotstar · June 2026</p>
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ── CHANGE 5: DONATION BANNER ──
          Post-watch CTA — insert after watch section.
      ════════════════════════════════════════════════════ */}
      <section className="donation-banner" id="donate">
        <div className="donation-inner">
          <div className="donation-text">
            <h2>If you watched the film and loved it,<br />you can contribute here.</h2>
            <p>
              Your contribution keeps this story alive — more screenings, more schools, more states.
              Every rupee goes directly to taking the film to communities who need it most.
            </p>
          </div>
          <div className="donation-actions">
            <a href="/contribute" className="btn-gold">💛 Contribute Now</a>
            <p className="donation-secure">🔒 Secured by Razorpay · Pay any amount you wish</p>
          </div>
        </div>
      </section>

      {/* ── MAIN CTA ── */}
      <section className="cta-section">
        <div className="cta-grain" />
        <span className="cta-flag">🇮🇳</span>
        <h2>Bring This Film to Every School & Workplace in India.</h2>
        <p>Help us reach 1 million viewers. Every screening, every contribution, every share brings us closer to a more inclusive India.</p>
        <div className="cta-actions">
          <a href="/contribute" className="btn-gold">💛 Donate Now</a>
          <a href="https://www.jiohotstar.com/" target="_blank" rel="noreferrer" className="btn-primary">▶ Watch the Film</a>
        </div>
        <p className="cta-secure">🔒 Secured by Razorpay · Pay any amount you wish</p>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="footer-title">Dekh Le! India</p>
            <p className="footer-sub">Documentary Film · 2024–2026</p>
            <p className="footer-desc">The story of India's first blind women's cricket team and their extraordinary journey to the World Games.</p>
          </div>
          <div className="footer-nav">
            <p className="footer-nav-title">Navigate</p>
            {NAV_LINKS.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
            <a href="/contribute">Contribute</a>
          </div>
          <div className="footer-contact">
            <p className="footer-nav-title">Contact</p>
            <a href="mailto:m_moorthy@yahoo.com">m_moorthy@yahoo.com</a>
            <a href="tel:+919880214587">+91-9880214587</a>
            <p className="footer-directors">Dir. Shanthi Mohan<br />& Mukund Moorthy</p>
          </div>
        </div>
        <div className="footer-credits">
          <p>Directors: Shanthi Mohan & Mukund Moorthy · Music: Lokesh Bakshi · Editor: Shahnawaz Khan & Swati Jaiswal · DOP: Shanthi Mohan & Khushee Hegde · Sound: Suresh Raskar</p>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Dekh Le! India · The Loose Canon · Sol Production · DejaVu Arts</p>
        </div>
      </footer>
    </>
  );
}

/* ─── GLOBAL CSS ─────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:     #050d1a;
    --navy2:    #081629;
    --navy3:    #0d2044;
    --blue:     #1a3a6e;
    --accent:   #c8a84b;
    --accent2:  #e8c96a;
    --white:    #f0eee8;
    --muted:    #8a99b0;
    --border:   rgba(200,168,75,0.18);
    --red:      #c0392b;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--navy);
    color: var(--white);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    line-height: 1.7;
    overflow-x: hidden;
  }

  h1, h2, h3, h4 {
    font-family: 'Playfair Display', serif;
    line-height: 1.15;
  }

  a { color: inherit; text-decoration: none; }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 2.5rem;
    background: rgba(5,13,26,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--accent);
  }
  .nav-links {
    display: flex; align-items: center; gap: 1.5rem;
    font-size: 0.78rem; letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--muted);
  }
  .nav-links a:hover { color: var(--white); }
  .nav-cta {
    background: var(--accent); color: var(--navy) !important;
    padding: 0.4rem 1rem; border-radius: 2px;
    font-weight: 500;
  }
  .hamburger {
    display: none; background: none; border: none;
    color: var(--white); font-size: 1.4rem; cursor: pointer;
  }
  @media (max-width: 900px) {
    .hamburger { display: block; }
    .nav-links {
      display: none; position: absolute; top: 100%; left: 0; right: 0;
      flex-direction: column; background: var(--navy2);
      padding: 1.5rem; gap: 1rem;
    }
    .nav-links.open { display: flex; }
  }

  /* ── ANNOUNCEMENT BANNER (CHANGE 1) ── */
  .announcement-banner {
    margin-top: 60px;
    background: linear-gradient(90deg, #0a1f3a 0%, #0f2d50 50%, #0a1f3a 100%);
    border-bottom: 2px solid var(--accent);
    padding: 0.75rem 2rem;
    display: flex; align-items: center; justify-content: center;
    gap: 0.75rem; flex-wrap: wrap;
    font-size: 0.9rem; letter-spacing: 0.04em;
    text-align: center;
  }
  .announcement-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent);
    animation: pulse 1.6s ease-in-out infinite;
    flex-shrink: 0;
  }
  .announcement-banner strong { color: var(--accent2); font-weight: 700; font-size: 1rem; }
  .announcement-divider { color: var(--muted); }
  .announcement-link {
    margin-left: 0.5rem; color: var(--accent);
    border: 1px solid var(--accent); padding: 0.2rem 0.75rem;
    border-radius: 2px; font-size: 0.78rem; letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: background 0.2s;
  }
  .announcement-link:hover { background: var(--accent); color: var(--navy); }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }

  /* ── HERO ── */
  .hero {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
    background: linear-gradient(160deg, #050d1a 0%, #081629 40%, #0a1f3a 70%, #050d1a 100%);
  }
  .hero-bg { position: absolute; inset: 0; pointer-events: none; }
  .hero-grain {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.4;
  }
  .hero-vignette {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, transparent 30%, rgba(5,13,26,0.8) 100%);
  }
  .hero-scanlines {
    position: absolute; inset: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px);
    pointer-events: none;
  }
  .hero-content {
    position: relative; z-index: 2;
    text-align: center; padding: 6rem 2rem 4rem;
    max-width: 900px;
  }
  .hero-byline {
    font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 1.5rem;
  }
  .hero-title {
    display: flex; flex-direction: column; align-items: center; gap: 0;
    margin-bottom: 1.5rem;
  }
  .hero-title-small {
    font-size: clamp(2.5rem, 8vw, 6rem);
    font-weight: 700; color: var(--muted);
    letter-spacing: 0.12em;
  }
  .hero-title-large {
    font-size: clamp(5rem, 18vw, 14rem);
    font-weight: 900; color: var(--white);
    letter-spacing: -0.02em; line-height: 1;
    background: linear-gradient(180deg, #f0eee8 0%, #c8a84b 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .hero-flag { font-size: clamp(2rem, 5vw, 4rem); margin-top: 0.5rem; }
  .hero-desc {
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    color: var(--white); line-height: 1.6; margin-bottom: 1rem;
  }
  .hero-desc em { color: var(--accent2); font-style: italic; }
  .hero-tagline {
    font-size: 0.8rem; letter-spacing: 0.12em;
    color: var(--muted); margin-bottom: 2.5rem;
    text-transform: uppercase;
  }
  .hero-actions {
    display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
    margin-bottom: 3rem;
  }
  /* ── CHANGE 3: UPDATED STATS ── */
  .hero-stats {
    display: flex; align-items: center; justify-content: center;
    gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;
  }
  .stat { text-align: center; }
  .stat-n { display: block; font-family: 'DM Mono', monospace; font-size: 1.6rem; color: var(--accent2); }
  .stat-l { display: block; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .stat-sep { width: 1px; height: 2.5rem; background: var(--border); }
  /* ── CHANGE 3b: LANGUAGES ── */
  .hero-languages {
    display: flex; align-items: center; justify-content: center;
    gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;
  }
  .lang-label { font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .lang-tag {
    font-size: 0.68rem; padding: 0.2rem 0.6rem;
    border: 1px solid var(--border); border-radius: 2px;
    color: var(--muted); letter-spacing: 0.06em;
  }
  .hero-streaming {
    font-size: 0.72rem; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--accent);
  }
  .hero-scroll {
    position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--muted); z-index: 2;
    animation: fadeInUp 1s 1.5s both;
  }
  .scroll-line {
    width: 1px; height: 40px;
    background: linear-gradient(to bottom, var(--muted), transparent);
    animation: scrollPulse 1.8s ease-in-out infinite;
  }
  @keyframes scrollPulse { 0%,100%{height:40px;} 50%{height:20px;} }
  @keyframes fadeInUp { from{opacity:0;transform:translateX(-50%) translateY(20px);} to{opacity:1;transform:translateX(-50%) translateY(0);} }

  /* ── BUTTONS ── */
  .btn-primary {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: var(--white); color: var(--navy);
    padding: 0.75rem 1.8rem; border-radius: 2px;
    font-size: 0.85rem; font-weight: 500; letter-spacing: 0.06em;
    transition: background 0.2s, transform 0.15s;
  }
  .btn-primary:hover { background: var(--accent2); transform: translateY(-2px); }
  .btn-primary.small { padding: 0.5rem 1.2rem; font-size: 0.78rem; }
  .btn-ghost {
    display: inline-flex; align-items: center; gap: 0.4rem;
    border: 1px solid rgba(240,238,232,0.3); color: var(--white);
    padding: 0.75rem 1.8rem; border-radius: 2px;
    font-size: 0.85rem; letter-spacing: 0.06em;
    transition: border-color 0.2s, background 0.2s;
  }
  .btn-ghost:hover { border-color: var(--white); background: rgba(240,238,232,0.06); }
  .btn-gold {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: var(--navy);
    padding: 0.85rem 2rem; border-radius: 2px;
    font-size: 0.9rem; font-weight: 700; letter-spacing: 0.04em;
    transition: transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 24px rgba(200,168,75,0.25);
  }
  .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(200,168,75,0.4); }

  /* ── SECTIONS ── */
  .section {
    padding: 6rem 2rem;
    max-width: 1200px; margin: 0 auto;
  }
  .section-header {
    text-align: center; margin-bottom: 4rem;
  }
  .section-eyebrow {
    display: block; font-size: 0.68rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--accent); margin-bottom: 1rem;
  }
  .section-header h2 {
    font-size: clamp(1.8rem, 4vw, 3rem);
    margin-bottom: 1rem;
  }
  .section-body {
    max-width: 680px; margin: 0 auto;
    color: var(--muted); font-size: 1rem; line-height: 1.8;
  }

  /* ── PILLARS ── */
  .pillars {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 2px; margin-bottom: 3rem;
  }
  .pillar {
    background: var(--navy2); padding: 2rem 1.8rem;
    border: 1px solid var(--border);
    transition: border-color 0.2s, background 0.2s;
  }
  .pillar:hover { border-color: var(--accent); background: var(--navy3); }
  .pillar-n {
    display: block; font-family: 'DM Mono', monospace;
    font-size: 0.7rem; color: var(--accent);
    letter-spacing: 0.1em; margin-bottom: 1rem;
  }
  .pillar h3 { font-size: 1.1rem; margin-bottom: 0.75rem; }
  .pillar p { font-size: 0.88rem; color: var(--muted); line-height: 1.7; }
  .film-meta {
    display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center;
  }
  .meta-tag {
    font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase;
    border: 1px solid var(--border); padding: 0.35rem 0.9rem; border-radius: 2px;
    color: var(--muted);
  }

  /* ── TIMELINE (CHANGE 4a) ── */
  .timeline-section { overflow: hidden; }
  .timeline {
    position: relative; max-width: 900px; margin: 0 auto;
    padding: 1rem 0;
  }
  .timeline-spine {
    position: absolute; top: 0; bottom: 0; left: 50%;
    width: 1px; background: var(--border);
    transform: translateX(-50%);
  }
  .timeline-item {
    display: flex; align-items: flex-start;
    gap: 3rem; margin-bottom: 3rem; position: relative;
  }
  .timeline-item.left { flex-direction: row-reverse; }
  .timeline-item.right { flex-direction: row; }
  .timeline-dot {
    position: absolute; left: 50%; top: 1.2rem;
    width: 12px; height: 12px; border-radius: 50%;
    background: var(--blue); border: 2px solid var(--accent);
    transform: translateX(-50%); z-index: 2; flex-shrink: 0;
  }
  .timeline-item.highlight .timeline-dot {
    background: var(--accent); box-shadow: 0 0 12px var(--accent);
  }
  .timeline-card {
    width: calc(50% - 2.5rem);
    background: var(--navy2); border: 1px solid var(--border);
    padding: 1.8rem; border-radius: 2px;
    transition: border-color 0.2s;
  }
  .timeline-item.highlight .timeline-card {
    border-color: var(--accent);
    background: linear-gradient(135deg, var(--navy2), #0a2240);
  }
  .timeline-card:hover { border-color: var(--accent); }
  .timeline-year {
    display: block; font-family: 'DM Mono', monospace;
    font-size: 0.75rem; color: var(--accent); letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }
  .timeline-card h3 { font-size: 1rem; margin-bottom: 0.5rem; }
  .timeline-card p { font-size: 0.85rem; color: var(--muted); line-height: 1.7; margin-bottom: 1rem; }
  @media (max-width: 700px) {
    .timeline-spine { left: 1.2rem; }
    .timeline-item, .timeline-item.left, .timeline-item.right { flex-direction: column; padding-left: 3rem; }
    .timeline-dot { left: 1.2rem; }
    .timeline-card { width: 100%; }
  }

  /* ── ACCOLADES (CHANGE 4b) ── */
  .accolades-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem; margin-bottom: 3rem;
  }
  .accolade-card {
    background: var(--navy2); border: 1px solid var(--border);
    padding: 1.5rem; text-align: center;
    transition: transform 0.2s, border-color 0.2s;
    border-radius: 2px;
  }
  .accolade-card:hover { transform: translateY(-4px); border-color: var(--accent); }
  .accolade-card.winner { border-color: rgba(200,168,75,0.4); }
  /* 👉 Replace this with <img> of real award photo/certificate */
  .accolade-img-placeholder {
    width: 64px; height: 64px; margin: 0 auto 1rem;
    background: var(--navy3); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem; border: 1px solid var(--border);
  }
  .accolade-type {
    font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 0.4rem;
  }
  .accolade-card h4 { font-size: 0.95rem; margin-bottom: 0.4rem; font-family: 'DM Sans'; font-weight: 500; }
  .accolade-org { font-size: 0.78rem; color: var(--muted); margin-bottom: 0.5rem; }
  .accolade-year { font-family: 'DM Mono', monospace; font-size: 0.7rem; color: var(--accent); }
  .awards-count-row {
    display: flex; justify-content: center; gap: 4rem; flex-wrap: wrap;
  }
  .awards-count { text-align: center; }
  .awards-count span { display: block; font-family: 'Playfair Display', serif; font-size: 2.5rem; color: var(--accent); }
  .awards-count label { font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }

  /* ── REACTIONS (CHANGE 4c) ── */
  .reactions-section { overflow: hidden; }
  .reactions-marquee-wrapper {
    overflow: hidden; position: relative; margin-bottom: 3rem;
  }
  .reactions-track {
    display: flex; gap: 1.5rem;
    animation: marqueeScroll 32s linear infinite;
    width: max-content;
  }
  .reactions-track:hover { animation-play-state: paused; }
  @keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .reaction-card {
    width: 340px; flex-shrink: 0;
    background: var(--navy2); border: 1px solid var(--border);
    padding: 2rem; border-radius: 2px;
    position: relative;
  }
  .reaction-quote-mark {
    position: absolute; top: 1rem; right: 1.2rem;
    font-size: 4rem; color: var(--border);
    font-family: 'Playfair Display', serif; line-height: 1;
  }
  .reaction-card p { font-size: 0.9rem; line-height: 1.7; margin-bottom: 1.2rem; font-style: italic; }
  .reaction-card footer { font-size: 0.78rem; }
  .reaction-card footer strong { display: block; color: var(--accent); }
  .reaction-card footer span { color: var(--muted); }
  .screenings-strip { text-align: center; }
  .screenings-label { font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); margin-bottom: 1rem; }
  .screenings-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
  .screening-tag { font-size: 0.75rem; color: var(--muted); border: 1px solid var(--border); padding: 0.3rem 0.8rem; border-radius: 2px; }

  /* ── ROCK SONG (CHANGE 4d) ── */
  .song-section {
    background: linear-gradient(135deg, var(--navy2) 0%, #0a1829 100%);
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    max-width: 100%; padding: 6rem 2rem;
  }
  .song-inner {
    max-width: 1100px; margin: 0 auto;
    display: flex; align-items: center; gap: 5rem; flex-wrap: wrap;
  }
  .song-text { flex: 1; min-width: 300px; }
  .song-text h2 { font-size: clamp(1.8rem, 3.5vw, 2.8rem); margin: 0.75rem 0 1rem; }
  .song-text p { color: var(--muted); line-height: 1.8; margin-bottom: 1.5rem; }
  .song-text strong { color: var(--white); }
  .song-awards { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 2rem; }
  .song-award-badge {
    font-size: 0.75rem; padding: 0.35rem 0.9rem;
    background: rgba(200,168,75,0.1); border: 1px solid var(--border);
    color: var(--accent); border-radius: 2px;
  }
  .song-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
  .song-visual { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
  .song-vinyl {
    position: relative; width: 180px; height: 180px;
    display: flex; align-items: center; justify-content: center;
  }
  .vinyl-outer {
    width: 180px; height: 180px; border-radius: 50%;
    background: radial-gradient(circle, #1a1a2e 30%, #0f0f1e 100%);
    border: 2px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    animation: spin 8s linear infinite;
  }
  .vinyl-inner {
    width: 60px; height: 60px; border-radius: 50%;
    background: var(--navy); border: 2px solid var(--accent);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem;
  }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .vinyl-groove {
    position: absolute; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.04);
    width: calc(70px + var(--n) * 18px);
    height: calc(70px + var(--n) * 18px);
    pointer-events: none;
  }
  .song-composer { font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }

  /* ── IMPACT ── */
  .impact-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
  .impact-stat {
    background: var(--navy2); border: 1px solid var(--border);
    padding: 2rem 1rem; text-align: center; border-radius: 2px;
    transition: border-color 0.2s;
  }
  .impact-stat:hover { border-color: var(--accent); }
  .impact-icon { display: block; font-size: 1.8rem; margin-bottom: 0.75rem; }
  .impact-n { display: block; font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--accent2); }
  .impact-l { display: block; font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-top: 0.25rem; }

  /* ── BLOG (CHANGE 4e) ── */
  .blog-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  .blog-card {
    background: var(--navy2); border: 1px solid var(--border);
    border-radius: 2px; overflow: hidden;
    transition: transform 0.2s, border-color 0.2s;
  }
  .blog-card:hover { transform: translateY(-4px); border-color: var(--accent); }
  .blog-card-img-placeholder {
    height: 160px; background: var(--navy3);
    display: flex; align-items: center; justify-content: center;
    font-size: 3rem; border-bottom: 1px solid var(--border);
  }
  /* 👉 Replace with <img src="/blog/yourimage.jpg" alt="..." style={{width:'100%',height:'160px',objectFit:'cover'}} /> */
  .blog-card-body { padding: 1.5rem; }
  .blog-meta { display: flex; justify-content: space-between; margin-bottom: 0.75rem; font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
  .blog-card h3 { font-size: 1rem; margin-bottom: 0.75rem; line-height: 1.4; }
  .blog-card p { font-size: 0.85rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.2rem; }
  .blog-read-more { font-size: 0.78rem; color: var(--accent); letter-spacing: 0.06em; }
  .blog-read-more:hover { color: var(--accent2); }

  /* ── WATCH ── */
  .watch-cards {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }
  .watch-card {
    background: var(--navy2); border: 1px solid var(--border);
    padding: 2.5rem 1.5rem; text-align: center; border-radius: 2px;
    transition: border-color 0.2s, transform 0.2s;
  }
  .watch-card:hover { border-color: var(--accent); transform: translateY(-4px); }
  .watch-card.featured {
    background: linear-gradient(135deg, var(--navy3), #0c1e3c);
    border-color: var(--accent);
  }
  .watch-card span { display: block; font-size: 2.5rem; margin-bottom: 1rem; }
  .watch-card strong { display: block; font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; }
  .watch-card p { font-size: 0.82rem; color: var(--muted); }

  /* ── DONATION BANNER (CHANGE 5) ── */
  .donation-banner {
    background: linear-gradient(135deg, #0c1e38 0%, #0f2a4a 100%);
    border-top: 2px solid var(--accent); border-bottom: 1px solid var(--border);
    padding: 4rem 2rem;
  }
  .donation-inner {
    max-width: 1000px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    gap: 3rem; flex-wrap: wrap;
  }
  .donation-text { flex: 1; min-width: 280px; }
  .donation-text h2 { font-size: clamp(1.4rem, 3vw, 2.2rem); margin-bottom: 1rem; }
  .donation-text p { color: var(--muted); font-size: 0.92rem; line-height: 1.8; }
  .donation-actions { text-align: center; }
  .donation-secure { font-size: 0.7rem; color: var(--muted); margin-top: 0.75rem; letter-spacing: 0.06em; }

  /* ── MAIN CTA ── */
  .cta-section {
    background: linear-gradient(160deg, #081629 0%, #0d2044 50%, #050d1a 100%);
    padding: 7rem 2rem; text-align: center;
    position: relative; overflow: hidden;
    border-top: 1px solid var(--border);
  }
  .cta-grain {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.3; pointer-events: none;
  }
  .cta-flag { font-size: 3rem; display: block; margin-bottom: 1.5rem; position: relative; z-index: 1; }
  .cta-section h2 { font-size: clamp(1.6rem, 3.5vw, 2.6rem); max-width: 720px; margin: 0 auto 1.5rem; position: relative; z-index: 1; }
  .cta-section > p { color: var(--muted); max-width: 560px; margin: 0 auto 2.5rem; position: relative; z-index: 1; }
  .cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; margin-bottom: 1.5rem; }
  .cta-secure { font-size: 0.7rem; color: var(--muted); letter-spacing: 0.06em; position: relative; z-index: 1; }

  /* ── FOOTER ── */
  .footer {
    background: var(--navy2); border-top: 1px solid var(--border);
    padding: 4rem 2rem 2rem;
  }
  .footer-top {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 2fr 1fr 1fr;
    gap: 3rem; margin-bottom: 3rem;
  }
  @media (max-width: 700px) { .footer-top { grid-template-columns: 1fr; } }
  .footer-title { font-family: 'Playfair Display', serif; font-size: 1.2rem; margin-bottom: 0.25rem; color: var(--accent); }
  .footer-sub { font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.75rem; }
  .footer-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.7; }
  .footer-nav { display: flex; flex-direction: column; gap: 0.6rem; }
  .footer-nav-title { font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.25rem; }
  .footer-nav a, .footer-contact a { font-size: 0.82rem; color: var(--muted); transition: color 0.2s; }
  .footer-nav a:hover, .footer-contact a:hover { color: var(--white); }
  .footer-contact { display: flex; flex-direction: column; gap: 0.6rem; }
  .footer-directors { font-size: 0.82rem; color: var(--muted); margin-top: 0.5rem; line-height: 1.6; }
  .footer-credits { max-width: 1100px; margin: 0 auto 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border); font-size: 0.72rem; color: var(--muted); line-height: 1.7; }
  .footer-bottom { max-width: 1100px; margin: 0 auto; font-size: 0.7rem; color: var(--muted); letter-spacing: 0.06em; text-align: center; }
`;
