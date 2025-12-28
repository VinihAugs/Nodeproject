/**
 * Testes de Integração - Rotas de Tasks
 * 
 * Testes de integração verificam se as rotas funcionam corretamente
 * end-to-end (do HTTP até a resposta).
 * 
 * Ferramentas:
 * - Jest: framework de testes
 * - Supertest: facilita testes HTTP
 * 
 * Para rodar: npm test
 */

import request from 'supertest';
import app from '../../app.js';

describe('Tasks API', () => {
  let authToken;

  // Antes de todos os testes, faz login para obter token
  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'admin123',
      });

    authToken = loginResponse.body.data.token;
  });

  describe('GET /api/tasks', () => {
    test('deve retornar lista de tarefas vazia inicialmente', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
      expect(response.body.pagination).toBeDefined();
    });

    test('deve filtrar tarefas por status', async () => {
      const response = await request(app)
        .get('/api/tasks?status=pending')
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe('POST /api/tasks', () => {
    test('deve criar uma nova tarefa com autenticação', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Tarefa de teste',
          description: 'Descrição da tarefa',
          status: 'pending',
          priority: 'high',
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Tarefa de teste');
      expect(response.body.data.id).toBeDefined();
    });

    test('deve retornar erro 401 sem autenticação', async () => {
      await request(app)
        .post('/api/tasks')
        .send({
          title: 'Tarefa sem auth',
        })
        .expect(401);
    });

    test('deve retornar erro 400 com dados inválidos', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'AB', // Muito curto (mínimo 3 caracteres)
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.details).toBeDefined();
    });
  });

  describe('GET /api/tasks/:id', () => {
    test('deve retornar 404 para tarefa inexistente', async () => {
      const response = await request(app)
        .get('/api/tasks/99999')
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });
});

