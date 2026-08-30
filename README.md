# 🙏 Dos Amigos em Oração — Site

Site para visualização e gestão diária das mensagens do grupo de oração,
com tela pública (link para WhatsApp) e painel de administração com banco de dados em nuvem.

---

## 📁 Arquivos do Projeto

```
site/
├── index.html   → Tela pública (o link que você envia no WhatsApp)
├── admin.html   → Painel de administração
├── data.js      → Dados iniciais / fallback offline
├── db.js        → Camada de abstração JSONBin (banco de dados)
├── app.js       → Lógica da tela pública
├── admin.js     → Lógica do painel admin
├── styles.css   → Estilos
└── README.md    → Este arquivo
```

---

## 🚀 Como Publicar — Passo a Passo

### PASSO 1 — Publicar no Netlify (grátis, sem código)

1. Acesse **https://netlify.com** e crie uma conta gratuita
2. Clique em **"Add new site" → "Deploy manually"**
3. Arraste a pasta `site/` inteira para a área indicada
4. Em segundos o site estará no ar com um link como `https://nome-aleatorio.netlify.app`
5. Opcionalmente personalize o subdomínio em **Site settings → Domain**

**Para atualizar:** basta arrastar a pasta novamente no mesmo site.

---

### PASSO 2 — Configurar o JSONBin (banco de dados grátis)

O JSONBin armazena os dados do site na nuvem. Quando você salva algo no painel admin, **todos os visitantes veem a atualização imediatamente** — sem precisar fazer deploy.

#### 2.1 — Criar conta no JSONBin

1. Acesse **https://jsonbin.io** e crie uma conta gratuita
2. Faça login

#### 2.2 — Obter a API Key

1. No painel do JSONBin, clique no ícone do seu perfil → **"API Keys"**
2. Copie a **Master Key** (começa com `$2a$10$...`)
3. **Guarde essa chave em segredo** — ela dá acesso total à sua conta

#### 2.3 — Criar o Bin (pode fazer pelo painel admin!)

Opção A — Pelo painel admin do site (mais fácil):
1. Abra `https://seu-site.netlify.app/admin.html`
2. Faça login (senha padrão: `oracao2026`)
3. Vá em **Config → seção "🗄️ Banco de Dados"**
4. Cole sua **Master Key** no campo API Key (clique em "👁️ Editar")
5. Clique em **"✨ Criar novo Bin"**
6. O BIN ID será preenchido automaticamente — **anote esse ID!**
7. Clique em **"🔌 Conectar ao JSONBin"**
8. O indicador no topo mudará para 🟢 **JSONBin conectado**

Opção B — Criar manualmente em jsonbin.io:
1. No painel do JSONBin, clique em **"Create a Bin"**
2. Cole o conteúdo do seu `data.js` no editor
3. Marque como **Private** e dê o nome `amigos-em-oracao`
4. Clique em **"Create Bin"**
5. Copie o **BIN ID** que aparece no topo (ex: `64a1b2c3d4e5f6...`)
6. No painel admin → Config → Banco de Dados: cole o BIN ID e a API Key
7. Clique em **"🔌 Conectar ao JSONBin"**

#### 2.4 — Verificar se está funcionando

O badge no topo do painel admin mostrará:
- 🟢 **JSONBin conectado** → tudo certo, dados salvos na nuvem
- 🟡 **Só local (sem JSONBin)** → sem configuração, dados só no seu navegador
- 🔴 **Erro na conexão** → verifique o BIN ID e a API Key

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

Cada "Salvar" publica **instantaneamente** para todos os usuários (se JSONBin configurado).

---

## 📲 Mensagem Diária para o WhatsApp

Na aba **📲 Mensagem** do site público:

- **📋 Copiar Mensagem Resumida** — hino + link do YouTube + intercedido do dia + link do site
- **📄 Copiar Mensagem Completa** — todos os pedidos formatados para WhatsApp
- **Enviar no WhatsApp** — abre direto no app com a mensagem pronta

---

## 🔐 Segurança

- Troque a senha padrão `oracao2026` antes de publicar (Admin → Config)
- A API Key do JSONBin fica salva **apenas no seu navegador** (localStorage), nunca no código
- O BIN é privado por padrão — só quem tem a API Key consegue escrever
- O site público só lê os dados — não pode modificar nada

---

## 💡 Como Funciona o Banco de Dados

```
Admin salva algo
      ↓
DB.salvar(dados)
      ↓
PUT https://api.jsonbin.io/v3/b/{BIN_ID}  ← atualiza na nuvem
      ↓
localStorage atualizado como cache (5 min)

Visitante abre o site
      ↓
DB.ler()
      ↓
Cache válido? → usa cache (resposta instantânea)
      ↓ (não)
GET https://api.jsonbin.io/v3/b/{BIN_ID}/latest  ← busca da nuvem
      ↓
Renderiza com dados atualizados
```

**Limite gratuito do JSONBin:** 10.000 leituras/mês e 2.000 escritas/mês.
Para uso diário de um grupo de oração, é mais que suficiente.

---

## 🆘 Problemas Comuns

**"Só local (sem JSONBin)"**
→ Configure o BIN ID e API Key na aba Config do admin.

**"Erro na conexão"**
→ Verifique se o BIN ID e a API Key estão corretos. A Master Key começa com `$2a$10$`.

**Dados diferentes em dispositivos diferentes**
→ Clique em "🔄 Sincronizar agora" na aba Config para forçar busca do banco.

**Preciso usar sem internet**
→ O site usa o cache local automaticamente como fallback offline.
