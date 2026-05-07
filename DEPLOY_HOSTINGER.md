# 🚀 Deploy na Hostinger - VJ Club

## 📋 Pré-requisitos

- Conta na Hostinger (hPanel)
- Projeto VJ Club pronto
- Acesso ao código do projeto
- Conta no Supabase (recomendado) ou PostgreSQL

## 🔧 Passo 1 - Preparar o Projeto

### 1.1 Build do Projeto
```bash
cd vj-club
npm install
npm run build
```

### 1.2 Preparar Arquivos
O build criará a pasta `.next` com os arquivos de produção.

## 🌐 Passo 2 - Configurar Hostinger

### 2.1 Escolher o Plano
- **Recomendado**: Plano Business ou Cloud
- **Mínimo**: Plano Premium (para Node.js)

### 2.2 Acessar hPanel
1. Faça login na [Hostinger](https://www.hostinger.com.br/hpanel)
2. Vá para "Hospedagem" → "Gerenciar"

## 🗄️ Passo 3 - Configurar Banco de Dados

### 3.1 Criar Banco PostgreSQL
1. No hPanel → "Bancos de Dados"
2. Clique em "Criar Novo Banco"
3. Selecione "PostgreSQL"
4. Anote as credenciais:
   - Nome do banco
   - Usuário
   - Senha
   - Host/Server
   - Porta

### 3.2 Importar Schema
1. Acesse o phpMyAdmin ou pgAdmin da Hostinger
2. Selecione seu banco
3. Importe o arquivo: `lib/database.sql`

### 3.3 Atualizar Conexão
No seu projeto, atualize `DATABASE_URL`:
```env
DATABASE_URL="postgresql://usuario:senha@host:porta/nome_banco"
```

## 📁 Passo 4 - Upload dos Arquivos

### 4.1 Via File Manager
1. No hPanel → "Arquivos" → "File Manager"
2. Navegue até `public_html`
3. Delete os arquivos existentes (se necessário)
4. Upload da pasta `.next`

### 4.2 Via FTP (Recomendado)
1. Configure cliente FTP (FileZilla)
   - Host: `ftp.seudominio.com`
   - Usuário: seu usuário Hostinger
   - Senha: sua senha
   - Porta: 21
2. Navegue até `public_html`
3. Upload da pasta `.next`

## ⚙️ Passo 5 - Configurar Node.js

### 5.1 Configurar Aplicação Node.js
1. No hPanel → "Avançado" → "Configurações Node.js"
2. Clique em "Criar Nova Aplicação"
3. Configure:
   - **Project Root**: `/public_html`
   - **Startup File**: `server.js` (ou `index.js`)
   - **Node Version**: `18.x` ou superior

### 5.2 Criar Arquivo de Servidor
Crie `server.js` na raiz do projeto:
```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
```

## 🔐 Passo 6 - Configurar Variáveis de Ambiente

### 6.1 Via hPanel
1. hPanel → "Avançado" → "Variáveis de Ambiente"
2. Adicione as variáveis:
   ```
   NODE_ENV=production
   DATABASE_URL=postgresql://usuario:senha@host:porta/banco
   NEXT_PUBLIC_SUPABASE_URL=sua-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave
   JWT_SECRET=seu-segredo
   NEXTAUTH_URL=https://seudominio.com
   NEXTAUTH_SECRET=seu-segredo-nextauth
   MERCADO_PAGO_ACCESS_TOKEN=seu-token-mp
   NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=sua-chave-publica
   ```

### 6.2 Via .env.local
Se preferir, faça upload do arquivo `.env.local` para a pasta raiz.

## 🌍 Passo 7 - Configurar Domínio

### 7.1 Apontar Domínio
1. Se já tem domínio na Hostinger, ignore este passo
2. Se comprar novo domínio:
   - hPanel → "Domínios" → "Registrar Novo Domínio"
   - Siga as instruções

### 7.2 Configurar SSL
1. hPanel → "SSL" → "Let's Encrypt"
2. Instale certificado gratuito
3. Forçar HTTPS

## 🔄 Passo 8 - Reiniciar e Testar

### 8.1 Reiniciar Aplicação
1. hPanel → "Avançado" → "Configurações Node.js"
2. Clique em "Restart"

### 8.2 Verificar Logs
1. hPanel → "Avançado" → "Logs de Erros"
2. Verifique se há erros de inicialização

### 8.3 Testar Aplicação
Acesse: `https://seudominio.com`

## ⚡ Passo 9 - Otimizações

### 9.1 Configurar Cache
1. hPanel → "Otimizar Site" → "Cache"
2. Ative cache para arquivos estáticos

### 9.2 Configurar CDN
1. hPanel → "CDN" (se disponível no plano)
2. Ative para melhor performance

## 📧 Passo 10 - Configurar E-mails

### 10.1 SMTP Hostinger
Use as credenciais do e-mail da Hostinger:
```
SMTP_HOST: smtp.hostinger.com
SMTP_PORT: 587
SMTP_USER: email@seudominio.com
SMTP_PASS: sua_senha
```

Configure no painel admin: `/admin/configuracoes`

## 🔧 Troubleshooting Comum

### Erro 500 - Internal Server Error
1. Verifique logs de erro
2. Confirme permissões de arquivos
3. Verifique variáveis de ambiente

### Erro de Conexão com Banco
1. Teste conexão manualmente
2. Verifique credenciais no DATABASE_URL
3. Confirme se o banco está online

### Aplicação Não Inicia
1. Verifique versão do Node.js
2. Confirme arquivo de startup
3. Reinicie aplicação

### Páginas 404
1. Verifique configuração de rotas
2. Confirme se todos arquivos foram enviados
3. Verifique arquivo .htaccess

## 📱 Acesso ao Site

### URL Final
- Site: `https://seudominio.com`
- Admin: `https://seudominio.com/admin/login`
- Login: `admin@vjclub.com.br` / `admin123`

## 🔄 Atualizações Futuras

### Processo de Deploy
1. Faça as alterações localmente
2. Execute `npm run build`
3. Substitua arquivos via FTP
4. Reinicie aplicação no hPanel

### Backup Automático
Configure backup diário no hPanel → "Backup"

## 🎯 Checklist Final

- [ ] Projeto buildado com sucesso
- [ ] Banco de dados criado e importado
- [ ] Arquivos enviados para o servidor
- [ ] Aplicação Node.js configurada
- [ ] Variáveis de ambiente configuradas
- [ ] Domínio apontado
- [ ] SSL instalado
- [ ] Aplicação reiniciada
- [ ] Teste completo do site
- [ ] Painel admin funcional
- [ ] Instagram configurado
- [ ] Mercado Pago testado

---

**Suporte Hostinger**: [Help Center](https://www.hostinger.com.br/tutoriais)

**VJ Club na Hostinger** - Seu e-commerce no ar! 🚀⚽
