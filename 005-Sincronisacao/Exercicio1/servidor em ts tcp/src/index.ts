import { Server, Socket } from 'net';

class TimeDaemon {
    server: Server;
    constructor(public host: string, public port: number) {
        this.server = new Server();
        this.server.on('connection', (socket: Socket) => {
            setInterval(() => {
                socket.write('send_time');
                socket.on('data', (data: Buffer) => {
                    const TempoCliente = Number(data.toString());
                    const TempoAtual = Date.now() / 1000;
                    const ajuste = TempoAtual - TempoCliente;
                    socket.write(ajuste.toString());
                    console.log(`Ajustado relógio do cliente ${socket.remoteAddress}:${socket.remotePort} de ${new Date(TempoCliente * 1000)} para ${new Date(TempoAtual * 1000)}`);
                });
            }, 30000);
        });
        this.server.listen(this.port, this.host, () => {
            console.log(`Servidor rodando no endereço: ${this.host}:${this.port}.`);
        });
    }
}

const timeDaemon = new TimeDaemon('localhost', 12345);
