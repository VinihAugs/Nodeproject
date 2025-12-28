/**
 * Handler para Vercel Serverless Functions
 * 
 * A Vercel usa funções serverless, então não podemos iniciar um servidor HTTP tradicional.
 * Em vez disso, exportamos o app Express como um handler.
 */

import app from '../src/app.js';

// Exporta o app Express para a Vercel
// A Vercel automaticamente converte o app Express em um handler serverless
export default app;

