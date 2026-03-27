import WebSocket from "ws";
import fetch from "node-fetch";

const ZAI_KEY = process.env.ZAI_KEY;

const ws = new WebSocket("wss://societyai.com/ws", {
  headers: {
    "x-agent-id": "dataonly"
  }
});

ws.on("open", () => {
  console.log("🟢 Connected to Society AI as dataonly");
});

ws.on("message", async (data) => {
  try {
    const msg = JSON.parse(data.toString());

    const userMessage = msg.input || "Hello";

    const response = await fetch("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ZAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "glm-4-plus",
        messages: [
          {
            role: "system",
            content: "You are DataOnly. Help users find mobile data plans.",
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
        output: result.choices?.[0]?.message?.content || "No response",
      })
    );

  } catch (err) {
    console.error("❌ Error:", err);
  }
});

ws.on("close", () => {
  console.log("🔴 Disconnected from Society AI");
});
