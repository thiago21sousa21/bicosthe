import Joi from 'joi';

const mysqlDateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

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

  dataInicio: Joi.string()
    .pattern(mysqlDateTimeRegex)
    .required()
    .messages({
      "string.pattern.base": "dataInicio deve estar no formato YYYY-MM-DD HH:MM:SS",
    }),


  dataFim: Joi.string()
    .pattern(mysqlDateTimeRegex)
    .required()
    .custom((value, helpers) => {
      const inicio = helpers.state.ancestors[0]?.dataInicio;
      if (inicio && value < inicio) {
        return helpers.message("dataFim deve ser depois de dataInicio");
      }
      return value;
    })
    .messages({
      "string.pattern.base": "dataFim deve estar no formato YYYY-MM-DD HH:MM:SS",
    }),

  idbairro: Joi.number()
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
