# VJ Club - E-commerce de Chuteiras e Camisas de Futebol

Projeto e-commerce moderno e premium para venda de chuteiras e camisas de futebol, desenvolvido com Next.js, Tailwind CSS e integração com diversas APIs.

## 🚀 Tecnologias Utilizadas

### Front-end
- **Next.js 14** - Framework React com Server Components
- **Tailwind CSS** - Framework CSS com design customizado preto/cinza/dourado
- **TypeScript** - Tipagem estática
- **Framer Motion** - Animações
- **Lucide React** - Ícones
- **React Hook Form** - Formulários
- **React Hot Toast** - Notificações

### Back-end
- **Node.js/Express** - API REST
- **Supabase** - Banco de dados PostgreSQL e autenticação
- **Prisma** - ORM para PostgreSQL
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas

### Integrações
- **Mercado Pago API** - Pagamentos (PIX e Cartão)
- **Instagram Basic Display API** - Feed de posts
- **Nodemailer/SendGrid** - Envio de e-mails

## 📁 Estrutura do Projeto

```
vj-club/
├── app/                    # App Router (Next.js 13+)
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   └── InstagramFeed.tsx  # Feed do Instagram
├── lib/                   # Bibliotecas e utilitários
│   ├── database.sql       # Schema do banco
│   └── supabase.ts        # Config Supabase
├── pages/api/             # API Routes
│   └── instagram.ts       # API Instagram
├── types/                 # Tipos TypeScript
│   └── index.ts          # Definições de tipos
├── public/               # Arquivos estáticos
├── styles/               # Estilos adicionais
├── hooks/                # Hooks customizados
├── utils/                # Funções utilitárias
└── README.md            # Documentação
```

## 🎨 Identidade Visual

### Cores Principais
- **Preto**: `#000000` (fundo principal)
- **Cinza**: Gradientes sutis para profundidade
- **Dourado**: `#FFD700` (destaques, botões CTA)

### Estilo
- Premium e esportivo
- Minimalista com alto contraste
- Gradientes sutis para criar profundidade
- Animações suaves e efeitos hover

## 🛠️ Configuração do Ambiente

### 1. Instalar Dependências
```bash
cd vj-club
npm install
```

### 2. Configurar Variáveis de Ambiente
Copie `.env.example` para `.env.local`:
```bash
cp .env.example .env.local
```

Configure as seguintes variáveis:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/vjclub"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN="your-mercado-pago-access-token"
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY="your-mercado-pago-public-key"

# Instagram
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN="your-instagram-access-token"
INSTAGRAM_USER_ID="your-instagram-user-id"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# JWT
JWT_SECRET="your-super-secret-jwt-key"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
```

### 3. Configurar Banco de Dados
Execute o script SQL em `lib/database.sql` no seu PostgreSQL:
```bash
psql -U username -d vjclub -f lib/database.sql
```

### 4. Executar o Projeto
```bash
npm run dev
```

Acesse `http://localhost:3000`

## 🏗️ Funcionalidades Implementadas

### ✅ Página Inicial
- Design premium com tema preto/cinza/dourado
- Banner principal estilo Nike
- Feed do Instagram em tempo real
- Produtos em destaque
- Layout responsivo

### 📱 Instagram Feed
- Integração com Instagram Basic Display API
- Posts em tempo real
- Fallback com dados mockados
- Animações hover e overlay

### 🗄️ Banco de Dados
- Schema completo PostgreSQL
- Tabelas: users, products, orders, cart_items, menu_items
- Relacionamentos e índices otimizados
- Dados iniciais para teste

## 🚧 Próximos Passos

### Funcionalidades a Implementar:
1. **Catálogo de Produtos**
   - Listagem com filtros
   - Paginação
   - Busca avançada

2. **Página de Produto**
   - Detalhes completos
   - Seleção de tamanhos
   - Galeria de imagens

3. **Sistema de Carrinho**
   - Adicionar/remover itens
   - Atualizar quantidades
   - Persistência

4. **Autenticação**
   - Login/Registro
   - Recuperação de senha
   - Painel do cliente

5. **Checkout**
   - Integração Mercado Pago
   - PIX e Cartão
   - Processamento de pedidos

6. **Painel Admin**
   - Gestão de produtos
   - Gestão de pedidos
   - Gestão de clientes
   - Configurações

7. **Sistema de E-mails**
   - Confirmação de pedidos
   - Notificações
   - E-mails transacionais

## 🔧 APIs e Integrações

### Instagram Basic Display API
1. Crie um app no Facebook Developers
2. Configure Instagram Basic Display
3. Obtenha Access Token e User ID
4. Configure as variáveis de ambiente

### Mercado Pago
1. Crie conta no Mercado Pago
2. Obtenha credenciais de API
3. Configure webhooks para notificações

### Supabase
1. Crie projeto no Supabase
2. Configure banco PostgreSQL
3. Obtenha chaves de API
4. Configure autenticação

## 📱 Design Responsivo

O projeto é totalmente responsivo:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎯 Performance

- Otimizado com Next.js Image
- Lazy loading de imagens
- Code splitting automático
- Bundle optimization

## 🔐 Segurança

- Autenticação JWT
- Hash de senhas bcrypt
- Validação de inputs
- Proteção contra CSRF
- Variáveis de ambiente

---

**VJ Club** - Estilo Premium em Campo ⚽🏆
