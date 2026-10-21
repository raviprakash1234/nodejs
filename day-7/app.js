import { createServer } from "node:http";

const HOST = "127.0.0.1";

const PORT = Number(process.env.PORT) || 3000;

const server = createServer((req, res) => {
  const { method, url } = req;

  res.setHeader("Content-type", "application/json charset=utf-8");
  if (method === "GET" && url === "/health") {
    res.statusCode = 200;
    res.end(JSON.stringify({ status: "Ok" }));
    return;
  }
  if (method === "GET" && url === "/about") {
    res.statusCode = 200;
    res.end(JSON.stringify({ name: "Ravi's practice API", day: 7 }));
    return;
  }

  if (method === "GET" && url === "/api/time") {
    res.statusCode = 200;
    res.end(JSON.stringify({ time: new Date().toISOString() }));
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Route not fount" }));
});

server.on("error", (error) => {
  console.error("Server failed:", error.message);
  process.exitCode = 1;
});

server.listen(PORT, HOST, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
});
