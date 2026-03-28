// pages/index.jsx
// Dekh Le! India — Premium Cinematic Redesign
// Netflix / NatGeo inspired · Bebas Neue · Dark blue cricket jersey theme
// Sections: Hero · Gallery · Story · Accolades · Reactions · Blog · Impact · CTA

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────────────────────────── */
const T = {
  navy:      '#0A1F44',
  navyDark:  '#060F22',
  navyMid:   '#123A73',
  navyUp:    '#1A4F8A',
  black:     '#030810',
  accent:    '#00BFFF',
  accentDim: 'rgba(0,191,255,0.18)',
  accentGlow:'rgba(0,191,255,0.35)',
  saffron:   '#FF9933',
  green:     '#2E8B57',
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
  { icon:'🎞️', name:'MLIFF Manchester',              result:'Official Selection',            year:'2026' },
  { icon:'🌺', name:'Istanbul Women Film Festival',  result:'Semi Finalist',                year:'2026' },
];

const IMPACT_STATS = [
  { value:'10K+',  label:'People Reached',    icon:'👥' },
  { value:'50+',   label:'School Screenings', icon:'🏫' },
  { value:'10+',   label:'Companies',         icon:'🏢' },
  { value:'10+',   label:'Awards Won',        icon:'🏆' },
  { value:'8+',    label:'Countries',         icon:'🌍' },
  { value:'10',    label:'States Covered',    icon:'🗺️' },
  // Updated Cricket team statistics
  { value:'100+',  label:'Matches Played',    icon:'🏏' },
  { value:'10+',   label:'Tournaments Won',   icon:'🥇' },
  { value:'1',     label:'World Cup Win',      icon:'🏆' },
];

const GALLERY_ITEMS = [
  { src: '/images/pm.jpeg', caption: 'Honored by the Prime Minister', alt: 'Meeting with the Prime Minister' },
  { src: '/images/trophy.jpeg', caption: 'World Cup Victory Celebration', alt: 'World Cup trophy celebration' },
  { src: '/images/president.jpeg', caption: 'Meeting with the President of India', alt: 'Meeting with the President' },
  { src: '/images/reliance.png', caption: 'Recognized by Reliance Foundation', alt: 'Reliance Foundation recognition' },
  { src: '/images/bcci.jpeg', caption: 'BCCI Announces Major Support', alt: 'BCCI support announcement' },
  { src: '/images/t20.jpeg', caption: "India Wins First Blind T20 Women's World Cup", alt: 'T20 World Cup victory' },
];

