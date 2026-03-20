// pages/index.jsx — Dekh Le! India — Full Redesign
// Light theme · Indian flag colors · All sections

import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const C = {
  saffron:'#FF9933', saffronLight:'#FFF3E0', saffronDim:'rgba(255,153,51,0.15)',
  blue:'#000080', blueMid:'#003580', blueLight:'#E8EAF6',
  green:'#138808', greenLight:'#E8F5E9',
  white:'#FFFFFF', offWhite:'#FAFAFA', gray:'#6B7280', grayLight:'#F3F4F6',
  dark:'#111827', text:'#1F2937', textMuted:'#6B7280',
};

const AWARDS = [
  { name:'CLEF Music Awards',  result:'Winner',             year:'2025', icon:'🏆' },
  { name:'NCIFF Nepal',        result:'Best Director',       year:'2026', icon:'🎬' },
  { name:'KISFF Kenya',        result:"Chairman's Award",    year:'2025', icon:'🥇' },
  { name:'IDSFFK Kerala',      result:'Official Selection',  year:'2025', icon:'🎭' },
  { name:'IIFFB Boston',       result:'Official Selection',  year:'2025', icon:'🌏' },
  { name:'LIFF Sweden',        result:'Finalist',            year:'2025', icon:'🌍' },
];

const TESTIMONIALS = [
  { quote:'Every student must watch this film. It changed how I see disability.',    attr:'Principal, Delhi Public School, Bangalore'  },
  { quote:'An incredibly powerful story. We screened it for all 500 employees.',     attr:'HR Director, TechCorp India, Hyderabad'     },
  { quote:'I cried, then I felt proud. This is what India truly is.',                attr:'Student, IIT Bombay'                        },
  { quote:'Goosebumps throughout. The most inspiring film I have seen this decade.', attr:'Film Critic, The Hindu'                     },
  { quote:'This belongs in every school curriculum across India.',                   attr:'Teacher, Kendriya Vidyalaya, Jaipur'        },
];

const SCREENINGS_DATA = [
  { icon:'🏫', label:'Schools',        count:'50+',  color:'#E8EAF6' },
  { icon:'🏢', label:'Companies',      count:'10+',  color:'#E8F5E9' },
  { icon:'🎥', label:'Film Festivals', count:'6+',   color:'#FFF3E0' },
  { icon:'👥', label:'People Reached', count:'10K+', color:'#F3E8FF' },
];

const STATS = [
  { value:'10,000+', label:'Lives Touched',  color:C.saffron },
  { value:'50+',     label:'Screenings',      color:C.blue    },
  { value:'6',       label:'Awards',          color:C.green   },
  { value:'8+',      label:'Countries',       color:C.saffron },
];

