// ==============================
// IMPORTAÇÕES
// ==============================

//Importa a classe Cliente (POO)
import { Cliente } from "./classes.js";
console.log(Cliente);

// Importa a função de validação de dados
import { validarCliente } from "./utils.js";

// ==============================
// VARIÁVEIS GLOBAIS / DOM
// ==============================

// Lista onde os clientes serão exibidos na interface
const clientes = document.getElementById('listaClientes');

// Lista local que armazena os clientes vindos da API
let listaClientes = [];

// URL da API (CrudCrud)
const API_URL = "https://crudcrud.com/api/1dfc460bb3024321b51d8503cca6f9e7/clientes"

// ==============================
// CARREGAMENTO INICIAL (GET)
// ==============================

console.log("Buscando clientes...");

// Busca clientes na API ao carregar a página
fetch(API_URL)
    .then(resposta => resposta.json()) // Converte o corpo da resposta em JSON
    .then(dados => {
        // Armazena os dados na lista local
        listaClientes = dados;
        // Percorre cada cliente e renderiza na tela
        listaClientes.forEach(cliente => {
            const item = document.createElement("li");
            item.textContent = `${cliente.nome} - ${cliente.email}`;
            
            const botao = document.createElement("button");
            botao.textContent = "X";
            // Remove cliente ao clicar no botão
            botao.addEventListener("click", () => {
                removerCliente(cliente._id, item);
            });

            item.appendChild(botao);
            clientes.appendChild(item);
            });
        })

        .catch(erro => {
            console.error("Erro ao buscar clientes:", erro);
        });

// ==============================
// CADASTRO DE CLIENTES (POST)
// ==============================

// Captura envio do formulário
document.getElementById("formulario").addEventListener("submit", (evento) => {
    evento.preventDefault();
    // obtém os valores dos inputs
    const nome = document.getElementById("nome").value; 
    const email = document.getElementById("email").value;
    // Cria objeto cliente (POO)
    const cliente = new Cliente(nome, email);

    // Validação de campos obrigatórios
    if (!validarCliente(nome,email)) {
        alert("Preencha todos os campos!");
        return;
    }
    // Verifica se já existe cliente com mesmo email (find)
    const clienteExistente = listaClientes.find(cliente => cliente.email === email);

    if (clienteExistente) {
        alert("Já existe um cliente com este e-mail.");
        return;
    }
    // Envia cliente para API
    fetch(API_URL, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
    })

    .then(resposta => resposta.json())
    .then((cliente) => {
        // Cria elemento visual do novo cliente
        const item = document.createElement("li");
        item.textContent = `${cliente.nome} - ${cliente.email}`;

        const botao = document.createElement("button");
        botao.textContent = "X";

        // Remove cliente da interface e API
        botao.addEventListener("click",() =>{
            removerCliente(cliente._id, item);
        });

        item.appendChild(botao);
        clientes.appendChild(item);

        // Limpa formulario
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";

        // Atualiza lista local
        listaClientes.push(cliente);
    })

    .catch(erro => {
        console.error("Erro ao cadastrar cliente:", erro);
    });
});

// ==============================
// REMOÇÃO DE CLIENTES (DELETE)
// ==============================

// Remove cliente da API e da interface
function removerCliente(id, item) {

    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })

    .then(() => {
        // Atualiza lista local
        listaClientes = listaClientes.filter(cliente => cliente._id !== id);
        // RRemove elemento da tela sem recarregar a página
        item.remove();
    })

    .catch(erro => {
        console.error("Erro ao remover cliente:", erro);
    });
}