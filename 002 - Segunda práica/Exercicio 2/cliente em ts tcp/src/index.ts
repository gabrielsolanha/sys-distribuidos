// src/ws_quiz_client.ts
import WebSocket from "ws";

const PORT = 3000;
const HOST = "ws://localhost";

const socket = new WebSocket(`${HOST}:${PORT}`);

socket.on("open", () => {
  console.log("Connected to the WebSocket Quiz Server.");

  process.stdin.on("data", (data) => {
    const message = data.toString().trim();
    socket.send(message);
  });
});

socket.on("message", (data) => {
  console.log(data.toString());
});

socket.on("close", () => {
  console.log("Disconnected from the WebSocket Quiz Server.");
  process.exit();
});

socket.on("error", (err) => {
  console.error("WebSocket error:", err);
});
