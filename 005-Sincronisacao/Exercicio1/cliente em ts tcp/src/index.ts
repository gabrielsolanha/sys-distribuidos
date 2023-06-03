import { Socket } from 'net';

class ClientMachine {
    socket: Socket;
    constructor(public host: string, public port: number, public timeDaemon: { host: string, port: number }, public diferencaTempo: number) {
        this.socket = new Socket();
        this.socket.on('data', (data: Buffer) => {
            const messagem = data.toString();
            if (messagem === 'send_time') {
                this.sendTime();
            } else {
                const ajuste = Number(messagem);
                this.receiveajuste(ajuste);
            }
        });
        this.socket.connect(timeDaemon.port, timeDaemon.host);
    }

    sendTime() {
        const tempoAtual = (Date.now() / 1000) + this.diferencaTempo;
        this.socket.write(tempoAtual.toString());
    }

    receiveajuste(ajuste: number) {
        this.diferencaTempo += ajuste;
        const newTime = (Date.now() / 1000) + this.diferencaTempo;
        console.log(`Seu horário era ${new Date((newTime - ajuste) * 1000)} e foi alterado para ${new Date(newTime * 1000)}.`);
    }
}

const timeDaemon = { host: 'localhost', port: 12345 };

const machines = [
    new ClientMachine('localhost', 12346, timeDaemon, -4*3600),
    new ClientMachine('localhost', 12347, timeDaemon, -3*3600),
];
