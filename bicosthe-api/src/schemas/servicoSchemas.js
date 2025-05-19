import Joi from 'joi';

export const schemaCadastroServico = Joi.object({
  valor: Joi.number()
    .precision(2)
    .min(0)
    .required(),

  titulo: Joi.string()
    .max(100)
    .required(),

  descricao: Joi.string()
    .max(1000)
    .required(),

  dataInicio: Joi.date()
    .iso()
    .required(),

  dataFim: Joi.date()
    .iso()
    .greater(Joi.ref('dataInicio'))
    .required()
    .messages({
      'date.greater': 'Data de fim deve ser depois da data de início',
    }),

  idregiao: Joi.number()
    .integer()
    .required(),

  usuarioId: Joi.number()
    .integer()
    .required(),

  contato_visivel: Joi.boolean().default(false),

  categorias: Joi.array()
    .items(Joi.number().integer())
    .min(1)
    .required()
    .messages({
      'array.min': 'Pelo menos uma categoria deve ser selecionada',
    })
});
