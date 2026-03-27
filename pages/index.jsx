// pages/index.jsx
// Dekh Le! India — Premium Cinematic Redesign
// Netflix / NatGeo inspired · Bebas Neue · Dark blue cricket jersey theme
// Sections: Hero · Sizzle · Story · Rock Song · Timeline · Accolades · Reactions · Blog · Impact · CTA

import Head from 'next/head';
import Link from 'next/link';
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

const BEHIND_SCENES = [
  { n:'01', title:'10 States,\nOne Dream',       body:'Odisha, Maharashtra, Karnataka, Kerala, Andhra Pradesh, Telangana, Assam, Madhya Pradesh, Delhi and Gujarat — seeking players whose families had never seen them play.' },
  { n:'02', title:'2.5 Years of\nFilmmaking',    body:'110 hours of footage captured across 10 states — on trains, in hostels, on dusty grounds — edited to 70 minutes of inspiration.' },
  { n:'03', title:'Edgbaston,\nBirmingham',       body:"The World Games. 60,000 seat stadium. India's blind women took the field. We were there for every ball bowled, every wicket taken, every tear shed." },
  { n:'04', title:'A Story\nWorld Missed',        body:'They won. Against all odds. India barely noticed. This film is the witness the world should have been.' },
];

const TESTIMONIALS = [
  { q: 'This is moving story of resilience', who: 'Viewer' },
  { q: 'Very very inspirational. Confirming the saying, that "Nothing is impossible". Very well made Mukund. Thanks for sharing with us.', who: 'Viewer' },
  { q: 'So much inspiring Mukund. I am so overwhelmed by this story.', who: 'Viewer' },
  { q: 'Absolutely endorsing that disability does not mean inability.', who: 'Viewer' },
  { q: 'This powerful documentary is sure to inspire and uplift many.', who: 'Viewer' },
  { q: 'Well done Mukund! Zabardast.. lot of goosebumps..', who: 'Viewer' },
  { q: 'A story that needs to be told. Kudos to the entire team.', who: 'Viewer' },
  { q: 'What an inspiring story! Excellent storytelling, full of emotions.', who: 'Viewer' },
  { q: 'Dekh Le India! Perfect name. Words are not enough to express gratitude.', who: 'Viewer' },
  { q: 'Thanks for making a movie on blind cricket. This creates awareness.', who: 'Viewer' },
  { q: 'Watched the movie with my family. Very moving and inspiring.', who: 'Viewer' },
];

const IMPACT_STATS = [
  { value:'10K+', label:'People Reached',    icon:'👥' },
  { value:'50+',  label:'School Screenings', icon:'🏫' },
  { value:'10+',  label:'Companies',         icon:'🏢' },
  { value:'10+',  label:'Awards Won',        icon:'🏆' },
  { value:'8+',   label:'Countries',         icon:'🌍' },
  { value:'10',   label:'States Covered',    icon:'🗺️' },
  { value:'100+', label:'Matches Played',    icon:'🏏' },
  { value:'10+',  label:'Tournaments Won',   icon:'🥇' },
  { value:'1',    label:'World Cup Win',      icon:'🏆' },
];

const BLOG_POSTS = [
  {
    date:'March 2026', readTime:'6 min',
    title:'Why It Took 2.5 Years to Make a 70-Minute Film',
    excerpt:"We didn't plan for a feature. We planned for a short film. Then the women kept winning, kept defying, kept living stories too big for any runtime we'd budgeted.",
  },
  {
    date:'January 2026', readTime:'4 min',
    title:'The Night We Almost Lost All the Birmingham Footage',
    excerpt:'A hard drive. A monsoon. A 14-hour layover in Dubai. The story of how the most important footage in the film nearly disappeared forever.',
  },
  {
    date:'November 2025', readTime:'8 min',
    title:'What 10 States Taught Us About Invisible India',
    excerpt:'From a paddy field in Odisha to a terrace in Kerala — the players we found were not waiting to be rescued. They were waiting to be seen.',
  },
];

