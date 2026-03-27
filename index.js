import fetch from "node-fetch";

const ZAI_KEY = process.env.ZAI_KEY;

console.log("✅ Server running");

async function test() {
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
          content: "You are DataOnly. Help users find mobile data plans and guide them to https://dataonly.us",
        },
        {
          role: "user",
          content: "Test connection",
        },
      ],
    }),
  });

  const result = await response.json();
  console.log("ZAI RESPONSE:", result);
}

test();
