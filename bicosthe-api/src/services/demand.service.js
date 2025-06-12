import {repositories} from "../repositories/index.js";
async function insertServico(dados) {
    const { valor, descricao, titulo, dataInicio, dataFim, idregiao, usuarioId } = dados;
    return await repositories.demand.insertServico({ valor, descricao, titulo, dataInicio, dataFim, idregiao, usuarioId });
}

async function getServicos() {
    return await repositories.demand.getServicos();
}

async function getCategories(){
    try {
        const categories = await repositories.demand.getCategories()
        return categories
    } catch (error) {
        res.status(500).send("Erro ao buscar as categorias: " + error.message)
    }
}





export {insertServico, getServicos, getCategories}