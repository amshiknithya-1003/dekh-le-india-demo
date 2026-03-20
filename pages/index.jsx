// pages/index.jsx — Dekh Le India DEMO
// Everything works for demo — no real payment needed

import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/* ── DATA ─────────────────────────────────────────────────────────── */
const STATS = [
  { value: '10,000+', label: 'People Reached' },
  { value: '50+',     label: 'Schools'         },
  { value: '₹2L+',   label: 'Raised'           },
];

const SUPPORTERS = ['KPMG', 'LinkedIn', 'Oracle', 'Infosys', 'TCS'];

const SCREENINGS = [
  { name: 'Vidya Vihar School, Mumbai',       count: '120 students'  },
  { name: 'ABC Engineering College, Pune',    count: '300 students'  },
  { name: 'XYZ Corporate Office, Bangalore',  count: '200 employees' },
  { name: 'St. Mary\'s Convent, Delhi',       count: '180 students'  },
  { name: 'TechCorp Headquarters, Hyderabad', count: '250 employees' },
];

const TESTIMONIALS = [
  { text: 'This film is truly inspiring. Every Indian should see it.',    who: 'Teacher, Mumbai'   },
  { text: 'I had no idea blind cricket existed. Felt proud and moved.',   who: 'Student, Delhi'    },
  { text: 'Goosebumps and tears. Emotions brilliantly extracted.',        who: 'Employee, Pune'    },
  { text: 'Every student should watch this. Changed how I see ability.',  who: 'Principal, Jaipur' },
];

