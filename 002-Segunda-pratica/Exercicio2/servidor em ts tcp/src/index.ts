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

const login = {
  "aluno": "senha",
  "aluno2": "senha"
}
var nota = 10;
function handleClient(ws: WebSocket) {
  let currentQuestionIndex = 0;
  let logado = false;
  let senha = false;
  let matricula = false;
  let matriculaString = "";

  ws.send("Bem vindo ao Quiz!");
  ws.send("Digite 'sair' para sair a qualquer hora.");
  if (!logado && !matricula && !senha) {
    ws.send("Digite sua matricula:");
    logado = true;
  } 

    function askQuestion() {
      if (currentQuestionIndex < questions.length) {
        ws.send(`Question: ${questions[currentQuestionIndex].question}`);
      } else {
        ws.send("Parabens! Você completou o quiz.\nSua nota ficou: " + nota + "pontos");
        ws.close();
      }
    }


  ws.on("message", (message: { toString: () => string; }) => {
    const answer = message.toString().trim();

    if (!matricula && !senha) {
      matricula = Object.keys(login).some(m => m == answer);
      matriculaString = Object.keys(login).find(m => m == answer) ?? "";
      if (matricula) {
        ws.send("Encontrado! Digite a Senha:");
      } else {
        ws.send("Não encontrado! Tente novamente:");
      }
    } else if (!senha) {
      senha = eval('login.' + matriculaString) == answer
      if (senha) {
        ws.send("Logado!");
        askQuestion();
      } else {
        ws.send("Falha!");
      }
    }
    if (answer.toLowerCase() === "sair") {
      ws.send("Goodbye!");
      ws.close();
      return;
    }
    if (logado && senha && matricula) {
      if (answer === questions[currentQuestionIndex].answer) {
        ws.send("Correct!");
        currentQuestionIndex++;
        askQuestion();
      } else {
        nota = nota > 0 ? --nota : 0;
        ws.send("Incorrect. Try again!");
      }
    }
  });
}

const server = new WebSocket.Server({ port: PORT });

server.on("connection", handleClient);

console.log(`WebSocket Quiz Server is running on port ${PORT}`);
