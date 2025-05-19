import { Router } from "express";
import { controllers } from "../controllers/index.js";

const route = Router();
route.post('/signup',/* schemaValidation(signupSchema),*/ controllers.user.register);
route.post('/signin',/* s schemaValidation(signinSchema),*/  controllers.user.login);

export const users = {route};