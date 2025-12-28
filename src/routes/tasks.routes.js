/**
 * Rotas de Tarefas
 * 
 * Aqui definimos todas as rotas relacionadas a tarefas.
 * Seguimos o padrão REST:
 * - GET    /tasks      -> Lista todas (pode filtrar)
 * - GET    /tasks/:id  -> Busca uma específica
 * - POST   /tasks      -> Cria uma nova
 * - PUT    /tasks/:id  -> Atualiza uma existente
 * - DELETE /tasks/:id  -> Deleta uma
 */

import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { authenticate } from '../middleware/index.js';
import { validate, taskSchemas } from '../middleware/validation.js';

const router = express.Router();

/**
 * Rotas públicas - qualquer um pode acessar
 */
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);

/**
 * Rotas protegidas - precisa estar logado
 * 
 * O authenticate verifica se o usuário tem um token válido
 * O validate verifica se os dados enviados estão corretos
 */
router.post(
  '/',
  authenticate, // Precisa estar logado
  validate(taskSchemas.create), // Valida os dados
  taskController.createTask
);

router.put(
  '/:id',
  authenticate,
  validate(taskSchemas.update),
  taskController.updateTask
);

router.delete(
  '/:id',
  authenticate,
  taskController.deleteTask
);

export default router;

