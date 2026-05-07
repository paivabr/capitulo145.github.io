# 🚀 Guia de Instalação e Deploy - VJ Club

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Conta no Supabase (ou PostgreSQL)
- Conta no Mercado Pago
- Conta no Facebook Developers (para Instagram)

## 🔧 Instalação Local

### 1. Clonar o Projeto
```bash
cd vj-club
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Copie o arquivo `.env.example` para `.env.local`:
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/vjclub"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="sua-url-supabase"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-chave-anon"
SUPABASE_SERVICE_ROLE_KEY="sua-chave-service"

# Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN="seu-token-mercado-pago"
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY="sua-chave-publica"

# JWT
JWT_SECRET="seu-segredo-jwt-super-seguro"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="seu-segredo-nextauth"
```

### 4. Configurar Banco de Dados

#### Opção A: Supabase (Recomendado)
1. Crie um projeto no [Supabase](https://supabase.com)
2. Copie as credenciais para o `.env.local`
3. Execute o SQL em `lib/database.sql` no SQL Editor do Supabase

#### Opção B: PostgreSQL Local
1. Instale PostgreSQL
2. Crie o banco: `createdb vjclub`
3. Execute: `psql -U username -d vjclub -f lib/database.sql`

### 5. Executar em Desenvolvimento
```bash
npm run dev
```

Acesse `http://localhost:3000`

## 🔐 Acesso Administrativo

### Login Admin
- URL: `http://localhost:3000/admin/login`
- Email: `admin@vjclub.com.br`
- Senha: `admin123`

**IMPORTANTE:** Altere a senha após o primeiro acesso!

### Configurar Instagram
1. Acesse `/admin/configuracoes`
2. Preencha os campos do Instagram:
   - **@ do Instagram**: `@sua-conta`
   - **Instagram Access Token**: Token da API
   - **Instagram User ID**: ID do usuário

### Como obter credenciais do Instagram:
1. Vá para [Facebook Developers](https://developers.facebook.com)
2. Crie um novo aplicativo
3. Adicione "Instagram Basic Display"
4. Configure as permissões necessárias
5. Obtenha o Access Token e User ID
6. Configure no painel admin

## 🌐 Deploy em Produção

### Opção 1: Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer deploy
vercel

# Configurar variáveis de ambiente no painel Vercel
vercel env add
```

### Opção 2: Netlify
1. Conecte seu repositório Git
2. Configure as variáveis de ambiente
3. Build command: `npm run build`
4. Publish directory: `.next`

### Opção 3: Railway
1. Crie novo projeto no [Railway](https://railway.app)
2. Conecte seu repositório
3. Configure variáveis de ambiente
4. Deploy automático

### Opção 4: Servidor Próprio
```bash
# Build para produção
npm run build

# Iniciar servidor
npm start
```

## ⚙️ Configurações de Produção

### Variáveis de Ambiente Obrigatórias
- `DATABASE_URL`: String de conexão do banco
- `NEXT_PUBLIC_SUPABASE_URL`: URL do Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave pública Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Chave de serviço Supabase
- `JWT_SECRET`: Segredo para tokens JWT
- `NEXTAUTH_URL`: URL da aplicação
- `NEXTAUTH_SECRET`: Segredo do NextAuth

### Configurações Adicionais (Painel Admin)
- `MERCADO_PAGO_ACCESS_TOKEN`: Token Mercado Pago
- `NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY`: Chave pública Mercado Pago
- Credenciais SMTP para e-mails
- Credenciais Instagram

## 🔧 Configuração Mercado Pago

1. Acesse [Mercado Pago Developers](https://www.mercadopago.com.br/developers)
2. Crie sua aplicação
3. Configure webhooks:
   - URL: `https://seusite.com/api/mercadopago/webhook`
   - Eventos: `payment_approved`, `payment_rejected`
4. Copie as credenciais para o painel admin

## 📧 Configuração E-mail (SMTP)

### Gmail (Recomendado)
1. Ative 2FA na conta Google
2. Gere "App Password"
3. Configure no painel admin:
   - Servidor: `smtp.gmail.com`
   - Porta: `587`
   - Usuário: `seuemail@gmail.com`
   - Senha: `sua-app-password`

### Outros Provedores
Configure de acordo com as especificações do seu provedor de e-mail.

## 🛠️ Manutenção

### Backup do Banco
```bash
# PostgreSQL
pg_dump -U username vjclub > backup.sql

# Supabase
# Use o painel do Supabase para exportar dados
```

### Logs
```bash
# Ver logs de erro
tail -f logs/error.log

# Logs de acesso
tail -f logs/access.log
```

### Atualização
```bash
# Atualizar dependências
npm update

# Rebuild
npm run build
npm start
```

## 🚨 Solução de Problemas

### Erros Comuns

#### 1. "Cannot find module"
```bash
npm install
```

#### 2. Erro de conexão com banco
- Verifique `DATABASE_URL`
- Confirme se o banco está online
- Teste conexão manualmente

#### 3. Instagram não funciona
- Verifique credenciais no painel admin
- Confirme permissões da API
- Teste com Graph API Explorer

#### 4. Mercado Pago não processa
- Verifique tokens no painel admin
- Confirme configuração de webhooks
- Teste com sandbox

#### 5. E-mails não chegam
- Verifique configuração SMTP
- Confirme senha do aplicativo
- Verifique pasta de spam

### Performance

#### Otimização
- Use Next.js Image para imagens
- Configure cache estático
- Otimize bundle com análise

#### Monitoramento
- Configure Vercel Analytics
- Use Sentry para erros
- Monitore performance com Lighthouse

## 📞 Suporte

### Documentação
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Mercado Pago Docs](https://www.mercadopago.com.br/developers)

### Comunidade
- GitHub Issues para bugs
- Discord para suporte rápido
- Fórum para dúvidas

---

## ✅ Checklist de Deploy

- [ ] Instalar dependências
- [ ] Configurar variáveis de ambiente
- [ ] Configurar banco de dados
- [ ] Testar localmente
- [ ] Configurar domínio
- [ ] Configurar SSL
- [ ] Testar integrações (Instagram, Mercado Pago)
- [ ] Configurar e-mails
- [ ] Testar processo de compra completo
- [ ] Configurar monitoramento
- [ ] Fazer backup inicial

**VJ Club** - Seu e-commerce premium de chuteiras e camisas ⚽🏆
