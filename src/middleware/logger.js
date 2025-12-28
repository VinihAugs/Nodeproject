/**
 * Logger - Registra todas as requisições
 * 
 * Esse middleware fica de olho em todas as requisições que chegam
 * e registra informações úteis no console.
 * 
 * O que ele registra:
 * - Qual método foi usado (GET, POST, etc)
 * - Qual URL foi acessada
 * - Quanto tempo levou para responder
 * - Qual status code foi retornado
 */

const logger = (req, res, next) => {
  // Marca o início da requisição
  const startTime = Date.now();

  // Guarda a função original do res.end para chamar depois
  const originalEnd = res.end;

  // Sobrescreve o res.end para calcular o tempo antes de finalizar
  res.end = function (...args) {
    // Calcula quanto tempo passou desde o início
    const duration = Date.now() - startTime;

    // Mostra no console: data, método, URL, status e tempo
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`
    );

    // Chama a função original para não quebrar nada
    originalEnd.apply(this, args);
  };

  // Segue para o próximo middleware
  next();
};

export default logger;

