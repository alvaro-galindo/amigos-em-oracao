# 🙏 Dos Amigos em Oração — Site

Site para visualização e gestão diária das mensagens do grupo de oração,
com tela pública (link para WhatsApp) e painel de administração com banco de dados em nuvem.

---

## 📁 Arquivos do Projeto

```
site/
├── index.html      → Tela pública (o link que você envia no WhatsApp)
├── admin.html      → Painel de administração
├── data.js         → Dados iniciais / fallback offline
├── db.js           → Camada de abstração JSONBin (banco de dados)
├── app.js          → Lógica da tela pública
├── admin.js        → Lógica do painel admin
├── styles.css      → Estilos
├── netlify.toml    → Configuração do deploy no Netlify (build command)
├── build-env.js    → Script de build: gera env-config.js com as credenciais
├── env-config.js   → GERADO AUTOMATICAMENTE no build — não commitar!
└── README.md       → Este arquivo
```

---

## 🚀 Como Publicar — Passo a Passo

> ⚠️ **Mudança importante:** o deploy agora usa um **build command** no Netlify.
> Não use mais "Deploy manually" (arrastar pasta). Siga o Passo 1 abaixo.

### PASSO 1 — Conectar o repositório ao Netlify (deploy automático)

1. Faça push do projeto para um repositório no **GitHub** (pode ser privado)
2. Acesse **https://netlify.com** e faça login
3. Clique em **"Add new site" → "Import an existing project"**
4. Escolha **GitHub** e selecione o repositório
5. Em **"Build settings"**, confirme:
   - **Base directory:** `site`
   - **Build command:** `node build-env.js`
   - **Publish directory:** `site`
6. Clique em **"Deploy site"**

O Netlify vai rodar o `build-env.js`, que gera o `env-config.js` com as credenciais,
e publicar o site. A cada novo push, o site é atualizado automaticamente.

---

### PASSO 2 — Configurar o JSONBin (banco de dados grátis)

O JSONBin armazena os dados do site na nuvem. Quando você salva algo no painel admin,
**todos os visitantes veem a atualização imediatamente** — sem precisar fazer deploy.

#### 2.1 — Criar conta no JSONBin

1. Acesse **https://jsonbin.io** e crie uma conta gratuita
2. Faça login

#### 2.2 — Obter a API Key

1. No painel do JSONBin, clique no ícone do seu perfil → **"API Keys"**
2. Copie a **Master Key** (começa com `$2a$10$...`)
3. **Guarde essa chave em segredo** — ela dá acesso total à sua conta

#### 2.3 — Criar o Bin

1. No painel do JSONBin, clique em **"Create a Bin"**
2. Cole `{}` no editor (ou o conteúdo do `data.js`)
3. Marque como **Private** e dê o nome `amigos-em-oracao`
4. Clique em **"Create Bin"**
5. Copie o **BIN ID** que aparece no topo (ex: `64a1b2c3d4e5f6...`)

---

### PASSO 3 — Configurar as Environment Variables no Netlify ⭐

> Este é o passo que garante que **todos os dispositivos** vejam os mesmos dados.
> As credenciais ficam no servidor do Netlify, não no navegador de ninguém.

1. No painel do Netlify, acesse o seu site → **Site configuration → Environment variables**
   (ou acesse diretamente: `https://app.netlify.com/projects/amigos-em-oracao/configuration/env`)
2. Clique em **"Add a variable"** e adicione as duas variáveis abaixo:

| Key | Value |
|-----|-------|
| `JSONBIN_BIN_ID` | O BIN ID copiado no passo 2.3 (ex: `64a1b2c3d4e5f6...`) |
| `JSONBIN_API_KEY` | Sua Master Key do JSONBin (ex: `$2a$10$...`) |

3. Clique em **"Save"**
4. Vá em **Deploys → "Trigger deploy" → "Deploy site"** para aplicar as variáveis

A partir desse deploy, o `build-env.js` vai gerar o `env-config.js` com as credenciais
embutidas. Qualquer pessoa que abrir o site já se conecta ao JSONBin automaticamente —
**sem precisar configurar nada no painel admin**.

#### 2.4 — Verificar se está funcionando

O badge no topo do painel admin mostrará:
- 🟢 **JSONBin conectado** → tudo certo, dados salvos na nuvem
- 🌐 **Configurado via Netlify** → credenciais vêm das env vars (ideal!)
- 🟡 **Só local (sem JSONBin)** → env vars não configuradas, dados só no seu navegador
- 🔴 **Erro na conexão** → verifique o BIN ID e a API Key nas env vars

---

## ✏️ Como Usar o Painel Admin

