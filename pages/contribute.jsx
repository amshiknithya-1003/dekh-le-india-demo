// pages/contribute.jsx
// Payment is 100% optional — user can pay OR skip straight to feedback

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const AMOUNTS = [50, 100, 200, 500];

const BRING_OPTIONS = [
  "Yes — I'd love to organise a screening",
  'Maybe — will check with my team',
  'Not right now, but I fully support it',
];

const VOICES = [
  { initials: 'PS', name: 'Priya Sharma',  city: 'Mumbai',    text: 'This film is truly inspiring. Every Indian student deserves to see it.'       },
  { initials: 'AR', name: 'Arjun Reddy',   city: 'Hyderabad', text: 'Every student should watch this. We are hosting it at our college next month.' },
  { initials: 'FS', name: 'Fatima Sheikh', city: 'Delhi',     text: 'I want to bring this to my college. The story is deeply moving.'               },
];

export default function Contribute() {
  // ── payment state ──────────────────────────────────────────────
  const [selectedAmt, setSelectedAmt] = useState(null);
  const [customAmt,   setCustomAmt]   = useState('');
  const [paid,        setPaid]        = useState(false);   // clicked "Pay"
  const [skipped,     setSkipped]     = useState(false);   // clicked "Skip"

  // ── form state ─────────────────────────────────────────────────
  const EMPTY = { name: '', comment: '', feeling: '', willBring: '' };
  const [form,      setForm]      = useState(EMPTY);
  const [errors,    setErrors]    = useState({});
  const [done,      setDone]      = useState(false);
  const [focused,   setFocused]   = useState('');

  const setF = (k, v) => {
    setForm(p => ({ ...p, [k]: v }));
    setErrors(p => { const n = { ...p }; delete n[k]; return n; });
  };

  const resolved   = paid || skipped;
  const finalAmt   = selectedAmt || parseInt(customAmt || '0');

  const handlePay = () => {
    if (!finalAmt || finalAmt < 1) { alert('Please select or enter an amount first.'); return; }
    setPaid(true);
  };

  const handleSkip = () => setSkipped(true);

  const handleSubmit = e => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim())      err.name      = 'Name is required';
    if (!form.feeling.trim())   err.feeling   = 'Please share what you felt';
    if (!form.willBring.trim()) err.willBring = 'Please answer this question';
    if (Object.keys(err).length) { setErrors(err); return; }
    console.log('=== Dekh Le India Feedback ===', {
      ...form,
      contributed: paid ? `₹${finalAmt}` : 'No payment',
    });
    setDone(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const inp = k => ({
    width: '100%', padding: '12px 16px', borderRadius: '10px',
    border: `1px solid ${focused === k ? 'rgba(245,158,11,0.55)' : 'rgba(250,247,242,0.1)'}`,
    background: 'rgba(250,247,242,0.04)', color: '#FAF7F2',
    fontSize: '0.9rem', fontWeight: 300, outline: 'none', resize: 'none',
    fontFamily: 'inherit',
    boxShadow: focused === k ? '0 0 0 3px rgba(245,158,11,0.1)' : 'none',
    transition: 'all 0.2s',
  });

  /* ── SUCCESS SCREEN ─────────────────────────────────────────── */
  if (done) return (
    <>
      <Head><title>Thank You · Dekh Le India</title></Head>
      <div style={{ background: '#0a0703', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ width: 76, height: 76, borderRadius: '50%', border: '2px solid rgba(245,158,11,0.5)', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', marginBottom: 22 }}>
          {paid ? '❤️' : '🙏'}
        </div>
        <h2 style={{ fontSize: '1.9rem', fontWeight: 700, color: '#FAF7F2', marginBottom: 10 }}>Thank you!</h2>
        <p style={{ color: 'rgba(250,247,242,0.5)', fontWeight: 300, maxWidth: 360, lineHeight: 1.65, marginBottom: 26 }}>
          {paid
            ? `Your ₹${finalAmt} will help skill the players. Every rupee counts. 🙌`
            : 'Your feedback matters — with or without a contribution. Thank you for being part of this movement.'}
        </p>

        {/* summary */}
        <div style={{ background: 'rgba(250,247,242,0.04)', border: '1px solid rgba(250,247,242,0.1)', borderRadius: 14, padding: 22, maxWidth: 360, width: '100%', textAlign: 'left', marginBottom: 22 }}>
          {[
            { label: 'Name',        val: form.name },
            { label: 'Contributed', val: paid ? `₹${finalAmt} paid ✅` : 'Skipped — no payment' },
            { label: 'What you felt', val: form.feeling, italic: true },
            { label: 'Will bring?', val: form.willBring, last: true },
          ].map(r => (
            <div key={r.label} style={{ paddingBottom: r.last ? 0 : 10, marginBottom: r.last ? 0 : 10, borderBottom: r.last ? 'none' : '1px solid rgba(250,247,242,0.06)' }}>
              <p style={{ fontSize: '0.64rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.28)', marginBottom: 3 }}>{r.label}</p>
              <p style={{ fontSize: '0.875rem', color: r.label === 'Contributed' && paid ? '#86efac' : 'rgba(250,247,242,0.72)', fontWeight: 300, fontStyle: r.italic ? 'italic' : 'normal' }}>{r.val}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => { setForm(EMPTY); setDone(false); setPaid(false); setSkipped(false); setSelectedAmt(null); setCustomAmt(''); }}
            style={{ padding: '11px 22px', borderRadius: 10, border: '1px solid rgba(250,247,242,0.15)', color: 'rgba(250,247,242,0.7)', background: 'transparent', cursor: 'pointer', fontSize: '0.875rem' }}>
            Submit another
          </button>
          <Link href="/" style={{ padding: '11px 22px', borderRadius: 10, background: '#F59E0B', color: '#0a0703', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
            Back to home
          </Link>
        </div>
      </div>
    </>
  );

  /* ── MAIN PAGE ──────────────────────────────────────────────── */
  return (
    <>
      <Head>
        <title>Contribute · Dekh Le India 🇮🇳</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navbar */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', background: 'rgba(10,7,3,0.96)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(245,158,11,0.15)' }}>
        <Link href="/" style={{ color: '#F59E0B', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none' }}>← Dekh Le India</Link>
        <span style={{ fontSize: '0.7rem', padding: '6px 14px', borderRadius: 20, border: '1px solid rgba(245,158,11,0.3)', color: 'rgba(250,247,242,0.6)' }}>Contribute</span>
      </nav>

      <main style={{ background: '#0a0703', minHeight: '100vh', paddingTop: 80, paddingBottom: 60 }}>
        <div style={{ maxWidth: 510, margin: '0 auto', padding: '28px 20px 0' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 38 }}>
            <h1 style={{ fontSize: 'clamp(2rem, 7vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12 }}>
              <span style={{ color: '#FAF7F2' }}>Pay what </span>
              <span style={{ color: '#F59E0B' }}>you wish.</span>
            </h1>
            <p style={{ color: 'rgba(250,247,242,0.5)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.65, maxWidth: 380, margin: '0 auto' }}>
              No pressure. No minimum. Contribute what feels right —
            </p>
            {/* Big visible optional message */}
            <div style={{ display: 'inline-block', marginTop: 10, padding: '8px 18px', borderRadius: 8, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
              <span style={{ fontSize: '0.9rem', color: '#F59E0B', fontWeight: 500 }}>
                💛 Payment is completely optional
              </span>
            </div>
          </div>

          {/* ── PAYMENT SECTION ──────────────────────────── */}
          {!resolved ? (
            <div style={{ borderRadius: 20, border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.04)', padding: '28px 22px', marginBottom: 30 }}>

              {/* QR */}
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <p style={{ fontSize: '0.64rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)', marginBottom: 14 }}>Scan &amp; Pay What You Wish</p>
                <div style={{ display: 'inline-block', borderRadius: 14, overflow: 'hidden', border: '3px solid rgba(245,158,11,0.5)', boxShadow: '0 0 24px rgba(245,158,11,0.18)', marginBottom: 8 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/qr.svg" alt="UPI QR Code" width={164} height={164} style={{ display: 'block', background: '#fff', padding: 10 }} />
                </div>
                <p style={{ fontSize: '0.7rem', color: 'rgba(250,247,242,0.26)' }}>GPay · PhonePe · Paytm · Any UPI</p>
              </div>

              {/* or */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(250,247,242,0.07)' }} />
                <span style={{ fontSize: '0.72rem', color: 'rgba(250,247,242,0.2)' }}>or pay online</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(250,247,242,0.07)' }} />
              </div>

              {/* Amount picker */}
              <p style={{ fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.28)', marginBottom: 10, textAlign: 'center' }}>Choose amount (₹)</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 9 }}>
                {AMOUNTS.map(a => (
                  <button key={a} onClick={() => { setSelectedAmt(a); setCustomAmt(''); }}
                    style={{ padding: '10px 4px', borderRadius: 10, cursor: 'pointer', border: selectedAmt === a ? '1.5px solid #F59E0B' : '1px solid rgba(250,247,242,0.1)', background: selectedAmt === a ? 'rgba(245,158,11,0.15)' : 'rgba(250,247,242,0.04)', color: selectedAmt === a ? '#F59E0B' : 'rgba(250,247,242,0.55)', fontWeight: selectedAmt === a ? 700 : 400, fontSize: '0.9rem', transition: 'all 0.15s' }}>
                    ₹{a}
                  </button>
                ))}
              </div>
              <input type="number" value={customAmt} onChange={e => { setCustomAmt(e.target.value); setSelectedAmt(null); }}
                placeholder="Type any amount you wish"
                style={{ width: '100%', padding: '11px 14px', borderRadius: 10, textAlign: 'center', border: customAmt ? '1.5px solid rgba(245,158,11,0.45)' : '1px solid rgba(250,247,242,0.1)', background: 'rgba(250,247,242,0.04)', color: '#FAF7F2', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', marginBottom: 14 }}
              />

              {/* Pay button */}
              <button onClick={handlePay}
                style={{ width: '100%', padding: '13px 24px', borderRadius: 11, background: '#F59E0B', color: '#0a0703', fontWeight: 700, fontSize: '0.95rem', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                Pay via Razorpay
              </button>

              {/* ─── SKIP button — payment is optional ─── */}
              <button onClick={handleSkip}
                style={{ width: '100%', padding: '12px 24px', borderRadius: 11, background: 'transparent', color: 'rgba(250,247,242,0.45)', fontWeight: 400, fontSize: '0.9rem', border: '1px solid rgba(250,247,242,0.12)', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(250,247,242,0.3)'; e.currentTarget.style.color = 'rgba(250,247,242,0.75)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(250,247,242,0.12)'; e.currentTarget.style.color = 'rgba(250,247,242,0.45)'; }}>
                Skip — just leave my feedback →
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.68rem', color: 'rgba(250,247,242,0.18)', marginTop: 12 }}>
                No obligation. Your voice matters with or without payment.
              </p>
            </div>

          ) : (
            /* ── Resolved banner ─────────────────────────── */
            <div style={{ borderRadius: 14, padding: '16px 20px', border: paid ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(250,247,242,0.1)', background: paid ? 'rgba(34,197,94,0.05)' : 'rgba(250,247,242,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, gap: 10, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: '1.4rem' }}>{paid ? '✅' : '👋'}</span>
                <div>
                  <p style={{ fontWeight: 600, color: '#FAF7F2', fontSize: '0.9rem' }}>
                    {paid ? `₹${finalAmt} contributed — thank you!` : 'Skipped — totally fine!'}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(250,247,242,0.38)', marginTop: 2 }}>
                    {paid ? 'Your contribution funds skill training.' : 'Please share your feedback below.'}
                  </p>
                </div>
              </div>
              <button onClick={() => { setPaid(false); setSkipped(false); setSelectedAmt(null); setCustomAmt(''); }}
                style={{ fontSize: '0.72rem', color: 'rgba(250,247,242,0.3)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                Change
              </button>
            </div>
          )}

          {/* ── FEEDBACK FORM ────────────────────────────── */}
          <div style={{ marginBottom: 44 }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FAF7F2', marginBottom: 4 }}>Share Your Voice</h2>
            <p style={{ fontSize: '0.875rem', color: 'rgba(250,247,242,0.35)', fontWeight: 300, marginBottom: 22 }}>Your words become part of the movement.</p>

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.35)', marginBottom: 7 }}>
                  Name <span style={{ color: '#F59E0B' }}>*</span>
                </label>
                <input type="text" value={form.name} onChange={e => setF('name', e.target.value)} placeholder="Arjun Sharma"
                  style={inp('name')} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} />
                {errors.name && <p style={{ fontSize: '0.75rem', color: '#F87171', marginTop: 5 }}>{errors.name}</p>}
              </div>

              {/* Comment */}
              <div>
                <label style={{ display: 'block', fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.35)', marginBottom: 7 }}>
                  Comment <span style={{ color: 'rgba(250,247,242,0.25)', fontSize: '0.6rem' }}>(optional)</span>
                </label>
                <textarea rows={3} value={form.comment} onChange={e => setF('comment', e.target.value)}
                  placeholder="Anything on your mind about the film or the movement…"
                  style={inp('comment')} onFocus={() => setFocused('comment')} onBlur={() => setFocused('')} />
              </div>

              {/* Q1 */}
              <div>
                <label style={{ display: 'block', fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.35)', marginBottom: 7 }}>
                  What did you feel after watching? <span style={{ color: '#F59E0B' }}>*</span>
                </label>
                <textarea rows={3} value={form.feeling} onChange={e => setF('feeling', e.target.value)}
                  placeholder="Inspired, moved, proud, emotional — in your own words."
                  style={inp('feeling')} onFocus={() => setFocused('feeling')} onBlur={() => setFocused('')} />
                {errors.feeling && <p style={{ fontSize: '0.75rem', color: '#F87171', marginTop: 5 }}>{errors.feeling}</p>}
              </div>

              {/* Q2 */}
              <div>
                <label style={{ display: 'block', fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.35)', marginBottom: 7 }}>
                  Would you bring this to your school or office? <span style={{ color: '#F59E0B' }}>*</span>
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {BRING_OPTIONS.map(opt => {
                    const on = form.willBring === opt;
                    return (
                      <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 15px', borderRadius: 10, cursor: 'pointer', border: on ? '1px solid rgba(245,158,11,0.5)' : '1px solid rgba(250,247,242,0.08)', background: on ? 'rgba(245,158,11,0.1)' : 'rgba(250,247,242,0.03)', transition: 'all 0.15s' }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${on ? '#F59E0B' : 'rgba(250,247,242,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {on && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />}
                        </div>
                        <input type="radio" name="bring" value={opt} checked={on} onChange={() => setF('willBring', opt)} style={{ display: 'none' }} />
                        <span style={{ fontSize: '0.875rem', color: on ? '#FAF7F2' : 'rgba(250,247,242,0.55)', fontWeight: on ? 400 : 300 }}>{opt}</span>
                      </label>
                    );
                  })}
                  <div style={{ padding: '11px 15px', borderRadius: 10, border: '1px solid rgba(250,247,242,0.07)', background: 'rgba(250,247,242,0.03)' }}>
                    <input type="text" value={BRING_OPTIONS.includes(form.willBring) ? '' : form.willBring}
                      onChange={e => setF('willBring', e.target.value)} placeholder="Or type your own answer…"
                      style={{ background: 'transparent', border: 'none', outline: 'none', color: '#FAF7F2', fontSize: '0.875rem', fontWeight: 300, width: '100%', fontFamily: 'inherit' }} />
                  </div>
                </div>
                {errors.willBring && <p style={{ fontSize: '0.75rem', color: '#F87171', marginTop: 5 }}>{errors.willBring}</p>}
              </div>

              {/* Submit */}
              <button type="submit"
                style={{ padding: '14px 24px', borderRadius: 12, background: '#F59E0B', color: '#0a0703', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(245,158,11,0.28)', marginTop: 4 }}>
                Submit My Response ❤️
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.66rem', color: 'rgba(250,247,242,0.18)', marginTop: -6 }}>
                Logged in browser console only — no data stored
              </p>
            </form>
          </div>

          {/* Social proof */}
          <div style={{ paddingBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(250,247,242,0.06)' }} />
              <span style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.24)', whiteSpace: 'nowrap' }}>Voices from the community</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(250,247,242,0.06)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {VOICES.map((v, i) => (
                <div key={i} style={{ padding: '15px 17px', borderRadius: 12, background: 'rgba(250,247,242,0.03)', border: '1px solid rgba(250,247,242,0.07)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(245,158,11,0.12)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.68rem', fontWeight: 700, flexShrink: 0 }}>{v.initials}</div>
                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#FAF7F2' }}>{v.name}</p>
                      <p style={{ fontSize: '0.7rem', color: 'rgba(250,247,242,0.28)' }}>{v.city}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.875rem', fontStyle: 'italic', color: 'rgba(250,247,242,0.6)', fontWeight: 300, lineHeight: 1.6 }}>"{v.text}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <footer style={{ background: '#0a0703', padding: '20px 20px', textAlign: 'center', borderTop: '1px solid rgba(250,247,242,0.06)' }}>
        <Link href="/" style={{ color: '#F59E0B', fontWeight: 700, textDecoration: 'none', fontSize: '0.875rem' }}>← Back to Dekh Le India</Link>
        <p style={{ marginTop: 6, fontSize: '0.7rem', color: 'rgba(250,247,242,0.2)' }}>m_moorthy@yahoo.com · +91-9880214587</p>
      </footer>
    </>
  );
}
