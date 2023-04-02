// src/udp_server.ts
import * as dgram from "dgram";
import * as fs from "fs";
import * as path from "path";

const PORT = 3000;
const HOST = "127.0.0.1";

const server = dgram.createSocket("udp4");

server.on("listening", () => {
  const address = server.address();
  console.log(`Servidor UDP escutando em ${address.address}:${address.port}`);
});

server.on("message", (msg, rinfo) => {
  console.log(`Recebido: ${msg} de ${rinfo.address}:${rinfo.port}`);

  const filePath = path.join(__dirname, "teste.txt");

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Erro ao ler arquivo:", err);
      return;
    }

    server.send(data, rinfo.port, rinfo.address, (err) => {
      if (err) {
        console.error("Erro ao enviar arquivo:", err);
        return;
      }
      console.log(`Arquivo enviado para ${rinfo.address}:${rinfo.port}`);
    });
  });
});

server.bind(PORT, HOST);
