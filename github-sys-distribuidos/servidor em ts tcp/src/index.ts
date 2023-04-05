// src/ws_quiz_server.ts
import WebSocket from "ws";

const PORT = 3000;

const questions = [
  {
    question: "Qual a capital da França?\nA)Brasilia\nB)Paris\nC)Fraiburgo\nD)Lion",
    answer: "b",
  },
  {
    question: "Qual a capital da Alemanha?\nA)Noronha\nB)Berlim\nC)Fraiburgo\nD)Stuttgard",
    answer: "b",
  },
  {
    question: "Qual a capital da Itália?\nA)Piratuba\nB)Roma\nC)Fraiburgo\nD)Milão",
    answer: "b",
  },
];

function handleClient(ws: WebSocket) {
  let currentQuestionIndex = 0;
  let nota = 10;

  ws.send("Bem vindo ao Quiz!");
  ws.send("Digite 'sair' para sair a qualquer hora.");

  function askQuestion() {
    if (currentQuestionIndex < questions.length) {
      ws.send(`Question: ${questions[currentQuestionIndex].question}`);
    } else {
      ws.send("Parabens! Você completou o quiz.\nSua nota ficou: " + nota + "pontos");
      ws.close();
    }
  }

  askQuestion();

  ws.on("message", (message: { toString: () => string; }) => {
    const answer = message.toString().trim();

    if (answer.toLowerCase() === "sair") {
      ws.send("Goodbye!");
      ws.close();
      return;
    }

    if (answer === questions[currentQuestionIndex].answer) {
      ws.send("Correct!");
      currentQuestionIndex++;
      askQuestion();
    } else {
      ws.send("Incorrect. Try again!");
      nota = nota > 0 ? nota-- : 0;
    }
  });
}

const server = new WebSocket.Server({ port: PORT });

server.on("connection", handleClient);

console.log(`WebSocket Quiz Server is running on port ${PORT}`);
