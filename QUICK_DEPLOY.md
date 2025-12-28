# ⚡ Deploy Rápido - 3 Passos

## 🎯 Opção 1: Vercel (Mais Rápido - 2 minutos)

1. **Push para GitHub**
   ```bash
   git add .
   git commit -m "Preparado para deploy"
   git push origin main
   ```

2. **Deploy na Vercel**
   - Acesse: https://vercel.com
   - Clique em "Add New Project"
   - Conecte seu repositório GitHub
   - Clique em "Deploy" (já está configurado!)

3. **Configure Variáveis** (após primeiro deploy)
   - Vá em Settings → Environment Variables
   - Adicione: `JWT_SECRET` = (gere uma chave aleatória)

**Pronto!** Seu site estará no ar em `https://seu-projeto.vercel.app`

---

## 🎯 Opção 2: Render (Gratuito - 5 minutos)

1. **Push para GitHub** (mesmo processo acima)

2. **Deploy no Render**
   - Acesse: https://render.com
   - Clique em "New +" → "Web Service"
   - Conecte seu repositório
   - Configure:
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Clique em "Create Web Service"

2. **Configure Variáveis**
   - Vá em Environment
   - Adicione:
     - `NODE_ENV` = `production`
     - `JWT_SECRET` = (sua chave)
     - `PORT` = `10000`

**Pronto!** Seu site estará em `https://seu-projeto.onrender.com`

---

## 🎯 Opção 3: Railway (Super Simples)

1. **Push para GitHub**

2. **Deploy no Railway**
   - Acesse: https://railway.app
   - Clique em "New Project" → "Deploy from GitHub"
   - Escolha seu repositório
   - Railway detecta automaticamente!

3. **Configure Variáveis**
   - Vá em Variables
   - Adicione: `JWT_SECRET` = (sua chave)

**Pronto!** Seu site estará em `https://seu-projeto.up.railway.app`

---

## 🔑 Gerar JWT_SECRET

Execute no terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copie o resultado e use como `JWT_SECRET`.

---

## ✅ Checklist

- [ ] Código no GitHub
- [ ] JWT_SECRET gerado
- [ ] Variáveis configuradas na plataforma
- [ ] Deploy realizado
- [ ] Teste: `/api/health` funciona

---

**Dúvidas?** Veja o guia completo em [DEPLOY.md](./DEPLOY.md)

