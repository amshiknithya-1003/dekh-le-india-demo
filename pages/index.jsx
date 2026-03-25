// pages/index.jsx
// Dekh Le! India — Premium Cinematic Redesign
// Netflix / NatGeo inspired · Bebas Neue · Dark blue cricket jersey theme
// Sections: Hero · Sizzle · Story · Behind the Scenes · Awards · Impact · CTA

import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────────────────────────── */
const T = {
  // Core palette
  navy:      '#0A1F44',
  navyDark:  '#060F22',
  navyMid:   '#123A73',
  navyUp:    '#1A4F8A',
  black:     '#030810',

  // Accents
  accent:    '#00BFFF',      // deep sky blue — electric highlight
  accentDim: 'rgba(0,191,255,0.18)',
  accentGlow:'rgba(0,191,255,0.35)',
  saffron:   '#FF9933',
  green:     '#2E8B57',

  // Text
  white:     '#FFFFFF',
  cream:     '#F0EDE8',
  dim:       'rgba(240,237,232,0.6)',
  faint:     'rgba(240,237,232,0.3)',
  ghost:     'rgba(240,237,232,0.1)',
};

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const AWARDS = [
  { icon:'🏆', name:'CLEF Music Awards',             result:'Winner — Best Lyrics',         year:'2025' },
  { icon:'🎸', name:'CLEF Music Awards',             result:'Winner — Best Rock Guitarist',  year:'2025' },
  { icon:'🎬', name:'NCIFF Nepal',                   result:'Winner — Best Director',        year:'2026' },
  { icon:'🥇', name:'KISFF Kenya',                   result:"Chairman's Award",              year:'2025' },
  { icon:'🎭', name:'17th IDSFFK Kerala',            result:'Official Selection',            year:'2025' },
  { icon:'🌏', name:'IIFFB Boston',                  result:'Official Selection',            year:'2025' },
  { icon:'🌍', name:'LIFF Lulea, Sweden',            result:'Finalist',                     year:'2025' },
  { icon:'🎞️', name:'MLOFF Manchester',              result:'Official Selection',            year:'2026' },
  { icon:'🎪', name:'Kriti Film Club Delhi',         result:'Delhi Premiere',               year:'2026' },
  { icon:'🌺', name:'Istanbul Women Film Festival',  result:'Semi Finalist',                year:'2026' },
];

