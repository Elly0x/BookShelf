# 📚 BookShelf - Aplicativo de Estante de Livros

Um aplicativo móvel de gerenciamento de leitura inspirado no Skoob, com design baseado no tema Obsidian. Desenvolvido com React Native, Expo e TypeScript.

## 🎨 Características

- **Design Obsidian-inspired**: Paleta de cores sofisticada com tons de roxo, cinza e branco
- **Estante Virtual**: Organize seus livros por status (Lidos, Lendo, Desejo, Abandonados)
- **Sistema de Avaliações**: Avalie livros com estrelas (1-5) e escreva resenhas
- **Exploração Social**: Descubra novos livros e veja resenhas da comunidade
- **Perfil Personalizado**: Acompanhe suas estatísticas de leitura e metas
- **Temas Light/Dark**: Suporte completo para modo claro e escuro

## 🛠️ Tecnologias

### Frontend
- **React Native** 0.81.5 com **Expo** ~54.0
- **TypeScript** ~5.9.3
- **Expo Router** ~6.0 (navegação baseada em arquivos)
- **NativeWind** ^4.2 (TailwindCSS para React Native)
- **React Query** ^5.90 (gerenciamento de estado)

### Backend
- **tRPC** 11.7 (comunicação type-safe cliente-servidor)
- **Express** ^4.22 (servidor HTTP)
- **Drizzle ORM** ^0.44 (ORM TypeScript-first)
- **MySQL2** ^3.16 (banco de dados)

### Autenticação
- **OAuth** com Manus
- **JWT** via biblioteca Jose
- **Secure Store** para armazenamento seguro de tokens

## 📁 Estrutura do Projeto

```
BookShelf1-main/
├── app/                    # Rotas do aplicativo (Expo Router)
│   ├── (tabs)/            # Navegação por abas
│   │   ├── index.tsx      # Home - Estante
│   │   ├── explore.tsx    # Explorar
│   │   └── profile.tsx    # Perfil
│   ├── add-book.tsx       # Adicionar livro
│   ├── book-detail.tsx    # Detalhes do livro
│   └── write-review.tsx   # Escrever resenha
├── components/            # Componentes reutilizáveis
│   ├── book-card.tsx      # Card de livro
│   ├── star-rating.tsx    # Avaliação por estrelas
│   ├── review-card.tsx    # Card de resenha
│   └── user-avatar.tsx    # Avatar do usuário
├── hooks/                 # Custom hooks
│   ├── use-auth.ts        # Hook de autenticação
│   ├── use-shelf.ts       # Hook da estante
│   └── use-reviews.ts     # Hook de resenhas
├── server/                # Backend tRPC
│   ├── routers.ts         # Rotas da API
│   ├── db.ts              # Configuração do banco
│   └── storage.ts         # Gerenciamento de arquivos
├── drizzle/               # Schemas e migrações do banco
│   ├── schema.ts          # Definição das tabelas
│   └── migrations/        # Migrações SQL
├── constants/             # Constantes e configurações
│   └── theme.ts           # Tema Obsidian
├── assets/                # Imagens e recursos
└── shared/                # Tipos e utilitários compartilhados
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 22.x
- pnpm 9.12.0 ou superior
- MySQL 8.0+ (ou TiDB)
- Expo Go app (para testar no dispositivo)

### Instalação

```bash
# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais

# Executar migrações do banco de dados
pnpm db:push

# Iniciar o servidor de desenvolvimento
pnpm dev
```

O comando `pnpm dev` inicia simultaneamente:
- Servidor backend (porta 3000)
- Metro bundler do Expo (porta 8081)

### Executar em Dispositivo/Emulador

```bash
# Android
pnpm android

# iOS (apenas macOS)
pnpm ios

# Gerar QR Code para Expo Go
pnpm qr
```

## 📱 Telas Principais

1. **Home / Estante**: Grid de livros com filtros por status
2. **Explorar**: Livros em alta, recomendações e feed social
3. **Perfil**: Estatísticas de leitura, resenhas e configurações
4. **Detalhes do Livro**: Informações completas, avaliações e resenhas
5. **Escrever Resenha**: Formulário para avaliar e resenhar livros
6. **Adicionar Livro**: Buscar e adicionar livros à estante

## 🎯 Funcionalidades Implementadas

### ✅ Fase 1-10 (Completas)
- [x] Setup e Design System
- [x] Estrutura de Dados e Navegação
- [x] Tela Home - Estante
- [x] Tela Detalhe do Livro
- [x] Sistema de Resenhas
- [x] Tela Explorar
- [x] Perfil Social
- [x] Configurações
- [x] Testes e Polimento
- [x] Entrega

### 🔄 Em Desenvolvimento
- [ ] Busca avançada de livros (Fase 6)
- [ ] Integração com APIs externas de livros
- [ ] Sistema de notificações push
- [ ] Compartilhamento social

## 🧪 Testes

```bash
# Executar testes
pnpm test

# Verificar tipos TypeScript
pnpm check

# Lint
pnpm lint
```

## 📦 Build para Produção

```bash
# Build do servidor
pnpm build

# Iniciar servidor de produção
pnpm start
```

Para builds mobile (Android/iOS), consulte a [documentação do Expo](https://docs.expo.dev/build/introduction/).

## 🎨 Design System

O aplicativo utiliza um design system inspirado no Obsidian com:

- **Cores principais**: Roxo (#7c3aed), Cinza (#1a1a1a), Branco (#ffffff)
- **Tipografia**: System fonts com tamanhos de 12px a 28px
- **Espaçamento**: Sistema de 4px (xs) a 32px (2xl)
- **Componentes**: Cards, botões, inputs e navegação consistentes

Veja [design.md](./design.md) para detalhes completos.

## 📄 Licença

Este projeto é privado e destinado apenas para fins de estudo.

## 👨‍💻 Desenvolvimento

Desenvolvido como projeto de estudo de aplicativos móveis com React Native e Expo.

---

**Nota**: Este é um projeto em desenvolvimento. Algumas funcionalidades podem estar incompletas ou em fase de implementação.
