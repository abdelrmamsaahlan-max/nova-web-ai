const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const OWNER_EMAIL = 'sniperalt17@gmail.com';
const FROM_EMAIL = 'Nova Web AI <onboarding@resend.dev>';

function clean(value, max = 2000) {
  return String(value ?? '').trim().slice(0, max);
}

function escapeHtml(value) {
  return clean(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

async function sendEmail(payload) {
  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || 'Email provider rejected the request');
  return result;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service is not configured yet.' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const name = clean(body.name, 120);
  const email = clean(body.email, 254).toLowerCase();
  const business = clean(body.business, 160);
  const type = clean(body.type, 100);
  const budget = clean(body.budget, 100);
  const description = clean(body.description, 5000);

  if (!name || !email || !description) return res.status(400).json({ error: 'Name, email, and project description are required.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });

  const submittedAt = new Date().toLocaleString('en-US', { timeZone: 'Africa/Cairo', dateStyle: 'medium', timeStyle: 'short' });
  const rows = [
    ['Name', name], ['Email', email], ['Business / Brand', business || 'Not provided'],
    ['Website Type', type || 'Not provided'], ['Budget', budget || 'Not provided'],
    ['Submitted', submittedAt]
  ];
  const table = rows.map(([label, value]) => `<tr><td style="padding:10px 12px;border-bottom:1px solid #222;color:#999;width:160px">${escapeHtml(label)}</td><td style="padding:10px 12px;border-bottom:1px solid #222;color:#fff">${escapeHtml(value)}</td></tr>`).join('');
  const descriptionHtml = escapeHtml(description).replace(/\n/g, '<br>');

  try {
    await sendEmail({
      from: FROM_EMAIL,
      to: [OWNER_EMAIL],
      reply_to: email,
      subject: `New Nova Web AI project — ${name}`,
      html: `<div style="margin:0;background:#050505;color:#fff;font-family:Arial,sans-serif;padding:32px"><div style="max-width:680px;margin:auto;background:#0d0d0d;border:1px solid #252525;border-radius:18px;padding:28px"><div style="font-size:12px;letter-spacing:2px;color:#ff6a00;font-weight:700">NOVA WEB AI</div><h1 style="font-size:28px;margin:12px 0 24px;color:#fff">New project request</h1><table style="width:100%;border-collapse:collapse">${table}</table><h2 style="font-size:15px;margin:28px 0 10px;color:#ff6a00">Project description</h2><div style="background:#080808;border:1px solid #222;border-radius:12px;padding:16px;color:#ddd;line-height:1.7">${descriptionHtml}</div></div></div>`
    });

    await sendEmail({
      from: FROM_EMAIL,
      to: [email],
      subject: 'We received your Nova Web AI project request',
      html: `<div style="margin:0;background:#050505;color:#fff;font-family:Arial,sans-serif;padding:32px"><div style="max-width:620px;margin:auto;background:#0d0d0d;border:1px solid #252525;border-radius:18px;padding:30px"><div style="font-size:12px;letter-spacing:2px;color:#ff6a00;font-weight:700">NOVA WEB AI</div><h1 style="font-size:28px;margin:12px 0">Thanks, ${escapeHtml(name)}.</h1><p style="color:#aaa;line-height:1.7">Your project request has been received. We’ll review the details and get back to you at this email address.</p><div style="margin-top:24px;padding:16px;border:1px solid #222;border-radius:12px;background:#080808"><b style="color:#ff6a00">Project type:</b> ${escapeHtml(type || 'Not provided')}<br><b style="color:#ff6a00">Budget:</b> ${escapeHtml(budget || 'Not provided')}</div><p style="color:#777;font-size:13px;margin-top:26px">Nova Web AI — Modern websites. Built around your goals.</p></div></div>`
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(502).json({ error: 'The email service could not send the request.' });
  }
};
