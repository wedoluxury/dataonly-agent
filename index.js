import WebSocket from "ws";
import fetch from "node-fetch";

const SOCIETY_WS = "PASTE_YOUR_WS_URL_HERE";
const ZAI_KEY = "e8c2702fa28d48fab18340b5a1563acc.uhDcc23CLSrp4q8l";

const ws = new WebSocket(SOCIETY_WS);

ws.on("open", () => {
  console.log("✅ Connected to Society AI");
});

ws.on("message", async (data) => {
  const msg = JSON.parse(data);

  const userMessage = msg.input;

  const response = await fetch("https://api.z.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ZAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "glm-4.5",
      messages: [
        {
          role: "system",
          content: `You are DataOnly. Help users find mobile data plans and guide them to https://dataonly.us`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    }),
  });

  const result = await response.json();

  ws.send(
    JSON.stringify({
      output: result.choices[0].message.content,
    })
  );
});
