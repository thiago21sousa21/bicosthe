import {repositories} from "../repositories/index.js";
async function insertServico(dados) {
    const { valor, descricao, titulo, dataInicio, dataFim, idregiao, usuarioId } = dados;
    return await repositories.demand.insertServico({ valor, descricao, titulo, dataInicio, dataFim, idregiao, usuarioId });
}

async function getServicos() {
    return await repositories.demand.getServicos();
}
export {insertServico, getServicos}