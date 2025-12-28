/**
 * Service de Autenticação
 * 
 * Aqui fica a lógica de login e geração de tokens JWT.
 * 
 * JWT é um token que contém informações do usuário assinadas
 * digitalmente. O legal é que não precisa guardar no servidor,
 * o próprio token já tem tudo que precisa.
 */

import jwt from 'jsonwebtoken';
import appConfig from '../config/app.js';

/**
 * Lista de usuários (simulação)
 * Em produção, isso viria de um banco de dados
 */
const users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123', // Em produção, NUNCA guarde senha assim! Use hash (bcrypt)
    name: 'Administrador',
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'user123',
    name: 'Usuário Teste',
  },
];

/**
 * Faz login e retorna um token JWT
 */
export const login = async (email, password) => {
  // Procura o usuário pelo email
  const user = users.find((u) => u.email === email);

  // Se não encontrou, retorna null
  if (!user) {
    return null;
  }

  // Verifica se a senha está correta
  // Em produção, você compararia com um hash (bcrypt)
  if (user.password !== password) {
    return null;
  }

  // Prepara os dados que vão dentro do token
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  // Gera o token JWT
  // O token expira em 7 dias
  const token = jwt.sign(payload, appConfig.jwtSecret, {
    expiresIn: '7d',
  });

  // Remove a senha antes de retornar (nunca envie senha de volta!)
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
};

/**
 * Valida um token JWT
 */
export const validateToken = async (token) => {
  try {
    const decoded = jwt.verify(token, appConfig.jwtSecret);
    return decoded;
  } catch (error) {
    // Se o token for inválido ou expirado, retorna null
    return null;
  }
};

