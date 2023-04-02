using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Threading.Tasks;

namespace Teste
{

    class Program
    {
        public class DadosNode
        {

            public int Id { get; set; }
            public List<DadosNode> NodesAssociados { get; set; }
            public Dictionary<int, string> Dados { get; set; }
            public DadosNode()
            {
                NodesAssociados = new List<DadosNode>();
                Dados = new Dictionary<int, string>();
            }

        }
        public class Node
        {
            public DadosNode valor { get; set; }
            public Node proximo { get; set; }

            public Node(DadosNode valor)
            {
                this.valor = valor;
            }
        }
        /// <summary>
        ///
        /// Mexer aqui quei ainda falta remover e adicionar as listas em outras listas
        ///
        /// </summary>
        public class CircularLinkedList
        {
            public Node? primeiro { get; set; }

            public void Add(DadosNode valor, int proximo, List<DadosNode> associados)
            {
                Node newNode = new Node(valor);
                if (primeiro == null)
                {
                    primeiro = newNode;
                    newNode.proximo = primeiro;
                    newNode.valor.Id = proximo;
                    this.OrganizaNodesAssociados(newNode, associados);
                }
                else
                {
                    List<int> ativos = new List<int>();
                    Node? current = primeiro;
                    while (current?.proximo?.valor?.Id != primeiro.valor.Id)
                    {
                        ativos.Add((int)(current?.valor?.Id));
                        current = current?.proximo;
                    }

                    ativos.Add((int)(current?.valor?.Id));
                    current.proximo = newNode;
                    newNode.proximo = primeiro;
                    newNode.valor.Id = proximo;
                    this.OrganizaNodesAssociados(newNode, associados, ativos);
                }
            }

            public void OrganizaNodesAssociados(Node novo, List<DadosNode> associados, List<int> ativos = null)
            {
                if (ativos == null) ativos = new List<int>();
                if (primeiro == null)
                {
                    Console.WriteLine("Lista vazia.");
                    return;
                }
                Node? current = novo;
                current = current?.proximo;
                List<DadosNode> temp = new List<DadosNode>();
                var k = current.valor.NodesAssociados.Where(x => associados.Any(c => c.Id == x.Id)).ToList();
                temp.AddRange(k);

                while (current != novo)
                {
                    var m = current?.valor.NodesAssociados.Where(x => associados.Any(c => c.Id == x.Id) && !temp.Any(c => c.Id.Equals(x.Id))).ToList();
                    temp.AddRange(m);
                    current = current?.proximo;
                }
                var l = associados.Where(x => !temp.Any(c => c.Id.Equals(x.Id))).ToList();
                temp.AddRange(l);
                temp.RemoveAll(x => (ativos.Any(c => c == x.Id)));
                novo.valor.NodesAssociados = temp;

                current = novo.proximo;
                while (current != novo)
                {
                    var m = current?.valor.NodesAssociados.RemoveAll(x => temp.Any(c => c.Id.Equals(x.Id)));
                    current = current?.proximo;
                }


            }

            public void AlterarInserirDado(int chaveDado, string dado, int indexDoNode = 0)
            {
                Node current = primeiro;
                bool foiPrimeiro = false;

                while (!foiPrimeiro || current != primeiro)
                {
                    foiPrimeiro = true;
                    if (current.valor.Dados.TryGetValue(chaveDado, out string valor))
                    {
                        if (indexDoNode == 0 || indexDoNode == current.valor.Id)
                        {
                            current.valor.Dados[chaveDado] = dado;
                            Console.WriteLine($"O valor do dado de chave {chaveDado} era: {valor} agora é: {dado}");
                            Console.WriteLine($"E esse valor está no nó{current.valor.Id}");
                            return;
                        }
                        else
                        {
                            Console.WriteLine($"Valor do Node inválido!");
                            return;
                        }
                    }
                    else
                    {
                        foreach (var node in current.valor.NodesAssociados)
                        {
                            if (node.Dados.TryGetValue(chaveDado, out string _valor))
                            {
                                if (indexDoNode == 0 || indexDoNode == node.Id)
                                {
                                    node.Dados[chaveDado] = dado;
                                    Console.WriteLine($"O valor do dado de chave {chaveDado} era: {valor} agora é: {dado}");
                                    Console.WriteLine($"E esse valor está no nó{node.Id}");
                                    return;
                                }
                                else
                                {
                                    Console.WriteLine($"Valor do Node inválido!");
                                    return;
                                }
                            }
                        }
                    }
                    current = current?.proximo;
                }
                //fim do loop

                current = primeiro;
                foiPrimeiro = false;
                while (!foiPrimeiro || current != primeiro)
                {
                    foiPrimeiro = true;
                    if (indexDoNode == current.valor.Id)
                    {
                        current.valor.Dados.Add(chaveDado, dado);
                        return;
                    }
                    else
                    {
                        foreach (var node in current.valor.NodesAssociados)
                        {
                            if (indexDoNode == node.Id)
                            {
                                node.Dados.Add(chaveDado, dado);
                                return;
                            }

                        }
                    }

                    current = current.proximo;
                }


            }
            public void Print()
            {
                if (primeiro == null)
                {
                    Console.WriteLine("Lista vazia.");
                    return;
                }

                Node current = primeiro;
                bool foiPrimeiro = false;
                while (!foiPrimeiro || current != primeiro)
                {
                    foiPrimeiro = true;
                    Console.Write($"P-{current?.valor.Id}");
                    foreach (var dado in current.valor.Dados)
                    {
                        Console.Write($"\t->chave:{dado.Key} valor:{dado.Value}");
                    }
                    foreach (var node in current.valor.NodesAssociados)
                    {
                        Console.Write($"\n\t-SA->{node.Id}");
                        foreach (var dado in node.Dados)
                        {
                            Console.Write($"\t->chave:{dado.Key} valor:{dado.Value}");
                        }
                    }

                    current = current.proximo;
                    if (current != primeiro) Console.Write("\n|\nv\n");
                }
                Console.Write("\n");
            }
            public void Remover(int valor)
            {
                if (primeiro == null) 
                    return;

                if (primeiro?.valor?.Id == valor) 
                {
                    if (primeiro.proximo == primeiro) // se há apenas um nó na lista
                    {
                        primeiro = null;
                    }
                    else
                    {
                        Node ultimo = primeiro;
                        while (ultimo?.proximo != primeiro) //percorre a lista para encontrar o último nó
                        {
                            ultimo = ultimo?.proximo;
                        }
                        Node apagado = primeiro;
                        primeiro = primeiro.proximo; 
                        ultimo.proximo = primeiro;
                        primeiro.valor.NodesAssociados.Add(new DadosNode() { Id = apagado.valor.Id, Dados = apagado.valor.Dados});
                        primeiro.valor.NodesAssociados.AddRange(apagado.valor.NodesAssociados.Where(x => x.Id != apagado.valor.Id).ToList());
                    }
                    return;
                }

                Node anterior = primeiro;
                Node atual = primeiro?.proximo;
                while (atual != primeiro)
                {
                    if (atual?.valor?.Id == valor)
                    {
                        Node apagado = atual;
                        anterior.proximo = atual.proximo;
                        atual = atual?.proximo;
                        anterior.valor.NodesAssociados.Add(new DadosNode() { Id = apagado.valor.Id, Dados = apagado.valor.Dados });
                        anterior.valor.NodesAssociados.AddRange(apagado.valor.NodesAssociados.Where(x => x.Id != apagado.valor.Id).ToList());
                        return;
                    }
                    anterior = atual; 
                    atual = anterior?.proximo;
                }
            }

