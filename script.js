// Seleciona a nossa ul com a lista de clientes (<ul) no HTML
const clientes = document.getElementById('listaClientes');

// URL da coleção "clientes" criada no CrudCrud
const API_URL = "https://crudcrud.com/api/3588326480d64c6895f8d7991d2c3ff5/clientes"

// Faz uma requisição GET para buscar todos os clientes cadastrados
console.log("Buscando clientes...");
// Faz uma requisição GET para a API externa para buscar todos o clientes cadastrados
fetch(API_URL)
    .then(resposta => resposta.json()) // Converte o corpo da resposta em JSON
    .then(listaClientes => {
        console.log(listaClientes)
        // Percorre cada cliente retornado pela API
        listaClientes.forEach(cliente => {
            // Cria um novo elemento de lista (<li>) 
            const item = document.createElement("li");
            // Define o conteúdo do item com nome, email e botão de exclusão
            item.innerHTML = `${cliente.nome} - ${cliente.email} <button onclick="removerCliente('${cliente._id}')">X</button>`;
            // Adiciona o item na lista exibida na pagina
            clientes.appendChild(item);
            });

        })

        .catch(erro => {
            console.error("Erro ao buscar clientes:", erro);
        });

// Adiciona um ouvinte de evento click ao botão de cadastro
document.getElementById("formulario").addEventListener("submit", (evento) => {
    // Impede o recarregamento da pagina
    evento.preventDefault();
    // obtem os valores digitados nos campos
    const nome = document.getElementById("nome").value; 
    const email = document.getElementById("email").value;

    if (!nome || !email) {
        alert("Preencha todos os campos!");
        return;
    }

    // Faz uma requisição POST para cadastrar um novo cliente
    fetch(API_URL, {
        // Define o metodo HTTP da requisição
        method: "POST",
        // Define o tipo de conteudo enviado para a API
        headers:{
            "Content-Type": "application/json"
        },
        // Converte um objeto JS para JSON e envia no corpo da requisição
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })

    .then(resposta => resposta.json())
    .then((cliente) => {
        // Cria um novo item de lista para o cliente recem-cadastrado
        const item = document.createElement("li");
        // Exibe nome, email e botão de exclusão
        item.innerHTML = `${cliente.nome} - ${cliente.email} <button onclick="removerCliente('${cliente._id}')">X</button>`;
        // Adiciona o cliente a lista exibida na pagina
        clientes.appendChild(item);

        // Limpa os campos apos o cadastro
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
    })

    .catch(erro => {
        console.error("Erro ao cadastrar cliente:", erro);
    });
});

// Função responsavel por excluir um cliente
function removerCliente(id) {

    // Faz uma requisição DELETE para remover o cliente da API
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })

    .then(() => {
        // Recarrega a pagina para atualizar a lista de clientes
        location.reload();
    })

    .catch(erro => {
        console.error("Erro ao remover cliente:", erro);
    });
}