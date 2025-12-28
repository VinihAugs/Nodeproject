/**
 * Servidor - Ponto de entrada da aplicação
 * 
 * Esse é o arquivo que você roda quando quer iniciar o servidor.
 * Ele importa a aplicação Express e sobe o servidor HTTP.
 */

import app from './app.js';
import appConfig from './config/app.js';

// Inicia o servidor na porta configurada
const server = app.listen(appConfig.port, () => {
  console.log(`
🚀 Servidor rodando!
📍 URL: http://localhost:${appConfig.port}
🌍 Ambiente: ${appConfig.env}
📚 Documentação: http://localhost:${appConfig.port}/
  `);
});

/**
 * Graceful Shutdown - Encerra o servidor de forma educada
 * 
 * Quando você aperta Ctrl+C ou o servidor recebe um sinal para parar,
 * ele não desliga na hora. Ele espera as requisições que estão em
 * andamento terminarem primeiro. Isso evita perder dados ou quebrar
 * requisições no meio do caminho.
 */
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} recebido. Encerrando servidor...`);

  // Fecha o servidor, mas espera as requisições terminarem
  server.close(() => {
    console.log('Servidor encerrado com sucesso.');
    process.exit(0);
  });

  // Se demorar mais de 10 segundos, força o encerramento
  setTimeout(() => {
    console.error('Forçando encerramento...');
    process.exit(1);
  }, 10000);
};

// Escuta quando recebe sinal para parar (Ctrl+C, Docker stop, etc)
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Pega erros que não foram tratados em lugar nenhum
process.on('unhandledRejection', (error) => {
  console.error('Erro não tratado:', error);
  gracefulShutdown('unhandledRejection');
});

