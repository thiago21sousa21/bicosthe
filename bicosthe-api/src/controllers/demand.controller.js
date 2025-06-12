import {services} from "../services/index.js";
async function insertServico(req, res) {
    const { valor, descricao, titulo, dataInicio, dataFim, idregiao, usuarioId } = req.body;
    try {
        await services.demand.insertServico({ valor, descricao, titulo, dataInicio, dataFim, idregiao, usuarioId });
        res.status(201).send("Serviço cadastrado com sucesso.");
    } catch (error) {
        if (error.message === "Serviço já cadastrado") {
        return res.status(409).send(error.message);
        }
        res.status(500).send("Erro ao cadastrar serviço: " + error.message);
    }
}

async function getServicos(req, res) {
    try {
        const servicos = await services.demand.getServicos();
        res.status(200).json(servicos);
    } catch (error) {
        res.status(500).send("Erro ao buscar serviços: " + error.message);
    }
}

async function getCategories(req, res){
    try {
        const categories = await services.demand.getCategories()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).send("Erro ao buscar as categorias: " + error.message)
    }
}

async function getZonas(req, res){
    try {
        const zonas = await services.demand.getZonas()
        res.status(200).json(zonas)
    } catch (error) {
        res.status(500).send("Erro ao buscar as categorias: " + error.message)
    }
}
export { insertServico, getServicos, getCategories, getZonas };