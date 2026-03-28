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

/* ── Exact viewer quotes — do not modify text ── */
const TESTIMONIALS = [
  { q: 'This is moving story of resilience',
    who: 'Viewer' },
  { q: 'Very very inspirational. Confirming the saying, that "Nothing is impossible". Very well made Mukund. Thanks for sharing with us.',
    who: 'Viewer' },
  { q: 'So much inspiring Mukund. I am so overwhelmed by this story.',
    who: 'Viewer' },
  { q: 'Absolutely endorsing that disability does not mean inability.',
    who: 'Viewer' },
  { q: 'This powerful documentary is sure to inspire and uplift many.',
    who: 'Viewer' },
  { q: 'Well done Mukund! Zabardast.. lot of goosebumps..',
    who: 'Viewer' },
  { q: 'A story that needs to be told. Kudos to the entire team.',
    who: 'Viewer' },
  { q: 'What an inspiring story! Excellent storytelling, full of emotions.',
    who: 'Viewer' },
  { q: 'Dekh Le India! Perfect name. Words are not enough to express gratitude.',
    who: 'Viewer' },
  { q: 'Thanks for making a movie on blind cricket. This creates awareness.',
    who: 'Viewer' },
  { q: 'Watched the movie with my family. Very moving and inspiring.',
    who: 'Viewer' },
];

