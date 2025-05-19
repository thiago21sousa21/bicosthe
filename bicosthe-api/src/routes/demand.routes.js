import { Router } from "express";
import { tokenValidation } from "../middlewares/token.validation.js";
import {controllers} from "../controllers/index.js";

const route = Router();

route.post('/novo-bico', /*schemaValidation(),*/tokenValidation, controllers.demand.insertServico);
route.get('/bicos', controllers.demand.getServicos);
export const demands = { route };
