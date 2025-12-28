/**
 * Validação de Dados com Joi
 * 
 * Joi é uma biblioteca muito útil para validar dados.
 * 
 * Por que validar?
 * - Garante que os dados estão no formato certo
 * - Evita bugs e erros
 * - Ajuda na segurança (previne alguns tipos de ataques)
 * - Dá mensagens de erro claras para quem está usando a API
 * 
 * Esse middleware valida os dados antes de chegar no controller.
 */

import Joi from 'joi';

/**
 * Middleware de validação genérico
 * 
 * Você passa um schema do Joi e ele valida o body da requisição.
 */
export const validate = (schema) => {
  return (req, res, next) => {
    // Valida o body da requisição usando o schema
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Mostra todos os erros de uma vez, não só o primeiro
      stripUnknown: true, // Remove campos que não estão no schema
    });

    // Se tiver erro, retorna os erros formatados
    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        details: errors,
      });
    }

    // Se passou na validação, substitui o body pelos dados validados
    req.body = value;
    next();
  };
};

/**
 * Schemas de validação para Tasks
 */
export const taskSchemas = {
  create: Joi.object({
    title: Joi.string().min(3).max(100).required()
      .messages({
        'string.min': 'Título deve ter no mínimo 3 caracteres',
        'string.max': 'Título deve ter no máximo 100 caracteres',
        'any.required': 'Título é obrigatório',
      }),
    description: Joi.string().max(500).allow('').optional(),
    status: Joi.string().valid('pending', 'in_progress', 'completed').optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
  }),

  update: Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().max(500).allow('').optional(),
    status: Joi.string().valid('pending', 'in_progress', 'completed').optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
  }),
};

/**
 * Schemas de validação para Auth
 */
export const authSchemas = {
  login: Joi.object({
    email: Joi.string().email().required()
      .messages({
        'string.email': 'Email deve ser um endereço válido',
        'any.required': 'Email é obrigatório',
      }),
    password: Joi.string().min(6).required()
      .messages({
        'string.min': 'Senha deve ter no mínimo 6 caracteres',
        'any.required': 'Senha é obrigatória',
      }),
  }),
};