            public void BuscaDado(int chaveDado)
            {
                Node current = primeiro;
                bool acaba = false;

                while (!acaba)
                {
                    if (current.valor.Dados.TryGetValue(chaveDado, out string valor))
                    {
                        Console.WriteLine($"O valor do dado de chave {chaveDado}é: {valor}");
                        Console.WriteLine($"E esse valor está no nó: {current.valor.Id}");
                        return;
                    }
                    else
                    {
                        foreach (var node in current.valor.NodesAssociados)
                        {
                            if (node.Dados.TryGetValue(chaveDado, out string _valor))
                            {
                                Console.WriteLine($"O valor do dado de chave {chaveDado}é: {_valor}");
                                Console.WriteLine($"E esse valor está no nó: {node.Id}");
                            }
                        }
                    }
                    current = current?.proximo;
                }
            }


        }


        static async Task Main(string[] args)
        {
            CircularLinkedList tabelaHash = new CircularLinkedList();
            tabelaHash.Add(new DadosNode(), 1, new List<DadosNode>(new DadosNode[] { new DadosNode() { Id = 1 }, new DadosNode() { Id = 2 }, new DadosNode() { Id = 3 }, new DadosNode() { Id = 4 }, new DadosNode() { Id = 10 }, new DadosNode() { Id = 11 }, }));
            tabelaHash.Add(new DadosNode(), 2, new List<DadosNode>(new DadosNode[] { new DadosNode() { Id = 1 }, new DadosNode() { Id = 2 }, new DadosNode() { Id = 8 }, new DadosNode() { Id = 9 }, }));
            tabelaHash.Add(new DadosNode(), 8, new List<DadosNode>(new DadosNode[] { new DadosNode() { Id = 1 }, new DadosNode() { Id = 2 }, new DadosNode() { Id = 3 }, new DadosNode() { Id = 8 }, new DadosNode() { Id = 7 }, }));
            tabelaHash.Add(new DadosNode(), 4, new List<DadosNode>(new DadosNode[] { new DadosNode() { Id = 1 }, new DadosNode() { Id = 4 }, new DadosNode() { Id = 2 }, new DadosNode() { Id = 3 }, new DadosNode() { Id = 6 }, new DadosNode() { Id = 5 }, }));
            tabelaHash.Add(new DadosNode(), 5, new List<DadosNode>(new DadosNode[] { new DadosNode() { Id = 1 }, new DadosNode() { Id = 5 }, new DadosNode() { Id = 2 }, new DadosNode() { Id = 3 }, new DadosNode() { Id = 4 } }));
            tabelaHash.Remover(8);
            tabelaHash.AlterarInserirDado(1, "valor de 1", 1);
            tabelaHash.AlterarInserirDado(2, "valor de 2", 10);
            tabelaHash.AlterarInserirDado(3, "valor de 3", 1);
            tabelaHash.AlterarInserirDado(1, "valor de 1 alterado");
            tabelaHash.AlterarInserirDado(2, "valor de 2 alterado", 10);
            tabelaHash.Print();
            tabelaHash.AlterarInserirDado(1, "valor de 1 alterado");


        }

    }

}
