// pages/index.jsx
// Dekh Le! India — Premium Cinematic Redesign
// Netflix / NatGeo inspired · Bebas Neue · Dark blue cricket jersey theme
// Sections: Hero · Gallery · Watch · Story · Accolades · Reactions · Blog · Impact

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
const IMPACT_STATS = [
  { value:'10K+',  label:'People Reached',    icon:'👥' },
  { value:'50+',   label:'School Screenings', icon:'🏫' },
  { value:'10+',   label:'Companies',         icon:'🏢' },
  { value:'10+',   label:'Awards Won',        icon:'🏆' },
  { value:'8+',    label:'Countries',         icon:'🌍' },
  { value:'10',    label:'States Covered',    icon:'🗺️' },
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
   HOOKS & REUSABLE COMPONENTS
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

function Btn({ href, children, primary = true, external = false, onClick }) {
  const base = {
    fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.9rem',
    letterSpacing:'0.22em', textTransform:'uppercase',
    display:'inline-flex', alignItems:'center', gap:'10px', padding:'13px 34px',
    textDecoration:'none', transition:'all 0.25s', cursor:'pointer', border:'none',
  };
  const style = primary
    ? { ...base, background:T.saffron, color:T.navyDark, boxShadow:`0 0 28px rgba(255,153,51,0.5)` }
    : { ...base, background:'transparent', color:T.white, border:`1px solid rgba(240,237,232,0.3)` };

  if (onClick) return (
    <button onClick={onClick} style={style}
      onMouseEnter={e => primary ? e.currentTarget.style.boxShadow='0 0 42px rgba(255,153,51,0.7)' : e.currentTarget.style.borderColor='rgba(240,237,232,0.7)'}
      onMouseLeave={e => primary ? e.currentTarget.style.boxShadow='0 0 28px rgba(255,153,51,0.5)' : e.currentTarget.style.borderColor='rgba(240,237,232,0.3)'}>
      {children}
    </button>
  );

  if (external) return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={style}>
      {children}
    </a>
  );
  return (
    <Link href={href} style={style}>{children}</Link>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MODAL & LOGIC
───────────────────────────────────────────────────────────────── */
function DonationModal({ onClose }) {
  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(3,8,16,0.9)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
      <div style={{ background:T.navyDark, border:`1px solid ${T.accentDim}`, padding:'40px', maxWidth:'440px', width:'100%', position:'relative', borderRadius:'4px' }}>
        <button onClick={onClose} style={{ position:'absolute', top:'15px', right:'15px', background:'none', border:'none', color:T.dim, cursor:'pointer' }}>✕</button>
        <SectionEyebrow label="Support" />
        <h3 style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:'2rem', color:T.white, textAlign:'center', marginBottom:'15px' }}>Back the Movement</h3>
        <p style={{ color:T.dim, fontSize:'0.9rem', textAlign:'center', lineHeight:1.6, marginBottom:'25px' }}>Your contribution helps us provide equipment and training for blind cricketers across India.</p>
        <Btn href="#" primary style={{ width:'100%', justifyContent:'center' }}>Proceed to Donate</Btn>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTIONS
───────────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{ position:'fixed', top:0, width:'100%', zIndex:1000, transition:'0.3s', padding: scrolled ? '15px 40px' : '25px 40px', background: scrolled ? 'rgba(3,8,16,0.95)' : 'transparent', borderBottom: scrolled ? `1px solid ${T.ghost}` : 'none' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', maxWidth:'1280px', margin:'0 auto' }}>
        <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:'1.5rem', color:T.white, letterSpacing:'2px' }}>DEKH LE! INDIA</span>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <a href="#gallery" style={{ color:T.dim, textDecoration:'none', fontFamily:'"Bebas Neue",sans-serif', fontSize:'0.9rem', letterSpacing:'1px' }}>Gallery</a>
          <a href="#impact" style={{ color:T.dim, textDecoration:'none', fontFamily:'"Bebas Neue",sans-serif', fontSize:'0.9rem', letterSpacing:'1px' }}>Impact</a>
          <Btn href="#watch" primary={false}>Watch Trailer</Btn>
        </div>
      </div>
    </nav>
  );
}

