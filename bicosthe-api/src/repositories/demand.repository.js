import db from '../database/database.connection.js';
async function insertServico(dados) {
    const { valor, descricao, titulo, dataInicio, dataFim, idregiao, usuarioId } = dados;
    const query = `
        INSERT INTO servico (valor, descricao, titulo, dataInicio, dataFim, idregiao, usuarioId)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [valor, descricao, titulo, dataInicio, dataFim, idregiao, usuarioId];
    try {
        await db.query(query, values);
    } catch (error) {
        throw new Error("Erro ao inserir serviço: " + error.message);
    }
}
async function getServicos() {
    const query = `
        SELECT * FROM servico
    `;
    try {
        const [rows] = await db.query(query);
        return rows;
    } catch (error) {
        throw new Error("Erro ao buscar serviços: " + error.message);
    }
}

async function getCategories(){
    try {
        const query = `
            SELECT * FROM categoria;
        `;
        const [categories]= await db.query(query)
        return categories
    } catch (error) {
        res.status(500).send("Erro ao buscar as categorias: " + error.message)
    }
}



export { insertServico, getServicos, getCategories };