// pages/index.jsx — Dekh Le! India
// Dark blue India cricket jersey theme · All real awards from poster

import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/* ─── COLOR PALETTE ──────────────────────────────────────────────────
   Primary  : #0A1F44  (deep navy — India cricket jersey)
   Mid Blue : #123A73  (rich blue)
   Accent   : #00B4D8  (cyan highlight)
   Saffron  : #FF9933  (minimal — Indian flag)
   Green    : #138808  (minimal — Indian flag)
   White    : #FFFFFF
   Light    : #E8F4FD  (pale blue-white)
   Muted    : rgba(255,255,255,0.55)
──────────────────────────────────────────────────────────────────── */
const C = {
  navy:      '#0A1F44',
  navyMid:   '#123A73',
  navyLight: '#1A4F8A',
  cyan:      '#00B4D8',
  cyanDim:   'rgba(0,180,216,0.15)',
  cyanBorder:'rgba(0,180,216,0.35)',
  saffron:   '#FF9933',
  green:     '#138808',
  white:     '#FFFFFF',
  offWhite:  '#F0F6FF',
  light:     '#E8F4FD',
  card:      'rgba(255,255,255,0.06)',
  cardBorder:'rgba(255,255,255,0.1)',
  text:      'rgba(255,255,255,0.9)',
  muted:     'rgba(255,255,255,0.55)',
  faint:     'rgba(255,255,255,0.25)',
};

/* ─── DATA (all from poster) ─────────────────────────────────────── */
const AWARDS = [
  { icon:'🏆', name:'CLEF Music Awards',              result:'Winner — Best Lyrics',       year:'2025' },
  { icon:'🎸', name:'CLEF Music Awards',              result:'Winner — Best Rock Guitarist', year:'2025' },
  { icon:'🎬', name:'NCIFF Nepal',                    result:'Winner — Best Director',      year:'2026' },
  { icon:'🥇', name:'KISFF Kenya',                    result:"Chairman's Award",             year:'2025' },
  { icon:'🎭', name:'17th IDSFFK Kerala',             result:'Official Selection',           year:'2025' },
  { icon:'🌏', name:'IIFFB Boston',                   result:'Official Selection',           year:'2025' },
  { icon:'🌍', name:'LIFF — Lulea, Sweden',           result:'Finalist',                    year:'2025' },
  { icon:'🎞️', name:'MLOFF Manchester',               result:'Official Selection',           year:'2026' },
  { icon:'🎪', name:'Kriti Film Club Delhi',          result:'Delhi Premiere',              year:'2026' },
  { icon:'🌺', name:'Istanbul Women Films Festival',  result:'Semi Finalist',               year:'2026' },
];

const TESTIMONIALS = [
  { quote:'Every student must watch this film. It changed how I see disability.',     attr:'Principal, Delhi Public School, Bangalore'  },
  { quote:'An incredibly powerful story. We screened it for 500 employees.',          attr:'HR Director, TechCorp India, Hyderabad'     },
  { quote:'I cried, then I felt proud. This is what India truly is.',                 attr:'Student, IIT Bombay'                        },
  { quote:'Goosebumps throughout. The most inspiring film I have seen this decade.',  attr:'Film Critic, The Hindu'                     },
  { quote:'This belongs in every school curriculum across India.',                    attr:'Teacher, Kendriya Vidyalaya, Jaipur'        },
];

const CREW = [
  { role:'Directors',         names:'Shanthi Mohan & Mukund Moorthy'                                             },
  { role:'Producers',         names:'Shanthi Mohan · Mukund Moorthy · Fazila Allana · Kamna Menzes · Bhuvanesh Shrivastava' },
  { role:'Script',            names:'Bhuvanesh Shrivastava'                                                      },
  { role:'DOP',               names:'Shanthi Mohan & Khushee Hegde'                                              },
  { role:'Editor',            names:'Shahnawaz Khan & Swati Jaiswal'                                             },
  { role:'Music',             names:'Lokesh Bakshi'                                                              },
  { role:'Sound Design',      names:'Suresh Raskar'                                                              },
  { role:'DI Colorist',       names:'Prathvish Hegde'                                                            },
  { role:'Post Production',   names:'Prerit Vyas'                                                                },
];

