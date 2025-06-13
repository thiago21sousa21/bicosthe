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
async function getServicos(sql, params) {
    try {
        const [rows] = await db.query(sql, params);
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
        throw new Error("Erro ao buscar as categorias: " + error.message)
    }
}

async function getZonas(){
    try {
        const query = `
            SELECT * FROM zona;
        `;
        const [zonas]= await db.query(query)
        return zonas
    } catch (error) {
        throw new Error("Erro ao buscar as zonas: " + error.message)
    }
}


async function getBairros(){
    try {
        const query = `
            SELECT * FROM bairro;
        `;
        const [bairros]= await db.query(query)
        return bairros
    } catch (error) {
        throw new Error("Erro ao buscar as bairros: " + error.message)
    }
}

async function getCategoriesById(idservico){
    try {
        const [categoriasResult] = await db.query(`
                SELECT c.idcategoria, c.nome
                FROM categoria AS c
                JOIN servico_categoria AS sc ON c.idcategoria = sc.idcategoria
                WHERE sc.idservico = ?
            `, [idservico]);

    } catch (error) {
         throw new Error("Erro ao buscar as categorias desse serviço: " + error.message)
    }
}



export { insertServico, getServicos, getCategories, getZonas, getBairros, getCategoriesById };