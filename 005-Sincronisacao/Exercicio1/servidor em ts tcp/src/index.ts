// src/ws_quiz_server.ts
import WebSocket from "ws";

const PORT = 3000;

var numSync = 1012;
var arrNumSync: Array<number> = [];
function handleClient(ws: WebSocket) {
  ws.send("Sincronizador conectado!");

  ws.on("message", (message: { toString: () => string }) => {
    const answer = Number(message.toString().trim());
    arrNumSync.push(answer);
  });
  process.stdin.on("data", (data) => {
    const message = data.toString().trim();
    if (message == "s") {
      const calc = arrNumSync.reduce(
        (accumulator: number, currentValue: number) => accumulator + currentValue
      );
      ws.send((calc / arrNumSync.length).toString());
      ws.close()
    }
  });
}

const server = new WebSocket.Server({ port: PORT });

server.on("connection", handleClient);

console.log(`WebSocket Server is running on port ${PORT}`);
console.log(`Deseja realisar a sync?s/n`);
arrNumSync.push(numSync);
