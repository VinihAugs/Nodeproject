# Dockerfile - Exemplo de containerização
#
# Docker permite empacotar a aplicação e suas dependências
# em um container isolado, garantindo que funcione igual em
# qualquer ambiente (dev, staging, produção).
#
# Para usar:
# 1. docker build -t project-node .
# 2. docker run -p 3000:3000 project-node
#
# Ou use docker-compose.yml para subir app + banco juntos

# Imagem base Node.js (versão LTS)
FROM node:18-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências primeiro (cache do Docker)
COPY package*.json ./

# Instala dependências
RUN npm ci --only=production

# Copia o resto do código
COPY . .

# Expõe a porta da aplicação
EXPOSE 3000

# Variáveis de ambiente (pode sobrescrever com docker run -e)
ENV NODE_ENV=production
ENV PORT=3000

# Comando para iniciar a aplicação
CMD ["node", "src/server.js"]

