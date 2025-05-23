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

export { insertServico, getServicos };