1. Abra o site público e clique no botão **⚙️** (canto inferior direito)
2. Ou acesse diretamente: `https://seu-site.netlify.app/admin.html`
3. Faça login (senha padrão: `oracao2026`)

### Abas disponíveis:

| Aba | O que faz |
|-----|-----------|
| 📋 **Geral** | Data, título, lema, orador do dia, rodapé |
| 🎵 **Hino** | Número, título, referência e link do YouTube |
| 🙏 **Pedidos** | Adicionar/editar/remover pedidos, arrastar para reordenar |
| 📖 **Motivos** | Motivos gerais de oração com links do YouTube |
| 👥 **Lista** | Intercedidos com drag-and-drop e rodízio automático |
| 🔧 **Config** | Configurações gerais, JSONBin e exportação |

---

## 🔄 Rotina Diária Sugerida

Cada dia, no painel admin:

1. **Aba Geral** → atualizar a data
2. **Aba Hino** → trocar o hino e link do YouTube
3. **Aba Geral** → trocar o orador do dia
4. **Aba Lista** → clicar em **"🔄 Rodar Lista"** (move o primeiro para o fim)
5. **Aba Pedidos** → adicionar novos pedidos ou marcar gratidões
6. **Aba Mensagem** (no site público) → copiar e enviar no WhatsApp

Cada "Salvar" publica **instantaneamente** para todos os usuários.

---

## 📲 Mensagem Diária para o WhatsApp

Na aba **📲 Mensagem** do site público:

- **📋 Copiar Mensagem Resumida** — hino + link do YouTube + intercedido do dia + link do site
- **📄 Copiar Mensagem Completa** — todos os pedidos formatados para WhatsApp
- **Enviar no WhatsApp** — abre direto no app com a mensagem pronta

---

## 🔐 Segurança

- Troque a senha padrão `oracao2026` antes de publicar (Admin → Config)
- A API Key do JSONBin fica nas **Environment Variables do Netlify** — nunca no código
- O arquivo `env-config.js` é gerado no build e está no `.gitignore` — nunca vai para o Git
- O BIN é privado por padrão — só quem tem a API Key consegue escrever
- O site público só lê os dados — não pode modificar nada

---

## 💡 Como Funciona o Banco de Dados

```
Deploy no Netlify
      ↓
build-env.js lê JSONBIN_BIN_ID e JSONBIN_API_KEY das env vars
      ↓
Gera env-config.js com window.ENV_CONFIG = { binId, apiKey }
      ↓
Todos os dispositivos carregam env-config.js ao abrir o site
      ↓
db.js usa as credenciais automaticamente ✅

─────────────────────────────────────────────

Admin salva algo
      ↓
DB.salvar(dados)
      ↓
PUT https://api.jsonbin.io/v3/b/{BIN_ID}  ← atualiza na nuvem
      ↓
localStorage atualizado como cache (5 min)

─────────────────────────────────────────────

Visitante abre o site (qualquer dispositivo)
      ↓
DB.ler()
      ↓
Cache válido (< 5 min)? → usa cache (resposta instantânea)
      ↓ (não)
GET https://api.jsonbin.io/v3/b/{BIN_ID}/latest  ← busca da nuvem
      ↓
Renderiza com dados atualizados para todos 🟢
```

**Limite gratuito do JSONBin:** 10.000 leituras/mês e 2.000 escritas/mês.
Para uso diário de um grupo de oração, é mais que suficiente.

---

## 🆘 Problemas Comuns

**"Só local (sem JSONBin)" — dados não sincronizam entre dispositivos**
→ As env vars `JSONBIN_BIN_ID` e `JSONBIN_API_KEY` não foram configuradas no Netlify,
  ou o site foi deployado sem passar pelo build command.
  Siga o Passo 3 acima e faça um novo deploy.

**"Erro na conexão"**
→ Verifique se o BIN ID e a API Key nas env vars do Netlify estão corretos.
  A Master Key começa com `$2a$10$`. Faça um novo deploy após corrigir.

**Dados diferentes em dispositivos diferentes**
→ Clique em "🔄 Sincronizar agora" na aba Config para forçar busca do banco.
  Se o problema persistir, verifique se as env vars estão configuradas (Passo 3).

**Preciso usar sem internet**
→ O site usa o cache local automaticamente como fallback offline.

**Desenvolvendo localmente (sem Netlify)**
→ Rode `node build-env.js` na pasta `site/` para gerar o `env-config.js` local.
  Defina as variáveis no ambiente antes: `$env:JSONBIN_BIN_ID="seu-id"` (PowerShell)
  ou `export JSONBIN_BIN_ID="seu-id"` (bash).
  Sem isso, o site funciona normalmente usando o localStorage como fallback.
