/**
 * Tratamento de Erros - Captura todos os erros
 * 
 * Esse middleware é especial: ele pega TODOS os erros que acontecem
 * em qualquer lugar da aplicação e trata de forma centralizada.
 * 
 * Por que fazer isso?
 * - Evita ter try/catch repetido em todo lugar
 * - Garante que todas as respostas de erro tenham o mesmo formato
 * - Facilita ver o que deu errado (logs)
 * - Fica mais fácil de manter
 * 
 * Como funciona:
 * Quando uma rota dá erro, ela chama next(err). Esse middleware
 * pega esse erro e retorna uma resposta bonitinha para o cliente.
 */

/**
 * ATENÇÃO: Esse middleware deve ser o ÚLTIMO a ser registrado no app!
 * Se não for, ele não vai pegar os erros das rotas.
 */
const errorHandler = (err, req, res, next) => {
  // Mostra o erro no console para você debugar
  // Em produção, você pode querer usar um serviço de logging tipo Sentry
  console.error('❌ Erro capturado:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  // Pega o status code do erro, ou usa 500 como padrão
  const statusCode = err.statusCode || 500;

  // Pega a mensagem do erro, ou usa uma genérica
  // Em produção, não mostre detalhes técnicos para o cliente
  const message = err.message || 'Erro interno do servidor';

  // Retorna a resposta de erro no formato padrão
  res.status(statusCode).json({
    error: true,
    message,
    // Só mostra o stack trace em desenvolvimento (para debugar)
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;