const GALLERY_ITEMS = [
  { src:'/gallery/pm-honored.png',            caption:'Honored by the Prime Minister',            alt:"Team honored by the Prime Minister of India"             },
  { src:'/gallery/world-cup-celebration.png', caption:'World Cup Victory Celebration',            alt:'World Cup victory celebration'                           },
  { src:'/gallery/president-meeting.png',     caption:'Meeting with the President of India',      alt:'Team meeting with the President of India'                },
  { src:'/gallery/bcci-support.png',          caption:'BCCI Announces Major Support',             alt:'BCCI announces major support for Indian Blind Cricket'   },
  { src:'/gallery/t20-world-cup-win.png',     caption:"India Wins First Blind T20 Women's World Cup", alt:"India wins the first Blind T20 Women's World Cup" },
  { src:'/gallery/reliance-foundation.png',   caption:'Recognized by Reliance Foundation',        alt:"Team at Reliance Foundation's United in Triumph event"   },
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
   RAZORPAY SCRIPT LOADER
───────────────────────────────────────────────────────────────── */
function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/* ─────────────────────────────────────────────────────────────────
   DONATION MODAL
───────────────────────────────────────────────────────────────── */
const PRESETS = [50, 100, 200, 500, 1000];

function DonationModal({ onClose }) {
  const [selected, setSelected] = useState(100);
  const [custom,   setCustom]   = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const finalAmount = custom ? parseInt(custom) : selected;

  const handlePay = async () => {
    setError('');
    if (!finalAmount || finalAmount < 1) { setError('Please enter a valid amount (minimum ₹1).'); return; }
    setLoading(true);
    const ok = await loadRazorpay();
    if (!ok) { setError('Could not load payment system. Check your internet and try again.'); setLoading(false); return; }
    
    // Note: requires /api/create-order backend endpoint
    let order;
    try {
      const res  = await fetch('/api/create-order', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ amount: finalAmount * 100 }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Order creation failed');
      order = data;
    } catch (err) { setError(err.message); setLoading(false); return; }

    const options = {
      key: order.keyId, amount: order.amount, currency: order.currency,
      name: 'Dekh Le! India', description: 'Support the film movement',
      order_id: order.orderId, theme: { color: '#00BFFF' },
      prefill: { name:'', email:'', contact:'' },
      handler(response) {
        onClose();
        setTimeout(() => alert(`🙏 Thank you! Your contribution of ₹${finalAmount} has been received.\n\nPayment ID: ${response.razorpay_payment_id}`), 100);
      },
      modal: { ondismiss() { setLoading(false); } },
    };
    const rz = new window.Razorpay(options);
    rz.on('payment.failed', (resp) => { setError(`Payment failed: ${resp.error.description}`); setLoading(false); });
    rz.open();
    setLoading(false);
  };

  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div onClick={handleBackdrop} style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(3,8,16,0.88)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', animation:'fadeIn 0.25s ease' }}>
      <div style={{ background:`linear-gradient(145deg, #0D2347 0%, #060F22 100%)`, border:'1px solid rgba(0,191,255,0.25)', borderRadius:'4px', padding:'40px 36px', maxWidth:'440px', width:'100%', boxShadow:'0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,191,255,0.1)', position:'relative', animation:'slideUp 0.3s ease' }}>
        <button onClick={onClose} style={{ position:'absolute', top:'16px', right:'18px', background:'none', border:'none', color:'rgba(240,237,232,0.4)', cursor:'pointer', fontSize:'1.1rem', lineHeight:1, transition:'color 0.2s' }} onMouseEnter={e => e.target.style.color='#fff'} onMouseLeave={e => e.target.style.color='rgba(240,237,232,0.4)'}>✕</button>
        <div style={{ marginBottom:'24px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px' }}>
            <div style={{ height:'1px', width:'28px', background:'#00BFFF', opacity:0.7 }} />
            <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:'0.68rem', letterSpacing:'0.32em', color:'#00BFFF', textTransform:'uppercase' }}>Support the Film</span>
          </div>
          <h3 style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'2rem', letterSpacing:'0.04em', color:'#FFFFFF', lineHeight:1.1, marginBottom:'8px' }}>Contribute to<br />Dekh Le! India 🇮🇳</h3>
          <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.85rem', color:'rgba(240,237,232,0.7)', lineHeight:1.65, fontStyle:'italic', borderLeft:'2px solid #FF9933', paddingLeft:'12px', marginBottom:'10px' }}>
            If you watched the film and loved it, you can do your bit and contribute here.
          </p>
          <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.82rem', color:'rgba(240,237,232,0.45)', lineHeight:1.65 }}>Every rupee funds skill training so these champions can build a livelihood from the game they love.</p>
        </div>
        <div style={{ marginBottom:'12px' }}>
          <p style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:'0.62rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(240,237,232,0.35)', marginBottom:'10px' }}>Choose Amount (₹)</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'6px' }}>
            {PRESETS.map(amt => (
              <button key={amt} onClick={() => { setSelected(amt); setCustom(''); setError(''); }}
                style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.95rem', letterSpacing:'0.04em', padding:'10px 4px', cursor:'pointer', border:'none', transition:'all 0.18s',
                  background: !custom && selected === amt ? '#00BFFF' : 'rgba(0,191,255,0.08)',
                  color:      !custom && selected === amt ? '#060F22' : 'rgba(240,237,232,0.65)',
                  outline:    !custom && selected === amt ? 'none'    : '1px solid rgba(0,191,255,0.18)',
                }}>₹{amt}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:'24px' }}>
          <p style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:'0.62rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(240,237,232,0.35)', marginBottom:'8px' }}>Or Enter Custom Amount</p>
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', fontFamily:'"Bebas Neue",sans-serif', fontSize:'1.1rem', color:'rgba(240,237,232,0.4)' }}>₹</span>
            <input type="number" min="1" placeholder="Enter amount" value={custom} onChange={e => { setCustom(e.target.value); setError(''); }}
              style={{ width:'100%', padding:'12px 14px 12px 30px', fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'1rem', background:'rgba(255,255,255,0.05)', border:`1px solid ${custom ? 'rgba(0,191,255,0.6)' : 'rgba(255,255,255,0.1)'}`, color:'#FFFFFF', outline:'none', transition:'border-color 0.2s' }}
              onFocus={e => e.target.style.borderColor='rgba(0,191,255,0.7)'}
              onBlur={e => e.target.style.borderColor=custom?'rgba(0,191,255,0.6)':'rgba(255,255,255,0.1)'} />
          </div>
        </div>
        {error && <p style={{ fontFamily:'"Inter",sans-serif', fontSize:'0.8rem', color:'#FF6B6B', marginBottom:'14px', lineHeight:1.5 }}>⚠ {error}</p>}
        <button onClick={handlePay} disabled={loading}
          style={{ width:'100%', padding:'15px 24px', fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'1rem', letterSpacing:'0.22em', textTransform:'uppercase', background: loading ? 'rgba(255,153,51,0.5)' : '#FF9933', color:'#060F22', border:'none', cursor: loading ? 'not-allowed' : 'pointer', transition:'all 0.2s', boxShadow: loading ? 'none' : '0 0 28px rgba(255,153,51,0.5)' }}
          onMouseEnter={e => { if(!loading) e.currentTarget.style.boxShadow='0 0 40px rgba(255,153,51,0.7)'; }}
          onMouseLeave={e => { if(!loading) e.currentTarget.style.boxShadow='0 0 28px rgba(255,153,51,0.5)'; }}>
          {loading ? '⏳ Opening Payment...' : `💛 Donate ₹${finalAmount || '—'} Now`}
        </button>
        <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.72rem', color:'rgba(240,237,232,0.28)', textAlign:'center', marginTop:'14px' }}>🔒 Secured by Razorpay · UPI · Cards · Net Banking</p>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
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

  const links = [['#story','Story'],['#behind','Behind Scenes'],['#awards','Accolades'],['#gallery','Gallery'],['#reactions','Reactions'],['#blog','Blog'],['#impact','Impact'],['#watch','Watch']];

  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000, transition:'all 0.4s', background: scrolled ? 'rgba(6,15,34,0.97)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(0,191,255,0.12)' : 'none' }}>
      <div style={{ height:'2px', background:`linear-gradient(90deg, ${T.saffron} 33.33%, rgba(255,255,255,0.12) 33.33% 66.66%, ${T.green} 66.66%)` }} />
      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 32px', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <a href="#" style={{ textDecoration:'none' }}>
          <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'1.4rem', letterSpacing:'0.08em', color:T.white, display:'block', lineHeight:1 }}>Dekh Le! India</span>
          <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.55rem', letterSpacing:'0.3em', color:T.accent, display:'block', marginTop:'2px' }}>Documentary Film · 2026</span>
        </a>
        <div className="d-nav" style={{ display:'flex', gap:'32px', alignItems:'center' }}>
          {links.map(([h,l]) => (
            <a key={h} href={h} style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.85rem', letterSpacing:'0.18em', textTransform:'uppercase', color:T.dim, textDecoration:'none', transition:'color 0.2s' }}
               onMouseEnter={e => e.target.style.color=T.white} onMouseLeave={e => e.target.style.color=T.dim}>{l}</a>
          ))}
          <Btn href="https://www.jiohotstar.com/" external>▶ Watch Now</Btn>
        </div>
        <button className="m-ham" onClick={() => setOpen(!open)} style={{ display:'none', background:'none', border:`1px solid ${T.ghost}`, color:T.white, width:'40px', height:'40px', cursor:'pointer', fontSize:'1rem' }}>
          {open ? '✕' : '☰'}
        </button>
      </div>
      {open && (
        <div style={{ background:'rgba(6,15,34,0.99)', borderTop:`1px solid ${T.accentDim}`, padding:'20px 32px 28px' }}>
          {links.map(([h,l]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} style={{ display:'block', fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'1.2rem', letterSpacing:'0.14em', textTransform:'uppercase', color:T.dim, textDecoration:'none', padding:'11px 0', borderBottom:`1px solid ${T.ghost}` }}>{l}</a>
          ))}
          <div style={{ marginTop:'20px', display:'flex', flexDirection:'column', gap:'10px' }}>
            <Btn href="https://www.jiohotstar.com/" external>▶ Watch on JioHotstar</Btn>
            <Btn href="/contribute" primary={false}>🤍 Contribute</Btn>
          </div>
        </div>
      )}
      <style>{`@media(max-width:960px){.d-nav{display:none!important}.m-ham{display:flex!important;align-items:center;justify-content:center}}`}</style>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────── */
