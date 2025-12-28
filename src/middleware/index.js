/**
 * Arquivo centralizador de middlewares
 * 
 * Facilita a importação de todos os middlewares
 * em um único lugar.
 */

export { default as logger } from './logger.js';
export { default as authenticate } from './auth.js';
export { default as errorHandler } from './errorHandler.js';