const STATS = [
  { value:'10+',   label:'Awards Won',     icon:'🏆' },
  { value:'10K+',  label:'People Reached', icon:'👥' },
  { value:'50+',   label:'Screenings',     icon:'🎬' },
  { value:'8+',    label:'Countries',      icon:'🌍' },
];

/* ─── REUSABLE ───────────────────────────────────────────────────── */
function SectionTag({ label }) {
  return (
    <div style={{ textAlign:'center', marginBottom:'14px' }}>
      <span style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:C.cyan, padding:'5px 16px', borderRadius:'20px', border:`1px solid ${C.cyanBorder}`, background:C.cyanDim }}>
        {label}
      </span>
    </div>
  );
}

/* ─── NAVBAR ─────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:1000,
      background: scrolled ? 'rgba(10,31,68,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? `1px solid ${C.cyanBorder}` : 'none',
      transition:'all 0.35s ease',
    }}>
      {/* Top tricolor strip */}
      <div style={{ height:'2px', background:`linear-gradient(90deg, ${C.saffron} 33%, rgba(255,255,255,0.3) 33%, rgba(255,255,255,0.3) 66%, ${C.green} 66%)` }} />

      <div style={{ maxWidth:'1140px', margin:'0 auto', padding:'0 24px', height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>

        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:`linear-gradient(135deg, ${C.cyan}, ${C.saffron})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0 }}>
            🏏
          </div>
          <div>
            <div style={{ color:C.white, fontWeight:800, fontSize:'1rem', lineHeight:1.1, letterSpacing:'-0.01em' }}>Dekh Le! India</div>
            <div style={{ color:C.cyan, fontSize:'0.6rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' }}>Documentary Film</div>
          </div>
        </div>

        {/* Desktop nav */}
        <div style={{ display:'flex', gap:'28px', alignItems:'center' }} className="dnav">
          {[['#about','About'],['#awards','Awards'],['#screenings','Screenings'],['#video','Watch'],['#contact','Contact']].map(([h,l]) => (
            <a key={h} href={h} style={{ color:C.muted, fontSize:'0.875rem', fontWeight:500, textDecoration:'none', transition:'color 0.2s' }}
               onMouseEnter={e => e.target.style.color=C.white}
               onMouseLeave={e => e.target.style.color=C.muted}>
              {l}
            </a>
          ))}
          <a href="https://www.jiohotstar.com/" target="_blank" rel="noopener noreferrer"
            style={{ background:C.saffron, color:C.white, padding:'8px 20px', borderRadius:'25px', fontWeight:700, fontSize:'0.875rem', textDecoration:'none', boxShadow:`0 0 20px rgba(255,153,51,0.4)`, transition:'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; }}>
            ▶ Watch Now
          </a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="hmb"
          style={{ display:'none', background:'none', border:`1px solid ${C.cardBorder}`, color:C.white, width:'36px', height:'36px', borderRadius:'8px', cursor:'pointer', fontSize:'1.1rem', alignItems:'center', justifyContent:'center' }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{ background:'rgba(10,31,68,0.98)', backdropFilter:'blur(20px)', padding:'16px 24px 24px', borderTop:`1px solid ${C.cyanBorder}`, display:'flex', flexDirection:'column', gap:'4px' }}>
          {[['#about','About'],['#awards','Awards'],['#screenings','Screenings'],['#video','Watch'],['#contact','Contact']].map(([h,l]) => (
            <a key={h} href={h} onClick={() => setMenuOpen(false)}
              style={{ color:C.muted, textDecoration:'none', fontWeight:500, padding:'10px 0', borderBottom:`1px solid ${C.card}`, display:'block' }}>
              {l}
            </a>
          ))}
          <a href="https://www.jiohotstar.com/" target="_blank" rel="noopener noreferrer"
            style={{ marginTop:'12px', background:C.saffron, color:C.white, padding:'12px', borderRadius:'10px', fontWeight:700, textDecoration:'none', textAlign:'center', display:'block' }}>
            ▶ Watch Now on JioHotstar
          </a>
          <Link href="/contribute"
            style={{ background:'transparent', color:C.white, padding:'12px', borderRadius:'10px', fontWeight:600, textDecoration:'none', textAlign:'center', display:'block', border:`1px solid ${C.cardBorder}` }}>
            🤍 Contribute
          </Link>
        </div>
      )}

      <style>{`
        @media(max-width:900px){.dnav{display:none!important}.hmb{display:flex!important}}
        @media(max-width:420px){.stat-grid{grid-template-columns:repeat(2,1fr)!important}}
      `}</style>
    </nav>
  );
}

/* ─── HERO ───────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      minHeight:'100vh',
      background:`linear-gradient(170deg, ${C.navy} 0%, ${C.navyMid} 50%, #0D2E5C 100%)`,
      display:'flex', alignItems:'center',
      position:'relative', overflow:'hidden',
      paddingTop:'64px',
    }}>
      {/* Glow blobs */}
      <div style={{ position:'absolute', top:'-120px', right:'-120px', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(0,180,216,0.12) 0%, transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-80px', left:'-80px', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(255,153,51,0.08) 0%, transparent 65%)', pointerEvents:'none' }} />
      {/* Grid overlay */}
      <div style={{ position:'absolute', inset:0, opacity:0.03, backgroundImage:'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }} />

      <div style={{ maxWidth:'920px', margin:'0 auto', padding:'60px 24px', textAlign:'center', position:'relative' }}>

        {/* Award badge */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:C.cyanDim, border:`1px solid ${C.cyanBorder}`, borderRadius:'25px', padding:'7px 20px', marginBottom:'32px' }}>
          <span>🏆</span>
          <span style={{ fontSize:'0.75rem', fontWeight:700, color:C.cyan, letterSpacing:'0.1em', textTransform:'uppercase' }}>10+ International Awards</span>
        </div>

        {/* Title */}
        <h1 style={{ lineHeight:0.95, letterSpacing:'-0.04em', marginBottom:'16px' }}>
          <span style={{ display:'block', fontSize:'clamp(3.2rem, 10vw, 8rem)', fontWeight:900, color:C.white }}>DEKH LE!</span>
          <span style={{ display:'block', fontSize:'clamp(3.2rem, 10vw, 8rem)', fontWeight:900, color:C.cyan }}>
            INDIA{' '}
            <span style={{ fontSize:'clamp(2rem, 6vw, 4.5rem)', verticalAlign:'middle' }}>🇮🇳</span>
          </span>
        </h1>

        {/* Directors */}
        <p style={{ color:C.faint, fontSize:'0.9rem', fontWeight:500, letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:'16px' }}>
          A documentary film by Shanthi Mohan &amp; Mukund Moorthy
        </p>

        {/* Subtitle */}
        <p style={{ fontSize:'clamp(1rem,2.5vw,1.25rem)', color:C.muted, maxWidth:'600px', margin:'0 auto 24px', lineHeight:1.65 }}>
          An Inspiring Story of the <strong style={{ color:C.white }}>First Ever Blind Women's Cricket Team of India</strong>
        </p>

        {/* Tagline */}
        <div style={{ display:'inline-block', margin:'0 auto 36px', padding:'14px 28px', borderRadius:'10px', background:'rgba(255,255,255,0.06)', border:`1px solid rgba(255,255,255,0.12)`, borderLeft:`4px solid ${C.saffron}` }}>
          <p style={{ color:C.white, fontWeight:900, fontSize:'clamp(0.8rem,2vw,1.05rem)', letterSpacing:'0.06em', margin:0, textTransform:'uppercase' }}>
            "No Pity · No Sympathy · Just Give Us An Opportunity!"
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap', marginBottom:'16px' }}>
          <a href="https://www.jiohotstar.com/" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 32px', borderRadius:'30px', background:C.saffron, color:C.white, fontWeight:700, fontSize:'1rem', textDecoration:'none', boxShadow:`0 4px 24px rgba(255,153,51,0.5)`, transition:'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(255,153,51,0.55)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 24px rgba(255,153,51,0.5)'; }}>
            ▶ Watch Now
          </a>
          <Link href="/contribute"
            style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 32px', borderRadius:'30px', background:'transparent', color:C.white, fontWeight:700, fontSize:'1rem', textDecoration:'none', border:`1.5px solid ${C.cyanBorder}`, transition:'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background=C.cyanDim; e.currentTarget.style.borderColor=C.cyan; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor=C.cyanBorder; }}>
            🤍 Contribute
          </Link>
        </div>
        <p style={{ fontSize:'0.75rem', color:C.faint }}>Opens on JioHotstar</p>

        {/* Stats */}
        <div className="stat-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'14px', maxWidth:'700px', margin:'52px auto 0' }}>
          {STATS.map(s => (
            <div key={s.label} style={{ background:'rgba(255,255,255,0.06)', borderRadius:'14px', padding:'20px 10px', border:`1px solid ${C.cardBorder}`, textAlign:'center', backdropFilter:'blur(10px)' }}>
              <div style={{ fontSize:'1.5rem', marginBottom:'6px' }}>{s.icon}</div>
              <div style={{ fontSize:'clamp(1.4rem,3vw,1.8rem)', fontWeight:800, color:C.cyan }}>{s.value}</div>
              <div style={{ fontSize:'0.7rem', color:C.faint, marginTop:'3px', fontWeight:500, letterSpacing:'0.04em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Production logos */}
        <div style={{ marginTop:'40px', display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap', alignItems:'center' }}>
          <span style={{ fontSize:'0.7rem', color:C.faint, letterSpacing:'0.1em', textTransform:'uppercase', marginRight:'6px' }}>Produced by</span>
          {['The Loose Canon', 'Sol Production', 'DejaVu Arts'].map(p => (
            <span key={p} style={{ fontSize:'0.78rem', color:C.muted, padding:'4px 12px', background:'rgba(255,255,255,0.06)', borderRadius:'20px', border:`1px solid ${C.cardBorder}` }}>{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ──────────────────────────────────────────────────────── */
function About() {
  const [tab, setTab] = useState('Story');
  const TABS = ['Story','Film','Testimonials','Crew'];

  const content = {
    Story:(
      <div style={{ maxWidth:'760px', margin:'0 auto', display:'grid', gap:'14px' }}>
        {[
          { icon:'👩‍🦯', title:'The Team',    text:"India's first-ever blind women's cricket team — players from 6 states, with zero resources and infinite courage. Most had never held a bat before being selected." },
          { icon:'✈️',  title:'The Journey',  text:'From dusty local grounds across Odisha, Maharashtra, Karnataka, Kerala, Jharkhand and UP — all the way to Edgbaston, Birmingham for the World Games.' },
          { icon:'🏆',  title:'The Victory',  text:'They won. Against all odds, they beat the world. And yet India barely noticed. This film makes sure the world never forgets.' },
          { icon:'🎯',  title:'The Mission',  text:'Every ticket sold, every school screening, every donation — funds skill training so these champions can build a livelihood from the game they love.' },
        ].map(item => (
          <div key={item.title} style={{ display:'flex', gap:'16px', padding:'20px', background:C.card, borderRadius:'14px', border:`1px solid ${C.cardBorder}`, transition:'border-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor=C.cyanBorder}
            onMouseLeave={e => e.currentTarget.style.borderColor=C.cardBorder}>
            <span style={{ fontSize:'1.8rem', flexShrink:0 }}>{item.icon}</span>
            <div>
              <h4 style={{ fontWeight:700, color:C.white, marginBottom:'6px', fontSize:'1rem' }}>{item.title}</h4>
              <p style={{ color:C.muted, fontSize:'0.9rem', lineHeight:1.65, margin:0 }}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    ),
    Film:(
      <div style={{ maxWidth:'680px', margin:'0 auto', textAlign:'center' }}>
        <div style={{ fontSize:'3.5rem', marginBottom:'16px' }}>🎬</div>
        <h3 style={{ fontWeight:800, color:C.white, fontSize:'1.4rem', marginBottom:'12px' }}>About the Film</h3>
        <p style={{ color:C.muted, lineHeight:1.8, fontSize:'1rem', marginBottom:'24px' }}>
          <strong style={{ color:C.white }}>Dekh Le! India</strong> is a powerful documentary that chronicles the extraordinary journey of India's first blind women's national cricket team. Directed by Shanthi Mohan &amp; Mukund Moorthy, this film captures their struggles, strength, and determination — and their historic win at the World Games at Edgbaston, Birmingham.
        </p>
        <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' }}>
          {['Documentary','Hindi + English','2024','60 mins','India'].map(tag => (
            <span key={tag} style={{ padding:'6px 16px', background:C.cyanDim, color:C.cyan, borderRadius:'20px', fontSize:'0.8rem', fontWeight:600, border:`1px solid ${C.cyanBorder}` }}>{tag}</span>
          ))}
        </div>
      </div>
    ),
    Testimonials:(
      <div style={{ maxWidth:'960px', margin:'0 auto', display:'grid', gap:'14px', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))' }}>
        {TESTIMONIALS.map((t,i) => (
          <div key={i} style={{ background:C.card, borderRadius:'14px', padding:'22px', border:`1px solid ${C.cardBorder}`, borderTop:`3px solid ${i%3===0?C.saffron:i%3===1?C.cyan:C.green}` }}>
            <p style={{ fontSize:'1.6rem', color:C.saffron, fontWeight:900, margin:'0 0 8px', lineHeight:1 }}>"</p>
            <p style={{ color:C.muted, lineHeight:1.65, marginBottom:'14px', fontStyle:'italic', fontSize:'0.9rem' }}>{t.quote}</p>
            <p style={{ fontSize:'0.78rem', color:C.faint, fontWeight:600 }}>— {t.attr}</p>
          </div>
        ))}
      </div>
    ),
    Crew:(
      <div style={{ maxWidth:'760px', margin:'0 auto' }}>
        <div style={{ display:'grid', gap:'10px' }}>
          {CREW.map(c => (
            <div key={c.role} style={{ display:'flex', gap:'16px', padding:'14px 18px', background:C.card, borderRadius:'10px', border:`1px solid ${C.cardBorder}` }}>
              <span style={{ color:C.cyan, fontWeight:700, fontSize:'0.82rem', minWidth:'130px', flexShrink:0, paddingTop:'1px' }}>{c.role}</span>
              <span style={{ color:C.muted, fontSize:'0.875rem', lineHeight:1.5 }}>{c.names}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <section id="about" style={{ padding:'90px 20px', background:`linear-gradient(180deg, #0D2E5C 0%, ${C.navy} 100%)` }}>
      <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
        <SectionTag label="About the Film" />
        <h2 style={{ textAlign:'center', fontSize:'clamp(1.6rem,4vw,2.4rem)', fontWeight:900, color:C.white, marginBottom:'40px', letterSpacing:'-0.02em' }}>
          They played with courage.<br />
          <span style={{ color:C.cyan }}>We filmed with love.</span>
        </h2>

        {/* Tabs */}
        <div style={{ display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap', marginBottom:'44px' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding:'9px 22px', borderRadius:'25px', fontWeight:600, fontSize:'0.875rem', cursor:'pointer', transition:'all 0.2s',
                background: tab===t ? C.cyan : 'transparent',
                color:      tab===t ? C.navy : C.muted,
                border:     tab===t ? `1px solid ${C.cyan}` : `1px solid ${C.cardBorder}`,
              }}
              onMouseEnter={e => { if(tab!==t){ e.currentTarget.style.borderColor=C.cyan; e.currentTarget.style.color=C.white; }}}
              onMouseLeave={e => { if(tab!==t){ e.currentTarget.style.borderColor=C.cardBorder; e.currentTarget.style.color=C.muted; }}}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ minHeight:'280px' }}>{content[tab]}</div>
      </div>
    </section>
  );
}

/* ─── AWARDS ─────────────────────────────────────────────────────── */
function Awards() {
  return (
    <section id="awards" style={{ padding:'90px 20px', background:C.navy }}>
      <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
        <SectionTag label="Recognition" />
        <h2 style={{ textAlign:'center', fontSize:'clamp(1.6rem,4vw,2.4rem)', fontWeight:900, color:C.white, marginBottom:'10px', letterSpacing:'-0.02em' }}>
          Awards &amp; Festival Selections
        </h2>
        <p style={{ textAlign:'center', color:C.muted, marginBottom:'50px', fontSize:'1rem' }}>
          Recognised across <strong style={{ color:C.cyan }}>8+ countries</strong> at international film festivals
        </p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))', gap:'16px' }}>
          {AWARDS.map((a,i) => {
            const accent = i%3===0 ? C.saffron : i%3===1 ? C.cyan : C.green;
            return (
              <div key={i}
                style={{ background:C.card, borderRadius:'14px', padding:'22px 18px', border:`1px solid ${C.cardBorder}`, borderLeft:`4px solid ${accent}`, display:'flex', alignItems:'flex-start', gap:'14px', transition:'all 0.2s', cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background=C.card; e.currentTarget.style.transform='translateY(0)'; }}>
                <span style={{ fontSize:'1.8rem', flexShrink:0 }}>{a.icon}</span>
                <div>
                  <p style={{ fontWeight:700, color:C.white, fontSize:'0.95rem', marginBottom:'4px', lineHeight:1.3 }}>{a.name}</p>
                  <p style={{ color:accent, fontWeight:700, fontSize:'0.85rem', marginBottom:'3px' }}>{a.result}</p>
                  <p style={{ color:C.faint, fontSize:'0.78rem' }}>{a.year}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SCREENINGS ─────────────────────────────────────────────────── */
function Screenings() {
  return (
    <section id="screenings" style={{ padding:'90px 20px', background:`linear-gradient(180deg, ${C.navy} 0%, #0D2E5C 100%)` }}>
      <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
        <SectionTag label="Reach" />
        <h2 style={{ textAlign:'center', fontSize:'clamp(1.6rem,4vw,2.4rem)', fontWeight:900, color:C.white, marginBottom:'10px', letterSpacing:'-0.02em' }}>
          Where It Has Been Screened
        </h2>
        <p style={{ textAlign:'center', color:C.muted, marginBottom:'50px' }}>
          A movement spreading across India — school to school, office to office
        </p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:'16px', marginBottom:'40px' }}>
          {[
            { icon:'🏫', label:'Schools',        count:'50+',   accent:C.cyan    },
            { icon:'🏢', label:'Companies',      count:'10+',   accent:C.saffron },
            { icon:'🎥', label:'Film Festivals', count:'10+',   accent:C.green   },
            { icon:'👥', label:'People Reached', count:'10K+',  accent:C.cyan    },
          ].map(s => (
            <div key={s.label} style={{ background:C.card, borderRadius:'16px', padding:'28px 18px', textAlign:'center', border:`1px solid ${C.cardBorder}`, borderTop:`3px solid ${s.accent}` }}>
              <div style={{ fontSize:'2.2rem', marginBottom:'10px' }}>{s.icon}</div>
              <div style={{ fontSize:'2rem', fontWeight:800, color:s.accent }}>{s.count}</div>
              <div style={{ color:C.muted, fontWeight:600, fontSize:'0.875rem', marginTop:'5px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Notable venues */}
        <div style={{ background:C.card, borderRadius:'16px', padding:'28px', border:`1px solid ${C.cardBorder}` }}>
          <p style={{ fontWeight:700, color:C.white, marginBottom:'18px', textAlign:'center', fontSize:'1rem' }}>Notable Screenings &amp; Premieres</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'10px', justifyContent:'center' }}>
            {['Kriti Film Club · Delhi Premiere','IIT Bombay','DPS Bengaluru','Infosys Campus, Pune','TISS Mumbai','Kendriya Vidyalaya, Jaipur','Jain University, Bengaluru'].map(v => (
              <span key={v} style={{ padding:'7px 16px', background:'rgba(0,180,216,0.1)', borderRadius:'20px', fontSize:'0.82rem', fontWeight:500, color:C.cyan, border:`1px solid ${C.cyanBorder}` }}>
                📍 {v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── VIDEO ──────────────────────────────────────────────────────── */
function VideoSection() {
  const [active, setActive] = useState('sizzle');
  const videos = {
    sizzle:{ id:'h_JVTDhF6RY', label:'🎬 Sizzle Reel', desc:'The cinematic sizzle reel of Dekh Le! India' },
    song:  { id:'mgFde16-J7c', label:'🎵 Film Song',   desc:'The soul of the film — official song by Lokesh Bakshi' },
  };

  return (
    <section id="video" style={{ padding:'90px 20px', background:C.navy }}>
      <div style={{ maxWidth:'900px', margin:'0 auto', textAlign:'center' }}>
        <SectionTag label="Watch" />
        <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.4rem)', fontWeight:900, color:C.white, marginBottom:'10px', letterSpacing:'-0.02em' }}>
          Watch the Film
        </h2>
        <p style={{ color:C.muted, marginBottom:'30px' }}>Experience the incredible journey of India's first blind women's cricket team</p>

        {/* Tab switcher */}
        <div style={{ display:'flex', gap:'10px', justifyContent:'center', marginBottom:'16px' }}>
          {Object.entries(videos).map(([key,v]) => (
            <button key={key} onClick={() => setActive(key)}
              style={{ padding:'10px 24px', borderRadius:'25px', fontWeight:600, fontSize:'0.875rem', cursor:'pointer', transition:'all 0.2s',
                background: active===key ? C.saffron : 'transparent',
                color: C.white,
                border: `1.5px solid ${active===key ? C.saffron : C.cardBorder}`,
              }}>
              {v.label}
            </button>
          ))}
        </div>

        <p style={{ color:C.faint, fontSize:'0.82rem', marginBottom:'22px' }}>{videos[active].desc}</p>

        {/* Embed */}
        <div style={{ position:'relative', paddingBottom:'56.25%', height:0, borderRadius:'16px', overflow:'hidden', boxShadow:`0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px ${C.cyanBorder}` }}>
          <iframe
            key={active}
            src={`https://www.youtube.com/embed/${videos[active].id}?rel=0`}
            title={videos[active].label}
            style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Links */}
        <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap', marginTop:'24px' }}>
          {[
            { href:'https://www.youtube.com/watch?v=h_JVTDhF6RY', label:'🎬 Sizzle on YouTube' },
            { href:'https://www.youtube.com/watch?v=mgFde16-J7c', label:'🎵 Song on YouTube'   },
          ].map(l => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'9px 20px', borderRadius:'25px', background:C.card, color:C.muted, fontSize:'0.82rem', fontWeight:600, textDecoration:'none', border:`1px solid ${C.cardBorder}`, transition:'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background=C.cyanDim; e.currentTarget.style.color=C.white; e.currentTarget.style.borderColor=C.cyanBorder; }}
              onMouseLeave={e => { e.currentTarget.style.background=C.card; e.currentTarget.style.color=C.muted; e.currentTarget.style.borderColor=C.cardBorder; }}>
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ marginTop:'28px' }}>
          <a href="https://www.jiohotstar.com/" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'13px 32px', borderRadius:'30px', background:C.saffron, color:C.white, fontWeight:700, fontSize:'0.95rem', textDecoration:'none', boxShadow:`0 4px 24px rgba(255,153,51,0.45)` }}>
            ▶ Watch Full Film on JioHotstar
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section style={{ padding:'100px 20px', background:`linear-gradient(135deg, #0D2E5C 0%, ${C.navyMid} 100%)`, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'-60px', right:'-60px', width:'300px', height:'300px', borderRadius:'50%', background:`radial-gradient(circle, ${C.cyanDim} 0%, transparent 70%)`, pointerEvents:'none' }} />
      <div style={{ maxWidth:'680px', margin:'0 auto', textAlign:'center', position:'relative' }}>
        <span style={{ fontSize:'3rem', display:'block', marginBottom:'20px' }}>🇮🇳</span>
        <h2 style={{ fontSize:'clamp(1.8rem,5vw,3rem)', fontWeight:900, color:C.white, lineHeight:1.2, marginBottom:'18px', letterSpacing:'-0.03em' }}>
          A movement to bring this film to every student, school, and workplace in India.
        </h2>
        <p style={{ color:C.muted, fontSize:'1rem', lineHeight:1.7, marginBottom:'40px', maxWidth:'520px', margin:'0 auto 40px' }}>
          Help us reach 1 million viewers. Every screening, every contribution, every share — brings us closer to a more inclusive India.
        </p>
        <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/contribute"
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'14px 32px', borderRadius:'30px', background:C.saffron, color:C.white, fontWeight:700, fontSize:'1rem', textDecoration:'none', boxShadow:`0 4px 24px rgba(255,153,51,0.45)` }}>
            💛 Contribute Now
          </Link>
          <a href="https://www.jiohotstar.com/" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'14px 32px', borderRadius:'30px', background:'transparent', color:C.white, fontWeight:700, fontSize:'1rem', textDecoration:'none', border:`1.5px solid ${C.cyanBorder}` }}>
            ▶ Watch the Film
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer id="contact" style={{ background:'#060F22', color:C.muted, padding:'56px 20px 28px' }}>
      <div style={{ height:'2px', background:`linear-gradient(90deg, ${C.saffron} 33%, rgba(255,255,255,0.15) 33%, rgba(255,255,255,0.15) 66%, ${C.green} 66%)`, marginBottom:'44px', borderRadius:'2px' }} />

      <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'36px', marginBottom:'44px' }}>

          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
              <span style={{ fontSize:'1.4rem' }}>🏏</span>
              <div>
                <div style={{ color:C.white, fontWeight:800, fontSize:'1rem' }}>Dekh Le! India</div>
                <div style={{ color:C.cyan, fontSize:'0.6rem', letterSpacing:'0.1em', textTransform:'uppercase' }}>Documentary Film</div>
              </div>
            </div>
            <p style={{ fontSize:'0.85rem', lineHeight:1.7, color:'rgba(255,255,255,0.4)' }}>
              A documentary about India's first blind women's cricket team and their extraordinary journey to the World Games.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color:C.white, fontWeight:700, marginBottom:'14px', fontSize:'0.82rem', letterSpacing:'0.1em', textTransform:'uppercase' }}>Navigate</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:'9px' }}>
              {[['#about','About Film'],['#awards','Awards'],['#screenings','Screenings'],['#video','Watch Trailer'],['contribute','Contribute']].map(([h,l]) => (
                <a key={h} href={h.startsWith('#')?h:`/${h}`}
                  style={{ color:'rgba(255,255,255,0.4)', textDecoration:'none', fontSize:'0.875rem', transition:'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color=C.cyan}
                  onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.4)'}>
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color:C.white, fontWeight:700, marginBottom:'14px', fontSize:'0.82rem', letterSpacing:'0.1em', textTransform:'uppercase' }}>Contact</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:'9px', fontSize:'0.875rem' }}>
              <a href="mailto:m_moorthy@yahoo.com" style={{ color:C.saffron, textDecoration:'none' }}>m_moorthy@yahoo.com</a>
              <a href="tel:+919880214587" style={{ color:'rgba(255,255,255,0.4)', textDecoration:'none' }}>+91-9880214587</a>
              <p style={{ color:'rgba(255,255,255,0.4)', margin:0 }}>Dir. Shanthi Mohan</p>
              <p style={{ color:'rgba(255,255,255,0.4)', margin:0 }}>&amp; Mukund Moorthy</p>
            </div>
          </div>

          {/* Awards quick list */}
          <div>
            <h4 style={{ color:C.white, fontWeight:700, marginBottom:'14px', fontSize:'0.82rem', letterSpacing:'0.1em', textTransform:'uppercase' }}>Recent Awards</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:'7px' }}>
              {AWARDS.slice(0,4).map(a => (
                <div key={a.name+a.result} style={{ display:'flex', gap:'8px', alignItems:'flex-start' }}>
                  <span style={{ fontSize:'0.9rem', flexShrink:0 }}>{a.icon}</span>
                  <span style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.4)', lineHeight:1.4 }}>{a.name} — {a.result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop:`1px solid rgba(255,255,255,0.06)`, paddingTop:'22px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
          <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.25)', margin:0 }}>
            © {new Date().getFullYear()} Dekh Le! India. All rights reserved.
          </p>
          <div style={{ display:'flex', gap:'6px', alignItems:'center' }}>
            {[C.saffron,'rgba(255,255,255,0.4)',C.green].map((c,i) => (
              <div key={i} style={{ width:'10px', height:'10px', borderRadius:'50%', background:c }} />
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
        <meta property="og:description" content="No Pity. No Sympathy. Just Give Us An Opportunity." />
      </Head>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Awards />
        <Screenings />
        <VideoSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
