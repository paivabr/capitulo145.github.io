# VJ Club - E-commerce de Chuteiras e Camisas de Futebol

## 🚀 Como Fazer o Push para GitHub

### 1. Instalar Git (se ainda não tiver)
**Windows:**
- Baixe em: https://git-scm.com/download/win
- Instale com opções padrão
- Reinicie o terminal

**Ou via Chocolatey:**
```bash
choco install git
```

### 2. Configurar Git
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seuemail@example.com"
```

### 3. Fazer Push para o Repositório

#### Opção A: Via GitHub Desktop (Recomendado)
1. Instale [GitHub Desktop](https://desktop.github.com/)
2. File → Add Local Repository → Selecione pasta `vj-club`
3. Current Repository → Publish repository
4. Selecione `paivabr/capitulo145.github.io`
5. Publish repository

#### Opção B: Via Linha de Comando
```bash
# Navegar para a pasta do projeto
cd c:\Users\Micro\gp-gestao\vj-club

# Inicializar repositório
git init

# Adicionar remote
git remote add origin https://github.com/paivabr/capitulo145.github.io.git

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "🚀 Deploy inicial VJ Club - E-commerce de chuteiras e camisas"

# Fazer push
git push -u origin main
```

#### Opção C: Forçar Push (se já existir conteúdo)
```bash
git push -f origin main
```

### 4. Verificar no GitHub
Acesse: https://github.com/paivabr/capitulo145.github.io

## 🌐 Deploy no Railway

### Passo 1: Acessar Railway
1. Vá para [railway.app](https://railway.app)
2. Faça login com GitHub

### Passo 2: Novo Projeto
1. Dashboard → "New Project"
2. "Deploy from GitHub repo"
3. Selecione `capitulo145.github.io`

### Passo 3: Configurar Variáveis de Ambiente
No projeto Railway → "Variables" → adicione:
```env
NODE_ENV=production
DATABASE_URL=postgresql://postgres:password@localhost:5432/railway
NEXTAUTH_URL=https://seu-projeto.railway.app
NEXTAUTH_SECRET=seu-segredo-aqui
JWT_SECRET=seu-segredo-jwt
NEXT_PUBLIC_SUPABASE_URL=sua-url-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service
```

### Passo 4: Configurar Build
Em "Settings" → "Build Command":
```bash
npm install && npm run build
```

"Start Command":
```bash
npm start
```

### Passo 5: Deploy Automático
- Railway fará deploy automático
- Aguarde alguns minutos
- Acesse a URL fornecida

## 🔧 Configurações Adicionais

### Banco de Dados Railway
1. No projeto Railway → "Add Service"
2. "PostgreSQL"
3. Copie a DATABASE_URL gerada
4. Atualize nas variáveis de ambiente

### Domínio Personalizado
1. Railway → "Settings" → "Custom Domains"
2. Adicione seu domínio
3. Configure DNS conforme instruções

## 📱 URLs Finais

- **Site**: `https://seu-projeto.railway.app`
- **Admin**: `https://seu-projeto.railway.app/admin/login`
- **Login**: `admin@vjclub.com.br` / `admin123`

## 🎯 Próximos Passos

1. **Configurar Supabase** para banco de dados
2. **Configurar Mercado Pago** para pagamentos
3. **Configurar Instagram** no painel admin
4. **Testar fluxo completo** de compra

---

**VJ Club** - Seu e-commerce no ar com Railway! 🚀⚽
