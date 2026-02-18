const Joi = require("joi");

const getCommentsByArticleIdSchema = Joi.object({
  articleId: Joi.number().integer().positive().required().messages({
    "number.base": "L'ID de l'article doit être un nombre",
    "number.integer": "L'ID de l'article doit être un entier",
    "number.positive": "L'ID de l'article doit être positif",
    "any.required": "L'ID de l'article est requis",
  }),
});

module.exports = {
  getCommentsByArticleIdSchema,
};
