import db from "../database/database.connection.js";
const register = async (userData) => {
  const { cpf, nome, email, senha, celular } = userData;
  try {
     return await db.execute(`
        INSERT INTO usuario (cpf, nome, email, senha, celular)
        VALUES (?, ?, ?, ?, ?)
      `, [cpf, nome, email, senha, celular]);
  } catch (error) {
    throw new Error("Error registering user: " + error.message);
  }
}

const findUserByEmail = async (email) => {
  try {
    const [rows] = await db.execute(`
      SELECT * FROM usuario WHERE email = ?
    `, [email]);
    return rows[0];
  } catch (error) {
    throw new Error("Error finding user by email: " + error.message);
  }
}

const findUserByCpf = async (cpf) => {
  try {
    const [rows] = await db.execute(`
      SELECT * FROM usuario WHERE cpf = ?
    `, [cpf]);
    return rows[0];
  } catch (error) {
    throw new Error("Error finding user by CPF: " + error.message);
  }
}

const findUserById = async (id) => {
  try {
    const [rows] = await db.execute(`
      SELECT * FROM usuario WHERE idusuario = ?
    `, [id]);
    return rows[0];
  } catch (error) {
    throw new Error("Error finding user by ID: " + error.message);
  }
}

// inserir na tabela sessao
const insertSession = async (userId, token) => {
  try {
    const [result] = await db.execute(`
      INSERT INTO sessao (idusuario, token)
      VALUES (?, ?)
    `, [userId, token]);
    return result.insertId;
  } catch (error) {
    throw new Error("Error inserting session: " + error.message);
  }
}

//encontrar usuario pelo token
const findSessionByToken = async (token) => {
  try {
    const [rows] = await db.execute(`
      SELECT * FROM sessao WHERE token = ?
  `, [token]);
    return rows[0];
  } catch (error) {
    throw new Error("Error checking if user is logged in: " + error.message);
  }
}

export { register, findUserByEmail, findUserByCpf, findUserById, insertSession, findSessionByToken };