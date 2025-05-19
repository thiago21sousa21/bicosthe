import Joi from "joi";

export const schemaCadastroUsuario = Joi.object({
  cpf: Joi.string()
    .pattern(/^\d{11}$/)
    .required()
    .messages({
      'string.pattern.base': 'CPF deve conter 11 dígitos numéricos',
    }),
    
  nome: Joi.string()
    .min(3)
    .max(100)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  senha: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Senha deve ter no mínimo 6 caracteres',
    }),

  celular: Joi.string()
    .pattern(/^\d{10,13}$/)
    .required()
    .messages({
      'string.pattern.base': 'Celular deve conter de 10 a 13 dígitos numéricos',
    }),
});


export const schemaLogin = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  senha: Joi.string()
    .required()
});
