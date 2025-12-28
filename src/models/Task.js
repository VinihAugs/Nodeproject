/**
 * Model de Task - Exemplo com MongoDB (Mongoose)
 * 
 * Models definem a estrutura e validações dos dados.
 * 
 * Este é um exemplo usando Mongoose (MongoDB).
 * Para PostgreSQL, veja o exemplo em models/TaskPostgres.js
 * 
 * Mongoose Schema:
 * - Define a estrutura do documento
 * - Adiciona validações automáticas
 * - Fornece métodos úteis (save, find, etc.)
 */

import mongoose from 'mongoose';

// Define o Schema (estrutura) da Task
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Título é obrigatório'],
      trim: true,
      minlength: [3, 'Título deve ter no mínimo 3 caracteres'],
      maxlength: [100, 'Título deve ter no máximo 100 caracteres'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Descrição deve ter no máximo 500 caracteres'],
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    // Opções do schema
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
    versionKey: false, // Remove o campo __v
  }
);

// Cria o Model (classe que representa a coleção)
const Task = mongoose.model('Task', taskSchema);

export default Task;

