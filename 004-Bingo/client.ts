import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/bingo";
import readline from "readline";

const PORT = 50051;
const PROTO_FILE = "./proto/bingo.proto";

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

const client = new grpcObj.Bingo(
  `127.0.0.1:${PORT}`,
  grpc.credentials.createInsecure()
);
var stage = 0;
var myToken = "";
var myUserName = "";
var myCard = [0];
var sortedNubers: number[] = [];
const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  onClientReady();
});

function onClientReady() {
  process.stdin.on("data", (data) => {
    if (stage == 0) {
      myUserName = data.toString().replace("\r\n", "");
      const login = client.Login({ username: myUserName });
      console.log("0000000000");

      login.on("data", (chunk) => {
        if (stage == 0 && chunk.status == 0) {
          console.log(chunk);
          myToken = chunk.token;
          console.log(chunk.message + "\nDo u wanna start?y/n");
          stage = 1;
        } else if (chunk.status == 1) {
          console.log(chunk.message + "\nRetype another:");
        }
      });
    } else if (stage == 1) {
      client.Ready({ token: myToken, username: myUserName }, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(result.message);
        console.log("Your card is:");
        myCard = result.card;
        console.log(myCard);
        console.log(typeof myCard);
        stage = 2;
        const play = client.Play({ token: myToken, username: myUserName });
        play.on("data", (chunk) => {
          if (chunk.status == 0) {
            console.log("The number is:" + chunk.number);
            sortedNubers.push(chunk.number);
            console.log("The sorted numbers that u saw are:");
            console.log(sortedNubers);
            console.log("Yours numbers are: ");
            printCard(myCard);
            console.log(
              "Are u the winner? (Do not respons if the response is not)"
            );
          } else {
            console.log(chunk.message);
            console.log("Winner:" + chunk.winner);
          }
          //console.log(chunk);
        });
      });
    } else if (stage == 2) {
      if (data.toString().replace("\r\n", "") == "y") {
        console.log("****************************");
        console.log("Checking...");
        console.log("****************************");
        client.CheckWin(
          { token: myToken, username: myUserName },
          (err, result) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(result?.message);
          }
        );
      }
    }
  });
}

const printCard = (card: number[]) => {
  let card2D = [
    card.slice(0, 5),
    card.slice(5, 10),
    [...card.slice(10, 12), "😎", ...card.slice(12, 14)],
    card.slice(14, 19),
    card.slice(19, 24),
  ];
  console.log(card2D);
};
console.log("Digite seu nome:")