const BEHIND_SCENES = [
  { n:'01', title:'6 States,\nOne Dream',        body:'We travelled across Odisha, Maharashtra, Karnataka, Kerala, Jharkhand, and Uttar Pradesh — seeking players whose families had never seen them play.' },
  { n:'02', title:'500 Days\nof Filming',         body:'18 months embedded with the team. On trains, in hostels, on dusty grounds. Every moment captured with two cameras and relentless dedication.' },
  { n:'03', title:'Edgbaston,\nBirmingham',        body:'The World Games. 60,000 seat stadium. India's blind women took the field. We were there for every ball bowled, every wicket taken, every tear shed.' },
  { n:'04', title:'A Story\nWorld Missed',         body:'They won. Against all odds. India barely noticed. This film is the witness the world should have been.' },
];

const TESTIMONIALS = [
  { q:'Every student must watch this. It rewired how I see disability.',           who:'Principal, Delhi Public School, Bangalore'  },
  { q:'We screened it for 500 employees. Not a dry eye in the auditorium.',        who:'HR Director, TechCorp India'               },
  { q:'I stood up and cried. This is the India I want to believe in.',             who:'Student, IIT Bombay'                       },
  { q:'The most important documentary made in India in the last 10 years.',        who:'Film Critic, The Hindu'                    },
];

const IMPACT_STATS = [
  { value:'10K+', label:'People Reached',    icon:'👥' },
  { value:'50+',  label:'School Screenings', icon:'🏫' },
  { value:'10+',  label:'Companies',         icon:'🏢' },
  { value:'10+',  label:'Awards Won',        icon:'🏆' },
  { value:'8+',   label:'Countries',         icon:'🌍' },
  { value:'6',    label:'States Covered',    icon:'🗺️' },
];

/* ─────────────────────────────────────────────────────────────────
   SCROLL FADE HOOK
───────────────────────────────────────────────────────────────── */
function useFade(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, vis] = useFade();
  return (
    <div ref={ref} style={{
      opacity:   vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(32px)',
      transition:`opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   REUSABLE COMPONENTS
───────────────────────────────────────────────────────────────── */
function SectionEyebrow({ label }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', marginBottom:'18px' }}>
      <div style={{ height:'1px', width:'40px', background:T.accent, opacity:0.7 }} />
      <span style={{
        fontFamily:'"Bebas Neue",sans-serif',
        fontWeight:400, fontSize:'0.75rem',
        letterSpacing:'0.35em', textTransform:'uppercase',
        color:T.accent,
      }}>
        {label}
      </span>
      <div style={{ height:'1px', width:'40px', background:T.accent, opacity:0.7 }} />
    </div>
  );
}

function SectionTitle({ children, light = false }) {
  return (
    <h2 style={{
      fontFamily:'"Bebas Neue",sans-serif',
      fontWeight:400,
      fontSize:'clamp(2.4rem, 6vw, 5rem)',
      letterSpacing:'0.04em',
      lineHeight:1.0,
      color: light ? T.navyDark : T.white,
      textAlign:'center',
      margin:'0 0 14px',
    }}>
      {children}
    </h2>
  );
}

function Btn({ href, children, primary = true, external = false }) {
  const base = {
    fontFamily:'"Bebas Neue",sans-serif',
    fontWeight:400, fontSize:'0.9rem',
    letterSpacing:'0.22em', textTransform:'uppercase',
    display:'inline-flex', alignItems:'center', gap:'10px',
    padding:'13px 34px',
    textDecoration:'none', transition:'all 0.25s',
    cursor:'pointer', border:'none',
  };
  const style = primary
    ? { ...base, background:T.saffron, color:T.navyDark, boxShadow:`0 0 28px rgba(255,153,51,0.5)` }
    : { ...base, background:'transparent', color:T.white, border:`1px solid rgba(240,237,232,0.3)` };

  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" style={style}
    onMouseEnter={e => primary ? e.currentTarget.style.boxShadow='0 0 42px rgba(255,153,51,0.7)' : e.currentTarget.style.borderColor='rgba(240,237,232,0.7)'}
    onMouseLeave={e => primary ? e.currentTarget.style.boxShadow='0 0 28px rgba(255,153,51,0.5)' : e.currentTarget.style.borderColor='rgba(240,237,232,0.3)'}>{children}</a>;
  return <Link href={href} style={style}
    onMouseEnter={e => primary ? e.currentTarget.style.boxShadow='0 0 42px rgba(255,153,51,0.7)' : e.currentTarget.style.borderColor='rgba(240,237,232,0.7)'}
    onMouseLeave={e => primary ? e.currentTarget.style.boxShadow='0 0 28px rgba(255,153,51,0.5)' : e.currentTarget.style.borderColor='rgba(240,237,232,0.3)'}>{children}</Link>;
}

/* ─────────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [['#story','Story'],['#behind','Behind Scenes'],['#awards','Awards'],['#impact','Impact'],['#watch','Watch']];

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:1000,
      transition:'all 0.4s',
      background: scrolled ? 'rgba(6,15,34,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,191,255,0.12)' : 'none',
    }}>
      {/* Tricolor strip */}
      <div style={{ height:'2px', background:`linear-gradient(90deg, ${T.saffron} 33.33%, rgba(255,255,255,0.12) 33.33% 66.66%, ${T.green} 66.66%)` }} />

      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 32px', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration:'none' }}>
          <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'1.4rem', letterSpacing:'0.08em', color:T.white, display:'block', lineHeight:1 }}>
            Dekh Le! India
          </span>
          <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.55rem', letterSpacing:'0.3em', color:T.accent, display:'block', marginTop:'2px' }}>
            Documentary Film · 2024
          </span>
        </a>

        {/* Desktop */}
        <div className="d-nav" style={{ display:'flex', gap:'32px', alignItems:'center' }}>
          {links.map(([h,l]) => (
            <a key={h} href={h} style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.85rem', letterSpacing:'0.18em', textTransform:'uppercase', color:T.dim, textDecoration:'none', transition:'color 0.2s' }}
               onMouseEnter={e => e.target.style.color=T.white}
               onMouseLeave={e => e.target.style.color=T.dim}>{l}</a>
          ))}
          <Btn href="https://www.jiohotstar.com/" external>▶ Watch Now</Btn>
        </div>

        {/* Hamburger */}
        <button className="m-ham" onClick={() => setOpen(!open)}
          style={{ display:'none', background:'none', border:`1px solid ${T.ghost}`, color:T.white, width:'40px', height:'40px', cursor:'pointer', fontSize:'1rem' }}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ background:'rgba(6,15,34,0.99)', borderTop:`1px solid ${T.accentDim}`, padding:'20px 32px 28px' }}>
          {links.map(([h,l]) => (
            <a key={h} href={h} onClick={() => setOpen(false)}
              style={{ display:'block', fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'1.2rem', letterSpacing:'0.14em', textTransform:'uppercase', color:T.dim, textDecoration:'none', padding:'11px 0', borderBottom:`1px solid ${T.ghost}` }}>
              {l}
            </a>
          ))}
          <div style={{ marginTop:'20px', display:'flex', flexDirection:'column', gap:'10px' }}>
            <Btn href="https://www.jiohotstar.com/" external>▶ Watch on JioHotstar</Btn>
            <Btn href="/contribute" primary={false}>🤍 Contribute</Btn>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:960px){.d-nav{display:none!important}.m-ham{display:flex!important;align-items:center;justify-content:center}}
        @media(max-width:480px){.award-grid{grid-template-columns:1fr!important}.stat-grid{grid-template-columns:repeat(2,1fr)!important}}
      `}</style>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HERO — full cinematic
───────────────────────────────────────────────────────────────── */
function Hero() {
  const [in_, setIn_] = useState(false);
  useEffect(() => { const t = setTimeout(() => setIn_(true), 120); return () => clearTimeout(t); }, []);

  const anim = (delay) => ({
    opacity:   in_ ? 1 : 0,
    transform: in_ ? 'translateY(0)' : 'translateY(30px)',
    transition:`opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
  });

  return (
    <section style={{
      position:'relative',
      minHeight:'100vh',
      display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',
      overflow:'hidden',
      background:`linear-gradient(175deg, ${T.navy} 0%, ${T.navyDark} 50%, ${T.black} 100%)`,
    }}>
      {/* ── Film grain ── */}
      <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', opacity:0.045,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* ── Cricket field perspective grid ── */}
      <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', opacity:0.025,
        background:`repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(0,191,255,0.6) 79px, rgba(0,191,255,0.6) 80px),
                    repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(0,191,255,0.6) 79px, rgba(0,191,255,0.6) 80px)`,
      }} />

      {/* ── Radial accent light ── */}
      <div style={{ position:'absolute', top:'-5%', left:'50%', transform:'translateX(-50%)', width:'120%', height:'60%', background:`radial-gradient(ellipse, ${T.accentGlow} 0%, transparent 65%)`, opacity:0.4, pointerEvents:'none', zIndex:2 }} />
      <div style={{ position:'absolute', bottom:'-10%', left:'20%', width:'40%', height:'50%', background:`radial-gradient(ellipse, rgba(255,153,51,0.07) 0%, transparent 60%)`, pointerEvents:'none', zIndex:2 }} />

      {/* ── Cinematic top/bottom bars ── */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'80px', background:`linear-gradient(to bottom, ${T.black}, transparent)`, zIndex:4, pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'160px', background:`linear-gradient(to top, ${T.black}, transparent)`, zIndex:4, pointerEvents:'none' }} />

      {/* ── CONTENT ── */}
      <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'120px 24px 80px', maxWidth:'1100px', width:'100%' }}>

        {/* Pre-line */}
        <div style={{ ...anim(200), display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', marginBottom:'24px' }}>
          <div style={{ height:'1px', width:'48px', background:T.accent }} />
          <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:'0.72rem', letterSpacing:'0.38em', color:T.accent, textTransform:'uppercase' }}>
            A Documentary Film by Shanthi Mohan &amp; Mukund Moorthy
          </span>
          <div style={{ height:'1px', width:'48px', background:T.accent }} />
        </div>

        {/* MAIN TITLE */}
        <div style={{ ...anim(400), marginBottom:'4px' }}>
          <h1 style={{
            fontFamily:'"Bebas Neue",sans-serif', fontWeight:400,
            fontSize:'clamp(5rem, 18vw, 14rem)',
            lineHeight:0.88, letterSpacing:'0.02em', margin:0,
            color:T.white,
            textShadow:`0 0 60px rgba(0,191,255,0.9), 0 0 120px rgba(0,191,255,0.5), 0 0 200px rgba(0,191,255,0.2), 0 4px 0 rgba(0,0,0,0.9)`,
          }}>
            DEKH LE!
          </h1>
        </div>

        {/* INDIA — accent color */}
        <div style={{ ...anim(560), marginBottom:'4px', position:'relative', display:'inline-block' }}>
          {/* Flag brush stroke */}
          <div style={{ position:'absolute', bottom:'10%', left:'-2%', right:'-2%', height:'28%',
            background:`linear-gradient(90deg, ${T.saffron}22, rgba(255,255,255,0.05), ${T.green}22)`,
            pointerEvents:'none', zIndex:0 }} />
          <h1 style={{
            fontFamily:'"Bebas Neue",sans-serif', fontWeight:400,
            fontSize:'clamp(5rem, 18vw, 14rem)',
            lineHeight:0.88, letterSpacing:'0.02em', margin:0,
            color:T.accent, position:'relative', zIndex:1,
            textShadow:`0 0 50px rgba(0,191,255,1), 0 0 100px rgba(0,191,255,0.7), 0 0 180px rgba(0,191,255,0.35), 0 4px 0 rgba(0,0,0,0.9)`,
          }}>
            INDIA
          </h1>
        </div>

        {/* Flag emoji — outside any clip context */}
        <div style={{ ...anim(680), fontSize:'clamp(2rem,5vw,3.5rem)', marginBottom:'28px', marginTop:'8px' }}>🇮🇳</div>

        {/* ── NEW SUBTITLE — emotional, cinematic ── */}
        <p style={{ ...anim(800), fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'clamp(1rem,2.2vw,1.25rem)', color:T.dim, maxWidth:'580px', margin:'0 auto 16px', lineHeight:1.7, letterSpacing:'0.02em' }}>
          A story India never saw.<br />
          <strong style={{ color:T.white, fontWeight:400, fontStyle:'italic' }}>A team that refused to be unseen.</strong>
        </p>

        {/* ── Tagline ── */}
        <div style={{ ...anim(950), marginBottom:'48px' }}>
          <p style={{ fontFamily:'"Georgia",serif', fontStyle:'italic', fontWeight:400, fontSize:'clamp(0.85rem,1.6vw,1rem)', color:T.faint, letterSpacing:'0.06em', margin:0 }}>
            "No Pity &nbsp;·&nbsp; No Sympathy &nbsp;·&nbsp; Just Give Us an Opportunity"
          </p>
        </div>

        {/* ── CTAs ── */}
        <div style={{ ...anim(1100), display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap', marginBottom:'12px' }}>
          <Btn href="https://www.jiohotstar.com/" external>▶ Watch Now</Btn>
          <Btn href="/contribute" primary={false}>🤍 Contribute</Btn>
        </div>
        <p style={{ ...anim(1200), fontFamily:'"Bebas Neue",sans-serif', fontSize:'0.62rem', letterSpacing:'0.2em', textTransform:'uppercase', color:T.faint }}>
          Streaming on JioHotstar
        </p>
        {/* Stats block removed — keep hero clean and focused */}
      </div>

      {/* Scroll pulse */}
      <div style={{ ...anim(1500), position:'absolute', bottom:'28px', left:'50%', transform:'translateX(-50%)', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
        <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:'0.55rem', letterSpacing:'0.3em', textTransform:'uppercase', color:T.faint }}>Scroll</span>
        <div style={{ width:'1px', height:'40px', background:`linear-gradient(to bottom, ${T.accent}88, transparent)`, animation:'scrollPulse 2s ease-in-out infinite' }} />
      </div>

      <style>{`@keyframes scrollPulse{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   STORY SECTION
───────────────────────────────────────────────────────────────── */
function StorySection() {
  return (
    <section id="story" style={{ padding:'120px 24px', background:`linear-gradient(180deg, ${T.black} 0%, ${T.navyDark} 100%)`, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'50%', left:'-100px', transform:'translateY(-50%)', width:'400px', height:'400px', borderRadius:'50%', background:`radial-gradient(circle, ${T.accentDim} 0%, transparent 60%)`, pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent 0%, ${T.accent}44 50%, transparent 100%)` }} />

      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <FadeUp>
          <SectionEyebrow label="The Film" />
          <SectionTitle>
            They Played With Courage.<br />
            <span style={{ color:T.accent }}>We Filmed With Love.</span>
          </SectionTitle>
          <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'1.05rem', color:T.dim, textAlign:'center', maxWidth:'600px', margin:'0 auto 60px', lineHeight:1.75 }}>
            Dekh Le! India chronicles the extraordinary journey of India's first blind women's national cricket team — from remote villages across six states to the World Games at Edgbaston, Birmingham.
          </p>
        </FadeUp>

        {/* Story cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1px', background:`rgba(0,191,255,0.1)` }}>
          {BEHIND_SCENES.map((item, i) => (
            <FadeUp key={item.n} delay={i * 100}>
              <div style={{ padding:'36px 28px', background:T.navyDark, height:'100%', borderTop:`1px solid rgba(0,191,255,0.15)`, transition:'background 0.3s', cursor:'default' }}
                onMouseEnter={e => e.currentTarget.style.background=T.navyMid}
                onMouseLeave={e => e.currentTarget.style.background=T.navyDark}>
                <div style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'3.5rem', color:`rgba(0,191,255,0.12)`, lineHeight:1, marginBottom:'16px', letterSpacing:'0.02em' }}>{item.n}</div>
                <h3 style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'1.4rem', letterSpacing:'0.06em', color:T.white, marginBottom:'12px', whiteSpace:'pre-line', lineHeight:1.1 }}>{item.title}</h3>
                <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.9rem', color:T.dim, lineHeight:1.75, margin:0 }}>{item.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Tags */}
        <FadeUp delay={300}>
          <div style={{ display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap', marginTop:'44px' }}>
            {['Documentary','60 Minutes','Hindi & English','2024','India'].map(tag => (
              <span key={tag} style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.75rem', letterSpacing:'0.18em', textTransform:'uppercase', padding:'7px 18px', color:T.accent, border:`1px solid rgba(0,191,255,0.3)` }}>
                {tag}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   BEHIND THE SCENES
───────────────────────────────────────────────────────────────── */
function BehindScenes() {
  return (
    <section id="behind" style={{ padding:'120px 24px', background:T.black, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent 0%, ${T.saffron}44 50%, transparent 100%)` }} />
      <div style={{ position:'absolute', top:'40%', right:'-80px', width:'350px', height:'350px', borderRadius:'50%', background:`radial-gradient(circle, rgba(255,153,51,0.06) 0%, transparent 60%)`, pointerEvents:'none' }} />

      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <FadeUp>
          <SectionEyebrow label="Behind the Scenes" />
          <SectionTitle>
            Inside the<br />
            <span style={{ color:T.saffron }}>Making of the Film</span>
          </SectionTitle>
          <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'1.05rem', color:T.dim, textAlign:'center', maxWidth:'560px', margin:'0 auto 60px', lineHeight:1.75 }}>
            18 months. 6 states. One crew. One team. And a story the world needed to hear.
          </p>
        </FadeUp>

        {/* Timeline */}
        <div style={{ maxWidth:'800px', margin:'0 auto', position:'relative' }}>
          {/* Vertical line */}
          <div style={{ position:'absolute', left:'24px', top:0, bottom:0, width:'1px', background:`linear-gradient(to bottom, ${T.accent}55, transparent)` }} />

          <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
            {[
              { year:'2020–21', title:'Finding the Players',       body:'We crisscrossed six states tracking down blind women cricketers — players whose families had never seen them play.' },
              { year:'2022',    title:'Training Camps',            body:'Embedded in BCCI training camps, we witnessed the raw beauty of players learning to bowl and bat by sound and touch alone.' },
              { year:'2023',    title:'The World Games — Birmingham', body:'Edgbaston. India vs Australia. Final. The world was not watching. We were. Every frame captured, every emotion preserved.' },
              { year:'2024',    title:'The Film is Complete',      body:'18 months of editing, colour grading, and music composition later — Dekh Le! India was ready for the world to finally see.' },
            ].map((t, i) => (
              <FadeUp key={t.year} delay={i * 120}>
                <div style={{ display:'flex', gap:'32px', padding:'32px 0 32px 60px', borderBottom:`1px solid rgba(255,255,255,0.04)`, position:'relative' }}>
                  {/* Dot */}
                  <div style={{ position:'absolute', left:'17px', top:'36px', width:'16px', height:'16px', borderRadius:'50%', background:i===2?T.saffron:T.accent, boxShadow:i===2?`0 0 16px rgba(255,153,51,0.6)`:`0 0 16px ${T.accentGlow}` }} />
                  <div style={{ minWidth:'80px', flexShrink:0 }}>
                    <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.75rem', letterSpacing:'0.18em', color:i===2?T.saffron:T.accent }}>{t.year}</span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'1.3rem', letterSpacing:'0.06em', color:T.white, marginBottom:'8px' }}>{t.title}</h3>
                    <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.9rem', color:T.dim, lineHeight:1.7, margin:0 }}>{t.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Video links */}
        <FadeUp delay={300}>
          <div style={{ marginTop:'56px', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1px', background:`rgba(0,191,255,0.1)` }}>
            {[
              { icon:'🎬', title:'Sizzle Reel',     desc:'The cinematic sizzle reel', href:'https://www.youtube.com/watch?v=h_JVTDhF6RY' },
              { icon:'🎵', title:'The Film Song',   desc:'Official song by Lokesh Bakshi', href:'https://www.youtube.com/watch?v=mgFde16-J7c' },
            ].map(v => (
              <a key={v.title} href={v.href} target="_blank" rel="noopener noreferrer"
                style={{ padding:'28px', background:T.navyDark, display:'flex', gap:'18px', alignItems:'center', textDecoration:'none', transition:'background 0.3s', borderTop:`3px solid ${T.accent}` }}
                onMouseEnter={e => e.currentTarget.style.background=T.navyMid}
                onMouseLeave={e => e.currentTarget.style.background=T.navyDark}>
                <span style={{ fontSize:'2rem' }}>{v.icon}</span>
                <div>
                  <p style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'1.1rem', letterSpacing:'0.06em', color:T.white, marginBottom:'3px' }}>{v.title}</p>
                  <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.8rem', color:T.dim }}>Watch on YouTube ↗</p>
                </div>
              </a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   AWARDS
───────────────────────────────────────────────────────────────── */
function AwardsSection() {
  return (
    <section id="awards" style={{ padding:'120px 24px', background:`linear-gradient(180deg, ${T.black} 0%, ${T.navyDark} 100%)` }}>
      <div style={{ position:'absolute', left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent 0%, ${T.accent}44 50%, transparent 100%)` }} />

      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <FadeUp>
          <SectionEyebrow label="Recognition" />
          <SectionTitle>
            Awards &amp;<br />
            <span style={{ color:T.accent }}>Festival Selections</span>
          </SectionTitle>
          <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'1.05rem', color:T.dim, textAlign:'center', maxWidth:'520px', margin:'0 auto 56px', lineHeight:1.75 }}>
            Recognised across <span style={{ color:T.accent }}>8+ countries</span> at prestigious international film festivals.
          </p>
        </FadeUp>

        <div className="award-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(310px,1fr))', gap:'1px', background:`rgba(0,191,255,0.1)` }}>
          {AWARDS.map((a, i) => {
            const acc = i%3===0 ? T.saffron : i%3===1 ? T.accent : `rgba(46,139,87,0.9)`;
            return (
              <FadeUp key={i} delay={(i%3)*80}>
                <div style={{ padding:'26px 22px', background:T.navyDark, borderLeft:`4px solid ${acc}`, transition:'background 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.background=T.navyMid}
                  onMouseLeave={e => e.currentTarget.style.background=T.navyDark}>
                  <span style={{ fontSize:'1.8rem', display:'block', marginBottom:'10px' }}>{a.icon}</span>
                  <p style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'1.05rem', letterSpacing:'0.04em', color:T.white, marginBottom:'4px', lineHeight:1.2 }}>{a.name}</p>
                  <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:500, fontSize:'0.82rem', color:acc, marginBottom:'3px' }}>{a.result}</p>
                  <p style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.68rem', letterSpacing:'0.15em', color:T.faint }}>{a.year}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   COMMUNITY IMPACT
───────────────────────────────────────────────────────────────── */
function ImpactSection() {
  return (
    <section id="impact" style={{ padding:'120px 24px', background:`linear-gradient(180deg, ${T.navyDark} 0%, ${T.black} 100%)` }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent 0%, ${T.green}55 50%, transparent 100%)` }} />

      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <FadeUp>
          <SectionEyebrow label="Community Impact" />
          <SectionTitle>
            A Movement Across<br />
            <span style={{ color:`rgba(46,139,87,0.9)` }}>India</span>
          </SectionTitle>
          <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'1.05rem', color:T.dim, textAlign:'center', maxWidth:'560px', margin:'0 auto 56px', lineHeight:1.75 }}>
            School to school. Office to office. The film is creating real change — one screening at a time.
          </p>
        </FadeUp>

        {/* Stats */}
        <div className="stat-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:`rgba(46,139,87,0.2)`, marginBottom:'1px' }}>
          {IMPACT_STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i*80}>
              <div style={{ padding:'36px 20px', textAlign:'center', background:T.navyDark, borderTop:`3px solid ${i%3===0?T.saffron:i%3===1?T.accent:'rgba(46,139,87,0.9)'}` }}>
                <div style={{ fontSize:'1.6rem', marginBottom:'8px' }}>{s.icon}</div>
                <div style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'3rem', color:T.accent, letterSpacing:'-0.02em', lineHeight:1 }}>{s.value}</div>
                <div style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.7rem', letterSpacing:'0.2em', textTransform:'uppercase', color:T.faint, marginTop:'5px' }}>{s.label}</div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Testimonials */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1px', background:`rgba(0,191,255,0.08)`, marginBottom:'48px' }}>
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={i} delay={i*80}>
              <div style={{ padding:'28px 24px', background:T.navyDark, borderTop:`2px solid ${i%2===0?T.saffron:T.accent}`, height:'100%', transition:'background 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background=T.navyMid}
                onMouseLeave={e => e.currentTarget.style.background=T.navyDark}>
                <p style={{ fontFamily:'"Georgia",serif', fontStyle:'italic', fontSize:'1.4rem', color:i%2===0?T.saffron:T.accent, lineHeight:1, marginBottom:'12px' }}>❝</p>
                <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.9rem', color:T.dim, lineHeight:1.75, marginBottom:'16px', fontStyle:'italic' }}>{t.q}</p>
                <p style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.7rem', letterSpacing:'0.14em', textTransform:'uppercase', color:T.faint }}>— {t.who}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Notable venues */}
        <FadeUp delay={200}>
          <div style={{ padding:'28px', background:T.navyDark, border:`1px solid rgba(0,191,255,0.15)` }}>
            <p style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.72rem', letterSpacing:'0.22em', textTransform:'uppercase', color:T.faint, textAlign:'center', marginBottom:'18px' }}>Notable Screenings</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', justifyContent:'center' }}>
              {['Kriti Film Club · Delhi Premiere','IIT Bombay','DPS Bengaluru','Infosys Campus, Pune','TISS Mumbai','Kendriya Vidyalaya, Jaipur','Jain University'].map(v => (
                <span key={v} style={{ fontFamily:'"Inter",sans-serif', fontWeight:400, fontSize:'0.78rem', padding:'6px 14px', background:T.accentDim, color:T.cream, border:`1px solid rgba(0,191,255,0.2)` }}>
                  📍 {v}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   VIDEO SECTION
───────────────────────────────────────────────────────────────── */
function WatchSection() {
  const [active, setActive] = useState('sizzle');
  const vids = {
    sizzle:{ id:'h_JVTDhF6RY', label:'Sizzle Reel', icon:'🎬' },
    song:  { id:'mgFde16-J7c', label:'Film Song',   icon:'🎵' },
  };

  return (
    <section id="watch" style={{ padding:'120px 24px', background:T.black }}>
      <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
        <FadeUp>
          <SectionEyebrow label="Watch" />
          <SectionTitle>Watch the Film</SectionTitle>
          <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'1rem', color:T.dim, textAlign:'center', marginBottom:'32px' }}>
            Experience the incredible journey
          </p>

          {/* Switcher */}
          <div style={{ display:'flex', justifyContent:'center', gap:'1px', background:`rgba(0,191,255,0.15)`, border:`1px solid rgba(0,191,255,0.2)`, width:'fit-content', margin:'0 auto 14px' }}>
            {Object.entries(vids).map(([k,v]) => (
              <button key={k} onClick={() => setActive(k)}
                style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.82rem', letterSpacing:'0.2em', textTransform:'uppercase', padding:'11px 28px', cursor:'pointer', border:'none', transition:'all 0.2s',
                  background: active===k ? T.saffron : 'transparent',
                  color:      active===k ? T.navyDark : T.dim,
                }}>
                {v.icon} {v.label}
              </button>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={100}>
          <div style={{ position:'relative', paddingBottom:'56.25%', height:0, border:`1px solid rgba(0,191,255,0.25)`, boxShadow:`0 0 100px rgba(0,0,0,0.7), 0 0 40px ${T.accentDim}` }}>
            <iframe key={active}
              src={`https://www.youtube.com/embed/${vids[active].id}?rel=0`}
              title={vids[active].label}
              style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </FadeUp>

        <FadeUp delay={150}>
          <div style={{ display:'flex', gap:'10px', justifyContent:'center', marginTop:'20px', flexWrap:'wrap' }}>
            {[{href:'https://www.youtube.com/watch?v=h_JVTDhF6RY',label:'🎬 Sizzle on YouTube'},{href:'https://www.youtube.com/watch?v=mgFde16-J7c',label:'🎵 Song on YouTube'}].map(l => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.72rem', letterSpacing:'0.18em', textTransform:'uppercase', padding:'8px 18px', background:'transparent', color:T.faint, border:`1px solid ${T.ghost}`, textDecoration:'none', transition:'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color=T.white; e.currentTarget.style.borderColor='rgba(255,255,255,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.color=T.faint; e.currentTarget.style.borderColor=T.ghost; }}>
                {l.label}
              </a>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:'28px' }}>
            <Btn href="https://www.jiohotstar.com/" external>▶ Watch Full Film on JioHotstar</Btn>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section style={{ padding:'140px 24px', background:`linear-gradient(170deg, ${T.navyDark} 0%, ${T.black} 100%)`, textAlign:'center', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, opacity:0.02,
        background:`repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(0,191,255,0.6) 79px, rgba(0,191,255,0.6) 80px),repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(0,191,255,0.6) 79px, rgba(0,191,255,0.6) 80px)`,
        pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'700px', height:'700px', borderRadius:'50%', background:`radial-gradient(circle, ${T.accentDim} 0%, transparent 60%)`, pointerEvents:'none' }} />

      <div style={{ maxWidth:'700px', margin:'0 auto', position:'relative' }}>
        <FadeUp>
          <div style={{ fontSize:'2.8rem', marginBottom:'24px' }}>🇮🇳</div>
          <h2 style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'clamp(2.2rem,6vw,4.5rem)', color:T.white, lineHeight:1.0, letterSpacing:'0.03em', marginBottom:'20px' }}>
            Bring This Film to Every<br />
            School &amp; Workplace<br />
            <span style={{ color:T.accent }}>in India.</span>
          </h2>
          <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'1rem', color:T.faint, lineHeight:1.75, marginBottom:'44px', maxWidth:'500px', margin:'0 auto 44px' }}>
            Help us reach 1 million viewers. Every screening, every contribution, every share brings us closer to a more inclusive India.
          </p>
          <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
            <Btn href="/contribute">💛 Contribute Now</Btn>
            <Btn href="https://www.jiohotstar.com/" external primary={false}>▶ Watch the Film</Btn>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer id="contact" style={{ background:'#020810', padding:'64px 24px 28px' }}>
      <div style={{ height:'2px', background:`linear-gradient(90deg, ${T.saffron}77, rgba(255,255,255,0.1), ${T.green}77)`, marginBottom:'52px' }} />

      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'40px', marginBottom:'52px' }}>
          <div>
            <p style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'1.2rem', letterSpacing:'0.1em', color:T.white, marginBottom:'4px' }}>Dekh Le! India</p>
            <p style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.58rem', letterSpacing:'0.28em', color:T.accent, marginBottom:'16px', textTransform:'uppercase' }}>Documentary Film · 2024</p>
            <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.84rem', color:'rgba(240,237,232,0.35)', lineHeight:1.7 }}>
              The story of India's first blind women's cricket team and their extraordinary journey to the World Games.
            </p>
          </div>

          <div>
            <p style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.65rem', letterSpacing:'0.25em', textTransform:'uppercase', color:T.accent, marginBottom:'18px' }}>Navigate</p>
            {[['#story','Story'],['#behind','Behind the Scenes'],['#awards','Awards'],['#impact','Impact'],['#watch','Watch'],['contribute','Contribute']].map(([h,l]) => (
              <a key={h} href={h.startsWith('#')?h:`/${h}`}
                style={{ display:'block', fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.875rem', color:'rgba(240,237,232,0.38)', textDecoration:'none', marginBottom:'8px', transition:'color 0.2s' }}
                onMouseEnter={e => e.target.style.color=T.white}
                onMouseLeave={e => e.target.style.color='rgba(240,237,232,0.38)'}>
                {l}
              </a>
            ))}
          </div>

          <div>
            <p style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.65rem', letterSpacing:'0.25em', textTransform:'uppercase', color:T.accent, marginBottom:'18px' }}>Contact</p>
            <a href="mailto:m_moorthy@yahoo.com" style={{ display:'block', fontFamily:'"Inter",sans-serif', fontWeight:400, fontSize:'0.875rem', color:T.saffron, textDecoration:'none', marginBottom:'8px' }}>m_moorthy@yahoo.com</a>
            <a href="tel:+919880214587" style={{ display:'block', fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.875rem', color:'rgba(240,237,232,0.38)', textDecoration:'none', marginBottom:'12px' }}>+91-9880214587</a>
            <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.84rem', color:'rgba(240,237,232,0.38)', lineHeight:1.6 }}>Dir. Shanthi Mohan<br />&amp; Mukund Moorthy</p>
          </div>

          <div>
            <p style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.65rem', letterSpacing:'0.25em', textTransform:'uppercase', color:T.accent, marginBottom:'18px' }}>Production</p>
            {[['Directors','Shanthi Mohan & Mukund Moorthy'],['Music','Lokesh Bakshi'],['Editor','Shahnawaz Khan & Swati Jaiswal'],['DOP','Shanthi Mohan & Khushee Hegde'],['Sound','Suresh Raskar']].map(([r,n]) => (
              <div key={r} style={{ marginBottom:'7px' }}>
                <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.62rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(240,237,232,0.28)' }}>{r}: </span>
                <span style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.78rem', color:'rgba(240,237,232,0.48)' }}>{n}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:'22px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
          <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.72rem', color:'rgba(240,237,232,0.2)' }}>
            © {new Date().getFullYear()} Dekh Le! India · The Loose Canon · Sol Production · DejaVu Arts
          </p>
          <div style={{ display:'flex', gap:'5px' }}>
            {[T.saffron,'rgba(255,255,255,0.2)',T.green].map((c,i) => <div key={i} style={{ width:'8px', height:'8px', borderRadius:'50%', background:c }} />)}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Head>
        <title>Dekh Le! India 🇮🇳 — Documentary Film</title>
        <meta name="description" content="An Inspiring Story of the First Ever Blind Women's Cricket Team of India. 10+ International Awards." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Dekh Le! India 🇮🇳" />
        <meta property="og:description" content="No Pity. No Sympathy. Just Give Us an Opportunity." />

        {/* Google Fonts — Bebas Neue + Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />

        <style dangerouslySetInnerHTML={{ __html:`
          *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
          html { scroll-behavior:smooth; }
          body { background:#030810; color:#F0EDE8; }
          ::selection { background:rgba(0,191,255,0.3); color:#fff; }
          ::-webkit-scrollbar { width:4px; }
          ::-webkit-scrollbar-track { background:#030810; }
          ::-webkit-scrollbar-thumb { background:#123A73; }
          @media(max-width:480px){
            .stat-grid { grid-template-columns:repeat(2,1fr)!important; }
            .award-grid { grid-template-columns:1fr!important; }
          }
        `}} />
      </Head>

      <Navbar />
      <main>
        <Hero />
        <StorySection />
        <BehindScenes />
        <AwardsSection />
        <ImpactSection />
        <WatchSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
