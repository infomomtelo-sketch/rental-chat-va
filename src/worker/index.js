// src/worker/index.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Send message
    if (path === "/api/messages" && request.method === "POST") {
      const { conversationId, senderId, text, imageUrl } = await request.json();

      await env.DB.prepare(`
        INSERT INTO messages (conversation_id, sender_id, text, image_url, created_at)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(conversationId, senderId, text, imageUrl || null).run();

      return Response.json({ success: true }, { headers: corsHeaders });
    }

    // Update rental status
    if (path.match(/^\/api\/conversations\/(.+)\/status$/) && request.method === "PATCH") {
      const conversationId = path.match(/^\/api\/conversations\/(.+)\/status$/)[1];
      const { status } = await request.json();

      await env.DB.prepare(`
        UPDATE conversations SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `).bind(status, conversationId).run();

      return Response.json({ success: true, status }, { headers: corsHeaders });
    }

    return new Response("Rental VA Worker is running", { 
      status: 200, 
      headers: corsHeaders 
    });
  }
};
