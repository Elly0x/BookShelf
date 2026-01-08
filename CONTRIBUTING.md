# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o BookShelf! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Padrões de Código](#padrões-de-código)
- [Convenções de Commit](#convenções-de-commit)
- [Estrutura de Branches](#estrutura-de-branches)

## 📜 Código de Conduta

Este projeto segue princípios de respeito mútuo e colaboração. Esperamos que todos os contribuidores:

- Sejam respeitosos e inclusivos
- Aceitem críticas construtivas
- Foquem no que é melhor para a comunidade
- Demonstrem empatia com outros membros

## 🚀 Como Contribuir

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/seu-usuario/bookshelf.git
cd bookshelf

# Adicione o repositório original como upstream
git remote add upstream https://github.com/original/bookshelf.git
```

### 2. Crie uma Branch

```bash
# Atualize sua branch main
git checkout main
git pull upstream main

# Crie uma nova branch para sua feature/fix
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-bug
```

### 3. Faça suas Alterações

- Escreva código limpo e bem documentado
- Siga os padrões de código do projeto
- Adicione testes quando aplicável
- Atualize a documentação se necessário

### 4. Commit e Push

```bash
# Adicione suas alterações
git add .

# Faça commit seguindo as convenções
git commit -m "feat: adiciona funcionalidade X"

# Push para seu fork
git push origin feature/nome-da-feature
```

### 5. Abra um Pull Request

- Vá para o repositório original no GitHub
- Clique em "New Pull Request"
- Selecione sua branch
- Descreva suas alterações detalhadamente
- Aguarde revisão

## 💻 Padrões de Código

### TypeScript

- Use tipos explícitos sempre que possível
- Evite `any`, prefira `unknown` quando necessário
- Use interfaces para objetos e types para uniões/primitivos

```typescript
// ✅ Bom
interface Book {
  id: string;
  title: string;
  author: string;
}

// ❌ Evite
const book: any = { ... };
```

### React Native / React

- Use componentes funcionais com hooks
- Prefira `const` ao invés de `function` para componentes
- Extraia lógica complexa para custom hooks

```typescript
// ✅ Bom
const BookCard = ({ book }: BookCardProps) => {
  const { addToShelf } = useShelf();
  // ...
};

// ❌ Evite
function BookCard(props) {
  // ...
}
```

### Estilização

- Use TailwindCSS (NativeWind) para estilos
- Mantenha classes organizadas e legíveis
- Use o sistema de cores do tema

```typescript
// ✅ Bom
<View className="flex-1 bg-background p-4">
  <Text className="text-2xl font-bold text-foreground">
    Título
  </Text>
</View>
```

### Nomenclatura

- **Componentes**: PascalCase (`BookCard.tsx`)
- **Hooks**: camelCase com prefixo `use` (`useShelf.ts`)
- **Utilitários**: camelCase (`formatDate.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_BOOKS`)
- **Tipos/Interfaces**: PascalCase (`BookStatus`)

## 📝 Convenções de Commit

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

### Formato

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Alterações na documentação
- **style**: Formatação, ponto e vírgula, etc (sem mudança de código)
- **refactor**: Refatoração de código
- **perf**: Melhorias de performance
- **test**: Adição ou correção de testes
- **chore**: Tarefas de manutenção, configs, etc

### Exemplos

```bash
# Feature
git commit -m "feat(shelf): add filter by reading status"

# Bug fix
git commit -m "fix(auth): resolve token expiration issue"

# Documentation
git commit -m "docs: update installation instructions"

# Refactoring
git commit -m "refactor(components): simplify BookCard component"

# Performance
git commit -m "perf(reviews): optimize review loading"
```

### Descrição

- Use o imperativo ("add" não "added" ou "adds")
- Não capitalize a primeira letra
- Não adicione ponto final
- Limite a 72 caracteres
- Seja claro e conciso

## 🌿 Estrutura de Branches

### Branches Principais

- **main**: Branch de produção (sempre estável)
- **develop**: Branch de desenvolvimento (integração de features)

### Branches de Trabalho

- **feature/nome**: Novas funcionalidades
- **fix/nome**: Correções de bugs
- **docs/nome**: Atualizações de documentação
- **refactor/nome**: Refatorações
- **test/nome**: Adição de testes

### Workflow

```
main
  └── develop
       ├── feature/add-search
       ├── feature/book-recommendations
       └── fix/review-submission
```

## 🧪 Testes

Antes de submeter um PR, certifique-se de que:

```bash
# Testes passam
pnpm test

# Não há erros de tipo
pnpm check

# Código está formatado
pnpm format

# Lint está limpo
pnpm lint
```

## 📚 Recursos Úteis

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [tRPC Docs](https://trpc.io/docs)

## ❓ Dúvidas

Se tiver dúvidas sobre como contribuir, abra uma issue com a tag `question` ou entre em contato com os mantenedores.

---

**Obrigado por contribuir! 🎉**
