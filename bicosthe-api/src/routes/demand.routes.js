import { Router } from "express";
import { tokenValidation } from "../middlewares/token.validation.js";
import {controllers} from "../controllers/index.js";
import {schemaCadastroServico} from "../schemas/index.js"
import {schemaValidation} from "../middlewares/schema.validation.js"
import db from '../database/database.connection.js';

const route = Router();

route.post('/novo-bico', schemaValidation(schemaCadastroServico), tokenValidation, controllers.demand.insertServico);
route.get('/bicos', controllers.demand.getServicos);
route.get('/categories', controllers.demand.getCategories)
route.get('/zonas', controllers.demand.getZonas)
route.get('/bairros', controllers.demand.getBairros);
route.get('/bicos2', async (req, res) => {
    // 1. Acessar os parâmetros da query string
    const { zona, bairro, categoria, valorMin, valorMax } = req.query;

    // Constrói a consulta SQL dinamicamente
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
        WHERE 1=1 -- Cláusula TRUE para facilitar a adição de WHERE dinâmico
    `;

    const params = [];

    // Adiciona condições WHERE com base nos filtros
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

    // Lógica para filtro de categoria (requer um JOIN adicional e talvez GROUP BY/HAVING ou subconsulta)
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
    
    //console.log('SQL Executado:', sql); // Para depuração
    //console.log('Parâmetros:', params); // Para depuração

    try {
        const [rows] = await db.query(sql, params);

        // Para cada serviço, buscar suas categorias (se houver necessidade de múltiplas categorias por serviço)
        // Isso é feito em loop, pode ser otimizado com um único JOIN e GROUP_CONCAT se a API for complexa
        const bicosComCategorias = await Promise.all(rows.map(async (bico) => {
            const [categoriasResult] = await db.query(`
                SELECT c.idcategoria, c.nome
                FROM categoria AS c
                JOIN servico_categoria AS sc ON c.idcategoria = sc.idcategoria
                WHERE sc.idservico = ?
            `, [bico.idservico]);
            return {
                ...bico,
                categorias: categoriasResult
            };
        }));

        res.json(bicosComCategorias);
    } catch (err) {
        console.error('Erro ao buscar bicos:', err);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar bicos.' });
    }
});


export const demands = { route };
