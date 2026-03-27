import fetch from "node-fetch";
import http from "http";

const ZAI_KEY = process.env.ZAI_KEY;

const server = http.createServer(async (req, res) => {
  if (req.url === "/chat") {
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
            content: "Hello",
          },
        ],
      }),
    });

    const data = await response.json();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(200);
    res.end("DataOnly Agent Running");
  }
});

server.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
