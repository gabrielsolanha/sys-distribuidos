// src/ws_quiz_server.ts
import WebSocket from "ws";

const PORT = 3000;

const questions = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "What is the capital of Germany?",
    answer: "Berlin",
  },
  {
    question: "What is the capital of Italy?",
    answer: "Rome",
  },
];

function handleClient(ws: WebSocket) {
  let currentQuestionIndex = 0;

  ws.send("Welcome to the WebSocket Quiz Server!");
  ws.send("Type 'quit' anytime to exit.");

  function askQuestion() {
    if (currentQuestionIndex < questions.length) {
      ws.send(`Question: ${questions[currentQuestionIndex].question}`);
    } else {
      ws.send("Congratulations! You have completed the quiz.");
      ws.close();
    }
  }

  askQuestion();

  ws.on("message", (message: { toString: () => string; }) => {
    const answer = message.toString().trim();

    if (answer.toLowerCase() === "quit") {
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
    }
  });
}

const server = new WebSocket.Server({ port: PORT });

server.on("connection", handleClient);

console.log(`WebSocket Quiz Server is running on port ${PORT}`);