function Hero() {
  const [in_, setIn_] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  useEffect(() => { const t = setTimeout(() => setIn_(true), 120); return () => clearTimeout(t); }, []);
  const anim = (delay) => ({ opacity: in_ ? 1 : 0, transform: in_ ? 'translateY(0)' : 'translateY(30px)', transition:`opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms` });

  return (
    <section style={{ position:'relative', minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', overflow:'hidden', background:T.black }}>
      <div style={{ position:'absolute', inset:0, zIndex:0, overflow:'hidden', pointerEvents:'none' }}>
        <iframe src="https://www.youtube.com/embed/h_JVTDhF6RY?autoplay=1&mute=1&loop=1&playlist=h_JVTDhF6RY&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0" title="Hero background video" allow="autoplay; encrypted-media"
          style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', width:'calc(100vw + 400px)', height:'calc(100vw * 0.5625 + 225px)', minWidth:'100%', minHeight:'100%', border:'none', opacity:0.35, pointerEvents:'none' }} />
      </div>
      <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', background:'rgba(3,8,16,0.62)' }} />
      <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', background:`linear-gradient(175deg, rgba(10,31,68,0.75) 0%, rgba(6,15,34,0.6) 50%, rgba(3,8,16,0.85) 100%)` }} />
      <div style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none', background:'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(3,8,16,0.7) 100%)' }} />
      <div style={{ position:'absolute', inset:0, zIndex:3, pointerEvents:'none', opacity:0.06, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'160px', zIndex:4, pointerEvents:'none', background:`linear-gradient(to bottom, ${T.black} 0%, transparent 100%)` }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'200px', zIndex:4, pointerEvents:'none', background:`linear-gradient(to top, ${T.black} 0%, transparent 100%)` }} />

      <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'120px 24px 80px', maxWidth:'1100px', width:'100%' }}>
        <div style={{ ...anim(100), marginBottom:'20px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(255,153,51,0.12)', border:'1px solid rgba(255,153,51,0.45)', padding:'8px 22px', marginBottom:'4px' }}>
            <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:T.saffron, display:'inline-block', animation:'heroPulse 1.6s ease-in-out infinite', flexShrink:0 }} />
            <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.88rem', letterSpacing:'0.22em', textTransform:'uppercase', color:T.saffron }}>
              <strong>Releasing on Jio Hotstar — June 2026</strong>
            </span>
          </div>
        </div>
        <div style={{ ...anim(200), display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', marginBottom:'24px' }}>
          <div style={{ height:'1px', width:'48px', background:T.accent }} />
          <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:'0.72rem', letterSpacing:'0.38em', color:T.accent, textTransform:'uppercase' }}>A Documentary Film by Shanthi Mohan &amp; Mukund Moorthy</span>
          <div style={{ height:'1px', width:'48px', background:T.accent }} />
        </div>
        <div style={{ ...anim(400), marginBottom:'4px' }}>
          <h1 style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'clamp(5rem, 18vw, 14rem)', lineHeight:0.88, letterSpacing:'0.02em', margin:0, color:T.white, textShadow:`0 0 60px rgba(0,191,255,0.9), 0 0 120px rgba(0,191,255,0.5), 0 0 200px rgba(0,191,255,0.2), 0 4px 0 rgba(0,0,0,0.9)` }}>DEKH LE!</h1>
        </div>
        <div style={{ ...anim(560), marginBottom:'4px', position:'relative', display:'inline-block' }}>
          <div style={{ position:'absolute', bottom:'10%', left:'-2%', right:'-2%', height:'28%', background:`linear-gradient(90deg, ${T.saffron}22, rgba(255,255,255,0.05), ${T.green}22)`, pointerEvents:'none', zIndex:0 }} />
          <h1 style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'clamp(5rem, 18vw, 14rem)', lineHeight:0.88, letterSpacing:'0.02em', margin:0, color:T.accent, position:'relative', zIndex:1, textShadow:`0 0 50px rgba(0,191,255,1), 0 0 100px rgba(0,191,255,0.7), 0 0 180px rgba(0,191,255,0.35), 0 4px 0 rgba(0,0,0,0.9)` }}>INDIA</h1>
        </div>
        <div style={{ ...anim(680), fontSize:'clamp(2rem,5vw,3.5rem)', marginBottom:'28px', marginTop:'8px' }}>🇮🇳</div>
        <p style={{ ...anim(800), fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'clamp(1rem,2.2vw,1.25rem)', color:T.dim, maxWidth:'580px', margin:'0 auto 16px', lineHeight:1.7, letterSpacing:'0.02em' }}>
          A story India never saw.<br />
          <strong style={{ color:T.white, fontWeight:400, fontStyle:'italic' }}>A team that refused to be unseen.</strong>
        </p>
        <div style={{ ...anim(1100), display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap', marginBottom:'12px' }}>
          <Btn href="https://www.jiohotstar.com/" external>▶ Watch Now</Btn>
          <button onClick={() => setShowDonate(true)}
            style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.9rem', letterSpacing:'0.22em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:'10px', padding:'13px 34px', background:'transparent', color:T.white, border:`1px solid rgba(240,237,232,0.3)`, cursor:'pointer', transition:'all 0.25s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor='rgba(240,237,232,0.7)'}
            onMouseLeave={e => e.currentTarget.style.borderColor='rgba(240,237,232,0.3)'}>
            🤍 Contribute
          </button>
        </div>
        {showDonate && <DonationModal onClose={() => setShowDonate(false)} />}
      </div>
      <style>{`@keyframes heroPulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   WATCH SECTION
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
          <SectionTitle>Watch the Trailer</SectionTitle>
          <div style={{ display:'flex', justifyContent:'center', gap:'1px', background:`rgba(0,191,255,0.15)`, border:`1px solid rgba(0,191,255,0.2)`, width:'fit-content', margin:'0 auto 32px' }}>
            {Object.entries(vids).map(([k,v]) => (
              <button key={k} onClick={() => setActive(k)} style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.82rem', letterSpacing:'0.2em', textTransform:'uppercase', padding:'11px 28px', cursor:'pointer', border:'none', transition:'all 0.2s', background: active===k ? T.saffron : 'transparent', color: active===k ? T.navyDark : T.dim }}>
                {v.icon} {v.label}
              </button>
            ))}
          </div>
          <div style={{ position:'relative', paddingBottom:'56.25%', height:0, border:`1px solid rgba(0,191,255,0.25)`, boxShadow:`0 0 40px ${T.accentDim}` }}>
            <iframe key={active} src={`https://www.youtube.com/embed/${vids[active].id}?rel=0`} title={vids[active].label} style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }} allowFullScreen />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────── */
export default function Page() {
  return (
    <>
      <Head>
        <title>Dekh Le! India — Documentary Film 2026</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html:`
          *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
          html { scroll-behavior:smooth; }
          body { background:#030810; color:#F0EDE8; overflow-x:hidden; }
        `}} />
      </Head>

      <Navbar />
      <main>
        <Hero />
        <WatchSection />
        {/* Additional sections (Story, Awards, etc.) can be placed here */}
      </main>
    </>
  );
}
