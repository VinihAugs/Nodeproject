/**
 * Configuração do Express
 * 
 * Aqui é onde montamos toda a aplicação: middlewares, rotas, etc.
 * É tipo a "receita" do nosso servidor.
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import { logger, errorHandler } from './middleware/index.js';

// Precisa disso para usar __dirname com ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cria a aplicação Express
const app = express();

/**
 * Middlewares Globais
 * 
 * Cuidado com a ordem! Os middlewares rodam na ordem que você registra.
 * Se você colocar o logger depois das rotas, ele não vai logar nada.
 */

// CORS - permite que outros sites façam requisições para nossa API
// Em produção, você pode querer restringir quais sites podem fazer isso
app.use(cors());

// JSON Parser - converte o body da requisição de JSON para objeto JavaScript
// Sem isso, req.body vai ser undefined
app.use(express.json());

// Logger - registra todas as requisições no console
app.use(logger);

// Serve os arquivos estáticos (HTML, CSS, JS do frontend)
app.use(express.static(path.join(__dirname, '../public')));

/**
 * Rotas da API
 * 
 * Todas as rotas da API começam com /api
 * Por exemplo: GET /api/tasks
 */
app.use('/api', routes);

/**
 * Rota raiz - serve o frontend
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

/**
 * Tratamento de Erros
 * 
 * ATENÇÃO: Esse deve ser o ÚLTIMO middleware!
 * Se você colocar antes das rotas, ele não vai pegar os erros delas.
 */
app.use(errorHandler);

export default app;
