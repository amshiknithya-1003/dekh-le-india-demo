// pages/api/create-order.js
// Creates a Razorpay order on the server side.
// Never expose your KEY_SECRET in the browser — this stays server-only.
//
// ENV VARS required (set in Vercel dashboard → Settings → Environment Variables):
//   RAZORPAY_KEY_ID      = rzp_live_xxxxxxxxxxxx
//   RAZORPAY_KEY_SECRET  = your_secret_here

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount } = req.body;           // amount in paise (₹50 = 5000 paise)

  if (!amount || amount < 100) {          // minimum ₹1
    return res.status(400).json({ error: 'Invalid amount' });
  }

  // ── Load Razorpay key from environment ─────────────────────────
  const key_id     = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    console.error('Razorpay keys not configured');
    return res.status(500).json({ error: 'Payment not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to environment variables.' });
  }

  try {
    // ── Call Razorpay Orders API ──────────────────────────────────
    const credentials = Buffer.from(`${key_id}:${key_secret}`).toString('base64');

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        amount:   parseInt(amount),         // in paise
        currency: 'INR',
        receipt:  `dli_${Date.now()}`,
        notes: {
          project: 'Dekh Le India',
          purpose: 'Film Support',
        },
      }),
    });

    const order = await response.json();

    if (!response.ok) {
      console.error('Razorpay API error:', order);
      return res.status(500).json({ error: order.error?.description || 'Failed to create order' });
    }

    // Return order id + key id to the client
    return res.status(200).json({
      orderId: order.id,
      amount:  order.amount,
      currency:order.currency,
      keyId:   key_id,
    });

  } catch (err) {
    console.error('Order creation failed:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
