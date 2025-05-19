import { Router } from "express";
import {users} from "./users.routes.js";
import  {demands} from './demand.routes.js'

const route = Router();
route.use(users.route);
route.use(demands.route);

export const index = {route}

