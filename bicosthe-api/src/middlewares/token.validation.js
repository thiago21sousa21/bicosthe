import { repositories } from "../repositories/index.js";

export async function tokenValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).send('Usuário não logado1!');

    try {
        const session = await repositories.user.findSessionByToken(token);       
        if (!session) return res.status(401).send('Usuário não logado!');
        if (session.length === 0) return res.status(401).send('Usuário não permitido!');

        const { idusuario, idsessao, token: sessionToken } = session;
        res.locals.user = { idsessao, idusuario, token: sessionToken };
        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}

