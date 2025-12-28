/**
 * Model de Task - Exemplo com PostgreSQL
 * 
 * Este é um exemplo de como seria a estrutura usando PostgreSQL.
 * 
 * Em PostgreSQL, usamos tabelas SQL ao invés de coleções.
 * Este arquivo mostra como criar a tabela e fazer queries.
 * 
 * Para usar:
 * 1. Configure PostgreSQL no .env
 * 2. Crie a tabela executando o SQL abaixo
 * 3. Use o pool de conexão do PostgreSQL
 */

/**
 * SQL para criar a tabela tasks:
 * 
 * CREATE TABLE tasks (
 *   id SERIAL PRIMARY KEY,
 *   title VARCHAR(100) NOT NULL,
 *   description TEXT,
 *   status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
 *   priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
 *   user_id INTEGER NOT NULL,
 *   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 *   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * );
 */

/**
 * Exemplo de uso com pg (node-postgres):
 * 
 * import { pool } from '../config/database.js';
 * 
 * export const createTask = async (taskData) => {
 *   const query = `
 *     INSERT INTO tasks (title, description, status, priority, user_id)
 *     VALUES ($1, $2, $3, $4, $5)
 *     RETURNING *
 *   `;
 *   const values = [taskData.title, taskData.description, taskData.status, taskData.priority, taskData.userId];
 *   const result = await pool.query(query, values);
 *   return result.rows[0];
 * };
 * 
 * export const getAllTasks = async (filters = {}) => {
 *   let query = 'SELECT * FROM tasks WHERE 1=1';
 *   const values = [];
 *   let paramCount = 1;
 * 
 *   if (filters.status) {
 *     query += ` AND status = $${paramCount}`;
 *     values.push(filters.status);
 *     paramCount++;
 *   }
 * 
 *   if (filters.userId) {
 *     query += ` AND user_id = $${paramCount}`;
 *     values.push(filters.userId);
 *     paramCount++;
 *   }
 * 
 *   const result = await pool.query(query, values);
 *   return result.rows;
 * };
 */

// Este arquivo serve apenas como documentação/exemplo
// A implementação real usaria o pool do PostgreSQL

export default {};