/* ── NAVBAR ────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: '64px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 24px',
      background: scrolled ? 'rgba(10,7,3,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(245,158,11,0.15)' : 'none',
      transition: 'all 0.3s',
    }}>
      <span style={{ color: '#F59E0B', fontWeight: 700, fontSize: '1.1rem' }}>
        Dekh Le India
      </span>
      <div style={{ display: 'flex', gap: '10px' }}>
        <a href="https://www.jiohotstar.com/" target="_blank" rel="noopener noreferrer"
          style={{ background: '#F59E0B', color: '#0a0703', padding: '8px 18px', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
          ▶ Watch Now
        </a>
        <Link href="/contribute"
          style={{ border: '1px solid rgba(245,158,11,0.4)', color: 'rgba(250,247,242,0.8)', padding: '8px 18px', borderRadius: '8px', fontSize: '0.875rem', textDecoration: 'none' }}>
          Contribute
        </Link>
      </div>
    </nav>
  );
}

/* ── PAGE ──────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Head>
        <title>Dekh Le India 🇮🇳 — Watch. Feel. Act.</title>
        <meta name="description" content="A powerful story that deserves to be seen by every student, employee, and community across India." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main style={{ background: '#0a0703', minHeight: '100vh' }}>

        {/* ── HERO ────────────────────────────────────────── */}
        <section style={{
          paddingTop: '130px', paddingBottom: '70px',
          textAlign: 'center', padding: '130px 20px 70px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(245,158,11,0.11) 0%, transparent 65%)',
          }} />

          {/* Title — flag outside gradient so it renders as emoji */}
          <h1 style={{ position: 'relative', marginBottom: '20px', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            <span style={{
              fontSize: 'clamp(2.8rem, 9vw, 6.5rem)', fontWeight: 900,
              background: 'linear-gradient(135deg, #FAF7F2 30%, #F59E0B 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Dekh Le India
            </span>
            {/* Flag as separate span — fixes the "IN" bug */}
            <span style={{
              fontSize: 'clamp(2rem, 6vw, 4.5rem)',
              marginLeft: '10px', verticalAlign: 'middle',
              WebkitTextFillColor: 'initial',
            }}>
              🇮🇳
            </span>
          </h1>

          <p style={{
            maxWidth: '540px', margin: '0 auto 36px',
            fontSize: '1.125rem', lineHeight: 1.7, fontWeight: 300,
            color: 'rgba(250,247,242,0.65)', padding: '0 20px',
          }}>
            A powerful story that deserves to be seen by every student, employee,
            and community across India.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '14px' }}>
            <a
              href="https://www.jiohotstar.com/"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '14px 32px', borderRadius: '12px',
                background: '#F59E0B', color: '#0a0703',
                fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
                boxShadow: '0 0 32px rgba(245,158,11,0.45), 0 4px 16px rgba(0,0,0,0.5)',
              }}>
              🎬 Watch Now
            </a>
            <Link href="/contribute"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 32px', borderRadius: '12px',
                border: '1.5px solid rgba(245,158,11,0.5)',
                color: '#FAF7F2', fontWeight: 600, fontSize: '1rem', textDecoration: 'none',
              }}>
              🤍 Contribute
            </Link>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'rgba(250,247,242,0.28)' }}>
            Opens on JioHotstar
          </p>
        </section>

        {/* ── SUPPORTED BY ─────────────────────────────── */}
        <section style={{ padding: '36px 20px', borderTop: '1px solid rgba(245,158,11,0.1)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)', marginBottom: '18px' }}>
            Supported by
          </p>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {SUPPORTERS.map(s => (
              <span key={s} style={{ color: 'rgba(250,247,242,0.38)', fontSize: '1rem', fontWeight: 500 }}>{s}</span>
            ))}
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────── */}
        <section style={{ padding: '56px 20px', borderTop: '1px solid rgba(250,247,242,0.06)' }}>
          <div style={{
            maxWidth: '600px', margin: '0 auto',
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', textAlign: 'center',
          }}>
            {STATS.map(s => (
              <div key={s.label} style={{
                padding: '28px 16px', borderRadius: '16px',
                border: '1px solid rgba(245,158,11,0.18)',
                background: 'rgba(245,158,11,0.05)',
              }}>
                <div style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, color: '#F59E0B', marginBottom: '6px' }}>{s.value}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(250,247,242,0.45)', letterSpacing: '0.06em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SCREENINGS ───────────────────────────────── */}
        <section style={{ padding: '56px 20px', borderTop: '1px solid rgba(250,247,242,0.06)', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 700, color: '#FAF7F2', marginBottom: '32px' }}>
            Screenings Across India
          </h2>
          <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {SCREENINGS.map(s => (
              <div key={s.name} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '15px 22px', borderRadius: '12px',
                border: '1px solid rgba(250,247,242,0.08)',
                background: 'rgba(250,247,242,0.03)',
                textAlign: 'left',
              }}>
                <span style={{ fontWeight: 500, color: '#FAF7F2' }}>{s.name}</span>
                <span style={{ color: 'rgba(250,247,242,0.45)', fontSize: '0.875rem', flexShrink: 0, marginLeft: '16px' }}>{s.count}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────── */}
        <section style={{ padding: '56px 20px', borderTop: '1px solid rgba(250,247,242,0.06)', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 700, color: '#FAF7F2', marginBottom: '32px' }}>
            What People Are Saying
          </h2>
          <div style={{ maxWidth: '580px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                padding: '18px 22px', borderRadius: '12px', textAlign: 'left',
                background: 'rgba(250,247,242,0.03)',
                borderLeft: '3px solid rgba(245,158,11,0.5)',
              }}>
                <p style={{ fontStyle: 'italic', color: 'rgba(250,247,242,0.72)', fontWeight: 300, lineHeight: 1.65, marginBottom: '6px' }}>
                  "{t.text}"
                </p>
                <p style={{ fontSize: '0.78rem', color: 'rgba(250,247,242,0.32)' }}>— {t.who}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM CTA ───────────────────────────────── */}
        <section style={{
          padding: '80px 20px', textAlign: 'center',
          borderTop: '1px solid rgba(245,158,11,0.12)',
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245,158,11,0.08) 0%, transparent 70%)',
        }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 800, color: '#FAF7F2', marginBottom: '28px' }}>
            Be part of the movement
          </h2>
          <Link href="/contribute"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 36px', borderRadius: '12px',
              background: '#F59E0B', color: '#0a0703',
              fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
              boxShadow: '0 0 28px rgba(245,158,11,0.4)',
            }}>
            Support Now
          </Link>
        </section>

        {/* ── FOOTER ───────────────────────────────────── */}
        <footer style={{ padding: '28px 20px', textAlign: 'center', borderTop: '1px solid rgba(250,247,242,0.06)' }}>
          <p style={{ color: '#F59E0B', fontWeight: 700, marginBottom: '5px' }}>Dekh Le India</p>
          <p style={{ fontSize: '0.78rem', color: 'rgba(250,247,242,0.28)', marginBottom: '6px' }}>
            Dir. Shanthi Mohan &amp; Mukund Moorthy · Sol Production · DejaVu Arts
          </p>
          <a href="mailto:m_moorthy@yahoo.com" style={{ fontSize: '0.78rem', color: 'rgba(245,158,11,0.55)', textDecoration: 'none' }}>
            m_moorthy@yahoo.com
          </a>
        </footer>
      </main>
    </>
  );
}
