# 🚀 Guia de Deploy

Este guia explica como fazer deploy deste projeto Node.js em diferentes plataformas.

## 📋 Pré-requisitos

- Conta GitHub (para conectar o repositório)
- Código commitado e pushado para o GitHub

## 🌐 Opções de Deploy

### 1. **Vercel** (Recomendado para projetos Node.js)

**Vantagens:**
- ✅ Gratuito
- ✅ Deploy automático via GitHub
- ✅ CDN global
- ✅ SSL automático
- ✅ Muito rápido

**Passos:**

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em "Add New Project"
3. Importe seu repositório do GitHub
4. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** ./
   - **Build Command:** (deixe vazio)
   - **Output Directory:** (deixe vazio)
5. Adicione variáveis de ambiente:
   - `NODE_ENV` = `production`
   - `JWT_SECRET` = (gere uma string aleatória forte)
   - `PORT` = (Vercel define automaticamente)
6. Clique em "Deploy"

**Nota:** O arquivo `vercel.json` já está configurado!

**URL:** Seu projeto ficará em `https://seu-projeto.vercel.app`

---

### 2. **Render** (Ótimo para APIs)

**Vantagens:**
- ✅ Plano gratuito disponível
- ✅ Deploy automático via GitHub
- ✅ SSL automático
- ✅ Fácil configuração

**Passos:**

1. Acesse [render.com](https://render.com) e faça login com GitHub
2. Clique em "New +" → "Web Service"
3. Conecte seu repositório do GitHub
4. Configure:
   - **Name:** nodejs-educativo (ou o nome que preferir)
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
5. Adicione variáveis de ambiente:
   - `NODE_ENV` = `production`
   - `JWT_SECRET` = (gere uma string aleatória)
   - `PORT` = `10000` (Render usa esta porta)
6. Clique em "Create Web Service"

**Nota:** O arquivo `render.yaml` já está configurado!

**URL:** Seu projeto ficará em `https://seu-projeto.onrender.com`

---

### 3. **Railway** (Simples e rápido)

**Vantagens:**
- ✅ Muito fácil de usar
- ✅ Deploy automático
- ✅ SSL automático
- ✅ $5 de crédito grátis mensal

**Passos:**

1. Acesse [railway.app](https://railway.app) e faça login com GitHub
2. Clique em "New Project"
3. Selecione "Deploy from GitHub repo"
4. Escolha seu repositório
5. Railway detecta automaticamente que é Node.js
6. Adicione variáveis de ambiente:
   - `NODE_ENV` = `production`
   - `JWT_SECRET` = (gere uma string aleatória)
7. O deploy começa automaticamente!

**URL:** Seu projeto ficará em `https://seu-projeto.up.railway.app`

---

### 4. **Heroku** (Clássico)

**Vantagens:**
- ✅ Muito popular
- ✅ Muitos recursos
- ⚠️ Plano gratuito foi descontinuado (pago)

**Passos:**

1. Instale o [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Faça login: `heroku login`
3. Crie a aplicação: `heroku create seu-projeto`
4. Configure variáveis:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=sua_chave_secreta_aqui
   ```
5. Faça deploy: `git push heroku main`

**URL:** Seu projeto ficará em `https://seu-projeto.herokuapp.com`

---

### 5. **DigitalOcean App Platform**

**Vantagens:**
- ✅ $5/mês (muito barato)
- ✅ Deploy automático
- ✅ SSL automático

**Passos:**

1. Acesse [digitalocean.com](https://digitalocean.com)
2. Vá em "App Platform" → "Create App"
3. Conecte seu repositório do GitHub
4. Configure e faça deploy

---

## 🔐 Variáveis de Ambiente

Configure estas variáveis em todas as plataformas:

```env
NODE_ENV=production
JWT_SECRET=sua_chave_secreta_muito_forte_aqui
PORT=3000  # (geralmente definido automaticamente pela plataforma)
```

**⚠️ IMPORTANTE:** Gere um JWT_SECRET forte! Use:
```bash
# No terminal:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📝 Checklist de Deploy

- [ ] Código commitado e pushado para GitHub
- [ ] Variáveis de ambiente configuradas
- [ ] JWT_SECRET gerado e configurado
- [ ] Teste local funcionando (`npm start`)
- [ ] Health check funcionando (`/api/health`)

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"
- Certifique-se de que todas as dependências estão no `package.json`
- Verifique se o `npm install` está rodando no build

### Erro: "Port already in use"
- A plataforma define a porta automaticamente via `process.env.PORT`
- Não hardcode a porta no código

### Erro: "Module not found"
- Verifique se está usando ES modules (`"type": "module"` no package.json)
- Algumas plataformas podem precisar de configuração adicional

### Frontend não carrega
- Verifique se os arquivos em `public/` estão sendo servidos
- Confirme as rotas no `vercel.json` ou configuração da plataforma

---

## 🎯 Recomendação

Para este projeto educativo, recomendo:

1. **Vercel** - Se quiser o mais rápido e fácil
2. **Render** - Se quiser uma opção gratuita robusta
3. **Railway** - Se quiser algo intermediário

Todas as três são excelentes opções gratuitas!

---

## 📚 Links Úteis

- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Heroku Docs](https://devcenter.heroku.com)

---

**Boa sorte com o deploy! 🚀**

