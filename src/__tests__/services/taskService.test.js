/**
 * Testes Unitários - Task Service
 * 
 * Testes unitários testam funções isoladas, sem dependências externas
 * (HTTP, banco de dados, etc.).
 * 
 * Focam na lógica de negócio pura.
 */

import * as taskService from '../../services/taskService.js';

describe('Task Service', () => {
  beforeEach(() => {
    // Limpa dados antes de cada teste
    // Em produção, você resetaria o banco de dados
  });

  describe('createTask', () => {
    test('deve criar uma tarefa com dados válidos', async () => {
      const taskData = {
        title: 'Nova tarefa',
        description: 'Descrição',
        userId: 1,
      };

      const task = await taskService.createTask(taskData);

      expect(task).toBeDefined();
      expect(task.title).toBe('Nova tarefa');
      expect(task.id).toBeDefined();
      expect(task.status).toBe('pending'); // Valor padrão
    });
  });

  describe('getAllTasks', () => {
    test('deve retornar lista vazia inicialmente', async () => {
      const result = await taskService.getAllTasks();

      expect(result.data).toEqual([]);
      expect(result.pagination).toBeDefined();
    });

    test('deve filtrar por status', async () => {
      // Cria tarefas de teste
      await taskService.createTask({ title: 'Tarefa 1', status: 'pending', userId: 1 });
      await taskService.createTask({ title: 'Tarefa 2', status: 'completed', userId: 1 });

      const result = await taskService.getAllTasks({ status: 'pending' });

      expect(result.data.length).toBeGreaterThan(0);
      result.data.forEach((task) => {
        expect(task.status).toBe('pending');
      });
    });
  });
});

