// pages/index.jsx — Dekh Le! India
// Cinematic documentary design — National Geographic inspired
// Dark navy · Film grain · Staggered reveals · Premium typography

import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

/* ─── FONT IMPORT (Google Fonts via _document or inline style) ─────── */
const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800;900&family=Barlow:wght@300;400;500&family=Playfair+Display:ital,wght@1,400&display=swap');
`;

/* ─── PALETTE ──────────────────────────────────────────────────────── */
const C = {
  navy:    '#06122B',
  navyMid: '#0D2347',
  navyUp:  '#122D5A',
  cyan:    '#4DB8D4',
  cyanGlow:'rgba(77,184,212,0.25)',
  saffron: '#F5A623',
  green:   '#2E8B57',
  white:   '#F5F0E8',
  dim:     'rgba(245,240,232,0.55)',
  faint:   'rgba(245,240,232,0.28)',
  ghost:   'rgba(245,240,232,0.1)',
};

/* ─── AWARDS from poster ───────────────────────────────────────────── */
const AWARDS = [
  { name:'CLEF Music Awards',           result:'Winner – Best Lyrics',        year:'2025' },
  { name:'CLEF Music Awards',           result:'Winner – Best Rock Guitarist', year:'2025' },
  { name:'NCIFF Nepal',                 result:'Winner – Best Director',       year:'2026' },
  { name:'KISFF Kenya',                 result:"Chairman's Award",             year:'2025' },
  { name:'17th IDSFFK Kerala',          result:'Official Selection',           year:'2025' },
  { name:'IIFFB Boston',                result:'Official Selection',           year:'2025' },
  { name:'LIFF Lulea, Sweden',          result:'Finalist',                     year:'2025' },
  { name:'MLOFF Manchester',            result:'Official Selection',           year:'2026' },
  { name:'Kriti Film Club Delhi',       result:'Delhi Premiere',               year:'2026' },
  { name:'Istanbul Women Film Festival',result:'Semi Finalist',                year:'2026' },
];

const TESTIMONIALS = [
  { quote:'Every student must watch this. It changed how I see disability entirely.',       attr:'Principal, Delhi Public School, Bangalore'  },
  { quote:'We screened it for 500 employees. There wasn\'t a dry eye in the room.',         attr:'HR Director, TechCorp India, Hyderabad'     },
  { quote:'I cried, then I stood up and felt proud. This is what India truly is.',          attr:'Student, IIT Bombay'                        },
  { quote:'Goosebumps throughout. The most inspiring documentary of the decade.',           attr:'Film Critic, The Hindu'                     },
  { quote:'This belongs in every school curriculum. Not once a year — every year.',        attr:'Teacher, Kendriya Vidyalaya, Jaipur'        },
];

const CREW = [
  ['Directors',       'Shanthi Mohan & Mukund Moorthy'],
  ['Producers',       'Shanthi Mohan · Mukund Moorthy · Fazila Allana · Kamna Menzes · Bhuvanesh Shrivastava'],
  ['Script',          'Bhuvanesh Shrivastava'],
  ['DOP',             'Shanthi Mohan & Khushee Hegde'],
  ['Editor',          'Shahnawaz Khan & Swati Jaiswal'],
  ['Music',           'Lokesh Bakshi'],
  ['Sound Design',    'Suresh Raskar'],
  ['DI Colorist',     'Prathvish Hegde'],
  ['Post Production', 'Prerit Vyas'],
];

/* ─── HOOK: scroll-based fade-in ──────────────────────────────────── */
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── FADE BLOCK ───────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── DIVIDER ──────────────────────────────────────────────────────── */
function Divider() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'12px', margin:'0 auto', maxWidth:'120px' }}>
      <div style={{ flex:1, height:'1px', background:C.cyan, opacity:0.5 }} />
      <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:C.cyan }} />
      <div style={{ flex:1, height:'1px', background:C.cyan, opacity:0.5 }} />
    </div>
  );
}

/* ─── NAVBAR ───────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = [['#story','Story'],['#awards','Awards'],['#screenings','Screenings'],['#watch','Watch'],['#contact','Contact']];

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:1000,
      transition:'all 0.5s ease',
      background: scrolled ? 'rgba(6,18,43,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(77,184,212,0.15)' : 'none',
    }}>
      {/* Tricolor micro-stripe */}
      <div style={{ height:'2px', background:`linear-gradient(90deg, ${C.saffron} 33.3%, rgba(255,255,255,0.15) 33.3% 66.6%, ${C.green} 66.6%)` }} />

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 32px', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>

        {/* Logo */}
        <a href="#" style={{ textDecoration:'none', display:'flex', flexDirection:'column', lineHeight:1 }}>
          <span style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:800, fontSize:'1.15rem', color:C.white, letterSpacing:'0.04em', textTransform:'uppercase' }}>Dekh Le! India</span>
          <span style={{ fontFamily:'"Barlow",sans-serif', fontWeight:300, fontSize:'0.6rem', color:C.cyan, letterSpacing:'0.22em', textTransform:'uppercase', marginTop:'2px' }}>Documentary Film · 2024</span>
        </a>

        {/* Desktop */}
        <div className="d-nav" style={{ display:'flex', gap:'32px', alignItems:'center' }}>
          {navLinks.map(([h,l]) => (
            <a key={h} href={h} style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:400, fontSize:'0.875rem', letterSpacing:'0.14em', textTransform:'uppercase', color:C.dim, textDecoration:'none', transition:'color 0.25s' }}
               onMouseEnter={e => e.target.style.color=C.white}
               onMouseLeave={e => e.target.style.color=C.dim}>
              {l}
            </a>
          ))}
          <a href="https://www.jiohotstar.com/" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:600, fontSize:'0.8rem', letterSpacing:'0.18em', textTransform:'uppercase', color:C.navy, background:C.saffron, padding:'9px 22px', borderRadius:'2px', textDecoration:'none', transition:'all 0.25s', boxShadow:`0 0 20px rgba(245,166,35,0.4)` }}
            onMouseEnter={e => { e.currentTarget.style.background=C.white; e.currentTarget.style.boxShadow='0 0 28px rgba(245,166,35,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.background=C.saffron; e.currentTarget.style.boxShadow='0 0 20px rgba(245,166,35,0.4)'; }}>
            ▶ Watch Now
          </a>
        </div>

        {/* Hamburger */}
        <button className="m-nav" onClick={() => setMenuOpen(!menuOpen)}
          style={{ display:'none', background:'none', border:'1px solid rgba(255,255,255,0.15)', color:C.white, width:'38px', height:'38px', cursor:'pointer', fontSize:'1rem', borderRadius:'2px' }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background:'rgba(6,18,43,0.98)', padding:'20px 32px 28px', borderTop:'1px solid rgba(77,184,212,0.15)' }}>
          {navLinks.map(([h,l]) => (
            <a key={h} href={h} onClick={() => setMenuOpen(false)}
              style={{ display:'block', fontFamily:'"Barlow Condensed",sans-serif', fontWeight:400, fontSize:'1rem', letterSpacing:'0.12em', textTransform:'uppercase', color:C.dim, textDecoration:'none', padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              {l}
            </a>
          ))}
          <a href="https://www.jiohotstar.com/" target="_blank" rel="noopener noreferrer"
            style={{ display:'block', marginTop:'16px', textAlign:'center', background:C.saffron, color:C.navy, padding:'13px', fontFamily:'"Barlow Condensed",sans-serif', fontWeight:700, fontSize:'0.9rem', letterSpacing:'0.16em', textTransform:'uppercase', textDecoration:'none', borderRadius:'2px' }}>
            ▶ Watch on JioHotstar
          </a>
        </div>
      )}

      <style>{`
        @media(max-width:900px){.d-nav{display:none!important}.m-nav{display:flex!important;align-items:center;justify-content:center}}
        @media(max-width:500px){.award-grid{grid-template-columns:1fr!important}.stat-row{grid-template-columns:repeat(2,1fr)!important}}
      `}</style>
    </nav>
  );
}

/* ─── HERO ─────────────────────────────────────────────────────────── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section style={{
      position:'relative',
      minHeight:'100vh',
      display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',
      overflow:'hidden',
      background:`linear-gradient(170deg, ${C.navy} 0%, #091A3A 40%, #04101F 100%)`,
    }}>
      {/* Cinematic grain texture */}
      <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', opacity:0.04,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Radial light source — cricket ground spotlight */}
      <div style={{ position:'absolute', bottom:'-10%', left:'50%', transform:'translateX(-50%)', width:'140%', height:'75%', background:'radial-gradient(ellipse at 50% 100%, rgba(13,35,71,0.9) 0%, rgba(77,184,212,0.06) 35%, transparent 65%)', pointerEvents:'none', zIndex:2 }} />

      {/* Top cinematic letterbox */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'80px', background:`linear-gradient(to bottom, ${C.navy}, transparent)`, zIndex:3, pointerEvents:'none' }} />

      {/* Subtle grid */}
      <div style={{ position:'absolute', inset:0, zIndex:1, opacity:0.025, pointerEvents:'none',
        backgroundImage:`linear-gradient(rgba(77,184,212,1) 1px,transparent 1px),linear-gradient(90deg,rgba(77,184,212,1) 1px,transparent 1px)`,
        backgroundSize:'80px 80px',
      }} />

      {/* Glow orbs */}
      <div style={{ position:'absolute', top:'20%', left:'15%', width:'320px', height:'320px', borderRadius:'50%', background:'radial-gradient(circle, rgba(77,184,212,0.08) 0%, transparent 65%)', pointerEvents:'none', zIndex:2 }} />
      <div style={{ position:'absolute', bottom:'25%', right:'10%', width:'280px', height:'280px', borderRadius:'50%', background:'radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 65%)', pointerEvents:'none', zIndex:2 }} />

      {/* HERO CONTENT */}
      <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'120px 24px 80px', maxWidth:'1100px', width:'100%', margin:'0 auto' }}>

        {/* Pre-headline */}
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition:'opacity 1s ease 200ms, transform 1s ease 200ms',
          display:'flex', alignItems:'center', justifyContent:'center', gap:'12px', marginBottom:'28px',
        }}>
          <div style={{ width:'40px', height:'1px', background:C.cyan, opacity:0.7 }} />
          <span style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:400, fontSize:'0.72rem', letterSpacing:'0.3em', textTransform:'uppercase', color:C.cyan }}>
            A Documentary Film by Shanthi Mohan &amp; Mukund Moorthy
          </span>
          <div style={{ width:'40px', height:'1px', background:C.cyan, opacity:0.7 }} />
        </div>

        {/* MAIN TITLE */}
        <div style={{ overflow:'hidden', marginBottom:'8px' }}>
          <h1 style={{
            fontFamily:'"Barlow Condensed",sans-serif',
            fontWeight:900,
            fontSize:'clamp(4.5rem, 14vw, 11rem)',
            lineHeight:0.88,
            letterSpacing:'-0.02em',
            textTransform:'uppercase',
            color:C.white,
            margin:0,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            transition:'opacity 1.1s ease 400ms, transform 1.1s ease 400ms',
            textShadow:`0 0 80px rgba(77,184,212,0.15), 0 2px 0 rgba(0,0,0,0.5)`,
          }}>
            DEKH LE!
          </h1>
        </div>

        {/* INDIA — with flag colors accent */}
        <div style={{ overflow:'hidden', marginBottom:'28px', position:'relative', display:'inline-block' }}>
          {/* Saffron-white-green underline bar behind INDIA */}
          <div style={{ position:'absolute', bottom:'14%', left:0, right:0, height:'22%', background:`linear-gradient(90deg, ${C.saffron}33 0%, rgba(255,255,255,0.07) 33%, rgba(255,255,255,0.07) 66%, ${C.green}33 66%)`, pointerEvents:'none', zIndex:0 }} />
          <h1 style={{
            fontFamily:'"Barlow Condensed",sans-serif',
            fontWeight:900,
            fontSize:'clamp(4.5rem, 14vw, 11rem)',
            lineHeight:0.88,
            letterSpacing:'-0.02em',
            textTransform:'uppercase',
            color:C.cyan,
            margin:0,
            position:'relative', zIndex:1,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            transition:'opacity 1.1s ease 550ms, transform 1.1s ease 550ms',
            textShadow:`0 0 60px ${C.cyanGlow}, 0 2px 0 rgba(0,0,0,0.5)`,
          }}>
            INDIA
          </h1>
        </div>

        {/* Flag emoji — separate span avoids clip */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'scale(1)' : 'scale(0.8)',
          transition:'opacity 0.8s ease 700ms, transform 0.8s ease 700ms',
          fontSize:'clamp(2rem,5vw,3.2rem)', marginBottom:'36px',
        }}>
          🇮🇳
        </div>

        {/* Subtitle */}
        <p style={{
          fontFamily:'"Barlow",sans-serif',
          fontWeight:300,
          fontSize:'clamp(0.9rem,2vw,1.15rem)',
          lineHeight:1.7,
          color:C.dim,
          maxWidth:'560px',
          margin:'0 auto 16px',
          letterSpacing:'0.02em',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition:'opacity 1s ease 800ms, transform 1s ease 800ms',
        }}>
          An Inspiring Story of the First Ever<br />
          <strong style={{ color:C.white, fontWeight:500 }}>Blind Women's Cricket Team of India</strong>
        </p>

        {/* Tagline — italic cinematic */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition:'opacity 1s ease 950ms, transform 1s ease 950ms',
          marginBottom:'44px',
        }}>
          <p style={{
            fontFamily:'"Playfair Display",Georgia,serif',
            fontStyle:'italic',
            fontWeight:400,
            fontSize:'clamp(0.85rem,1.8vw,1.05rem)',
            color:C.faint,
            letterSpacing:'0.04em',
            margin:0,
          }}>
            "No Pity &nbsp;·&nbsp; No Sympathy &nbsp;·&nbsp; Just Give Us an Opportunity"
          </p>
        </div>

        {/* CTA row */}
        <div style={{
          display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition:'opacity 1s ease 1100ms, transform 1s ease 1100ms',
          marginBottom:'14px',
        }}>
          <a href="https://www.jiohotstar.com/" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.18em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 32px', background:C.saffron, color:C.navy, textDecoration:'none', borderRadius:'2px', boxShadow:`0 0 30px rgba(245,166,35,0.45), 0 4px 20px rgba(0,0,0,0.4)`, transition:'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 0 40px rgba(245,166,35,0.6), 0 8px 28px rgba(0,0,0,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 0 30px rgba(245,166,35,0.45), 0 4px 20px rgba(0,0,0,0.4)'; }}>
            <span>▶</span> Watch Now
          </a>
          <Link href="/contribute"
            style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:600, fontSize:'0.85rem', letterSpacing:'0.18em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 32px', background:'transparent', color:C.white, textDecoration:'none', border:'1px solid rgba(245,240,232,0.3)', borderRadius:'2px', transition:'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor='rgba(245,240,232,0.7)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(245,240,232,0.3)'; }}>
            🤍 Contribute
          </Link>
        </div>
        <p style={{ fontFamily:'"Barlow",sans-serif', fontWeight:300, fontSize:'0.7rem', letterSpacing:'0.1em', color:C.faint, textTransform:'uppercase', opacity: loaded ? 0.7 : 0, transition:'opacity 1s ease 1200ms' }}>
          Available on JioHotstar
        </p>

        {/* Stats bar */}
        <div className="stat-row" style={{
          display:'grid', gridTemplateColumns:'repeat(4,1fr)',
          gap:'1px', maxWidth:'720px', margin:'60px auto 0',
          background:'rgba(77,184,212,0.15)',
          borderRadius:'3px', overflow:'hidden',
          border:'1px solid rgba(77,184,212,0.2)',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition:'opacity 1s ease 1300ms, transform 1s ease 1300ms',
        }}>
          {[['10+','Festival Awards','🏆'],['10K+','People Reached','👥'],['50+','Screenings','🎬'],['8+','Countries','🌍']].map(([val,lbl,icon]) => (
            <div key={lbl} style={{ padding:'20px 12px', textAlign:'center', background:C.navyMid }}>
              <div style={{ fontSize:'1rem', marginBottom:'5px' }}>{icon}</div>
              <div style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:800, fontSize:'1.7rem', color:C.cyan, letterSpacing:'-0.02em' }}>{val}</div>
              <div style={{ fontFamily:'"Barlow",sans-serif', fontWeight:300, fontSize:'0.65rem', color:C.faint, letterSpacing:'0.1em', textTransform:'uppercase', marginTop:'3px' }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'180px', background:`linear-gradient(to top, ${C.navy}, transparent)`, zIndex:3, pointerEvents:'none' }} />

      {/* Scroll hint */}
      <div style={{ position:'absolute', bottom:'28px', left:'50%', transform:'translateX(-50%)', zIndex:10, opacity: loaded ? 0.45 : 0, transition:'opacity 1.2s ease 1600ms', display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
        <span style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:400, fontSize:'0.6rem', letterSpacing:'0.24em', textTransform:'uppercase', color:C.faint }}>Scroll</span>
        <div style={{ width:'1px', height:'36px', background:`linear-gradient(to bottom, ${C.cyan}88, transparent)`, animation:'pulse 2s ease-in-out infinite' }} />
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:0.4}50%{opacity:1}}`}</style>
    </section>
  );
}

/* ─── STORY SECTION ─────────────────────────────────────────────────── */
function StorySection() {
  return (
    <section id="story" style={{ padding:'120px 24px', background:`linear-gradient(180deg, ${C.navy} 0%, ${C.navyMid} 100%)`, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'50%', left:'-80px', transform:'translateY(-50%)', width:'360px', height:'360px', borderRadius:'50%', background:`radial-gradient(circle, rgba(77,184,212,0.06) 0%, transparent 60%)`, pointerEvents:'none' }} />

      <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:400, textTransform:'uppercase', letterSpacing:'0.28em', fontSize:'0.7rem', color:C.cyan, textAlign:'center', marginBottom:'16px' }}>The Film</p>
          <Divider />
          <h2 style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:800, textTransform:'uppercase', fontSize:'clamp(2rem,5vw,3.8rem)', color:C.white, textAlign:'center', lineHeight:1.05, letterSpacing:'-0.01em', marginTop:'20px', marginBottom:'52px' }}>
            They Played With Courage.<br />
            <span style={{ color:C.cyan }}>We Filmed With Love.</span>
          </h2>
        </FadeIn>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'2px' }}>
          {[
            { n:'01', icon:'👩‍🦯', title:'The Team',    body:"India's first blind women's cricket team — from 6 states, with no resources and infinite courage. Most had never held a bat before selection." },
            { n:'02', icon:'✈️',  title:'The Journey', body:'From dusty fields in Odisha, Maharashtra, Karnataka, Kerala, Jharkhand and UP — all the way to Edgbaston, Birmingham for the World Games.' },
            { n:'03', icon:'🏆',  title:'The Victory', body:'They won. Against all odds. Beat the world. And yet India barely noticed. This film makes sure the world never forgets.' },
            { n:'04', icon:'🎯',  title:'The Mission', body:'Every ticket, every screening, every rupee — funds skill training so these champions can build a livelihood from the game they love.' },
          ].map((item, i) => (
            <FadeIn key={item.n} delay={i * 100}>
              <div style={{ padding:'32px 28px', background:`rgba(255,255,255,0.03)`, borderTop:`1px solid rgba(77,184,212,0.2)`, borderBottom:'1px solid rgba(255,255,255,0.05)', height:'100%', transition:'background 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(77,184,212,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.03)'}>
                <div style={{ display:'flex', alignItems:'baseline', gap:'10px', marginBottom:'18px' }}>
                  <span style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:800, fontSize:'2.5rem', color:`rgba(77,184,212,0.2)`, lineHeight:1 }}>{item.n}</span>
                  <span style={{ fontSize:'1.4rem' }}>{item.icon}</span>
                </div>
                <h3 style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:700, fontSize:'1.1rem', letterSpacing:'0.08em', textTransform:'uppercase', color:C.white, marginBottom:'10px' }}>{item.title}</h3>
                <p style={{ fontFamily:'"Barlow",sans-serif', fontWeight:300, fontSize:'0.9rem', color:C.dim, lineHeight:1.75, margin:0 }}>{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Film specs */}
        <FadeIn delay={300}>
          <div style={{ marginTop:'48px', display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap' }}>
            {['Documentary','60 Minutes','Hindi & English','2024','India'].map(tag => (
              <span key={tag} style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:600, fontSize:'0.75rem', letterSpacing:'0.14em', textTransform:'uppercase', padding:'6px 16px', background:'transparent', color:C.cyan, border:`1px solid rgba(77,184,212,0.3)`, borderRadius:'2px' }}>{tag}</span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── AWARDS ──────────────────────────────────────────────────────── */
function AwardsSection() {
  return (
    <section id="awards" style={{ padding:'120px 24px', background:C.navy, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent, ${C.cyan}44, transparent)` }} />

      <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:400, textTransform:'uppercase', letterSpacing:'0.28em', fontSize:'0.7rem', color:C.cyan, textAlign:'center', marginBottom:'16px' }}>Recognition</p>
          <Divider />
          <h2 style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:800, textTransform:'uppercase', fontSize:'clamp(2rem,5vw,3.8rem)', color:C.white, textAlign:'center', lineHeight:1.05, marginTop:'20px', marginBottom:'14px' }}>
            Awards &amp; Festival Selections
          </h2>
          <p style={{ fontFamily:'"Barlow",sans-serif', fontWeight:300, fontSize:'1rem', color:C.faint, textAlign:'center', marginBottom:'56px' }}>
            Recognised across <span style={{ color:C.cyan }}>8+ countries</span> at prestigious international film festivals
          </p>
        </FadeIn>

        <div className="award-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1px', background:'rgba(77,184,212,0.1)', border:'1px solid rgba(77,184,212,0.1)' }}>
          {AWARDS.map((a, i) => {
            const accent = i%3===0 ? C.saffron : i%3===1 ? C.cyan : `rgba(46,139,87,0.8)`;
            return (
              <FadeIn key={i} delay={(i%3)*80}>
                <div style={{ padding:'24px 22px', background:C.navyMid, display:'flex', gap:'16px', alignItems:'flex-start', transition:'background 0.3s', cursor:'default', borderLeft:`3px solid ${accent}` }}
                  onMouseEnter={e => e.currentTarget.style.background=C.navyUp}
                  onMouseLeave={e => e.currentTarget.style.background=C.navyMid}>
                  <div>
                    <p style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:700, fontSize:'0.95rem', letterSpacing:'0.04em', color:C.white, marginBottom:'4px' }}>{a.name}</p>
                    <p style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:600, fontSize:'0.85rem', color:accent, marginBottom:'2px' }}>{a.result}</p>
                    <p style={{ fontFamily:'"Barlow",sans-serif', fontWeight:300, fontSize:'0.72rem', color:C.faint, letterSpacing:'0.06em' }}>{a.year}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ───────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section style={{ padding:'120px 24px', background:`linear-gradient(180deg, ${C.navy} 0%, #04101F 100%)` }}>
      <div style={{ position:'absolute', left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent, ${C.saffron}44, transparent)` }} />

      <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:400, textTransform:'uppercase', letterSpacing:'0.28em', fontSize:'0.7rem', color:C.cyan, textAlign:'center', marginBottom:'16px' }}>Voices</p>
          <Divider />
          <h2 style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:800, textTransform:'uppercase', fontSize:'clamp(2rem,5vw,3.8rem)', color:C.white, textAlign:'center', lineHeight:1.05, marginTop:'20px', marginBottom:'56px' }}>
            What People Are Saying
          </h2>
        </FadeIn>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1px', background:'rgba(77,184,212,0.08)', border:'1px solid rgba(77,184,212,0.08)' }}>
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={i} delay={i*80}>
              <div style={{ padding:'32px 26px', background:C.navyMid, height:'100%', transition:'background 0.3s', borderTop:`2px solid ${i%2===0?C.saffron:C.cyan}` }}
                onMouseEnter={e => e.currentTarget.style.background=C.navyUp}
                onMouseLeave={e => e.currentTarget.style.background=C.navyMid}>
                <p style={{ fontFamily:'"Playfair Display",Georgia,serif', fontStyle:'italic', fontSize:'1.1rem', color:i%2===0?C.saffron:C.cyan, lineHeight:1, marginBottom:'14px' }}>❝</p>
                <p style={{ fontFamily:'"Barlow",sans-serif', fontWeight:300, fontSize:'0.92rem', color:C.dim, lineHeight:1.75, marginBottom:'18px', fontStyle:'italic' }}>{t.quote}</p>
                <p style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:600, fontSize:'0.72rem', color:C.faint, letterSpacing:'0.1em', textTransform:'uppercase' }}>— {t.attr}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SCREENINGS ─────────────────────────────────────────────────── */
function Screenings() {
  return (
    <section id="screenings" style={{ padding:'120px 24px', background:'#04101F' }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:400, textTransform:'uppercase', letterSpacing:'0.28em', fontSize:'0.7rem', color:C.cyan, textAlign:'center', marginBottom:'16px' }}>Reach</p>
          <Divider />
          <h2 style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:800, textTransform:'uppercase', fontSize:'clamp(2rem,5vw,3.8rem)', color:C.white, textAlign:'center', lineHeight:1.05, marginTop:'20px', marginBottom:'56px' }}>
            Where It Has Been Screened
          </h2>
        </FadeIn>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1px', background:'rgba(77,184,212,0.1)', border:'1px solid rgba(77,184,212,0.1)', marginBottom:'2px' }}>
          {[['🏫','50+','Schools',C.cyan],['🏢','10+','Companies',C.saffron],['🎥','10+','Film Festivals',`rgba(46,139,87,0.9)`],['👥','10K+','People Reached',C.cyan]].map(([icon,val,lbl,accent]) => (
            <FadeIn key={lbl}>
              <div style={{ padding:'36px 20px', textAlign:'center', background:C.navyMid, borderTop:`3px solid ${accent}` }}>
                <div style={{ fontSize:'1.8rem', marginBottom:'10px' }}>{icon}</div>
                <div style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:900, fontSize:'2.6rem', color:accent, letterSpacing:'-0.03em', lineHeight:1 }}>{val}</div>
                <div style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:400, fontSize:'0.75rem', color:C.faint, letterSpacing:'0.16em', textTransform:'uppercase', marginTop:'6px' }}>{lbl}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Venues */}
        <FadeIn delay={200}>
          <div style={{ marginTop:'2px', padding:'28px', background:C.navyMid, border:'1px solid rgba(77,184,212,0.1)' }}>
            <p style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:600, fontSize:'0.72rem', letterSpacing:'0.2em', textTransform:'uppercase', color:C.faint, textAlign:'center', marginBottom:'18px' }}>Notable Venues &amp; Premieres</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', justifyContent:'center' }}>
              {['Kriti Film Club · Delhi Premiere','IIT Bombay','DPS Bengaluru','Infosys Campus, Pune','TISS Mumbai','Kendriya Vidyalaya, Jaipur','Jain University, Bengaluru'].map(v => (
                <span key={v} style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:400, fontSize:'0.78rem', letterSpacing:'0.06em', padding:'6px 14px', background:'rgba(77,184,212,0.08)', color:C.dim, border:'1px solid rgba(77,184,212,0.2)', borderRadius:'2px' }}>
                  📍 {v}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── VIDEO ──────────────────────────────────────────────────────── */
function WatchSection() {
  const [active, setActive] = useState('sizzle');
  const videos = {
    sizzle:{ id:'h_JVTDhF6RY', label:'Sizzle Reel', icon:'🎬', desc:'The cinematic sizzle reel of Dekh Le! India' },
    song:  { id:'mgFde16-J7c', label:'Film Song',   icon:'🎵', desc:'The official song — music by Lokesh Bakshi' },
  };

  return (
    <section id="watch" style={{ padding:'120px 24px', background:C.navy }}>
      <div style={{ maxWidth:'980px', margin:'0 auto' }}>
        <FadeIn>
          <p style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:400, textTransform:'uppercase', letterSpacing:'0.28em', fontSize:'0.7rem', color:C.cyan, textAlign:'center', marginBottom:'16px' }}>Watch</p>
          <Divider />
          <h2 style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:800, textTransform:'uppercase', fontSize:'clamp(2rem,5vw,3.8rem)', color:C.white, textAlign:'center', lineHeight:1.05, marginTop:'20px', marginBottom:'36px' }}>
            Watch the Film
          </h2>

          {/* Switcher */}
          <div style={{ display:'flex', gap:'2px', justifyContent:'center', marginBottom:'14px', background:'rgba(77,184,212,0.1)', display:'inline-flex', border:'1px solid rgba(77,184,212,0.2)', borderRadius:'2px', overflow:'hidden', margin:'0 auto 14px', padding:0 }}>
            {Object.entries(videos).map(([key,v]) => (
              <button key={key} onClick={() => setActive(key)}
                style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:600, fontSize:'0.78rem', letterSpacing:'0.16em', textTransform:'uppercase', padding:'10px 24px', cursor:'pointer', border:'none', transition:'all 0.2s',
                  background: active===key ? C.saffron : 'transparent',
                  color: active===key ? C.navy : C.dim,
                }}>
                {v.icon} {v.label}
              </button>
            ))}
          </div>
          <p style={{ fontFamily:'"Barlow",sans-serif', fontWeight:300, fontSize:'0.8rem', color:C.faint, textAlign:'center', marginBottom:'24px', letterSpacing:'0.04em' }}>{videos[active].desc}</p>
        </FadeIn>

        {/* Embed */}
        <FadeIn delay={100}>
          <div style={{ position:'relative', paddingBottom:'56.25%', height:0, border:`1px solid rgba(77,184,212,0.25)`, boxShadow:`0 0 80px rgba(0,0,0,0.6), 0 0 40px rgba(77,184,212,0.1)` }}>
            <iframe key={active} src={`https://www.youtube.com/embed/${videos[active].id}?rel=0`}
              title={videos[active].label}
              style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </FadeIn>

        {/* Links */}
        <FadeIn delay={150}>
          <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap', marginTop:'22px' }}>
            {[{href:'https://www.youtube.com/watch?v=h_JVTDhF6RY',label:'🎬 Sizzle on YouTube'},{href:'https://www.youtube.com/watch?v=mgFde16-J7c',label:'🎵 Song on YouTube'}].map(l => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:400, fontSize:'0.75rem', letterSpacing:'0.12em', textTransform:'uppercase', padding:'8px 18px', background:'transparent', color:C.faint, border:'1px solid rgba(255,255,255,0.1)', textDecoration:'none', transition:'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color=C.white; e.currentTarget.style.borderColor='rgba(255,255,255,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.color=C.faint; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; }}>
                {l.label}
              </a>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:'28px' }}>
            <a href="https://www.jiohotstar.com/" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.2em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 36px', background:C.saffron, color:C.navy, textDecoration:'none', borderRadius:'2px', boxShadow:`0 0 28px rgba(245,166,35,0.4)` }}>
              ▶ Watch Full Film on JioHotstar
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section style={{ padding:'140px 24px', background:`linear-gradient(170deg, #04101F 0%, ${C.navyMid} 100%)`, position:'relative', overflow:'hidden', textAlign:'center' }}>
      <div style={{ position:'absolute', inset:0, opacity:0.025, pointerEvents:'none',
        backgroundImage:`linear-gradient(rgba(77,184,212,1) 1px,transparent 1px),linear-gradient(90deg,rgba(77,184,212,1) 1px,transparent 1px)`,
        backgroundSize:'80px 80px',
      }} />
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle, rgba(77,184,212,0.06) 0%, transparent 60%)', pointerEvents:'none' }} />

      <div style={{ maxWidth:'700px', margin:'0 auto', position:'relative' }}>
        <FadeIn>
          <span style={{ fontSize:'2.5rem', display:'block', marginBottom:'24px' }}>🇮🇳</span>
          <h2 style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:900, textTransform:'uppercase', fontSize:'clamp(1.8rem,5vw,3.5rem)', color:C.white, lineHeight:1.1, letterSpacing:'-0.01em', marginBottom:'20px' }}>
            A Movement to Bring This Film<br />to Every School &amp; Workplace<br />
            <span style={{ color:C.cyan }}>in India.</span>
          </h2>
          <p style={{ fontFamily:'"Barlow",sans-serif', fontWeight:300, fontSize:'1rem', color:C.faint, lineHeight:1.75, marginBottom:'44px', maxWidth:'500px', margin:'0 auto 44px' }}>
            Help us reach 1 million viewers. Every screening, every contribution, every share — brings us closer to a more inclusive India.
          </p>
          <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contribute"
              style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.2em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:'8px', padding:'14px 32px', background:C.saffron, color:C.navy, textDecoration:'none', borderRadius:'2px', boxShadow:`0 0 28px rgba(245,166,35,0.4)` }}>
              💛 Contribute Now
            </Link>
            <a href="https://www.jiohotstar.com/" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:600, fontSize:'0.85rem', letterSpacing:'0.2em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:'8px', padding:'14px 32px', background:'transparent', color:C.white, textDecoration:'none', border:'1px solid rgba(245,240,232,0.25)', borderRadius:'2px' }}>
              ▶ Watch the Film
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer id="contact" style={{ background:'#020A18', padding:'64px 24px 28px' }}>
      <div style={{ height:'1px', background:`linear-gradient(90deg, ${C.saffron}66, rgba(255,255,255,0.1), ${C.green}66)`, marginBottom:'52px' }} />

      <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'40px', marginBottom:'52px' }}>

          {/* Brand */}
          <div>
            <p style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:800, fontSize:'1.1rem', letterSpacing:'0.06em', textTransform:'uppercase', color:C.white, marginBottom:'4px' }}>Dekh Le! India</p>
            <p style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:300, fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:C.cyan, marginBottom:'18px' }}>Documentary Film · 2024</p>
            <p style={{ fontFamily:'"Barlow",sans-serif', fontWeight:300, fontSize:'0.84rem', color:'rgba(245,240,232,0.35)', lineHeight:1.7 }}>
              A documentary about India's first blind women's cricket team and their extraordinary journey to the World Games.
            </p>
          </div>

          {/* Links */}
          <div>
            <p style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:600, fontSize:'0.65rem', letterSpacing:'0.22em', textTransform:'uppercase', color:C.cyan, marginBottom:'18px' }}>Navigate</p>
            {[['#story','Story'],['#awards','Awards'],['#screenings','Screenings'],['#watch','Watch'],['contribute','Contribute']].map(([h,l]) => (
              <a key={h} href={h.startsWith('#')?h:`/${h}`}
                style={{ display:'block', fontFamily:'"Barlow",sans-serif', fontWeight:300, fontSize:'0.875rem', color:'rgba(245,240,232,0.4)', textDecoration:'none', marginBottom:'8px', transition:'color 0.2s' }}
                onMouseEnter={e => e.target.style.color=C.white}
                onMouseLeave={e => e.target.style.color='rgba(245,240,232,0.4)'}>
                {l}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:600, fontSize:'0.65rem', letterSpacing:'0.22em', textTransform:'uppercase', color:C.cyan, marginBottom:'18px' }}>Contact</p>
            <a href="mailto:m_moorthy@yahoo.com" style={{ display:'block', fontFamily:'"Barlow",sans-serif', fontWeight:400, fontSize:'0.875rem', color:C.saffron, textDecoration:'none', marginBottom:'8px' }}>m_moorthy@yahoo.com</a>
            <a href="tel:+919880214587" style={{ display:'block', fontFamily:'"Barlow",sans-serif', fontWeight:300, fontSize:'0.875rem', color:'rgba(245,240,232,0.4)', textDecoration:'none', marginBottom:'12px' }}>+91-9880214587</a>
            <p style={{ fontFamily:'"Barlow",sans-serif', fontWeight:300, fontSize:'0.84rem', color:'rgba(245,240,232,0.4)', lineHeight:1.6 }}>
              Dir. Shanthi Mohan<br />&amp; Mukund Moorthy
            </p>
          </div>

          {/* Production */}
          <div>
            <p style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:600, fontSize:'0.65rem', letterSpacing:'0.22em', textTransform:'uppercase', color:C.cyan, marginBottom:'18px' }}>Production</p>
            {CREW.slice(0,5).map(([role,names]) => (
              <div key={role} style={{ marginBottom:'8px' }}>
                <span style={{ fontFamily:'"Barlow Condensed",sans-serif', fontWeight:600, fontSize:'0.65rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(245,240,232,0.3)' }}>{role}: </span>
                <span style={{ fontFamily:'"Barlow",sans-serif', fontWeight:300, fontSize:'0.78rem', color:'rgba(245,240,232,0.5)' }}>{names}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:'22px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
          <p style={{ fontFamily:'"Barlow",sans-serif', fontWeight:300, fontSize:'0.72rem', color:'rgba(245,240,232,0.2)', letterSpacing:'0.04em' }}>
            © {new Date().getFullYear()} Dekh Le! India. The Loose Canon · Sol Production · DejaVu Arts.
          </p>
          <div style={{ display:'flex', gap:'5px' }}>
            {[C.saffron,'rgba(255,255,255,0.25)',C.green].map((c,i) => (
              <div key={i} style={{ width:'8px', height:'8px', borderRadius:'50%', background:c }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Head>
        <title>Dekh Le! India 🇮🇳 — Documentary Film</title>
        <meta name="description" content="An Inspiring Story of the First Ever Blind Women's Cricket Team of India. 10+ International Awards." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Dekh Le! India 🇮🇳" />
        <meta property="og:description" content="No Pity. No Sympathy. Just Give Us an Opportunity." />
        <style dangerouslySetInnerHTML={{ __html: FONTS }} />
        <style dangerouslySetInnerHTML={{ __html: `
          * { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          body { background: #06122B; }
          ::selection { background: rgba(77,184,212,0.3); color: #F5F0E8; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #06122B; }
          ::-webkit-scrollbar-thumb { background: #1A4F8A; border-radius: 2px; }
        `}} />
      </Head>

      <Navbar />
      <main>
        <Hero />
        <StorySection />
        <AwardsSection />
        <Testimonials />
        <Screenings />
        <WatchSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
