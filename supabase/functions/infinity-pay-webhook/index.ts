import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const FB_PIXEL_ID = Deno.env.get("FB_PIXEL_ID")
const FB_ACCESS_TOKEN = Deno.env.get("FB_ACCESS_TOKEN")

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  try {
    const url = new URL(req.url);
    const fbp = url.searchParams.get('fbp') || url.searchParams.get('utm_fbp');
    const fbc = url.searchParams.get('fbc') || url.searchParams.get('utm_fbc') || url.searchParams.get('fbclid');

    const bodyText = await req.text()
    if (!bodyText) {
      return new Response(JSON.stringify({ error: "Empty body" }), { status: 400 })
    }
    
    const payload = JSON.parse(bodyText)
    console.log("Webhook recebido da Infinity Pay:", JSON.stringify(payload))

    const isApproved = 
      (payload.amount > 0 || payload.paid_amount > 0) && 
      (
        payload.transaction_nsu || 
        payload.status === 'PAID' || 
        payload.status === 'approved' ||
        payload.event === 'transaction.approved' || 
        payload.capture_method === 'pix' ||
        payload.paid === true
      );
    
    if (isApproved) {
      // Processar em segundo plano sem esperar a resposta do Facebook para liberar o cliente
      (async () => {
        try {
          const userData = payload.customer || {};
          const fbResponse = await fetch(`https://graph.facebook.com/v17.0/${FB_PIXEL_ID}/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              data: [
                {
                  event_name: 'Purchase',
                  event_time: Math.floor(Date.now() / 1000),
                  action_source: 'website',
                  event_source_url: 'https://pablinmetodos.com.br/aprovado',
                  user_data: {
                    em: userData.email ? [await hashData(userData.email.toLowerCase().trim())] : [],
                    ph: userData.phone ? [await hashData(userData.phone.replace(/\D/g, ''))] : [],
                    fbc: fbc || payload.fbc || null,
                    fbp: fbp || payload.fbp || null,
                    client_ip_address: req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || null,
                    client_user_agent: req.headers.get('user-agent') || null,
                  },
                  custom_data: {
                    currency: 'BRL',
                    value: Number(((payload.paid_amount || payload.amount) / 100).toFixed(2)),
                    order_id: payload.transaction_nsu || payload.order_nsu || payload.slug,
                  },
                },
              ],
              test_event_code: 'TEST70290',
              access_token: FB_ACCESS_TOKEN,
            }),
          })

          const fbResult = await fbResponse.json()
          console.log("Evento de compra enviado ao Facebook em background. Resposta:", JSON.stringify(fbResult))
        } catch (fbError) {
          console.error("Erro ao enviar para o Facebook em background:", fbError)
        }
      })();
    }

    // Retorna imediatamente para a InfinitePay
    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error) {
    console.error("Erro ao processar webhook:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }
})

async function hashData(data: string) {
  const encoder = new TextEncoder()
  const buffer = encoder.encode(data)
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}