import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import {repositories} from '../repositories/index.js';

async function login(cred) {
  const { email, senha } = cred;
    const user = await repositories.user.findUserByEmail(email);
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    // colocar la tabela sessions seu idusuario e o token
    const token = uuid();
    const idsession = await repositories.user.insertSession(user.idusuario, token);
    if (!idsession) {
        throw new Error("Error inserting session");
    }
    return {token , idsession, idusuario: user.idusuario};
  
}

async function register(cred) {
  const { cpf, email, senha, nome, celular } = cred;
  const existingUserByCpf = await repositories.user.findUserByCpf(cpf);
  if (existingUserByCpf) {
    throw new Error("CPF already registered");
  }

  const existingUserByEmail = await repositories.user.findUserByEmail(email);
  if (existingUserByEmail) {
    throw new Error("Email already registered");
  }

  const hashPassword = await bcrypt.hash(senha, 10);
  const dataWithHashPassword = { cpf, email, nome, celular, senha: hashPassword };

  return await repositories.user.register(dataWithHashPassword);
}

export {login, register};
