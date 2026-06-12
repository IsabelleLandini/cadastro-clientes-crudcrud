// Função responsável por validar os dados do cliente
export function validarCliente(nome, email) {
    if (!nome || !email){
    return false;
    }
    else {
        return true;
    }
}