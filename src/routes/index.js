/**
 * Centralizador de Rotas
 * 
 * Esse arquivo junta todas as rotas da aplicação em um lugar só.
 * Fica mais fácil de organizar e manter.
 */

import express from 'express';
import taskRoutes from './tasks.routes.js';
import authRoutes from './auth.routes.js';

const router = express.Router();

/**
 * Health Check - Verifica se a API está funcionando
 * 
 * Útil para saber se o servidor está respondendo.
 * Alguns serviços de monitoramento usam isso.
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Registra as rotas de cada recurso
router.use('/tasks', taskRoutes);
router.use('/auth', authRoutes);

export default router;

