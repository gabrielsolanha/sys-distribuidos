// Program.cs
using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.IO;

namespace ClienteEmCSharp
{
    class Program
    {
        static void Main(string[] args)
        {
            int PORT = 3000;
            string HOST = "127.0.0.1";
            string message = "Solicitando arquivo teste.txt";

            UdpClient client = new UdpClient();
            IPEndPoint serverEndpoint = new IPEndPoint(IPAddress.Parse(HOST), PORT);

            try
            {
                byte[] data = Encoding.ASCII.GetBytes(message);
                client.Send(data, data.Length, serverEndpoint);

                Console.WriteLine($"Mensagem enviada para {HOST}:{PORT}");

                IPEndPoint remoteEndpoint = new IPEndPoint(IPAddress.Any, 0);
                byte[] receivedData = client.Receive(ref remoteEndpoint);

                Console.WriteLine($"Arquivo recebido de {remoteEndpoint.Address}:{remoteEndpoint.Port}");

                string receivedFilePath = "received_teste.txt";
                File.WriteAllBytes(receivedFilePath, receivedData);

                Console.WriteLine($"Arquivo salvo como {receivedFilePath}");
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Erro: {ex.Message}");
            }
            finally
            {
                client.Close();
            }
        }
    }
}
