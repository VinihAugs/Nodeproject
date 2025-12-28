/**
 * Configurações da aplicação
 * 
 * Aqui ficam todas as configurações do projeto em um só lugar.
 * Isso evita ter valores espalhados pelo código e facilita a manutenção.
 * 
 * Dica: Use variáveis de ambiente para coisas sensíveis como senhas
 * e tokens, especialmente em produção.
 */

import dotenv from 'dotenv';

// Lê as variáveis do arquivo .env
dotenv.config();

export default {
  // Porta onde o servidor vai rodar (3000 é o padrão)
  port: process.env.PORT || 3000,
  
  // Ambiente: development, production ou test
  env: process.env.NODE_ENV || 'development',
  
  // Chave secreta para assinar os tokens JWT
  // Em produção, use uma chave bem forte!
  jwtSecret: process.env.JWT_SECRET || 'secret_dev_only',
  
  // Configurações dos bancos de dados (exemplos)
  database: {
    mongodb: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/projectnode',
    },
    postgres: {
      host: process.env.POSTGRES_HOST || 'localhost',
      port: process.env.POSTGRES_PORT || 5432,
      database: process.env.POSTGRES_DB || 'projectnode',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || '',
    },
  },
};

