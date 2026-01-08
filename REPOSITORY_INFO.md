# 📦 Informações do Repositório Git

## Status do Repositório

Este repositório foi criado manualmente e está pronto para uso.

### Estatísticas

```bash
# Branch principal
main

# Total de commits
4 commits

# Arquivos rastreados
108 arquivos
```

## Histórico de Commits

```
1728eee (HEAD -> main) docs: add contributing guidelines
a3ee72c chore: add .env.example file
35c4e8b docs: add comprehensive README.md
0928d9a feat: initial commit - BookShelf app structure
```

## Estrutura de Commits

### 1. Initial Commit (0928d9a)
- Setup completo do projeto Expo + React Native
- Configuração de TypeScript, TailwindCSS, tRPC
- Implementação de todas as telas e componentes base
- Configuração de banco de dados e autenticação

### 2. README.md (35c4e8b)
- Documentação completa do projeto
- Instruções de instalação e execução
- Descrição de tecnologias e arquitetura
- Roadmap de funcionalidades

### 3. .env.example (a3ee72c)
- Template de variáveis de ambiente
- Configurações necessárias para desenvolvimento
- Documentação de credenciais OAuth e database

### 4. CONTRIBUTING.md (1728eee)
- Guia de contribuição para desenvolvedores
- Padrões de código e convenções
- Workflow de branches e commits
- Boas práticas de desenvolvimento

## Como Usar Este Repositório

### Clonar o Repositório

Se você quiser clonar este repositório localmente:

```bash
# Navegue até o diretório desejado
cd /caminho/para/seus/projetos

# Clone o repositório
git clone /home/ubuntu/BookShelf1-main bookshelf-app

# Entre no diretório
cd bookshelf-app
```

### Verificar Status

```bash
# Ver status do repositório
git status

# Ver histórico de commits
git log --oneline

# Ver detalhes de um commit específico
git show <commit-hash>

# Ver diferenças entre commits
git diff <commit1> <commit2>
```

### Criar Nova Branch

```bash
# Criar e mudar para nova branch
git checkout -b feature/minha-feature

# Fazer alterações e commit
git add .
git commit -m "feat: adiciona minha feature"

# Voltar para main
git checkout main
```

### Conectar a um Repositório Remoto

Para enviar este repositório para GitHub, GitLab ou outro serviço:

```bash
# Adicionar remote
git remote add origin https://github.com/seu-usuario/bookshelf.git

# Verificar remotes
git remote -v

# Push para o remote
git push -u origin main
```

## Comandos Úteis

### Visualização

```bash
# Ver árvore de commits
git log --graph --oneline --all

# Ver estatísticas de commits
git shortlog -sn

# Ver arquivos modificados em cada commit
git log --stat

# Ver conteúdo de um arquivo em commit específico
git show <commit>:<caminho/do/arquivo>
```

### Navegação

```bash
# Voltar para commit anterior (temporário)
git checkout <commit-hash>

# Voltar para HEAD (commit mais recente)
git checkout main

# Ver diferenças desde último commit
git diff HEAD
```

### Manutenção

```bash
# Verificar integridade do repositório
git fsck

# Limpar arquivos não rastreados
git clean -fd

# Otimizar repositório
git gc
```

## Arquivos Importantes

- **README.md**: Documentação principal do projeto
- **CONTRIBUTING.md**: Guia para contribuidores
- **.env.example**: Template de variáveis de ambiente
- **.gitignore**: Arquivos ignorados pelo Git
- **package.json**: Dependências e scripts do projeto

## Próximos Passos

1. **Instalar dependências**: `pnpm install`
2. **Configurar ambiente**: Copiar `.env.example` para `.env` e preencher
3. **Executar migrações**: `pnpm db:push`
4. **Iniciar desenvolvimento**: `pnpm dev`

## Notas

- Este repositório usa **Conventional Commits** para mensagens de commit
- A branch principal é **main** (não master)
- Todos os commits seguem o padrão semântico
- O histórico está limpo e organizado para fácil navegação

---

**Repositório criado em**: 07 de Janeiro de 2026
**Última atualização**: 07 de Janeiro de 2026
