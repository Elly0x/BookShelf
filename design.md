# Design System - BookShelf Obsidian

## Visão Geral
Um aplicativo estilo Skoob com design inspirado no Obsidian. A paleta de cores segue o tema dark/light do Obsidian com tons de roxo, cinza e branco, criando uma experiência visual sofisticada e focada em leitura.

## Paleta de Cores (Obsidian-inspired)

### Cores Principais
- **Primary (Roxo Obsidian)**: `#7c3aed` (light) / `#a78bfa` (dark mode)
- **Background**: `#ffffff` (light) / `#1a1a1a` (dark)
- **Surface**: `#f5f5f5` (light) / `#2d2d2d` (dark)
- **Foreground**: `#1f1f1f` (light) / `#e0e0e0` (dark)
- **Muted**: `#6b7280` (light) / `#9ca3af` (dark)
- **Border**: `#e5e7eb` (light) / `#404040` (dark)
- **Accent (Roxo claro)**: `#a78bfa` (light) / `#c4b5fd` (dark)

### Cores Semânticas
- **Success**: `#10b981` (verde)
- **Warning**: `#f59e0b` (âmbar)
- **Error**: `#ef4444` (vermelho)
- **Info**: `#3b82f6` (azul)

## Telas Principais

### 1. **Home / Estante (Tab 1)**
- **Conteúdo**: Grid de livros com capas
- **Funcionalidades**:
  - Exibição visual da estante em grid (2-3 colunas)
  - Filtros: Lidos, Lendo, Desejo, Abandonados
  - Busca rápida de livros
  - Botão flutuante para adicionar novo livro
- **Componentes**: Cards de livro com capa, título, autor

### 2. **Explorar / Descobrir (Tab 2)**
- **Conteúdo**: Livros recomendados, tendências, comunidade
- **Funcionalidades**:
  - Livros em alta (mais avaliados)
  - Recomendações personalizadas
  - Livros populares por gênero
  - Feed social (resenhas de amigos)
- **Componentes**: Cards horizontais, lista de resenhas

### 3. **Perfil Social (Tab 3)**
- **Conteúdo**: Perfil do usuário, estatísticas, seguidores
- **Funcionalidades**:
  - Foto de perfil, nome, bio
  - Estatísticas: livros lidos, páginas, meta de leitura
  - Abas: Resenhas, Listas, Seguidores/Seguindo
  - Botão de editar perfil
- **Componentes**: Avatar, badges, estatísticas em cards

### 4. **Detalhe do Livro**
- **Conteúdo**: Informações completas do livro
- **Funcionalidades**:
  - Capa grande, título, autor, editora
  - Sinopse
  - Avaliação em estrelas (1-5)
  - Status: Lido, Lendo, Desejo, Abandonado
  - Resenhas da comunidade
  - Botão para adicionar resenha própria
- **Componentes**: Header com capa, seções de informações, lista de resenhas

### 5. **Escrever Resenha**
- **Conteúdo**: Formulário para criar resenha
- **Funcionalidades**:
  - Seletor de avaliação (1-5 estrelas)
  - Campo de texto para resenha
  - Spoiler toggle
  - Botão de publicar
- **Componentes**: Star rating, textarea, toggle

### 6. **Busca**
- **Conteúdo**: Busca global de livros
- **Funcionalidades**:
  - Input de busca
  - Resultados em tempo real
  - Filtros: Título, Autor, Gênero
  - Histórico de buscas
- **Componentes**: Search bar, resultado cards

### 7. **Configurações**
- **Conteúdo**: Preferências do app
- **Funcionalidades**:
  - Tema (light/dark)
  - Notificações
  - Privacidade
  - Sobre o app
- **Componentes**: Toggle switches, lista de opções

## Fluxos Principais de Usuário

### Fluxo 1: Adicionar Livro à Estante
1. Usuário toca em "+" na home
2. Escolhe entre "Buscar" ou "Escanear código"
3. Seleciona livro nos resultados
4. Define status (Lido, Lendo, Desejo, Abandonado)
5. Livro aparece na estante

### Fluxo 2: Avaliar e Resenhar Livro
1. Usuário toca em livro na estante
2. Vai para detalhe do livro
3. Toca em "Escrever resenha"
4. Seleciona estrelas (1-5)
5. Escreve texto da resenha
6. Publica
7. Resenha aparece no perfil e feed

### Fluxo 3: Explorar Comunidade
1. Usuário vai para aba "Explorar"
2. Vê livros em alta e recomendações
3. Toca em livro para ver detalhes
4. Vê resenhas de outros usuários
5. Pode seguir usuários interessantes

## Componentes Reutilizáveis

- **BookCard**: Exibe capa, título, autor, avaliação
- **StarRating**: Seletor/exibidor de 1-5 estrelas
- **ReviewCard**: Exibe resenha com autor, avaliação, texto
- **UserAvatar**: Avatar do usuário com fallback
- **StatusBadge**: Indica status do livro (Lido, Lendo, etc)
- **TabBar**: Navegação inferior com 3-4 abas

## Tipografia

- **Heading 1**: 28px, bold, foreground
- **Heading 2**: 24px, semibold, foreground
- **Heading 3**: 20px, semibold, foreground
- **Body**: 16px, regular, foreground
- **Caption**: 14px, regular, muted
- **Small**: 12px, regular, muted

## Espaçamento

- **xs**: 4px
- **sm**: 8px
- **md**: 12px
- **lg**: 16px
- **xl**: 24px
- **2xl**: 32px

## Interações

- **Press Feedback**: Opacity 0.7 em cards, scale 0.97 em botões
- **Haptics**: Light feedback em taps principais
- **Animações**: Transições suaves de 200-300ms
- **Loading**: Skeleton screens para conteúdo assíncrono

## Orientação
- **Portrait**: 9:16 (padrão móvel)
- **One-handed**: Elementos interativos no terço inferior da tela
