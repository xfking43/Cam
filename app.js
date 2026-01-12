export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const formData = await req.formData();
  const chat_id = formData.get("chat_id");
  const photo = formData.get("photo");
  const caption = formData.get("caption") || "";

  const TOKEN = process.env.BOT_TOKEN; // 🔒 Environment Variable

  let url, body;

  if (photo) {
    url = `https://api.telegram.org/bot${TOKEN}/sendPhoto`;
    body = new FormData();
    body.append("chat_id", chat_id);
    body.append("photo", photo);
    body.append("caption", caption);
  } else {
    url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    body = JSON.stringify({ chat_id, text: caption });
  }

  await fetch(url, {
    method: "POST",
    body,
    headers: photo ? {} : { "Content-Type": "application/json" }
  });

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  });
}; 
