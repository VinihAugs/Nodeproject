/**
 * Configuração e exemplos de conexão com bancos de dados
 * 
 * Este arquivo demonstra como configurar conexões com diferentes
 * bancos de dados (MongoDB e PostgreSQL).
 * 
 * IMPORTANTE: Este projeto não requer banco de dados rodando,
 * mas mostra como seria a implementação real.
 */

import mongoose from 'mongoose';
import pg from 'pg';
import appConfig from './app.js';

const { Pool } = pg;

/**
 * Exemplo de conexão com MongoDB usando Mongoose
 * 
 * Mongoose é um ODM (Object Document Mapper) para MongoDB.
 * Ele facilita a modelagem de dados e validações.
 * 
 * Para usar:
 * 1. Instale MongoDB localmente ou use MongoDB Atlas (cloud)
 * 2. Configure MONGODB_URI no .env
 * 3. Descomente o código abaixo
 */
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(appConfig.database.mongodb.uri, {
      // Opções recomendadas para produção
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('✅ MongoDB conectado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao conectar MongoDB:', error.message);
    throw error;
  }
};

/**
 * Exemplo de conexão com PostgreSQL usando pg (node-postgres)
 * 
 * pg é o driver oficial do PostgreSQL para Node.js.
 * 
 * Para usar:
 * 1. Instale PostgreSQL localmente
 * 2. Configure as variáveis POSTGRES_* no .env
 * 3. Descomente o código abaixo
 */
export const connectPostgreSQL = async () => {
  try {
    const pool = new Pool({
      host: appConfig.database.postgres.host,
      port: appConfig.database.postgres.port,
      database: appConfig.database.postgres.database,
      user: appConfig.database.postgres.user,
      password: appConfig.database.postgres.password,
    });

    // Testa a conexão
    const client = await pool.connect();
    console.log('✅ PostgreSQL conectado com sucesso');
    client.release();

    return pool;
  } catch (error) {
    console.error('❌ Erro ao conectar PostgreSQL:', error.message);
    throw error;
  }
};

/**
 * Função para desconectar bancos de dados
 * Útil ao encerrar a aplicação
 */
export const disconnectDatabases = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log('MongoDB desconectado');
  }
};

