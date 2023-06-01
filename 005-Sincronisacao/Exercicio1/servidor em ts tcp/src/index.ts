// src/ws_quiz_server.ts
import WebSocket from "ws";

const PORT = 3000;

var numSync = 1012;
var arrNumSync: Array<any> = [];
function handleClient(ws: WebSocket, request: any) {
  ws.send("Sincronizador conectado!");

  ws.on("message", (message: { toString: () => string }) => {
    const answer = Number(message.toString().trim());
    arrNumSync.push(answer);
  });
  process.stdin.on("data", (data) => {
    const message = data.toString().trim();
    if (message == "sync") {
      const calc = arrNumSync.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue
      );
      ws.send((calc / arrNumSync.length).toString());
      arrNumSync = [numSync]
    }
    if (message == "hora") {
      ws.send("Favor mandar a hora:");
    }
  });
}

const server = new WebSocket.Server({ port: PORT });

server.on("connection", handleClient);

console.log(`WebSocket Server is running on port ${PORT}`);
console.log(`Type "hora" to request the hour and type "sync" to sync`);
arrNumSync.push(numSync);
