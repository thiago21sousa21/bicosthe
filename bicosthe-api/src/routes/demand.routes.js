import { Router } from "express";
import { tokenValidation } from "../middlewares/token.validation.js";
import {controllers} from "../controllers/index.js";
import {schemaCadastroServico} from "../schemas/index.js"
import {schemaValidation} from "../middlewares/schema.validation.js"


const route = Router();

route.post('/novo-bico', schemaValidation(schemaCadastroServico), tokenValidation, controllers.demand.insertServico);
route.get('/bicos', controllers.demand.getServicos);
route.get('/categories', controllers.demand.getCategories)
route.get('/zonas', controllers.demand.getZonas)
route.get('/bairros', controllers.demand.getBairros);



export const demands = { route };
