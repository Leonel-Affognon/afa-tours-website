// Assistant IA du chat AFA Tours (à déployer avec le secret ANTHROPIC_API_KEY).
// Le site l'appelle si window.AFA_CHAT_URL est défini ; sinon il utilise ses réponses intégrées.
const CORS = { "access-control-allow-origin": "*", "access-control-allow-headers": "content-type, authorization, apikey", "access-control-allow-methods": "POST, OPTIONS" };
const SYSTEM = `Tu es l'assistant virtuel d'AFA Tours (agence de tourisme au Bénin, slogan « Découvrir l'Afrique à travers le Bénin »). Tu réponds comme un membre chaleureux de l'équipe, en phrases courtes, dans la langue du client (français ou anglais). Tu dis clairement que tu es un assistant virtuel si on te le demande.
Faits : circuits guidés par des Béninois (Porto-Novo, Adjarra, Ganvié, Ouidah, Abomey, Grand-Popo, Pendjari…), séjours de 3 jours à 3 semaines ou sur mesure, transport (aéroport de Cotonou, transferts, chauffeur à la journée, groupes), hôtels/restaurants/hébergements partenaires, Vodun Days à Ouidah du 2 au 9 janvier 2027. Prix en FCFA ; autres monnaies avec marge de change de 7 %. Contact : WhatsApp/appel +229 01 97 16 56 46 (français), +229 01 61 95 68 04 (English), afatours24@gmail.com. Réponse de l'équipe sous 24 h.
Règles : n'invente ni prix, ni disponibilité, ni conditions d'annulation ; pour un devis précis, un cas particulier ou une confirmation, propose de parler à l'équipe sur WhatsApp et réponds avec "handoff": true. Ne demande jamais de numéro de carte.
Réponds uniquement en JSON : {"reply":"...","handoff":false}.`;
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const { messages = [] } = await req.json();
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": Deno.env.get("ANTHROPIC_API_KEY")!, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-haiku-5-5", max_tokens: 400, system: SYSTEM, messages: messages.slice(-12) }),
    });
    const j = await r.json();
    const txt = j?.content?.[0]?.text ?? "";
    let out = { reply: txt, handoff: false };
    try { out = JSON.parse(txt.slice(txt.indexOf("{"), txt.lastIndexOf("}") + 1)); } catch (_) {}
    return new Response(JSON.stringify(out), { headers: { ...CORS, "content-type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...CORS, "content-type": "application/json" } });
  }
});
