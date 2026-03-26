/**
 * app/contribute/page.jsx
 * ───────────────────────
 * Dedicated contribution / donation page.
 *
 * SETUP:
 *   1. Add your Razorpay Key ID to .env.local:
 *      NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxx
 *   2. Add Razorpay script to layout.jsx <head>:
 *      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
 *   3. Create an API route at app/api/create-order/route.js
 *      to create Razorpay orders server-side (see stub below).
 */

"use client";

import { useState } from "react";

const PRESET_AMOUNTS = [
  { value: 500,  label: "₹500",   impact: "Fund 1 school screening" },
  { value: 1000, label: "₹1,000", impact: "Outreach kit for a village" },
  { value: 2500, label: "₹2,500", impact: "Travel costs for 1 state" },
  { value: 5000, label: "₹5,000", impact: "Reach an entire new state" },
];

export default function ContributePage() {
  const [selected, setSelected]   = useState(1000);
  const [custom,   setCustom]     = useState("");
  const [name,     setName]       = useState("");
  const [email,    setEmail]      = useState("");
  const [loading,  setLoading]    = useState(false);
  const [error,    setError]      = useState("");

  const finalAmount = custom ? parseInt(custom, 10) : selected;

  async function handlePay() {
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email to continue.");
      return;
    }
    if (!finalAmount || finalAmount < 1) {
      setError("Please select or enter a valid amount.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // 1. Create order server-side
      const res  = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount * 100 }), // paise
      });
      const data = await res.json();

      // 2. Open Razorpay checkout
      const options = {
        key:         process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount:      data.amount,
        currency:    "INR",
        name:        "Dekh Le India",
        description: "Support the Movement",
        order_id:    data.id,
        prefill:     { name, email },
        theme:       { color: "#c8a84b" },
        handler: function (response) {
          window.location.href = `/contribute/thank-you?ref=${response.razorpay_payment_id}`;
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError("Payment could not be initiated. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{CSS}</style>

      <div className="cp-page">
        {/* Back link */}
        <a href="/" className="cp-back">← Back to Film</a>

        <div className="cp-card">
          {/* Left: story */}
          <div className="cp-story">
            <span className="cp-eyebrow">Support the Movement</span>
            <h1>Help This Story<br />Reach Every Corner<br />of India.</h1>
            <p>
              These women played blind cricket across 10 states — with no cameras,
              no press, no recognition. Your contribution takes this 70-minute film
              to schools, communities, and people who have never seen themselves
              on screen.
            </p>
            <div className="cp-impact-list">
              {PRESET_AMOUNTS.map(a => (
                <div key={a.value} className="cp-impact-item">
                  <span className="cp-impact-amount">{a.label}</span>
                  <span className="cp-impact-desc">{a.impact}</span>
                </div>
              ))}
            </div>
            <p className="cp-quote">
              "If this story moved you, you can help it move further."
            </p>
          </div>

          {/* Right: form */}
          <div className="cp-form">
            <h2>Choose an Amount</h2>

            {/* Preset buttons */}
            <div className="cp-presets">
              {PRESET_AMOUNTS.map(a => (
                <button
                  key={a.value}
                  className={`cp-preset-btn ${selected === a.value && !custom ? "active" : ""}`}
                  onClick={() => { setSelected(a.value); setCustom(""); }}
                >
                  {a.label}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="cp-input-group">
              <label>Or enter custom amount</label>
              <div className="cp-rupee-wrap">
                <span>₹</span>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 750"
                  value={custom}
                  onChange={e => { setCustom(e.target.value); setSelected(0); }}
                />
              </div>
            </div>

            {/* Name */}
            <div className="cp-input-group">
              <label>Your Name</label>
              <input
                type="text"
                placeholder="Priya Sharma"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="cp-input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="priya@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            {error && <p className="cp-error">{error}</p>}

            {/* Summary */}
            {finalAmount > 0 && (
              <div className="cp-summary">
                Contributing <strong>₹{finalAmount.toLocaleString("en-IN")}</strong>
              </div>
            )}

            <button
              className="cp-pay-btn"
              onClick={handlePay}
              disabled={loading}
            >
              {loading ? "Opening Razorpay…" : `💛 Contribute ₹${(finalAmount || 0).toLocaleString("en-IN")}`}
            </button>

            <p className="cp-secure">🔒 Secured by Razorpay · 100% safe · Any amount welcome</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── CSS ─── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --navy: #050d1a; --navy2: #081629; --navy3: #0d2044;
    --accent: #c8a84b; --accent2: #e8c96a;
    --white: #f0eee8; --muted: #8a99b0; --border: rgba(200,168,75,0.18);
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--navy); color: var(--white); font-family: 'DM Sans', sans-serif; font-weight: 300; }
  a { color: inherit; text-decoration: none; }

  .cp-page {
    min-height: 100vh; padding: 3rem 1.5rem;
    background: linear-gradient(160deg, #050d1a 0%, #081629 60%, #0a1f3a 100%);
  }
  .cp-back {
    display: inline-block; margin-bottom: 2rem;
    font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--muted); transition: color 0.2s;
  }
  .cp-back:hover { color: var(--accent); }

  .cp-card {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;
    background: var(--navy2); border: 1px solid var(--border);
    padding: 3.5rem; border-radius: 4px;
  }
  @media (max-width: 768px) {
    .cp-card { grid-template-columns: 1fr; gap: 2.5rem; padding: 2rem 1.5rem; }
  }

  /* Left */
  .cp-eyebrow { display: block; font-size: 0.65rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); margin-bottom: 1rem; }
  .cp-story h1 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 4vw, 2.8rem); line-height: 1.15; margin-bottom: 1.25rem; }
  .cp-story > p { font-size: 0.9rem; color: var(--muted); line-height: 1.85; margin-bottom: 2rem; }
  .cp-impact-list { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; }
  .cp-impact-item { display: flex; align-items: baseline; gap: 0.75rem; }
  .cp-impact-amount { font-family: 'DM Sans', monospace; font-weight: 500; color: var(--accent2); font-size: 0.88rem; min-width: 60px; }
  .cp-impact-desc { font-size: 0.82rem; color: var(--muted); }
  .cp-quote { font-style: italic; font-size: 0.9rem; color: var(--white); border-left: 2px solid var(--accent); padding-left: 1rem; line-height: 1.65; }

  /* Right */
  .cp-form h2 { font-family: 'Playfair Display', serif; font-size: 1.4rem; margin-bottom: 1.5rem; }
  .cp-presets { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-bottom: 1.5rem; }
  .cp-preset-btn {
    background: var(--navy3); border: 1px solid var(--border); color: var(--white);
    padding: 0.75rem; font-size: 0.95rem; font-weight: 500; cursor: pointer; border-radius: 2px;
    transition: all 0.2s; min-height: 44px;
  }
  .cp-preset-btn:hover { border-color: var(--accent); background: rgba(200,168,75,0.08); }
  .cp-preset-btn.active { border-color: var(--accent); background: rgba(200,168,75,0.12); color: var(--accent2); }

  .cp-input-group { margin-bottom: 1.25rem; }
  .cp-input-group label { display: block; font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.5rem; }
  .cp-input-group input, .cp-rupee-wrap input {
    width: 100%; background: var(--navy3); border: 1px solid var(--border);
    color: var(--white); padding: 0.75rem 1rem; font-size: 1rem; border-radius: 2px;
    outline: none; font-family: 'DM Sans', sans-serif; transition: border-color 0.2s;
    min-height: 44px;
  }
  .cp-input-group input:focus, .cp-rupee-wrap input:focus { border-color: var(--accent); }
  .cp-rupee-wrap { position: relative; }
  .cp-rupee-wrap span { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 0.95rem; pointer-events: none; }
  .cp-rupee-wrap input { padding-left: 2rem; }

  .cp-error { font-size: 0.8rem; color: #e74c3c; margin-bottom: 1rem; }
  .cp-summary { font-size: 0.85rem; color: var(--muted); margin-bottom: 1.25rem; }
  .cp-summary strong { color: var(--accent2); font-size: 1rem; }

  .cp-pay-btn {
    width: 100%; padding: 1rem; font-size: 1rem; font-weight: 700;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: var(--navy); border: none; border-radius: 2px; cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s; min-height: 52px;
    box-shadow: 0 4px 24px rgba(200,168,75,0.25);
  }
  .cp-pay-btn:hover { transform: scale(1.02); box-shadow: 0 8px 32px rgba(200,168,75,0.4); }
  .cp-pay-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
  .cp-secure { font-size: 0.7rem; color: var(--muted); text-align: center; margin-top: 0.75rem; letter-spacing: 0.06em; }
`;

/*
 * ─────────────────────────────────────────────────────────────────────
 * API ROUTE STUB — app/api/create-order/route.js
 * Copy this into your project as a separate file.
 * ─────────────────────────────────────────────────────────────────────
 *
 * import Razorpay from "razorpay";
 * import { NextResponse } from "next/server";
 *
 * const razorpay = new Razorpay({
 *   key_id:     process.env.RAZORPAY_KEY_ID,
 *   key_secret: process.env.RAZORPAY_KEY_SECRET,
 * });
 *
 * export async function POST(req) {
 *   const { amount } = await req.json();
 *   const order = await razorpay.orders.create({
 *     amount,
 *     currency: "INR",
 *     receipt: `receipt_${Date.now()}`,
 *   });
 *   return NextResponse.json(order);
 * }
 */