function Hero({ onDonate }) {
  return (
    <section style={{ position:'relative', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', background:T.black }}>
      <div style={{ position:'absolute', inset:0, zIndex:1, background:'radial-gradient(circle, transparent 20%, rgba(3,8,16,0.8) 100%)' }} />
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
         <iframe src="https://www.youtube.com/embed/h_JVTDhF6RY?autoplay=1&mute=1&loop=1&playlist=h_JVTDhF6RY&controls=0&showinfo=0" style={{ width:'100vw', height:'56.25vw', minHeight:'100vh', minWidth:'177.77vh', position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', opacity:0.4 }} />
      </div>
      <div style={{ position:'relative', zIndex:10, textAlign:'center' }}>
        <FadeUp>
          <SectionEyebrow label="A Film By Mukund Moorthy" />
          <h1 style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:'clamp(5rem, 15vw, 12rem)', color:T.white, lineHeight:0.9, marginBottom:'20px' }}>DEKH LE! INDIA</h1>
          <p style={{ fontFamily:'"Inter",sans-serif', color:T.dim, fontSize:'1.2rem', maxWidth:'600px', margin:'0 auto 40px' }}>The untold story of India's Blind Women's Cricket Team. Resilience, redefined.</p>
          <div style={{ display:'flex', gap:'15px', justifyContent:'center' }}>
            <Btn href="https://www.jiohotstar.com/" external>▶ Watch Film</Btn>
            <Btn onClick={onDonate} primary={false}>🤍 Contribute</Btn>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" style={{ padding: '100px 24px', background: T.black }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <FadeUp>
          <SectionEyebrow label="Gallery" />
          <SectionTitle>Moments of Pride</SectionTitle>
          <div className="gallery-grid">
            {GALLERY_ITEMS.map((item, idx) => (
              <div key={idx} className="gallery-item">
                <div className="img-wrapper">
                  <Image 
                    src={item.src} 
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
                <div className="overlay">
                  <p>{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
      <style jsx>{`
        .gallery-grid {
          display: grid;
          gap: 20px;
          margin-top: 50px;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) { .gallery-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .gallery-grid { grid-template-columns: repeat(4, 1fr); } }
        
        .gallery-item {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          aspect-ratio: 4/3;
          background: ${T.navyDark};
          border: 1px solid ${T.ghost};
        }
        .img-wrapper {
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .gallery-item:hover .img-wrapper { transform: scale(1.1); }
        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(3,8,16,0.95) 0%, transparent 50%);
          display: flex;
          align-items: flex-end;
          padding: 20px;
          pointer-events: none;
        }
        .overlay p {
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          color: white;
          font-weight: 500;
        }
      `}</style>
    </section>
  );
}

function WatchSection() {
  return (
    <section id="watch" style={{ padding:'100px 24px', background:T.black }}>
      <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
        <FadeUp>
          <SectionEyebrow label="Trailer" />
          <SectionTitle>Watch the Sizzle</SectionTitle>
          <div style={{ position:'relative', paddingBottom:'56.25%', height:0, marginTop:'40px', border:`1px solid ${T.accentDim}` }}>
            <iframe src="https://www.youtube.com/embed/h_JVTDhF6RY" style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }} allowFullScreen />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const [showDonate, setShowDonate] = useState(false);

  return (
    <>
      <Head>
        <title>Dekh Le! India — Documentary Film</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html:`
          *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
          html { scroll-behavior:smooth; }
          body { background:#030810; color:#F0EDE8; font-family: 'Inter', sans-serif; overflow-x:hidden; }
          .stat-grid { display: grid; gap: 20px; grid-template-columns: repeat(3, 1fr); }
          @media(max-width:480px){ .stat-grid { grid-template-columns:repeat(2,1fr)!important; } }
        `}} />
      </Head>

      <Navbar />
      
      <main>
        <Hero onDonate={() => setShowDonate(true)} />
        
        <Gallery />
        
        <WatchSection />

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

      {showDonate && <DonationModal onClose={() => setShowDonate(false)} />}
      
      <footer style={{ padding:'60px 24px', background:T.navyDark, textAlign:'center', borderTop:`1px solid ${T.ghost}` }}>
        <p style={{ color:T.faint, fontSize:'0.8rem', letterSpacing:'2px' }}>© 2026 DEKH LE! INDIA · ALL RIGHTS RESERVED</p>
      </footer>
    </>
  );
}
