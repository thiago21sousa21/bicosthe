import db from "../database/database.connection.js";
import {repositories} from "../repositories/index.js";

async function insertServico(dados) {
    const { categorias } = dados;
    if (!Array.isArray(categorias) || categorias.length === 0) {
        throw new Error("Pelo menos uma categoria deve ser selecionada");
    }

    const conn = await db.getConnection(); // Use o método correto para pegar a conexão
    try {
        await conn.beginTransaction();

        const dados_sem_categorias = { ...dados };
        delete dados_sem_categorias.categorias;
        // Passe a conexão para o repositório
        const servico_inserido = await repositories.demand.insertServico(dados_sem_categorias, conn);

        const idservico = servico_inserido.idservico;

        for (const idcategoria of categorias) {
            await repositories.demand.insertServicoCategoria({ idservico, idcategoria }, conn);
        }

        await conn.commit();
        return servico_inserido;
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

async function getServicos(filtros) {
    try {
        const {zona, bairro, valorMin, valorMax, categoria} = filtros;

        let sql = `
            SELECT
                s.idservico,
                s.valor,
                s.descricao,
                s.titulo,
                s.dataInicio,
                s.dataFim,
                s.idbairro,
                s.usuarioId,
                s.contato_visivel,
                s.id_usuario_atribuido,
                s.visivel_feed,
                b.bairro AS bairro_nome,
                z.zona AS zona_nome
            FROM
                servico AS s
            JOIN
                bairro AS b ON s.idbairro = b.idbairro
            JOIN
                zona AS z ON b.idzona = z.idzona
            WHERE 1=1`;
        const params = [];

        if (zona) {
            sql += ' AND z.idzona = ?';
            params.push(zona);
        }
        if (bairro) {
            sql += ' AND b.idbairro = ?';
            params.push(bairro);
        }
        if (valorMin) {
            sql += ' AND s.valor >= ?';
            params.push(parseFloat(valorMin)); // Converte para número
        }
        if (valorMax) {
            sql += ' AND s.valor <= ?';
            params.push(parseFloat(valorMax)); // Converte para número
        }

        if (categoria) {
            // Para filtrar por categoria, precisamos de um JOIN com servico_categoria
            // e possivelmente agrupar os resultados para evitar duplicações
            // ou usar uma subconsulta.
            // A forma mais simples para um SELECT DISTINCT de serviços:
            sql += `
                AND s.idservico IN (
                    SELECT sc.idservico
                    FROM servico_categoria AS sc
                    WHERE sc.idcategoria = ?
                )
            `;
            params.push(categoria);
        }

        const servicos = await repositories.demand.getServicos(sql, params);


            // Para cada serviço, buscar suas categorias (se houver necessidade de múltiplas categorias por serviço)
            // Isso é feito em loop, pode ser otimizado com um único JOIN e GROUP_CONCAT se a API for complexa
        const bicosComCategorias = await Promise.all(servicos.map(async (bico) => {
            const categoriasResult = await repositories.demand.getCategoriesById(bico.idservico);
            return {
                ...bico,
                categorias: categoriasResult
            };
        }));

        return bicosComCategorias;
    } catch (error) {
        throw new Error(`Erro ao buscar os bicos: ${error.message}`)
    }

    
}

async function getCategories(){
    try {
        const categories = await repositories.demand.getCategories()
        return categories
    } catch (error) {
        res.status(500).send("Erro ao buscar as categorias: " + error.message)
    }
}

async function getZonas(){
    try {
        const zonas = await repositories.demand.getZonas()
        return zonas
    } catch (error) {
        return "Erro ao buscar as zonas: " + error.message
    }
}

async function getBairros(idzona = null){
    try {
        const bairros = await repositories.demand.getBairros(idzona);
        return bairros;
    } catch (error) {
        throw new Error("Erro ao buscar as bairros no serviço: " + error.message);
    }
}




export {insertServico, getServicos, getCategories, getZonas, getBairros};