/* ─────────────────────────────────────────────────────────────────
   SCROLL FADE HOOK & REUSABLE COMPONENTS
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

function SectionEyebrow({ label }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', marginBottom:'18px' }}>
      <div style={{ height:'1px', width:'40px', background:T.accent, opacity:0.7 }} />
      <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.75rem', letterSpacing:'0.35em', textTransform:'uppercase', color:T.accent }}>
        {label}
      </span>
      <div style={{ height:'1px', width:'40px', background:T.accent, opacity:0.7 }} />
    </div>
  );
}

function SectionTitle({ children, light = false }) {
  return (
    <h2 style={{
      fontFamily:'"Bebas Neue",sans-serif', fontWeight:400,
      fontSize:'clamp(2.4rem, 6vw, 5rem)', letterSpacing:'0.04em', lineHeight:1.0,
      color: light ? T.navyDark : T.white, textAlign:'center', margin:'0 0 14px',
    }}>
      {children}
    </h2>
  );
}

function Btn({ href, children, primary = true, external = false }) {
  const base = {
    fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.9rem',
    letterSpacing:'0.22em', textTransform:'uppercase',
    display:'inline-flex', alignItems:'center', gap:'10px', padding:'13px 34px',
    textDecoration:'none', transition:'all 0.25s', cursor:'pointer', border:'none',
  };
  const style = primary
    ? { ...base, background:T.saffron, color:T.navyDark, boxShadow:`0 0 28px rgba(255,153,51,0.5)` }
    : { ...base, background:'transparent', color:T.white, border:`1px solid rgba(240,237,232,0.3)` };

  if (external) return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={style}
      onMouseEnter={e => primary ? e.currentTarget.style.boxShadow='0 0 42px rgba(255,153,51,0.7)' : e.currentTarget.style.borderColor='rgba(240,237,232,0.7)'}
      onMouseLeave={e => primary ? e.currentTarget.style.boxShadow='0 0 28px rgba(255,153,51,0.5)' : e.currentTarget.style.borderColor='rgba(240,237,232,0.3)'}>
      {children}
    </a>
  );
  return (
    <Link href={href} style={style}
      onMouseEnter={e => primary ? e.currentTarget.style.boxShadow='0 0 42px rgba(255,153,51,0.7)' : e.currentTarget.style.borderColor='rgba(240,237,232,0.7)'}
      onMouseLeave={e => primary ? e.currentTarget.style.boxShadow='0 0 28px rgba(255,153,51,0.5)' : e.currentTarget.style.borderColor='rgba(240,237,232,0.3)'}>
      {children}
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────
   GALLERY SECTION
───────────────────────────────────────────────────────────────── */
function Gallery() {
  return (
    <section id="gallery" style={{ padding: '100px 24px', background: T.black }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <FadeUp>
          <SectionEyebrow label="Gallery" />
          <SectionTitle>Moments of Pride</SectionTitle>
          <div className="gallery-grid" style={{ 
            display: 'grid', 
            gap: '20px', 
            marginTop: '50px'
          }}>
            {GALLERY_ITEMS.map((item, idx) => (
              <div key={idx} className="gallery-item" style={{ 
                position: 'relative', 
                overflow: 'hidden', 
                borderRadius: '8px',
                aspectRatio: '4/3',
                background: T.navyDark,
                border: `1px solid ${T.ghost}`
              }}>
                <div className="img-wrapper" style={{ 
                  width: '100%', 
                  height: '100%', 
                  transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)'
                }}>
                  <Image 
                    src={item.src} 
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(3,8,16,0.95) 0%, transparent 40%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '20px',
                  pointerEvents: 'none'
                }}>
                  <p style={{ 
                    fontFamily: '"Inter", sans-serif', 
                    fontSize: '0.9rem', 
                    color: T.white, 
                    fontWeight: 500,
                    lineHeight: 1.4,
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}>
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
      <style jsx>{`
        .gallery-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) {
          .gallery-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .gallery-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .gallery-item:hover .img-wrapper {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN PAGE COMPONENT
───────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Dekh Le! India — Documentary Film</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html:`
          *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
          html { scroll-behavior:smooth; }
          body { background:#030810; color:#F0EDE8; font-family: 'Inter', sans-serif; }
          ::selection { background:rgba(0,191,255,0.3); color:#fff; }
          .stat-grid { display: grid; gap: 20px; grid-template-columns: repeat(3, 1fr); }
          @media(max-width:480px){
            .stat-grid { grid-template-columns:repeat(2,1fr)!important; }
          }
        `}} />
      </Head>

      <main>
        {/* Hero Section Placeholder */}
        <section style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: T.navyDark }}>
          <SectionTitle>DEKH LE! INDIA</SectionTitle>
        </section>

        <Gallery />

        {/* Stats Section */}
        <section id="impact" style={{ padding: '100px 24px', background: T.black }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <FadeUp>
              <SectionEyebrow label="Our Journey" />
              <SectionTitle>By The Numbers</SectionTitle>
              <div className="stat-grid" style={{ marginTop: '50px' }}>
                {IMPACT_STATS.map((stat, idx) => (
                  <div key={idx} style={{ textAlign: 'center', padding: '30px', border: `1px solid ${T.ghost}`, background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{stat.icon}</div>
                    <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '3rem', color: T.accent, lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em', marginTop: '5px', color: T.dim }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>
      </main>
    </>
  );
}
