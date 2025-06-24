import db from '../database/database.connection.js';

async function insertServico(dados, conn) { // Adicione 'conn' aqui para usar a conexão transacional
    // O seu frontend está enviando 'idbairro', então desestruture 'idbairro'
    const { valor, descricao, titulo, dataInicio, dataFim, idbairro, usuarioId } = dados; 
    
    const query = `
        INSERT INTO servico (valor, descricao, titulo, dataInicio, dataFim, idbairro, usuarioId)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [valor, descricao, titulo, dataInicio, dataFim, idbairro, usuarioId]; // Use idbairro aqui também
    
    try {
        // Use a conexão passada, que faz parte da transação
        const [result] = await conn.query(query, values); 
        // Retorne o ID do serviço inserido para ser usado com as categorias
        return { idservico: result.insertId }; 
    } catch (error) {
        throw new Error("Erro ao inserir serviço: " + error.message);
    }
}

async function insertServicoCategoria({ idservico, idcategoria }, conn) {
    const query = `
        INSERT INTO servico_categoria (idservico, idcategoria)
        VALUES (?, ?)
    `;
    const values = [idservico, idcategoria];
    try {
        await conn.query(query, values);
    } catch (error) {
        throw new Error("Erro ao inserir categoria do serviço: " + error.message);
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


async function getBairros(idzona){
    try {
        // Use 'let' para permitir a modificação da query
        let query = `
            SELECT * FROM bairro
        `;
        // Use um array de parâmetros para evitar SQL injection e simplificar a lógica
        const params = [];

        if (idzona) {
            query += ` WHERE idzona = ?`;
            params.push(idzona);
        }
        // Passe o array de parâmetros para a query
        const [bairros] = await db.query(query, params);
        return bairros;
    } catch (error) {
        throw new Error("Erro ao buscar os bairros: " + error.message);
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



export { insertServico, getServicos, getCategories, getZonas, getBairros, getCategoriesById, insertServicoCategoria };