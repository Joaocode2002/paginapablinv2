import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const FB_PIXEL_ID = Deno.env.get("FB_PIXEL_ID")
const FB_ACCESS_TOKEN = Deno.env.get("FB_ACCESS_TOKEN")

serve(async (req) => {
  // Configuração de CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  try {
    const payload = await req.json()
    console.log("Webhook recebido da Infinity Pay:", JSON.stringify(payload))

    // A Infinity Pay geralmente envia o status da transação
    // Ajuste aqui conforme o formato real do payload da Infinity Pay
    const isApproved = payload.status === 'approved' || payload.event === 'transaction.approved'
    
    if (isApproved) {
      const userData = payload.customer || {}
      
      // Enviando para a API de Conversões do Facebook
      const fbResponse = await fetch(`https://graph.facebook.com/v17.0/${FB_PIXEL_ID}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [
            {
              event_name: 'Purchase',
              event_time: Math.floor(Date.now() / 1000),
              action_source: 'email',
              user_data: {
                em: userData.email ? [await hashData(userData.email.toLowerCase())] : [],
                ph: userData.phone ? [await hashData(userData.phone.replace(/\D/g, ''))] : [],
              },
              custom_data: {
                currency: 'BRL',
                value: Number((payload.amount / 100).toFixed(2)), // Converte centavos para reais mantendo as duas casas decimais
              },
            },
          ],
          access_token: FB_ACCESS_TOKEN,
        }),
      })

      const fbResult = await fbResponse.json()
      console.log("Resposta do Facebook:", JSON.stringify(fbResult))
    }

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
