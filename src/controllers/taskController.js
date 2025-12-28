/**
 * Controllers - Lida com as requisições HTTP
 * 
 * Os controllers são responsáveis por:
 * - Receber as requisições que chegam
 * - Pegar os dados que vieram (query params, body, etc)
 * - Chamar os services que fazem o trabalho pesado
 * - Retornar a resposta para o cliente
 * 
 * Dica: Mantenha os controllers simples! A lógica de negócio
 * fica nos services, não aqui.
 */

import * as taskService from '../services/taskService.js';

/**
 * GET /tasks - Lista todas as tarefas
 * 
 * Aceita filtros na URL: ?status=pending&priority=high&page=1&limit=10
 */
export const getAllTasks = async (req, res, next) => {
  try {
    // Pega os filtros que vieram na URL
    const filters = {
      status: req.query.status,
      priority: req.query.priority,
      userId: req.query.userId || req.user?.id, // Se o usuário estiver logado, filtra por ele
    };

    // Pega os parâmetros de paginação
    const pagination = {
      page: req.query.page,
      limit: req.query.limit,
    };

    // Chama o service que faz a busca de verdade
    const result = await taskService.getAllTasks(filters, pagination);

    // Retorna a lista de tarefas
    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    // Se der erro, passa para o middleware de erro tratar
    next(error);
  }
};

/**
 * GET /tasks/:id - Busca uma tarefa pelo ID
 */
export const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await taskService.getTaskById(id);

    // Se não encontrou, retorna 404
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Tarefa não encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /tasks - Cria uma nova tarefa
 */
export const createTask = async (req, res, next) => {
  try {
    // Pega os dados que vieram no body da requisição
    const taskData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      userId: req.user?.id || req.body.userId, // Se tiver usuário logado, usa o ID dele
    };

    const newTask = await taskService.createTask(taskData);

    // 201 = Created (algo foi criado com sucesso)
    res.status(201).json({
      success: true,
      data: newTask,
      message: 'Tarefa criada com sucesso',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /tasks/:id - Atualiza uma tarefa
 */
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body; // Os campos que quer atualizar

    const updatedTask = await taskService.updateTask(id, updates);

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        error: 'Tarefa não encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: updatedTask,
      message: 'Tarefa atualizada com sucesso',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /tasks/:id - Deleta uma tarefa
 */
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await taskService.deleteTask(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Tarefa não encontrada',
      });
    }

    // 204 = No Content (sucesso, mas sem conteúdo para retornar)
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

