// pages/contribute.jsx

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const AMOUNTS = [50, 100, 200, 500];

const BRING_OPTIONS = [
  "Yes — I'd love to organise a screening",
  'Maybe — will check with my team',
  'Not right now, but I fully support it',
];

export default function Contribute() {
  const [selectedAmt, setSelectedAmt] = useState(null);
  const [customAmt, setCustomAmt] = useState('');
  const [paid, setPaid] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const EMPTY = { name: '', comment: '', feeling: '', willBring: '' };
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const setF = (k, v) => {
    setForm(p => ({ ...p, [k]: v }));
    setErrors(p => { const n = { ...p }; delete n[k]; return n; });
  };

  const resolved = paid || skipped;
  const finalAmt = selectedAmt || Number(customAmt) || 0;

  const handleSkip = () => setSkipped(true);

  const handleSubmit = e => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = 'Name is required';
    if (!form.feeling.trim()) err.feeling = 'Please share what you felt';
    if (!form.willBring.trim()) err.willBring = 'Please answer this question';
    if (Object.keys(err).length) return setErrors(err);

    console.log('Feedback:', {
      ...form,
      contributed: paid ? `₹${finalAmt}` : 'No payment',
    });

    setDone(true);
  };

  // RESET FUNCTION
  const resetAll = () => {
    setDone(false);
    setForm(EMPTY);
    setPaid(false);
    setSkipped(false);
    setSelectedAmt(null);
    setCustomAmt('');
  };

  // SUCCESS SCREEN
  if (done) return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>Thank you! ❤️</h2>
      <p>
        {paid
          ? `You contributed ₹${finalAmt}`
          : 'You submitted feedback without payment'}
      </p>

      <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'center' }}>
        <button onClick={resetAll}>
          Submit another
        </button>
        <Link href="/">Back to home</Link>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Contribute</title>
      </Head>

      <main style={{ padding: 30 }}>

        <h1>Pay what you wish</h1>
        <p>Payment is completely optional 💛</p>

        {/* PAYMENT */}
        {!resolved && (
          <div>

            {/* QR */}
            <img
              src="/qr.svg"
              width={160}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/160?text=QR";
              }}
            />

            <p>OR</p>

            {/* Amount buttons */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {AMOUNTS.map(a => (
                <button key={a} onClick={() => setSelectedAmt(a)}>
                  ₹{a}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <input
              type="number"
              placeholder="Custom amount"
              value={customAmt}
              onChange={e => {
                setCustomAmt(e.target.value);
                setSelectedAmt(null);
              }}
              style={{ marginTop: 10 }}
            />

            {/* Razorpay */}
            <a
              href="https://rzp.io/l/YOUR_LINK"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!finalAmt) {
                  e.preventDefault();
                  alert("Please select or enter an amount first");
                  return;
                }
                setPaid(true);
                alert("After payment, come back and submit feedback");
              }}
              style={{
                display: 'block',
                marginTop: 15,
                padding: 12,
                background: 'orange',
                textAlign: 'center',
                color: 'black',
                borderRadius: 6
              }}
            >
              Pay via Razorpay
            </a>

            {/* Already paid */}
            <button
              onClick={() => setPaid(true)}
              style={{ marginTop: 10 }}
            >
              I already paid
            </button>

            {/* Skip */}
            <button
              onClick={handleSkip}
              style={{ marginTop: 10 }}
            >
              Skip payment
            </button>

          </div>
        )}

        {/* FEEDBACK */}
        {resolved && (
          <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>

            <input
              placeholder="Name"
              value={form.name}
              onChange={e => setF('name', e.target.value)}
            />
            {errors.name && <p>{errors.name}</p>}

            <textarea
              placeholder="What did you feel?"
              value={form.feeling}
              onChange={e => setF('feeling', e.target.value)}
            />
            {errors.feeling && <p>{errors.feeling}</p>}

            <select
              value={form.willBring}
              onChange={e => setF('willBring', e.target.value)}
            >
              <option value="">Select</option>
              {BRING_OPTIONS.map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>

            <button type="submit" style={{ marginTop: 10 }}>
              Submit ❤️
            </button>

          </form>
        )}

      </main>
    </>
  );
}
