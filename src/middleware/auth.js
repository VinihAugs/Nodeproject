/**
 * Autenticação JWT
 * 
 * Esse middleware protege rotas que precisam de autenticação.
 * Ele verifica se o usuário enviou um token válido no header da requisição.
 * 
 * Como funciona na prática:
 * 1. Usuário faz login e recebe um token
 * 2. Nas próximas requisições, envia o token no header: Authorization: Bearer <token>
 * 3. Esse middleware verifica se o token é válido
 * 4. Se for válido, coloca os dados do usuário em req.user
 * 5. Se não for, retorna erro 401
 */

import jwt from 'jsonwebtoken';
import appConfig from '../config/app.js';

const authenticate = (req, res, next) => {
  try {
    // Pega o header de autorização
    const authHeader = req.headers.authorization;

    // Se não tiver header, já retorna erro
    if (!authHeader) {
      return res.status(401).json({
        error: 'Token não fornecido',
        message: 'Adicione o header: Authorization: Bearer <seu_token>',
      });
    }

    // O formato esperado é "Bearer <token>", então separa as duas partes
    const parts = authHeader.split(' ');

    // Verifica se está no formato correto
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        error: 'Formato de token inválido',
        message: 'Use o formato: Authorization: Bearer <token>',
      });
    }

    const token = parts[1];

    // Verifica se o token é válido e decodifica
    // Se o token estiver inválido ou expirado, vai lançar um erro
    const decoded = jwt.verify(token, appConfig.jwtSecret);

    // Coloca os dados do usuário na requisição
    // Agora qualquer rota pode acessar req.user
    req.user = decoded;

    // Tudo certo, pode seguir
    next();
  } catch (error) {
    // Deu algum problema com o token (inválido, expirado, etc)
    return res.status(401).json({
      error: 'Token inválido',
      message: error.message,
    });
  }
};

export default authenticate;