function SectionLabel({ color, label }) {
  return <p style={{ textAlign:'center', fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.2em', color, marginBottom:'12px', textTransform:'uppercase' }}>— {label} —</p>;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000, background:C.white, boxShadow: scrolled ? '0 2px 20px rgba(0,0,128,0.1)' : '0 1px 0 #f0f0f0', transition:'all 0.3s' }}>
      <div style={{ height:'3px', background:`linear-gradient(90deg, ${C.saffron} 33%, #eee 33%, #eee 66%, ${C.green} 66%)` }} />
      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 20px', height:'60px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <span style={{ fontSize:'1.4rem' }}>🏏</span>
          <span style={{ fontWeight:800, fontSize:'1.05rem', color:C.blue }}>Dekh Le! India</span>
        </div>
        <div style={{ display:'flex', gap:'24px', alignItems:'center' }} className="dnav">
          {[['#awards','Awards'],['#screenings','Screenings'],['#video','Watch']].map(([h,l]) => (
            <a key={h} href={h} style={{ color:C.text, fontSize:'0.875rem', fontWeight:500, textDecoration:'none' }}>{l}</a>
          ))}
          <a href="https://www.jiohotstar.com/" target="_blank" rel="noopener noreferrer"
            style={{ background:C.saffron, color:C.white, padding:'8px 20px', borderRadius:'25px', fontWeight:600, fontSize:'0.875rem', textDecoration:'none' }}>
            Watch Now ▶
          </a>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="hmb" style={{ display:'none', background:'none', border:'none', fontSize:'1.4rem', cursor:'pointer' }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      {menuOpen && (
        <div style={{ background:C.white, padding:'16px 20px', borderTop:`1px solid ${C.grayLight}`, display:'flex', flexDirection:'column', gap:'12px' }}>
          {[['#awards','Awards'],['#screenings','Screenings'],['#video','Watch']].map(([h,l]) => (
            <a key={h} href={h} onClick={() => setMenuOpen(false)} style={{ color:C.text, textDecoration:'none', fontWeight:500, padding:'8px 0', borderBottom:`1px solid ${C.grayLight}` }}>{l}</a>
          ))}
          <a href="https://www.jiohotstar.com/" target="_blank" rel="noopener noreferrer"
            style={{ background:C.saffron, color:C.white, padding:'10px', borderRadius:'25px', fontWeight:600, textDecoration:'none', textAlign:'center' }}>
            Watch Now ▶
          </a>
        </div>
      )}
      <style>{`@media(max-width:768px){.dnav{display:none!important}.hmb{display:block!important}}`}</style>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ paddingTop:'80px', background:`linear-gradient(160deg,#FFFBF5 0%,#F0F4FF 50%,#F0FFF4 100%)`, minHeight:'100vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'-100px', right:'-100px', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,153,51,0.1) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ maxWidth:'900px', margin:'0 auto', padding:'60px 24px', textAlign:'center', position:'relative' }}>

        <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:C.saffronDim, border:`1px solid rgba(255,153,51,0.4)`, borderRadius:'25px', padding:'6px 18px', marginBottom:'28px' }}>
          <span>🏆</span>
          <span style={{ fontSize:'0.75rem', fontWeight:600, color:'#C25200', letterSpacing:'0.05em' }}>AWARD-WINNING DOCUMENTARY</span>
        </div>

        <h1 style={{ fontSize:'clamp(2.8rem,8vw,6rem)', fontWeight:900, lineHeight:1.0, letterSpacing:'-0.04em', marginBottom:'18px', color:C.dark }}>
          <span style={{ color:C.blue }}>DEKH LE!</span><br />
          <span style={{ color:C.saffron }}>INDIA </span>
          <span style={{ fontSize:'clamp(2rem,5vw,3.5rem)', verticalAlign:'middle' }}>🇮🇳</span>
        </h1>

        <p style={{ fontSize:'clamp(1rem,2.5vw,1.25rem)', color:C.textMuted, maxWidth:'580px', margin:'0 auto 18px', lineHeight:1.65 }}>
          An inspiring story of the <strong style={{ color:C.blue }}>first ever blind women's cricket team of India</strong>
        </p>

        <div style={{ margin:'0 auto 30px', padding:'14px 24px', background:C.blue, borderRadius:'8px', maxWidth:'580px', display:'inline-block' }}>
          <p style={{ color:C.white, fontWeight:800, fontSize:'clamp(0.78rem,2vw,0.95rem)', letterSpacing:'0.07em', margin:0 }}>
            "NO PITY. NO SYMPATHY. JUST GIVE US AN OPPORTUNITY."
          </p>
        </div>

        <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap', marginBottom:'14px' }}>
          <a href="https://www.jiohotstar.com/" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 32px', borderRadius:'30px', background:C.saffron, color:C.white, fontWeight:700, fontSize:'1rem', textDecoration:'none', boxShadow:'0 4px 20px rgba(255,153,51,0.4)' }}>
            ▶ Watch Now
          </a>
          <Link href="/contribute"
            style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 32px', borderRadius:'30px', background:C.white, color:C.blue, fontWeight:700, fontSize:'1rem', textDecoration:'none', border:`2px solid ${C.blue}` }}>
            🤍 Contribute
          </Link>
        </div>

        <p style={{ fontSize:'0.78rem', color:C.gray }}>Opens on JioHotstar</p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'14px', maxWidth:'680px', margin:'44px auto 0' }}>
          {STATS.map(s => (
            <div key={s.label} style={{ background:C.white, borderRadius:'14px', padding:'18px 10px', boxShadow:'0 2px 14px rgba(0,0,0,0.07)', textAlign:'center', border:`1px solid ${C.grayLight}` }}>
              <div style={{ fontSize:'clamp(1.3rem,3vw,1.8rem)', fontWeight:800, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:'0.7rem', color:C.gray, marginTop:'4px', fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TabsSection() {
  const [tab, setTab] = useState('Film');
  const content = {
    Film: (
      <div style={{ maxWidth:'700px', margin:'0 auto', textAlign:'center' }}>
        <div style={{ fontSize:'3.5rem', marginBottom:'14px' }}>🏏</div>
        <h3 style={{ fontSize:'1.4rem', fontWeight:700, color:C.blue, marginBottom:'14px' }}>About the Film</h3>
        <p style={{ color:C.textMuted, lineHeight:1.8, fontSize:'1rem' }}>
          <strong style={{ color:C.dark }}>Dekh Le! India</strong> is a powerful documentary showcasing the journey of India's first blind women's cricket team — their struggles, strength, and determination. From humble beginnings across 6 states to representing India at the World Games in Birmingham.
        </p>
        <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap', marginTop:'20px' }}>
          {['60 mins','Hindi + English','2024','Documentary'].map(tag => (
            <span key={tag} style={{ padding:'5px 14px', background:C.blueLight, color:C.blue, borderRadius:'20px', fontSize:'0.8rem', fontWeight:600 }}>{tag}</span>
          ))}
        </div>
      </div>
    ),
    Intro: (
      <div style={{ maxWidth:'700px', margin:'0 auto' }}>
        <h3 style={{ fontSize:'1.4rem', fontWeight:700, color:C.blue, marginBottom:'18px', textAlign:'center' }}>The Story</h3>
        <div style={{ display:'grid', gap:'14px' }}>
          {[
            { icon:'👩‍🦯', title:'The Team',    text:"India's first blind women's cricket team — formed from players across 6 states with zero resources and infinite courage." },
            { icon:'🌍', title:'The Journey',  text:'From local fields to the World Games at Edgbaston, Birmingham — a journey no one saw coming.' },
            { icon:'🏆', title:'The Victory',  text:'They won. Against all odds. And the world finally had to look.' },
          ].map(item => (
            <div key={item.title} style={{ display:'flex', gap:'14px', padding:'16px', background:C.offWhite, borderRadius:'12px', border:`1px solid ${C.grayLight}` }}>
              <span style={{ fontSize:'1.8rem' }}>{item.icon}</span>
              <div>
                <h4 style={{ fontWeight:700, color:C.dark, marginBottom:'4px' }}>{item.title}</h4>
                <p style={{ color:C.textMuted, fontSize:'0.875rem', lineHeight:1.6, margin:0 }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    Testimonials: (
      <div style={{ maxWidth:'900px', margin:'0 auto', display:'grid', gap:'14px', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))' }}>
        {TESTIMONIALS.map((t,i) => (
          <div key={i} style={{ background:C.white, borderRadius:'14px', padding:'20px', boxShadow:'0 2px 14px rgba(0,0,0,0.06)', border:`1px solid ${C.grayLight}`, borderTop:`3px solid ${i%2===0?C.saffron:C.green}` }}>
            <p style={{ fontSize:'1.4rem', color:C.saffron, fontWeight:900, margin:'0 0 8px' }}>"</p>
            <p style={{ color:C.text, lineHeight:1.65, marginBottom:'12px', fontStyle:'italic', fontSize:'0.9rem' }}>{t.quote}</p>
            <p style={{ fontSize:'0.78rem', color:C.gray, fontWeight:600 }}>— {t.attr}</p>
          </div>
        ))}
      </div>
    ),
    Blog: (
      <div style={{ maxWidth:'600px', margin:'0 auto', textAlign:'center', padding:'20px' }}>
        <div style={{ fontSize:'3rem', marginBottom:'14px' }}>✍️</div>
        <h3 style={{ fontSize:'1.4rem', fontWeight:700, color:C.blue, marginBottom:'10px' }}>Coming Soon</h3>
        <p style={{ color:C.textMuted, lineHeight:1.7 }}>Stories, interviews, and behind-the-scenes moments. Check back soon.</p>
      </div>
    ),
  };
  return (
    <section style={{ padding:'70px 20px', background:C.white }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
        <SectionLabel color={C.green} label="EXPLORE" />
        <h2 style={{ textAlign:'center', fontSize:'clamp(1.5rem,4vw,2.2rem)', fontWeight:800, color:C.dark, marginBottom:'36px' }}>Learn More About the Film</h2>
        <div style={{ display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap', marginBottom:'40px' }}>
          {['Film','Intro','Testimonials','Blog'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding:'10px 24px', borderRadius:'25px', fontWeight:600, fontSize:'0.875rem', border:`2px solid ${tab===t?C.blue:C.grayLight}`, background:tab===t?C.blue:C.white, color:tab===t?C.white:C.textMuted, cursor:'pointer', transition:'all 0.2s' }}>
              {t}
            </button>
          ))}
        </div>
        <div style={{ minHeight:'280px' }}>{content[tab]}</div>
      </div>
    </section>
  );
}

function Awards() {
  return (
    <section id="awards" style={{ padding:'70px 20px', background:`linear-gradient(135deg,${C.blueLight} 0%,#F0FFF4 100%)` }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
        <SectionLabel color={C.saffron} label="RECOGNITION" />
        <h2 style={{ textAlign:'center', fontSize:'clamp(1.5rem,4vw,2.2rem)', fontWeight:800, color:C.dark, marginBottom:'10px' }}>Awards &amp; Selections 🏆</h2>
        <p style={{ textAlign:'center', color:C.textMuted, marginBottom:'44px' }}>Recognised across 8+ countries at prestigious film festivals</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'18px' }}>
          {AWARDS.map((a,i) => (
            <div key={i} style={{ background:C.white, borderRadius:'14px', padding:'22px 18px', boxShadow:'0 3px 16px rgba(0,0,0,0.07)', border:`1px solid ${C.grayLight}`, borderLeft:`5px solid ${i%3===0?C.saffron:i%3===1?C.blue:C.green}`, display:'flex', alignItems:'flex-start', gap:'14px', transition:'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
              <span style={{ fontSize:'1.8rem' }}>{a.icon}</span>
              <div>
                <p style={{ fontWeight:700, color:C.dark, fontSize:'0.95rem', marginBottom:'3px' }}>{a.name}</p>
                <p style={{ color:C.saffron, fontWeight:700, fontSize:'0.85rem', marginBottom:'3px' }}>{a.result}</p>
                <p style={{ color:C.gray, fontSize:'0.78rem' }}>{a.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Screenings() {
  return (
    <section id="screenings" style={{ padding:'70px 20px', background:C.white }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
        <SectionLabel color={C.blue} label="REACH" />
        <h2 style={{ textAlign:'center', fontSize:'clamp(1.5rem,4vw,2.2rem)', fontWeight:800, color:C.dark, marginBottom:'10px' }}>Where It Has Been Screened</h2>
        <p style={{ textAlign:'center', color:C.textMuted, marginBottom:'44px' }}>A movement spreading across India — school to school, office to office</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'18px', marginBottom:'40px' }}>
          {SCREENINGS_DATA.map(s => (
            <div key={s.label} style={{ background:s.color, borderRadius:'14px', padding:'26px 18px', textAlign:'center', border:'1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize:'2.2rem', marginBottom:'8px' }}>{s.icon}</div>
              <div style={{ fontSize:'1.8rem', fontWeight:800, color:C.dark }}>{s.count}</div>
              <div style={{ color:C.textMuted, fontWeight:600, fontSize:'0.875rem', marginTop:'4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ background:C.grayLight, borderRadius:'14px', padding:'24px', textAlign:'center' }}>
          <p style={{ fontWeight:700, color:C.dark, marginBottom:'14px' }}>Notable Venues</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'10px', justifyContent:'center' }}>
            {['Kriti Film Club · Delhi','IIT Bombay','DPS Bengaluru','Infosys Campus','TISS Mumbai','Jain University'].map(v => (
              <span key={v} style={{ padding:'7px 16px', background:C.white, borderRadius:'20px', fontSize:'0.82rem', fontWeight:500, color:C.text, boxShadow:'0 1px 4px rgba(0,0,0,0.07)' }}>📍 {v}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section id="video" style={{ padding:'70px 20px', background:C.dark }}>
      <div style={{ maxWidth:'860px', margin:'0 auto', textAlign:'center' }}>
        <SectionLabel color={C.saffron} label="WATCH" />
        <h2 style={{ fontSize:'clamp(1.5rem,4vw,2.2rem)', fontWeight:800, color:C.white, marginBottom:'10px' }}>Watch the Trailer</h2>
        <p style={{ color:'rgba(255,255,255,0.55)', marginBottom:'32px' }}>Get a glimpse of the incredible journey</p>
        <div style={{ position:'relative', paddingBottom:'56.25%', height:0, borderRadius:'14px', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.5)', border:`3px solid rgba(255,153,51,0.4)` }}>
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Dekh Le India — Trailer"
            style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p style={{ color:'rgba(255,255,255,0.3)', fontSize:'0.75rem', marginTop:'10px' }}>Replace YouTube URL with actual trailer link</p>
        <div style={{ marginTop:'28px' }}>
          <a href="https://www.jiohotstar.com/" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'13px 30px', borderRadius:'30px', background:C.saffron, color:C.white, fontWeight:700, fontSize:'0.95rem', textDecoration:'none', boxShadow:'0 4px 20px rgba(255,153,51,0.4)' }}>
            ▶ Watch Full Film on JioHotstar
          </a>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section style={{ padding:'90px 20px', background:`linear-gradient(135deg,${C.blue} 0%,#001A6E 100%)`, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'-50px', right:'-50px', width:'280px', height:'280px', borderRadius:'50%', background:'rgba(255,153,51,0.1)', pointerEvents:'none' }} />
      <div style={{ maxWidth:'680px', margin:'0 auto', textAlign:'center', position:'relative' }}>
        <div style={{ fontSize:'2.8rem', marginBottom:'18px' }}>🇮🇳</div>
        <h2 style={{ fontSize:'clamp(1.6rem,5vw,2.8rem)', fontWeight:900, color:C.white, lineHeight:1.2, marginBottom:'18px' }}>
          A movement to bring this film to every student, school, and workplace in India.
        </h2>
        <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'1rem', lineHeight:1.7, marginBottom:'36px', maxWidth:'520px', margin:'0 auto 36px' }}>
          Help us reach 1 million viewers. Every screening, every contribution, every share — brings us closer to a more inclusive India.
        </p>
        <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/contribute"
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'13px 30px', borderRadius:'30px', background:C.saffron, color:C.white, fontWeight:700, fontSize:'0.95rem', textDecoration:'none', boxShadow:'0 4px 20px rgba(255,153,51,0.4)' }}>
            💛 Contribute Now
          </Link>
          <a href="https://www.jiohotstar.com/" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'13px 30px', borderRadius:'30px', background:'transparent', color:C.white, fontWeight:700, fontSize:'0.95rem', textDecoration:'none', border:'2px solid rgba(255,255,255,0.45)' }}>
            ▶ Watch the Film
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background:'#0A0A0A', color:'rgba(255,255,255,0.6)', padding:'48px 20px 24px' }}>
      <div style={{ height:'3px', background:`linear-gradient(90deg,${C.saffron} 33%,#333 33%,#333 66%,${C.green} 66%)`, marginBottom:'36px', borderRadius:'3px' }} />
      <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'32px', marginBottom:'36px' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px' }}>
              <span style={{ fontSize:'1.3rem' }}>🏏</span>
              <span style={{ color:C.white, fontWeight:800 }}>Dekh Le! India</span>
            </div>
            <p style={{ fontSize:'0.85rem', lineHeight:1.7, color:'rgba(255,255,255,0.45)' }}>A documentary about India's first blind women's cricket team.</p>
          </div>
          <div>
            <h4 style={{ color:C.white, fontWeight:700, marginBottom:'12px', fontSize:'0.85rem', letterSpacing:'0.06em' }}>QUICK LINKS</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              {[['#awards','Awards'],['#screenings','Screenings'],['#video','Watch Trailer'],['contribute','Contribute']].map(([h,l]) => (
                <a key={h} href={h.startsWith('#')?h:`/${h}`} style={{ color:'rgba(255,255,255,0.45)', textDecoration:'none', fontSize:'0.85rem' }}>{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ color:C.white, fontWeight:700, marginBottom:'12px', fontSize:'0.85rem', letterSpacing:'0.06em' }}>CONTACT</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:'7px', fontSize:'0.85rem' }}>
              <a href="mailto:m_moorthy@yahoo.com" style={{ color:C.saffron, textDecoration:'none' }}>m_moorthy@yahoo.com</a>
              <a href="tel:+919880214587" style={{ color:'rgba(255,255,255,0.45)', textDecoration:'none' }}>+91-9880214587</a>
              <p style={{ color:'rgba(255,255,255,0.45)', margin:0 }}>Dir. Shanthi Mohan &amp; Mukund Moorthy</p>
              <p style={{ color:'rgba(255,255,255,0.35)', margin:0, fontSize:'0.78rem' }}>Sol Production · DejaVu Arts</p>
            </div>
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:'20px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'10px' }}>
          <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.28)', margin:0 }}>© {new Date().getFullYear()} Dekh Le! India. All rights reserved.</p>
          <div style={{ display:'flex', gap:'6px' }}>
            {[C.saffron,C.white,C.green].map((c,i) => <div key={i} style={{ width:'10px', height:'10px', borderRadius:'50%', background:c }} />)}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Dekh Le! India 🇮🇳 — Documentary Film</title>
        <meta name="description" content="An inspiring story of the first ever blind women's cricket team of India. Award-winning documentary." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main>
        <Hero />
        <TabsSection />
        <Awards />
        <Screenings />
        <VideoSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
