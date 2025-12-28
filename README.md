# 🚀 Node.js Educativo - Projeto Completo

Projeto educativo Node.js com Express que demonstra boas práticas, arquitetura profissional e conceitos fundamentais para desenvolvedores iniciantes e intermediários.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Stack Tecnológica](#stack-tecnológica)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Endpoints da API](#endpoints-da-api)
- [Arquitetura](#arquitetura)
- [Conceitos Explicados](#conceitos-explicados)
- [Testes](#testes)
- [Docker](#docker)
- [Contribuindo](#contribuindo)

## 🎯 Sobre o Projeto

Este projeto foi criado com o objetivo de ensinar Node.js de forma prática e completa. Todo o código está comentado e explicado, servindo como um guia de referência para desenvolvedores que estão aprendendo Node.js e Express.

### Características

- ✅ API REST completa (CRUD)
- ✅ Arquitetura de 3 camadas (Routes → Controllers → Services)
- ✅ Middleware personalizado (log, autenticação, validação, tratamento de erros)
- ✅ Autenticação JWT
- ✅ Validação de dados com Joi
- ✅ Exemplos de integração com MongoDB e PostgreSQL
- ✅ Testes unitários e de integração
- ✅ Frontend educativo explicando os conceitos
- ✅ Documentação completa
- ✅ ESLint configurado
- ✅ Docker e Docker Compose

## 🛠️ Stack Tecnológica

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **JWT** - Autenticação
- **Joi** - Validação de dados
- **Mongoose** - ODM para MongoDB (exemplo)
- **pg** - Driver PostgreSQL (exemplo)

### Ferramentas de Desenvolvimento
- **Nodemon** - Hot reload em desenvolvimento
- **ESLint** - Linter de código
- **Jest** - Framework de testes
- **Supertest** - Testes HTTP

## 📁 Estrutura do Projeto

```
project-node/
├── src/
│   ├── config/              # Configurações centralizadas
│   │   ├── app.js          # Config da aplicação
│   │   └── database.js     # Config de banco (exemplos)
│   ├── controllers/        # Camada HTTP (req, res)
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/         # Middlewares customizados
│   │   ├── auth.js         # Autenticação JWT
│   │   ├── errorHandler.js # Tratamento de erros
│   │   ├── logger.js       # Logging de requisições
│   │   └── validation.js   # Validação com Joi
│   ├── models/             # Modelos de dados
│   │   ├── Task.js         # Model MongoDB (Mongoose)
│   │   └── TaskPostgres.js # Exemplo PostgreSQL
│   ├── routes/             # Definição de rotas
│   │   ├── auth.routes.js
│   │   ├── tasks.routes.js
│   │   └── index.js        # Centralizador de rotas
│   ├── services/           # Lógica de negócio
│   │   ├── authService.js
│   │   └── taskService.js
│   ├── __tests__/          # Testes
│   │   ├── routes/
│   │   └── services/
│   ├── app.js              # Configuração Express
│   └── server.js           # Ponto de entrada
├── public/                 # Frontend educativo
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── .env.example            # Exemplo de variáveis de ambiente
├── .eslintrc.json          # Configuração ESLint
├── .editorconfig           # Padrão de formatação
├── docker-compose.yml      # Orquestração Docker
├── Dockerfile              # Container da aplicação
├── jest.config.js          # Configuração Jest
└── package.json            # Dependências e scripts
```

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Passos

1. **Clone o repositório** (ou baixe os arquivos)

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o .env com suas configurações (opcional para desenvolvimento)
```

4. **Inicie o servidor:**
```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Modo produção
npm start
```

5. **Acesse a aplicação:**
- Frontend educativo: http://localhost:3000
- API: http://localhost:3000/api

## 📖 Como Usar

### Scripts Disponíveis

```bash
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start

# Testes
npm test

# Testes em modo watch
npm run test:watch

# Linter
npm run lint

# Corrigir problemas do linter
npm run lint:fix
```

### Testando a API

#### 1. Health Check
```bash
curl http://localhost:3000/api/health
```

#### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

#### 3. Criar Tarefa (requer token)
```bash
# Substitua <TOKEN> pelo token recebido no login
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "title": "Minha primeira tarefa",
    "description": "Descrição da tarefa",
    "status": "pending",
    "priority": "high"
  }'
```

#### 4. Listar Tarefas
```bash
curl http://localhost:3000/api/tasks
```

## 🔌 Endpoints da API

### Autenticação

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/api/auth/login` | Login e obtenção de token | Não |

### Tarefas

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/api/tasks` | Lista todas as tarefas (com filtros e paginação) | Não |
| GET | `/api/tasks/:id` | Busca tarefa por ID | Não |
| POST | `/api/tasks` | Cria nova tarefa | Sim |
| PUT | `/api/tasks/:id` | Atualiza tarefa | Sim |
| DELETE | `/api/tasks/:id` | Deleta tarefa | Sim |

### Utilitários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/health` | Health check da aplicação |

### Query Parameters (GET /api/tasks)

- `status` - Filtrar por status (`pending`, `in_progress`, `completed`)
- `priority` - Filtrar por prioridade (`low`, `medium`, `high`)
- `page` - Número da página (padrão: 1)
- `limit` - Itens por página (padrão: 10)

### Exemplos de Resposta

#### Sucesso
```json
{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}
```

#### Erro
```json
{
  "success": false,
  "error": "Mensagem de erro",
  "details": [ ... ]
}
```

## 🏗️ Arquitetura

Este projeto segue a **arquitetura de 3 camadas**:

### 1. Routes (Rotas)
- Define os endpoints da API
- Aplica middlewares (auth, validação)
- Encaminha para controllers

### 2. Controllers
- Recebe requisições HTTP (req, res)
- Valida dados de entrada
- Chama services (lógica de negócio)
- Retorna respostas HTTP

### 3. Services
- Contém a lógica de negócio
- Não conhece HTTP
- Pode ser reutilizado em diferentes contextos
- Acessa models/repositories

### Fluxo de uma Requisição

```
Cliente → Express → Middleware (logger) → Route → 
Middleware (auth) → Middleware (validation) → 
Controller → Service → Model → Database
```

## 📚 Conceitos Explicados

### Middleware

Middleware são funções que executam entre a requisição e a resposta. Eles podem:
- Modificar req/res
- Executar código
- Terminar o ciclo de requisição/resposta
- Chamar o próximo middleware

**Exemplo:**
```javascript
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Passa para o próximo middleware
};
```

### Async/Await

Node.js é assíncrono. Use `async/await` para código limpo:

```javascript
// ✅ Bom
const getTasks = async () => {
  const tasks = await taskService.getAllTasks();
  return tasks;
};

// ❌ Evite callbacks
const getTasks = (callback) => {
  taskService.getAllTasks((err, tasks) => {
    callback(err, tasks);
  });
};
```

### Tratamento de Erros

Sempre use `try/catch` e repasse erros para o middleware centralizado:

```javascript
export const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error); // Repassa para errorHandler
  }
};
```

### Validação

Valide sempre os dados de entrada:

```javascript
import Joi from 'joi';

const schema = Joi.object({
  title: Joi.string().min(3).required(),
  status: Joi.string().valid('pending', 'completed'),
});

const { error, value } = schema.validate(req.body);
```

## 🧪 Testes

### Rodar Testes

```bash
# Todos os testes
npm test

# Modo watch (re-executa ao salvar)
npm run test:watch
```

### Estrutura de Testes

- **Testes Unitários**: Testam funções isoladas (services)
- **Testes de Integração**: Testam rotas end-to-end

### Exemplo de Teste

```javascript
test('deve criar uma tarefa', async () => {
  const task = await taskService.createTask({
    title: 'Teste',
    userId: 1,
  });
  
  expect(task.title).toBe('Teste');
});
```

## 🐳 Docker

### Usar Docker

```bash
# Build da imagem
docker build -t project-node .

# Rodar container
docker run -p 3000:3000 project-node
```

### Usar Docker Compose

```bash
# Subir todos os serviços (app + bancos)
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

**Nota:** Este projeto não requer banco de dados rodando, mas inclui exemplos de como configurar MongoDB e PostgreSQL com Docker.

## 🔐 Autenticação

### Como Funciona

1. Cliente faz login em `/api/auth/login`
2. Recebe um token JWT
3. Envia token no header: `Authorization: Bearer <token>`
4. Middleware de autenticação valida o token
5. Se válido, adiciona `req.user` com dados do usuário

### Usuários de Teste

- **Email:** `admin@example.com` | **Senha:** `admin123`
- **Email:** `user@example.com` | **Senha:** `user123`

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` baseado em `.env.example`:

```env
NODE_ENV=development
PORT=3000
JWT_SECRET=seu_secret_aqui

# MongoDB (opcional)
MONGODB_URI=mongodb://localhost:27017/projectnode

# PostgreSQL (opcional)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=projectnode
POSTGRES_USER=postgres
POSTGRES_PASSWORD=senha
```

## 🎓 Aprendizado

### Onde Começar

1. **Leia o código fonte** - Cada arquivo tem comentários explicativos
2. **Explore o frontend** - `public/index.html` explica os conceitos
3. **Teste a API** - Use o frontend ou ferramentas como Postman
4. **Modifique e experimente** - A melhor forma de aprender é praticando

### Arquivos Importantes para Estudar

- `src/app.js` - Configuração do Express
- `src/middleware/` - Exemplos de middleware
- `src/controllers/` - Como lidar com HTTP
- `src/services/` - Lógica de negócio
- `src/routes/` - Definição de rotas

## 🚀 Deploy

Este projeto pode ser deployado em várias plataformas:

- **Vercel** (Recomendado) - [vercel.com](https://vercel.com)
- **Render** - [render.com](https://render.com)
- **Railway** - [railway.app](https://railway.app)
- **Heroku** - [heroku.com](https://heroku.com)

📖 **Guia completo de deploy:** Veja [DEPLOY.md](./DEPLOY.md) para instruções detalhadas.

### Deploy Rápido (Vercel)

1. Faça push do código para GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Importe o repositório
4. Configure variáveis de ambiente:
   - `NODE_ENV=production`
   - `JWT_SECRET=sua_chave_secreta`
5. Deploy automático! 🎉

## 🤝 Contribuindo

Este é um projeto educativo. Sinta-se livre para:
- Fazer fork
- Adicionar melhorias
- Corrigir erros
- Adicionar mais exemplos

## 📄 Licença

MIT

## 🙏 Agradecimentos

Projeto criado para fins educativos, demonstrando boas práticas e padrões de desenvolvimento Node.js.

---

**Desenvolvido com ❤️ para a comunidade de desenvolvedores**

