/**
 * Rotas de Autenticação
 */

import express from 'express';
import * as authController from '../controllers/authController.js';
import { validate, authSchemas } from '../middleware/validation.js';

const router = express.Router();

// POST /auth/login
router.post(
  '/login',
  validate(authSchemas.login),
  authController.login
);

export default router;

