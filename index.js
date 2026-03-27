import fetch from "node-fetch";

const ZAI_KEY = process.env.ZAI_KEY;

console.log("✅ Server running");

async function test() {
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
          content: "You are DataOnly. Help users find mobile data plans and guide them to https://dataonly.us",
        },
        {
          role: "user",
          content: "Test connection",
        },
      ],
    }),
  });

const text = await response.text();
console.log("RAW RESPONSE:", text);

let result;
try {
  result = JSON.parse(text);
} catch (e) {
  console.error("❌ Not JSON response");
  return;
}

console.log("ZAI RESPONSE:", result);
}

test();
