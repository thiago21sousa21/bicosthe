import { Router } from "express";
import { controllers } from "../controllers/index.js";
import {schemaCadastroUsuario, schemaLogin} from "../schemas/index.js"
import {schemaValidation} from "../middlewares/schema.validation.js"

const route = Router();
route.post('/signup', schemaValidation(schemaCadastroUsuario), controllers.user.register);
route.post('/signin',schemaValidation(schemaLogin), controllers.user.login);

export const users = {route};