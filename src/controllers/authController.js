/**
 * Controller de Autenticação
 * 
 * Cuida das rotas de login.
 */

import * as authService from '../services/authService.js';

/**
 * POST /auth/login - Faz login e retorna um token JWT
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Verifica se veio email e senha
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email e senha são obrigatórios',
      });
    }

    // Tenta fazer o login
    const result = await authService.login(email, password);

    // Se não encontrou o usuário ou a senha está errada
    if (!result) {
      return res.status(401).json({
        success: false,
        error: 'Credenciais inválidas',
      });
    }

    // Tudo certo, retorna o token e dados do usuário
    res.status(200).json({
      success: true,
      data: result,
      message: 'Login realizado com sucesso',
    });
  } catch (error) {
    next(error);
  }
};

