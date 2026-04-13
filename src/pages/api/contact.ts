import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, service, msg } = await request.json();

    if (!name || !email || !msg) {
      return new Response(JSON.stringify({ ok: false, error: 'Faltan campos requeridos.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const accessKey = import.meta.env.WEB3FORMS_KEY;

    if (accessKey) {
      const formData = new FormData();
      formData.append('access_key', accessKey);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('subject', `Portfolio: ${service || 'Consulta general'} — ${name}`);
      formData.append('message', `Servicio: ${service || '—'}\n\n${msg}`);
      formData.append('from_name', 'Portfolio Juan Cruz');
      formData.append('replyto', email);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error(`Web3Forms returned non-JSON response (status ${res.status})`);
      }

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Error al enviar');
      }
    } else {
      // No key configured — log and accept gracefully
      console.log('[contact form]', { name, email, service, msg });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact API error:', err);
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