const IMPACT_STATS = [
  { value:'10K+', label:'People Reached',    icon:'👥' },
  { value:'50+',  label:'School Screenings', icon:'🏫' },
  { value:'10+',  label:'Companies',         icon:'🏢' },
  { value:'10+',  label:'Awards Won',        icon:'🏆' },
  { value:'8+',   label:'Countries',         icon:'🌍' },
  { value:'10',   label:'States Covered',    icon:'🗺️' },
  // ── Cricket team statistics ─────────────────────────
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

/* ─────────────────────────────────────────────────────────────────
   GALLERY_ITEMS
   ✅ ACTION — put these 6 files inside your project at:
        public/images/
   Use EXACTLY these filenames:
        pm.jpeg
        trophy.jpeg
        president.jpeg
        bcci.jpeg
        t20.jpeg
        reliance.png
───────────────────────────────────────────────────────────────── */
const GALLERY_ITEMS = [
  { src:'/images/pm.jpeg',        caption:'Honored by the Prime Minister',          alt:'Team honored by the Prime Minister of India'           },
  { src:'/images/trophy.jpeg',    caption:'World Cup Victory Celebration',          alt:'World Cup victory celebration'                         },
  { src:'/images/president.jpeg', caption:'Meeting with the President of India',    alt:'Team meeting with the President of India'              },
  { src:'/images/bcci.jpeg',      caption:'BCCI Announces Major Support',           alt:'BCCI announces major support for Indian Blind Cricket' },
  { src:'/images/t20.jpeg',       caption:"India Wins First Blind T20 Women's World Cup", alt:"India wins the first Blind T20 Women's World Cup" },
  { src:'/images/reliance.png',  caption:'Recognized by Reliance Foundation',     alt:"Team at Reliance Foundation's United in Triumph event" },
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
const PRESETS = [49, 99, 149, 199];

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
      <style>{`@media(max-width:960px){.d-nav{display:none!important}.m-ham{display:flex!important;align-items:center;justify-content:center}}@media(max-width:480px){.award-grid{grid-template-columns:1fr!important}.stat-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
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
        <div style={{ ...anim(950), marginBottom:'48px' }}>
          <p style={{ fontFamily:'"Georgia",serif', fontStyle:'italic', fontWeight:400, fontSize:'clamp(0.85rem,1.6vw,1rem)', color:T.faint, letterSpacing:'0.06em', margin:0 }}>
            "No Pity &nbsp;·&nbsp; No Sympathy &nbsp;·&nbsp; Just Give Us an Opportunity"
          </p>
        </div>
        <div style={{ ...anim(1100), display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap', marginBottom:'12px' }}>
          <Btn href="https://www.jiohotstar.com/" external>▶ Watch Now</Btn>
          <button onClick={() => setShowDonate(true)}
            style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.9rem', letterSpacing:'0.22em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:'10px', padding:'13px 34px', background:'transparent', color:T.white, border:`1px solid rgba(240,237,232,0.3)`, cursor:'pointer', transition:'all 0.25s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor='rgba(240,237,232,0.7)'}
            onMouseLeave={e => e.currentTarget.style.borderColor='rgba(240,237,232,0.3)'}>
            🤍 Contribute
          </button>
        </div>
        <p style={{ ...anim(1200), fontFamily:'"Bebas Neue",sans-serif', fontSize:'0.68rem', letterSpacing:'0.22em', textTransform:'uppercase', color:T.saffron }}>
          🎬 Releasing on Jio Hotstar — June 2026
        </p>
        {showDonate && <DonationModal onClose={() => setShowDonate(false)} />}
      </div>
      <div style={{ ...anim(1500), position:'absolute', bottom:'28px', left:'50%', transform:'translateX(-50%)', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
        <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:'0.55rem', letterSpacing:'0.3em', textTransform:'uppercase', color:T.faint }}>Scroll</span>
        <div style={{ width:'1px', height:'40px', background:`linear-gradient(to bottom, ${T.accent}88, transparent)`, animation:'scrollPulse 2s ease-in-out infinite' }} />
      </div>
      <style>{`@keyframes scrollPulse{0%,100%{opacity:0.3}50%{opacity:1}}@keyframes heroPulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   WATCH / SIZZLE SECTION
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
          <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'1rem', color:T.dim, textAlign:'center', marginBottom:'32px' }}>Experience the incredible journey</p>
          <div style={{ display:'flex', justifyContent:'center', gap:'1px', background:`rgba(0,191,255,0.15)`, border:`1px solid rgba(0,191,255,0.2)`, width:'fit-content', margin:'0 auto 14px' }}>
            {Object.entries(vids).map(([k,v]) => (
              <button key={k} onClick={() => setActive(k)} style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.82rem', letterSpacing:'0.2em', textTransform:'uppercase', padding:'11px 28px', cursor:'pointer', border:'none', transition:'all 0.2s', background: active===k ? T.saffron : 'transparent', color: active===k ? T.navyDark : T.dim }}>
                {v.icon} {v.label}
              </button>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={100}>
          <div style={{ position:'relative', paddingBottom:'56.25%', height:0, border:`1px solid rgba(0,191,255,0.25)`, boxShadow:`0 0 100px rgba(0,0,0,0.7), 0 0 40px ${T.accentDim}` }}>
            <iframe key={active} src={`https://www.youtube.com/embed/${vids[active].id}?rel=0`} title={vids[active].label}
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
          <SectionTitle>They Played With Courage.<br /><span style={{ color:T.accent }}>We Filmed With Love.</span></SectionTitle>
          <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'1.05rem', color:T.dim, textAlign:'center', maxWidth:'600px', margin:'0 auto 60px', lineHeight:1.75 }}>
            Dekh Le! India chronicles the extraordinary journey of India&#39;s first blind women&#39;s national cricket team — from remote villages across Odisha, Maharashtra, Karnataka, Kerala, Andhra Pradesh, Telangana, Assam, Madhya Pradesh, Delhi and Gujarat to the World Games at Edgbaston, UK.
          </p>
        </FadeUp>
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
        <FadeUp delay={300}>
          <div style={{ display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap', marginTop:'44px' }}>
            {['Documentary','70 Minutes','English, Hindi, Kannada, Odia, Assamese, Telugu, Malayalam, Santali','India'].map(tag => (
              <span key={tag} style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.75rem', letterSpacing:'0.18em', textTransform:'uppercase', padding:'7px 18px', color:T.accent, border:`1px solid rgba(0,191,255,0.3)` }}>{tag}</span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ROCK SONG SECTION
───────────────────────────────────────────────────────────────── */
function RockSongSection() {
  return (
    <section style={{ padding:'100px 24px', background:'#060F22', borderTop:`1px solid ${T.accentDim}` }}>
      <div style={{ maxWidth:'1000px', margin:'0 auto', textAlign:'center' }}>
        <FadeUp>
          <SectionEyebrow label="Original Soundtrack" />
          <SectionTitle>The Rock Anthem</SectionTitle>
          <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:400, fontSize:'1.1rem', color:T.saffron, marginBottom:'24px', letterSpacing:'0.05em' }}>
            Winner — Best Rock Guitarist (CLEF Music Awards 2025)
          </p>
          <div style={{ display:'flex', justifyContent:'center', gap:'20px', flexWrap:'wrap', marginTop:'32px' }}>
            {['Spotify','Amazon Music','YouTube Music','Apple Music'].map(platform => (
              <div key={platform} style={{ padding:'15px 25px', border:`1px solid ${T.ghost}`, color:T.faint, fontFamily:'"Bebas Neue",sans-serif', fontSize:'0.9rem', letterSpacing:'0.1em' }}>
                {platform} (Coming Soon)
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   JOURNEY / TIMELINE
───────────────────────────────────────────────────────────────── */
function BehindScenes() {
  return (
    <section id="behind" style={{ padding:'120px 24px', background:T.black, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent 0%, ${T.saffron}44 50%, transparent 100%)` }} />
      <div style={{ position:'absolute', top:'40%', right:'-80px', width:'350px', height:'350px', borderRadius:'50%', background:`radial-gradient(circle, rgba(255,153,51,0.06) 0%, transparent 60%)`, pointerEvents:'none' }} />
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <FadeUp>
          <SectionEyebrow label="History" />
          <SectionTitle>Journey of<br /><span style={{ color:T.saffron }}>Dekh Le! India So Far</span></SectionTitle>
          <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'1.05rem', color:T.dim, textAlign:'center', maxWidth:'560px', margin:'0 auto 60px', lineHeight:1.75 }}>
            2.5 years. 10 states. 110 hours of footage. One dream.
          </p>
        </FadeUp>
        <div style={{ maxWidth:'800px', margin:'0 auto', position:'relative' }}>
          <div style={{ position:'absolute', left:'24px', top:0, bottom:0, width:'1px', background:`linear-gradient(to bottom, ${T.accent}55, transparent)` }} />
          <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
            {[
              { year:'2020–21',   title:'Finding the Players',          body:'We crisscrossed ten states tracking down blind women cricketers — players whose families had never seen them play.' },
              { year:'2022',      title:'Training Camps',               body:'Embedded in BCCI training camps, we witnessed the raw beauty of players learning to bowl and bat by sound and touch alone.' },
              { year:'2023',      title:'The World Games — Birmingham', body:'Edgbaston. India vs Australia. Final. The world was not watching. We were. Every frame captured, every emotion preserved.' },
              { year:'2025',      title:'The Film is Complete',         body:'2.5 years of filming, editing, colour grading, and music composition later — Dekh Le! India was ready for the world to finally see.' },
              { year:'June 2026', title:'Releasing on Jio Hotstar',     body:'India finally sees its heroes — in English, Hindi, Kannada, Odia, Assamese, Telugu, Malayalam, and Santali.', highlight: true },
            ].map((t, i) => (
              <FadeUp key={t.year} delay={i * 120}>
                <div style={{ display:'flex', gap:'32px', padding:'32px 0 32px 60px', borderBottom:`1px solid rgba(255,255,255,0.04)`, position:'relative' }}>
                  <div style={{ position:'absolute', left:'17px', top:'36px', width:'16px', height:'16px', borderRadius:'50%', background: t.highlight ? T.saffron : i===2 ? T.saffron : T.accent, boxShadow: t.highlight ? `0 0 20px rgba(255,153,51,0.8)` : i===2 ? `0 0 16px rgba(255,153,51,0.6)` : `0 0 16px ${T.accentGlow}` }} />
                  <div style={{ minWidth:'80px', flexShrink:0 }}>
                    <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.75rem', letterSpacing:'0.18em', color: t.highlight ? T.saffron : i===2 ? T.saffron : T.accent }}>{t.year}</span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'1.3rem', letterSpacing:'0.06em', color: t.highlight ? T.saffron : T.white, marginBottom:'8px' }}>{t.title}</h3>
                    <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.9rem', color:T.dim, lineHeight:1.7, margin:0 }}>{t.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ACCOLADES / AWARDS
───────────────────────────────────────────────────────────────── */
function AwardsSection() {
  return (
    <section id="awards" style={{ padding:'120px 24px', background:`linear-gradient(180deg, ${T.black} 0%, ${T.navyDark} 100%)` }}>
      <div style={{ position:'absolute', left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent 0%, ${T.accent}44 50%, transparent 100%)` }} />
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <FadeUp>
          <SectionEyebrow label="Accolades" />
          <SectionTitle>Awards &amp;<br /><span style={{ color:T.accent }}>Festival Selections</span></SectionTitle>
          <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'1.05rem', color:T.dim, textAlign:'center', maxWidth:'520px', margin:'0 auto 36px', lineHeight:1.75 }}>
            Recognised across <span style={{ color:T.accent }}>8+ countries</span> at prestigious international film festivals.
          </p>
          <p style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:'1.1rem', color:T.saffron, textAlign:'center', marginBottom:'56px', letterSpacing:'0.1em' }}>
            Appreciated by the Prime Minister &amp; President of India
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
   AUDIENCE REACTIONS
   11 exact viewer quotes in a responsive card grid.
───────────────────────────────────────────────────────────────── */
function ReactionsSection() {
  return (
    <section id="reactions" style={{ padding:'120px 24px', background:T.black, position:'relative', overflow:'hidden' }}>
      {/* Decorative rules */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent 0%, ${T.saffron}44 50%, transparent 100%)` }} />
      <div style={{ position:'absolute', top:'30%', left:'50%', transform:'translateX(-50%)', width:'600px', height:'600px', borderRadius:'50%', background:`radial-gradient(circle, rgba(255,153,51,0.04) 0%, transparent 65%)`, pointerEvents:'none' }} />

      <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative' }}>

        {/* Header */}
        <FadeUp>
          <SectionEyebrow label="Audience Reactions" />
          <SectionTitle>
            Audience Reactions<br />
            <span style={{ color:T.saffron }}>What Viewers Said</span>
          </SectionTitle>
          <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'1.05rem', color:T.dim, textAlign:'center', maxWidth:'540px', margin:'0 auto 48px', lineHeight:1.75 }}>
            Real words from real viewers — unedited, unfiltered.
          </p>
        </FadeUp>

        {/* Viewer count badge */}
        <FadeUp delay={80}>
          <div style={{ display:'flex', justifyContent:'center', marginBottom:'48px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'10px 24px', border:`1px solid rgba(255,153,51,0.3)`, background:'rgba(255,153,51,0.06)' }}>
              <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:'1.6rem', color:T.saffron, lineHeight:1 }}>{TESTIMONIALS.length}</span>
              <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:'0.68rem', letterSpacing:'0.22em', textTransform:'uppercase', color:T.faint }}>Viewer Reactions</span>
            </div>
          </div>
        </FadeUp>

        {/* Quote cards — 11 cards, 3-column grid on desktop */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1px', background:`rgba(0,191,255,0.08)`, marginBottom:'48px' }}>
          {TESTIMONIALS.map((t, i) => {
            const accentColor = i % 3 === 0 ? T.saffron : i % 3 === 1 ? T.accent : 'rgba(46,139,87,0.9)';
            return (
              <FadeUp key={i} delay={Math.min(i, 5) * 70}>
                <div
                  style={{ padding:'28px 24px', background:T.navyDark, borderTop:`2px solid ${accentColor}`, height:'100%', transition:'background 0.3s', position:'relative' }}
                  onMouseEnter={e => e.currentTarget.style.background=T.navyMid}
                  onMouseLeave={e => e.currentTarget.style.background=T.navyDark}
                >
                  {/* Opening quotation mark */}
                  <p style={{ fontFamily:'"Georgia",serif', fontStyle:'italic', fontSize:'2rem', color:accentColor, lineHeight:1, marginBottom:'10px', opacity:0.7 }}>❝</p>

                  {/* Exact quote — do not modify */}
                  <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.925rem', color:T.dim, lineHeight:1.78, marginBottom:'20px', fontStyle:'italic' }}>
                    {t.q}
                  </p>

                  {/* Attribution */}
                  <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                    <div style={{ width:'18px', height:'1px', background:accentColor, opacity:0.6 }} />
                    <p style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.68rem', letterSpacing:'0.16em', textTransform:'uppercase', color:T.faint, margin:0 }}>
                      {t.who}
                    </p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* CTA */}
        <FadeUp delay={200}>
          <div style={{ textAlign:'center' }}>
            <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.95rem', color:T.dim, marginBottom:'24px', lineHeight:1.7 }}>
              Watch the film and share your reaction.
            </p>
            <Btn href="https://www.jiohotstar.com/" external>▶ Watch on Jio Hotstar</Btn>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   BLOG SECTION
───────────────────────────────────────────────────────────────── */
function BlogSection() {
  return (
    <section id="blog" style={{ padding:'120px 24px', background:`linear-gradient(180deg, ${T.navyDark} 0%, ${T.black} 100%)`, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent 0%, ${T.green}44 50%, transparent 100%)` }} />
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <FadeUp>
          <SectionEyebrow label="Blog — The Journey So Far" />
          <SectionTitle>Behind the<br /><span style={{ color:`rgba(46,139,87,0.9)` }}>Camera</span></SectionTitle>
        </FadeUp>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:'1px', background:`rgba(46,139,87,0.15)` }}>
          {BLOG_POSTS.map((post, i) => (
            <FadeUp key={i} delay={i*100}>
              <div style={{ background:T.navyDark, borderTop:`3px solid ${i===0?T.saffron:i===1?T.accent:'rgba(46,139,87,0.9)'}`, padding:'32px 28px', height:'100%', transition:'background 0.3s', cursor:'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background=T.navyMid}
                onMouseLeave={e => e.currentTarget.style.background=T.navyDark}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
                  <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:'0.65rem', letterSpacing:'0.22em', textTransform:'uppercase', color: i===0?T.saffron:i===1?T.accent:'rgba(46,139,87,0.9)' }}>{post.date}</span>
                  <span style={{ fontFamily:'"Inter",sans-serif', fontSize:'0.72rem', color:T.faint, border:`1px solid ${T.ghost}`, padding:'3px 10px' }}>{post.readTime} read</span>
                </div>
                <h3 style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'1.25rem', letterSpacing:'0.04em', color:T.white, lineHeight:1.15, marginBottom:'14px' }}>{post.title}</h3>
                <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.875rem', color:T.dim, lineHeight:1.75, marginBottom:'24px' }}>{post.excerpt}</p>
                <span style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:'0.72rem', letterSpacing:'0.2em', textTransform:'uppercase', color: i===0?T.saffron:i===1?T.accent:'rgba(46,139,87,0.9)' }}>Read Story →</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   GALLERY SECTION — new
───────────────────────────────────────────────────────────────── */
function GallerySection() {
  return (
    <section id="gallery" style={{ padding:'120px 24px', background:T.black, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent 0%, ${T.saffron}44 50%, transparent 100%)` }} />
      <div style={{ position:'absolute', top:'40%', left:'50%', transform:'translateX(-50%)', width:'700px', height:'700px', borderRadius:'50%', background:`radial-gradient(circle, rgba(255,153,51,0.03) 0%, transparent 65%)`, pointerEvents:'none' }} />

      <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative' }}>
        <FadeUp>
          <SectionEyebrow label="In the Spotlight" />
          <SectionTitle>
            Moments That<br />
            <span style={{ color:T.saffron }}>Made History</span>
          </SectionTitle>
          <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'1.05rem', color:T.dim, textAlign:'center', maxWidth:'540px', margin:'0 auto 56px', lineHeight:1.75 }}>
            From dusty village grounds to the highest offices in the land — the women the world finally saw.
          </p>
        </FadeUp>

        <div
          className="gallery-grid"
          style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px' }}
        >
          {GALLERY_ITEMS.map((item, i) => {
            const accentColor = i % 3 === 0 ? T.saffron : i % 3 === 1 ? T.accent : 'rgba(46,139,87,0.9)';
            return (
              <FadeUp key={i} delay={Math.min(i, 5) * 90}>
                <div
                  style={{ position:'relative', background:T.navyDark, border:`1px solid rgba(255,255,255,0.05)`, borderTop:`3px solid ${accentColor}`, overflow:'hidden', transition:'transform 0.3s ease, box-shadow 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 16px 48px rgba(0,0,0,0.55)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)';    e.currentTarget.style.boxShadow='none'; }}
                >
                  {/* 3:2 image container */}
                  <div style={{ position:'relative', paddingBottom:'66.67%', overflow:'hidden' }}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.55s ease', display:'block' }}
                      onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
                      onError={e => { e.currentTarget.onerror=null; e.currentTarget.src='/images/fallback.jpg'; }}
                    />
                    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'55%', background:'linear-gradient(to top, rgba(3,8,16,0.82) 0%, transparent 100%)', pointerEvents:'none' }} />
                  </div>
                  {/* Caption */}
                  <div style={{ padding:'14px 18px 16px', display:'flex', alignItems:'center', gap:'10px' }}>
                    <div style={{ width:'14px', height:'1px', background:accentColor, opacity:0.75, flexShrink:0 }} />
                    <p style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.9rem', letterSpacing:'0.08em', textTransform:'uppercase', color:T.cream, margin:0, lineHeight:1.25 }}>
                      {item.caption}
                    </p>
                  </div>
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
   IMPACT
───────────────────────────────────────────────────────────────── */
function ImpactSection() {
  return (
    <section id="impact" style={{ padding:'120px 24px', background:`linear-gradient(180deg, ${T.navyDark} 0%, ${T.black} 100%)` }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent 0%, ${T.green}55 50%, transparent 100%)` }} />
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <FadeUp>
          <SectionEyebrow label="Community Impact" />
          <SectionTitle>A Movement Across<br /><span style={{ color:`rgba(46,139,87,0.9)` }}>India</span></SectionTitle>
        </FadeUp>
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
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────────────────────────────── */
function FinalCTA() {
  const [showDonate, setShowDonate] = useState(false);
  return (
    <section style={{ padding:'140px 24px', background:`linear-gradient(170deg, ${T.navyDark} 0%, ${T.black} 100%)`, textAlign:'center', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, opacity:0.02, background:`repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(0,191,255,0.6) 79px, rgba(0,191,255,0.6) 80px),repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(0,191,255,0.6) 79px, rgba(0,191,255,0.6) 80px)`, pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'700px', height:'700px', borderRadius:'50%', background:`radial-gradient(circle, ${T.accentDim} 0%, transparent 60%)`, pointerEvents:'none' }} />
      <div style={{ maxWidth:'700px', margin:'0 auto', position:'relative' }}>
        <FadeUp>
          <div style={{ fontSize:'2.8rem', marginBottom:'24px' }}>🇮🇳</div>
          <h2 style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'clamp(2.2rem,6vw,4.5rem)', color:T.white, lineHeight:1.0, letterSpacing:'0.03em', marginBottom:'20px' }}>
            Bring This Film to Every<br />School &amp; Workplace<br /><span style={{ color:T.accent }}>in India.</span>
          </h2>
          <div style={{ background:'rgba(255,153,51,0.08)', border:'1px solid rgba(255,153,51,0.25)', padding:'18px 28px', marginBottom:'32px', maxWidth:'500px', margin:'0 auto 32px' }}>
            <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:400, fontSize:'1rem', color:T.cream, lineHeight:1.7, fontStyle:'italic' }}>
              If you watched the film and loved it, you can do your bit and contribute here.
            </p>
          </div>
          <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => setShowDonate(true)}
              style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.9rem', letterSpacing:'0.22em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:'10px', padding:'13px 34px', background:T.saffron, color:T.navyDark, border:'none', cursor:'pointer', transition:'all 0.25s', boxShadow:`0 0 28px rgba(255,153,51,0.5)` }}
              onMouseEnter={e => e.currentTarget.style.boxShadow='0 0 42px rgba(255,153,51,0.7)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow='0 0 28px rgba(255,153,51,0.5)'}>
              💛 Donate Now
            </button>
            <Btn href="https://www.jiohotstar.com/" external primary={false}>▶ Watch the Film</Btn>
          </div>
        </FadeUp>
      </div>
      {showDonate && <DonationModal onClose={() => setShowDonate(false)} />}
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
            <p style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.58rem', letterSpacing:'0.28em', color:T.accent, marginBottom:'16px', textTransform:'uppercase' }}>Documentary Film · 2026</p>
            <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.84rem', color:'rgba(240,237,232,0.35)', lineHeight:1.7 }}>
              The story of India&#39;s first blind women&#39;s cricket team and their extraordinary journey to the World Games.
            </p>
          </div>
          <div>
            <p style={{ fontFamily:'"Bebas Neue",sans-serif', fontWeight:400, fontSize:'0.65rem', letterSpacing:'0.25em', textTransform:'uppercase', color:T.accent, marginBottom:'18px' }}>Navigate</p>
            {[['#story','Story'],['#behind','Behind the Scenes'],['#awards','Accolades'],['#gallery','Gallery'],['#reactions','Reactions'],['#blog','Blog'],['#impact','Impact'],['#watch','Watch'],['contribute','Contribute']].map(([h,l]) => (
              <a key={h} href={h.startsWith('#')?h:`/${h}`}
                style={{ display:'block', fontFamily:'"Inter",sans-serif', fontWeight:300, fontSize:'0.875rem', color:'rgba(240,237,232,0.38)', textDecoration:'none', marginBottom:'8px', transition:'color 0.2s' }}
                onMouseEnter={e => e.target.style.color=T.white} onMouseLeave={e => e.target.style.color='rgba(240,237,232,0.38)'}>
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
          @media(max-width:768px){
            .gallery-grid { grid-template-columns:repeat(2,1fr)!important; }
          }
          @media(max-width:480px){
            .stat-grid    { grid-template-columns:repeat(2,1fr)!important; }
            .award-grid   { grid-template-columns:1fr!important; }
            .gallery-grid { grid-template-columns:1fr!important; }
          }
        `}} />
      </Head>

      <Navbar />
      <main>
        <Hero />
        <WatchSection />
        <StorySection />
        <RockSongSection />
        <BehindScenes />
        <AwardsSection />
        {/* CHANGE 4: Gallery inserted here */}
        <GallerySection />
        <ReactionsSection />
        <BlogSection />
        <ImpactSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
