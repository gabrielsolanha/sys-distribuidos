import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from './proto/random'
import { RandomHandlers } from './proto/randomPackage/Random'
import { TodoResponse } from './proto/randomPackage/TodoResponse'
import { TodoRequest } from './proto/randomPackage/TodoRequest'
import { ChatRequest } from './proto/randomPackage/ChatRequest'
import { ChatResponse } from './proto/randomPackage/ChatResponse'
import { PingRequest__Output } from './proto/randomPackage/PingRequest'


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
var currentQuestionIndex = 0;
var logado = false;
var senha = false;
var matricula = false;
var matriculaString = "";

function askQuestion(currentQuestionIndex: number) {
  if (currentQuestionIndex < questions.length) {
    return `Question: ${questions[currentQuestionIndex].question}`;
  } else {
    return "Parabens! Você compvarou o quiz.\nSua nota ficou: " + nota + "pontos";
  }
}



function handleClient(message: PingRequest__Output) {

  if (!logado && !matricula && !senha) {
    logado = true;
    return "Bem vindo ao Quiz!\nDigite 'sair' para sair a qualquer hora.\nDigite sua matricula:";
  }



  const answer = message.message?.toString().replace(/\r\n/g, '').trim();
  console.log("teste:" + answer)
  let retorno = ""
  if (!matricula && !senha) {
    matricula = Object.keys(login).some(m => m == answer);
    matriculaString = Object.keys(login).find(m => m == answer) ?? "";
    if (matricula) {
      return "Encontrado! Digite a Senha:";
    } else {
      return "Não encontrado! Tente novamente:";
    }
  } else if (!senha) {
    senha = eval('login.' + matriculaString) == answer
    if (senha) {
      askQuestion(currentQuestionIndex);
      retorno = "Logado!\n";
    } else {
      return "Falha!";
    }
  }
  if (answer?.toLowerCase() === "sair") {
    return "Goodbye!";
  }
  if (logado && senha && matricula) {

    if (answer === questions[currentQuestionIndex].answer) {
      currentQuestionIndex++;
      retorno += "Correct!\n" + askQuestion(currentQuestionIndex) 
      return retorno;
    } else if (retorno == "Logado!\n") {
      retorno += askQuestion(currentQuestionIndex)
      return retorno
    }
    else {
      retorno += "Incorrect. Try again!"
      nota = nota > 0 ? --nota : 0;
      return retorno;
    }
  }
}

const PORT = 8082
const PROTO_FILE = './proto/random.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType
const randomPackage = grpcObj.randomPackage

function main() {
  const server = getServer()

  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(`Your server as started on port ${port}`)
      server.start()
    })
}

const todoList: TodoResponse = { todos: [] }
const callObjByUsername = new Map<string, grpc.ServerDuplexStream<ChatRequest, ChatResponse>>()

function getServer() {
  const server = new grpc.Server()
  server.addService(randomPackage.Random.service, {
    PingPong: (req, res) => {
      console.log(req.request)
      res(null, { message: handleClient(req.request) })
    }
  } as RandomHandlers)

  return server
}

main()




