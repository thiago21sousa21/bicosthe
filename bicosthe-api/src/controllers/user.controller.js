import { services} from '../services/index.js';
async function register(req, res) {
  const { cpf, email, nome, senha, celular } = req.body;
  try {
    await services.user.register({ cpf, nome, email, senha, celular });
    res.status(201).send("Usuário cadastrado com sucesso.");
  } catch (error) {
    if (error.message === "CPF já cadastrado" || error.message === "Email já cadastrado") {
      return res.status(409).send(error.message);
    }
    res.status(500).send("Erro ao cadastrar usuário: " + error.message);
  }
}

async function login(req, res) {
    const { email, senha } = req.body;
    try {
        const user = await services.user.login({ email, senha });
        if (!user) {
            return res.status(401).send("Credenciais inválidas.");
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send("Erro ao realizar login: " + error.message);
    }
}


export { register, login };