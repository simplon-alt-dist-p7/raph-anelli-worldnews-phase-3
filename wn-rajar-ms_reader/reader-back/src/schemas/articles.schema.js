const Joi = require("joi");

const getArticleByIdSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "L'ID doit être un nombre",
    "number.integer": "L'ID doit être un entier",
    "number.positive": "L'ID doit être positif",
    "any.required": "L'ID est requis",
  }),
});

module.exports = {
  getArticleByIdSchema,
};
