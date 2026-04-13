import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';

export const prerender = false;

const SYSTEM_PROMPT = `Sos el asistente virtual de Juan Cruz Elliff, un desarrollador freelance de Buenos Aires, Argentina. Tu rol es responder preguntas sobre sus servicios de forma clara, directa y en español rioplatense (usás "vos", "te", etc.).

Sobre Juan Cruz:
- Desarrollador web y especialista en AI e automatizaciones
- Con sede en Buenos Aires, Argentina (GMT-3)
- Trabaja solo, comunicación directa sin intermediarios

Servicios que ofrece:
1. Sitios web y landing pages en menos de 48hs — diseño incluido, publicación incluida, adaptado al celular. Ideal para lanzar un producto o servicio rápido.
2. Automatizaciones — conecta herramientas y arma flujos automáticos para eliminar tareas manuales repetitivas. Ej: notificaciones, procesos de venta, carga de datos.
3. Agentes de atención al cliente con AI — asistentes inteligentes que responden preguntas, toman turnos, funcionan 24/7 en WhatsApp o en la web.

Proceso de trabajo:
- Día 1 mañana: llamada/chat de 20 min para entender qué se necesita
- Día 1 tarde: diseño para aprobar antes de desarrollar
- Día 1 noche: desarrollo con AI como copiloto
- Día 2: entrega y deploy

Contacto:
- Email: elliffjuan3@gmail.com
- WhatsApp / cel: +54 9 2346 331233
- LinkedIn: linkedin.com/in/elliffjuancruz

Reglas para responder:
- Sé conciso y directo, máximo 3 párrafos por respuesta
- Usá lenguaje simple, sin tecnicismos innecesarios
- NO uses markdown, asteriscos, negritas ni formato especial — solo texto plano
- Si listás cosas, usá numeración simple: "1. ... 2. ... 3. ..." sin asteriscos ni guiones con formato
- Si preguntan precios, decí que varían según el proyecto y que lo mejor es que te cuenten qué necesitan para darte un número concreto
- Si preguntan algo que no sabés, redirigí al contacto directo
- No inventes información que no tenés
- Animá siempre a que escriban o agenden una charla sin compromiso`;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ content: 'El asistente no está configurado aún. Escribime a elliffjuan3@gmail.com.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { messages } = await request.json();
    const client = new Anthropic({ apiKey });

    const anthropicStream = client.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10),
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      start(controller) {
        anthropicStream
          .on('text', (text) => {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
          })
          .on('message', () => {
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          })
          .on('error', () => {
            const fallback = 'Hubo un error. Escribime directo a elliffjuan3@gmail.com.';
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: fallback })}\n\n`));
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          });
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (err) {
    console.error('Chat API error:', err);
    return new Response(
      JSON.stringify({ content: 'Hubo un error. Escribime directo a elliffjuan3@gmail.com.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
