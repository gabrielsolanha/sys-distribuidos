from socket import *

serverName = "servername"
serverPort = 12000
clientSocket = socket(AF_INET, SOCK_STREAM)
clientSocket.connect((serverName,serverPort))

sentence = input("Informe uma frase em minúsculas:")

clientSocket.send(sentence.encode())
modifiedSentence = clientSocket.recv(1024)
print (‘Resposta do servidor:’, modifiedSentence.decode())
clientSocket.close()
