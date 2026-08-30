// ============================================================
// ADMIN.JS — Painel de administração
// Usa DB.js para ler/salvar no JSONBin. localStorage = cache.
// ============================================================

(function () {
  "use strict";

  // ============================================================
  // LOGIN
  // ============================================================
  const loginScreen = document.getElementById("login-screen");
  const adminPanel  = document.getElementById("admin-panel");
  const senhaInput  = document.getElementById("senha-input");
  const loginError  = document.getElementById("login-error");

  let dados = null; // carregado após login

  if (sessionStorage.getItem("admin_logado") === "1") {
    loginScreen.style.display = "none";
    adminPanel.style.display  = "block";
    carregarEInicializar();
  }

  document.getElementById("btn-login").addEventListener("click", () => fazerLogin());
  senhaInput.addEventListener("keydown", e => { if (e.key === "Enter") fazerLogin(); });

  async function fazerLogin() {
    // Primeiro carrega os dados para pegar a senha configurada no banco
    setBtnLogin(true);
    let dadosTemp;
    try { dadosTemp = await DB.ler(); } catch(e) { dadosTemp = JSON.parse(JSON.stringify(SITE_DATA)); }

    const correta = (dadosTemp.config && dadosTemp.config.senhaAdmin)
      ? dadosTemp.config.senhaAdmin
      : (SITE_DATA.config && SITE_DATA.config.senhaAdmin ? SITE_DATA.config.senhaAdmin : "oracao2026");

    setBtnLogin(false);

    if (senhaInput.value === correta) {
      dados = dadosTemp;
      sessionStorage.setItem("admin_logado", "1");
      loginScreen.style.display = "none";
      adminPanel.style.display  = "block";
      loginError.style.display  = "none";
      inicializar();
    } else {
      loginError.style.display = "block";
      senhaInput.value = "";
      senhaInput.focus();
    }
  }

  function setBtnLogin(carregando) {
    const btn = document.getElementById("btn-login");
    btn.disabled = carregando;
    btn.textContent = carregando ? "Verificando..." : "Entrar";
  }

  async function carregarEInicializar() {
    mostrarLoadingAdmin(true);
    try { dados = await DB.ler(); } catch(e) { dados = JSON.parse(JSON.stringify(SITE_DATA)); }
    mostrarLoadingAdmin(false);
    inicializar();
  }

  function mostrarLoadingAdmin(ativo) {
    const el = document.getElementById("admin-loading");
    if (el) el.style.display = ativo ? "flex" : "none";
    const content = document.getElementById("admin-content-wrap");
    if (content) content.style.display = ativo ? "none" : "block";
  }

  // ============================================================
  // SALVAR NO JSONBIN — wrapper central com feedback visual
  // ============================================================
  async function salvar(msgSucesso) {
    mostrarStatusSalvando(true);
    const resultado = await DB.salvar(dados);
    mostrarStatusSalvando(false);

    if (resultado.ok) {
      showToast(msgSucesso || "✅ Salvo no banco!");
      atualizarIndicadorDB(true);
    } else if (resultado.local) {
      showToast("💾 Salvo localmente. Configure o JSONBin para sincronizar.", 4000);
      atualizarIndicadorDB(false);
    } else {
      showToast("❌ Erro: " + resultado.erro, 4000);
    }
  }

  function mostrarStatusSalvando(ativo) {
    const el = document.getElementById("db-saving-indicator");
    if (el) el.style.display = ativo ? "inline-flex" : "none";
  }

  function atualizarIndicadorDB(conectado) {
    const el = document.getElementById("db-status-badge");
    if (!el) return;
    if (conectado) {
      el.textContent = "🟢 JSONBin conectado";
      el.style.background = "#e8faf0"; el.style.color = "#1a9e55";
    } else {
      el.textContent = DB.isConfigurado() ? "🔴 Erro na conexão" : "🟡 Só local (sem JSONBin)";
      el.style.background = DB.isConfigurado() ? "#fde8e8" : "#fff8e0";
      el.style.color      = DB.isConfigurado() ? "#c0392b" : "#b07800";
    }
  }

  // ============================================================
  // INICIALIZAR PAINEL
  // ============================================================
  function inicializar() {
    preencherGeral();
    preencherHino();
    renderPedidosAdmin();
    renderMotivosAdmin();
    renderListaAdmin();
    preencherConfig();
    preencherJsonbinConfig();
    iniciarAbas();

    // Mostra status atual da conexão
    atualizarIndicadorDB(DB.isConfigurado());
  }

  // ============================================================
  // ABAS
  // ============================================================
  function iniciarAbas() {
    document.querySelectorAll(".admin-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".admin-section").forEach(s => s.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById("atab-" + tab.dataset.tab).classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  // ============================================================
  // ABA GERAL
  // ============================================================
  function preencherGeral() {
    document.getElementById("g-titulo").value        = dados.titulo || "";
    document.getElementById("g-subtitulo").value     = dados.subtitulo || "";
    document.getElementById("g-data").value          = dados.data || "";
    document.getElementById("g-lema").value          = (dados.lema || []).join("\n");
    document.getElementById("g-orador").value        = dados.orador || "";
    document.getElementById("g-representacao").value = dados.representacao || "";
    document.getElementById("g-rodape").value        = dados.rodape || "";
  }

  document.getElementById("btn-salvar-geral").addEventListener("click", async () => {
    dados.titulo        = document.getElementById("g-titulo").value.trim();
    dados.subtitulo     = document.getElementById("g-subtitulo").value.trim();
    dados.data          = document.getElementById("g-data").value.trim();
    dados.lema          = document.getElementById("g-lema").value.split("\n").map(s => s.trim()).filter(Boolean);
    dados.orador        = document.getElementById("g-orador").value.trim();
    dados.representacao = document.getElementById("g-representacao").value.trim();
    dados.rodape        = document.getElementById("g-rodape").value.trim();
    await salvar("✅ Informações gerais salvas!");
  });

  // ============================================================
  // ABA HINO
  // ============================================================
  function preencherHino() {
    if (!dados.hinodia) dados.hinodia = {};
    document.getElementById("h-referencia").value = dados.hinodia.referencia || "";
    document.getElementById("h-numero").value     = dados.hinodia.numero     || "";
    document.getElementById("h-titulo").value     = dados.hinodia.titulo     || "";
    document.getElementById("h-link").value       = dados.hinodia.link       || "";
  }

  document.getElementById("btn-salvar-hino").addEventListener("click", async () => {
    dados.hinodia = {
      referencia: document.getElementById("h-referencia").value.trim(),
      numero:     document.getElementById("h-numero").value.trim(),
      titulo:     document.getElementById("h-titulo").value.trim(),
      link:       document.getElementById("h-link").value.trim()
    };
    await salvar("✅ Hino do dia salvo!");
  });

  // ============================================================
  // ABA PEDIDOS — drag-and-drop + início/fim
  // ============================================================
  function pedidosEditaveis() {
    return dados.pedidos
      .map((p, idx) => ({ p, idx }))
      .filter(({ p }) => !p.destaque);
  }

  function renderPedidosAdmin() {
    const container = document.getElementById("pedidos-admin-list");
    container.innerHTML = "";
    const editaveis = pedidosEditaveis();
    if (!editaveis.length) {
      container.innerHTML = '<div style="color:var(--texto-suave);text-align:center;padding:20px">Nenhum pedido cadastrado.</div>';
      return;
    }

    editaveis.forEach(({ p, idx }, posicao) => {
      const card = document.createElement("div");
      card.className = "admin-card drag-card";
      card.setAttribute("draggable", "true");
      card.dataset.realIdx = idx;
      card.dataset.pos     = posicao;

      let badges = "";
      if (p.milagre)       badges += `<span class="badge badge-milagre">✨ Milagre</span> `;
      if (p.agradecimento) badges += `<span class="badge badge-gratidao">🙌 Gratidão</span> `;
      if (p.urgente)       badges += `<span class="badge badge-urgente">⚡ Urgente</span> `;

      const primeiro = posicao === 0;
      const ultimo   = posicao === editaveis.length - 1;

      card.innerHTML = `
        <div style="display:flex;align-items:flex-start;gap:8px">
          <div class="drag-handle">☰</div>
          <div style="flex:1;min-width:0">
            ${badges}
            <div class="admin-card-nome">${p.nome || "(sem nome)"}</div>
            <div class="admin-card-sub">${p.de ? "De: " + p.de : ""} ${p.pedido ? "| " + p.pedido.substring(0, 55) + (p.pedido.length > 55 ? "..." : "") : ""}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0">
            <button class="btn-sm" style="background:#e8f0ff;color:var(--roxo)" data-action="editar"  data-idx="${idx}">✏️</button>
            <button class="btn-sm" style="background:#fde8e8;color:var(--vermelho)" data-action="excluir" data-idx="${idx}">🗑️</button>
            <button class="btn-sm" style="background:#f0f0f0;color:#333;${primeiro?"opacity:0.3;pointer-events:none":""}" data-action="topo" data-idx="${idx}" title="Mover para o início">⬆️</button>
            <button class="btn-sm" style="background:#f0f0f0;color:#333;${ultimo ?"opacity:0.3;pointer-events:none":""}" data-action="fim"  data-idx="${idx}" title="Mover para o fim">⬇️</button>
          </div>
        </div>`;
      container.appendChild(card);
    });

    container.querySelectorAll("[data-action='editar']").forEach(btn =>
      btn.addEventListener("click", () => abrirModalPedido(parseInt(btn.dataset.idx))));
    container.querySelectorAll("[data-action='excluir']").forEach(btn =>
      btn.addEventListener("click", () => excluirPedido(parseInt(btn.dataset.idx))));
    container.querySelectorAll("[data-action='topo']").forEach(btn =>
      btn.addEventListener("click", () => moverPedido(parseInt(btn.dataset.idx), "inicio")));
    container.querySelectorAll("[data-action='fim']").forEach(btn =>
      btn.addEventListener("click", () => moverPedido(parseInt(btn.dataset.idx), "fim")));

    ativarDragDrop(container, ".drag-card", reordenarPedidos);
  }

  async function excluirPedido(realIdx) {
    if (!confirm("Excluir este pedido?")) return;
    dados.pedidos.splice(realIdx, 1);
    renderPedidosAdmin();
    await salvar("🗑️ Pedido removido.");
  }

  async function moverPedido(realIdx, destino) {
    const item = dados.pedidos[realIdx];
    if (!item || item.destaque) return;
    const editaveis = dados.pedidos.filter(p => !p.destaque);
    const pos = editaveis.findIndex(p => p === item);
    if (pos < 0) return;
    editaveis.splice(pos, 1);
    if (destino === "inicio") editaveis.unshift(item);
    else                      editaveis.push(item);
    dados.pedidos = reconstruirPedidos(editaveis);
    renderPedidosAdmin();
    await salvar(destino === "inicio" ? "⬆️ Movido para o início." : "⬇️ Movido para o fim.");
  }

  async function reordenarPedidos(novaOrdemCards) {
    const novaOrdem = novaOrdemCards.map(card =>
      dados.pedidos[parseInt(card.dataset.realIdx)]
    ).filter(Boolean);
    dados.pedidos = reconstruirPedidos(novaOrdem);
    renderPedidosAdmin();
    await salvar("↕️ Ordem dos pedidos salva!");
  }

  function reconstruirPedidos(editaveis) {
    const resultado = [];
    editaveis.forEach((p, i) => {
      if (i > 0 && i % 10 === 0) resultado.push({ tipo: "reavivamento", destaque: true, descricao: "" });
      resultado.push(p);
    });
    return resultado;
  }

  // --- Modal Pedido ---
  const modalPedido = document.getElementById("modal-pedido");

  function abrirModalPedido(realIdx) {
    const p = realIdx >= 0 ? dados.pedidos[realIdx] : null;
    document.getElementById("modal-pedido-titulo").textContent  = p ? "Editar Pedido" : "Novo Pedido";
    document.getElementById("mp-idx").value             = realIdx;
    document.getElementById("mp-tipo").value            = p ? (p.tipo || "pedido") : "pedido";
    document.getElementById("mp-de").value              = p ? (p.de || "") : "";
    document.getElementById("mp-nome").value            = p ? (p.nome || "") : "";
    document.getElementById("mp-detalhe").value         = p ? (p.detalhe || "") : "";
    document.getElementById("mp-pedido").value          = p ? (p.pedido || "") : "";
    document.getElementById("mp-descricao").value       = p ? (p.descricao || "") : "";
    document.getElementById("mp-urgente").checked       = p ? !!p.urgente : false;
    document.getElementById("mp-agradecimento").checked = p ? !!p.agradecimento : false;
    document.getElementById("mp-milagre").checked       = p ? !!p.milagre : false;
    modalPedido.classList.add("open");
  }

  document.getElementById("btn-novo-pedido").addEventListener("click", () => abrirModalPedido(-1));
  document.getElementById("modal-pedido-close").addEventListener("click", () => modalPedido.classList.remove("open"));
  modalPedido.addEventListener("click", e => { if (e.target === modalPedido) modalPedido.classList.remove("open"); });

  document.getElementById("btn-salvar-pedido").addEventListener("click", async () => {
    const realIdx = parseInt(document.getElementById("mp-idx").value);
    const pedido = {
      tipo:          document.getElementById("mp-tipo").value,
      de:            document.getElementById("mp-de").value.trim(),
      nome:          document.getElementById("mp-nome").value.trim(),
      detalhe:       document.getElementById("mp-detalhe").value.trim(),
      pedido:        document.getElementById("mp-pedido").value.trim(),
      descricao:     document.getElementById("mp-descricao").value.trim(),
      urgente:       document.getElementById("mp-urgente").checked,
      agradecimento: document.getElementById("mp-agradecimento").checked,
      milagre:       document.getElementById("mp-milagre").checked
    };
    if (!pedido.nome) { showToast("⚠️ Informe o nome!"); return; }

    if (realIdx >= 0) dados.pedidos[realIdx] = pedido;
    else { if (!dados.pedidos) dados.pedidos = []; dados.pedidos.push(pedido); }

    renderPedidosAdmin();
    modalPedido.classList.remove("open");
    await salvar("✅ Pedido salvo!");
  });

  // ============================================================
  // ABA MOTIVOS GERAIS
  // ============================================================
  function renderMotivosAdmin() {
    const container = document.getElementById("motivos-admin-list");
    container.innerHTML = "";
    (dados.motivosGerais || []).forEach((m, idx) => {
      const card = document.createElement("div");
      card.className = "admin-card";
      card.innerHTML = `
        <div class="admin-card-header">
          <div>
            <div class="admin-card-nome">${m.titulo}</div>
            <div class="admin-card-sub">${m.referencia || ""} ${m.link ? "| 🎵 Link YouTube" : ""}</div>
          </div>
          <div class="admin-card-acoes">
            <button class="btn-sm" style="background:#e8f0ff;color:var(--roxo)" data-action="editar" data-idx="${idx}">✏️ Editar</button>
            <button class="btn-sm" style="background:#fde8e8;color:var(--vermelho)" data-action="excluir" data-idx="${idx}">🗑️</button>
          </div>
        </div>`;
      container.appendChild(card);
    });
    container.querySelectorAll("[data-action='editar']").forEach(btn =>
      btn.addEventListener("click", () => abrirModalMotivo(parseInt(btn.dataset.idx))));
    container.querySelectorAll("[data-action='excluir']").forEach(btn =>
      btn.addEventListener("click", async () => {
        if (!confirm("Excluir este motivo?")) return;
        dados.motivosGerais.splice(parseInt(btn.dataset.idx), 1);
        renderMotivosAdmin();
        await salvar("🗑️ Motivo removido.");
      }));
  }

  const modalMotivo = document.getElementById("modal-motivo");

  function abrirModalMotivo(idx) {
    const m = idx >= 0 ? dados.motivosGerais[idx] : null;
    document.getElementById("modal-motivo-titulo").textContent = m ? "Editar Motivo" : "Novo Motivo";
    document.getElementById("mm-idx").value        = idx;
    document.getElementById("mm-titulo").value     = m ? (m.titulo || "") : "";
    document.getElementById("mm-referencia").value = m ? (m.referencia || "") : "";
    document.getElementById("mm-link").value       = m ? (m.link || "") : "";
    document.getElementById("mm-descricao").value  = m ? (m.descricao || "") : "";
    modalMotivo.classList.add("open");
  }

  document.getElementById("btn-novo-motivo").addEventListener("click", () => abrirModalMotivo(-1));
  document.getElementById("modal-motivo-close").addEventListener("click", () => modalMotivo.classList.remove("open"));
  modalMotivo.addEventListener("click", e => { if (e.target === modalMotivo) modalMotivo.classList.remove("open"); });

  document.getElementById("btn-salvar-motivo").addEventListener("click", async () => {
    const idx = parseInt(document.getElementById("mm-idx").value);
    const motivo = {
      titulo:     document.getElementById("mm-titulo").value.trim(),
      referencia: document.getElementById("mm-referencia").value.trim(),
      link:       document.getElementById("mm-link").value.trim(),
      descricao:  document.getElementById("mm-descricao").value.trim()
    };
    if (!motivo.titulo) { showToast("⚠️ Informe o título!"); return; }
    if (idx >= 0) dados.motivosGerais[idx] = motivo;
    else { if (!dados.motivosGerais) dados.motivosGerais = []; dados.motivosGerais.push(motivo); }
    renderMotivosAdmin();
    modalMotivo.classList.remove("open");
    await salvar("✅ Motivo salvo!");
  });

  // ============================================================
  // ABA LISTA — drag-and-drop + rodízio + intercedido do dia
  // ============================================================
  function atualizarIntercedidoDia() {
    const nome = dados.lista && dados.lista.length > 0 ? dados.lista[0] : "—";
    const el = document.getElementById("intercedido-dia-display");
    if (el) el.textContent = nome;
    dados.intercedidoDia = nome;
  }

  function renderListaAdmin() {
    const container = document.getElementById("lista-drag-container");
    if (!container) return;
    container.innerHTML = "";
    atualizarIntercedidoDia();
    sincronizarTextarea();

    (dados.lista || []).forEach((nome, idx) => {
      const item = document.createElement("div");
      item.className = "admin-card drag-card";
      item.setAttribute("draggable", "true");
      item.dataset.listaIdx = idx;
      item.style.cssText    = "margin-bottom:6px;padding:10px 12px";

      const primeiro = idx === 0;
      const ultimo   = idx === (dados.lista.length - 1);

      item.innerHTML = `
        <div style="display:flex;align-items:center;gap:8px">
          <div class="drag-handle">☰</div>
          <span style="font-size:0.72rem;font-weight:700;color:var(--roxo-light);min-width:22px;text-align:right;flex-shrink:0">${idx + 1}</span>
          ${primeiro ? '<span style="font-size:0.65rem;background:#e8f2ff;color:var(--azul);padding:1px 6px;border-radius:4px;font-weight:700;flex-shrink:0">📌 Hoje</span>' : ""}
          <span style="flex:1;font-size:0.88rem">${nome}</span>
          <div style="display:flex;gap:4px;flex-shrink:0">
            <button class="btn-sm" style="background:#fde8e8;color:var(--vermelho)" data-action="excluir-lista" data-idx="${idx}">🗑️</button>
            <button class="btn-sm" style="background:#f0f0f0;color:#333;${primeiro?"opacity:0.3;pointer-events:none":""}" data-action="lista-topo" data-idx="${idx}">⬆️</button>
            <button class="btn-sm" style="background:#f0f0f0;color:#333;${ultimo ?"opacity:0.3;pointer-events:none":""}" data-action="lista-fim"  data-idx="${idx}">⬇️</button>
          </div>
        </div>`;
      container.appendChild(item);
    });

    container.querySelectorAll("[data-action='excluir-lista']").forEach(btn =>
      btn.addEventListener("click", async () => {
        const idx = parseInt(btn.dataset.idx);
        if (!confirm(`Remover "${dados.lista[idx]}"?`)) return;
        dados.lista.splice(idx, 1);
        renderListaAdmin();
        await salvar("🗑️ Removido da lista.");
      }));

    container.querySelectorAll("[data-action='lista-topo']").forEach(btn =>
      btn.addEventListener("click", async () => {
        const [item] = dados.lista.splice(parseInt(btn.dataset.idx), 1);
        dados.lista.unshift(item);
        renderListaAdmin();
        await salvar("⬆️ Movido para o início.");
      }));

    container.querySelectorAll("[data-action='lista-fim']").forEach(btn =>
      btn.addEventListener("click", async () => {
        const [item] = dados.lista.splice(parseInt(btn.dataset.idx), 1);
        dados.lista.push(item);
        renderListaAdmin();
        await salvar("⬇️ Movido para o fim.");
      }));

    ativarDragDrop(container, ".drag-card", async (novaOrdem) => {
      dados.lista = novaOrdem.map(el => dados.lista[parseInt(el.dataset.listaIdx)]).filter(Boolean);
      renderListaAdmin();
      await salvar("↕️ Ordem da lista salva!");
    });
  }

  function sincronizarTextarea() {
    const ta = document.getElementById("lista-textarea");
    if (ta) ta.value = (dados.lista || []).join("\n");
  }

  document.getElementById("btn-rodar-lista") &&
  document.getElementById("btn-rodar-lista").addEventListener("click", async () => {
    if (!dados.lista || dados.lista.length < 2) { showToast("⚠️ Lista tem menos de 2 pessoas."); return; }
    const primeiro = dados.lista.shift();
    dados.lista.push(primeiro);
    renderListaAdmin();
    await salvar(`🔄 Rodízio feito! Intercedido de hoje: ${dados.lista[0]}`);
  });

  document.getElementById("btn-nova-pessoa").addEventListener("click", async () => {
    const nome = prompt("Nome da pessoa ou família:");
    if (!nome || !nome.trim()) return;
    if (!dados.lista) dados.lista = [];
    dados.lista.push(nome.trim());
    renderListaAdmin();
    await salvar("✅ Adicionado: " + nome.trim());
  });

  document.getElementById("btn-salvar-lista").addEventListener("click", async () => {
    dados.lista = document.getElementById("lista-textarea").value
      .split("\n").map(s => s.trim()).filter(Boolean);
    renderListaAdmin();
    await salvar("✅ Lista salva! " + dados.lista.length + " pessoas.");
  });

  // ============================================================
  // ABA CONFIG — configurações gerais + JSONBin
  // ============================================================
  function preencherConfig() {
    if (!dados.config) dados.config = {};
    document.getElementById("c-nome").value = dados.config.nomeGrupo || "";
    document.getElementById("c-link").value = dados.config.linkSite  || "";
    document.getElementById("c-msg").value  = dados.config.mensagemWhatsApp || "";
  }

  function preencherJsonbinConfig() {
    const cfg = DB.getConfig();
    document.getElementById("c-bin-id").value  = cfg.binId  || "";
    document.getElementById("c-api-key").value = cfg.apiKey ? "••••••••" : "";
    atualizarIndicadorDB(DB.isConfigurado());
  }

  document.getElementById("btn-salvar-config").addEventListener("click", async () => {
    if (!dados.config) dados.config = {};
    dados.config.nomeGrupo        = document.getElementById("c-nome").value.trim();
    dados.config.linkSite         = document.getElementById("c-link").value.trim();
    dados.config.mensagemWhatsApp = document.getElementById("c-msg").value;
    const novaSenha = document.getElementById("c-senha").value;
    if (novaSenha.trim()) {
      dados.config.senhaAdmin = novaSenha.trim();
      document.getElementById("c-senha").value = "";
    }
    await salvar("✅ Configurações salvas!");
  });

  // --- Configurar JSONBin ---
  document.getElementById("btn-salvar-jsonbin") &&
  document.getElementById("btn-salvar-jsonbin").addEventListener("click", async () => {
    const binId  = document.getElementById("c-bin-id").value.trim();
    const apiKey = document.getElementById("c-api-key-real").value.trim();

    if (!binId || !apiKey) { showToast("⚠️ Preencha o BIN ID e a API Key!"); return; }

    DB.setConfig(binId, apiKey);
    document.getElementById("c-api-key").value      = "••••••••";
    document.getElementById("c-api-key-real").value = "";

    // Testa lendo do bin
    showToast("🔄 Testando conexão...", 2000);
    DB.invalidarCache();
    const resultado = await DB.salvar(dados);
    if (resultado.ok) {
      showToast("✅ JSONBin configurado e conectado! Os dados foram sincronizados.");
      atualizarIndicadorDB(true);
    } else {
      showToast("❌ Não foi possível conectar: " + resultado.erro, 5000);
      atualizarIndicadorDB(false);
    }
  });

  // --- Criar novo Bin automaticamente ---
  document.getElementById("btn-criar-bin") &&
  document.getElementById("btn-criar-bin").addEventListener("click", async () => {
    const apiKey = document.getElementById("c-api-key-real").value.trim();
    if (!apiKey) { showToast("⚠️ Informe a API Key primeiro!"); return; }

    showToast("🔄 Criando bin...", 3000);
    const resultado = await DB.criarBin(apiKey, "amigos-em-oracao", dados);
    if (resultado.ok) {
      document.getElementById("c-bin-id").value      = resultado.binId;
      document.getElementById("c-api-key").value     = "••••••••";
      document.getElementById("c-api-key-real").value = "";
      showToast(`✅ Bin criado! ID: ${resultado.binId}. Anote esse ID!`, 6000);
      atualizarIndicadorDB(true);
    } else {
      showToast("❌ Erro ao criar bin: " + resultado.erro, 5000);
    }
  });

  // Toggle mostrar/ocultar API key
  document.getElementById("btn-toggle-apikey") &&
  document.getElementById("btn-toggle-apikey").addEventListener("click", () => {
    const realInput  = document.getElementById("c-api-key-real");
    const maskInput  = document.getElementById("c-api-key");
    const btn        = document.getElementById("btn-toggle-apikey");
    const estaOculto = realInput.style.display === "none" || realInput.style.display === "";

    if (estaOculto) {
      const cfg = DB.getConfig();
      realInput.value         = cfg.apiKey || "";
      realInput.style.display = "block";
      maskInput.style.display = "none";
      btn.textContent         = "🙈 Ocultar";
    } else {
      realInput.style.display = "none";
      maskInput.style.display = "block";
      btn.textContent         = "👁️ Editar";
    }
  });

  // --- Download data.js ---
  document.getElementById("btn-download-datajs").addEventListener("click", () => {
    const linhas = [
      "// ============================================================",
      `// DATA.JS — Gerado pelo painel Admin em ${new Date().toLocaleString("pt-BR")}`,
      "// ============================================================",
      "",
      "const SITE_DATA = " + JSON.stringify(dados, null, 2) + ";",
      "",
      "if (typeof module !== 'undefined') module.exports = SITE_DATA;"
    ];
    const blob = new Blob([linhas.join("\n")], { type: "application/javascript;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement("a"), { href: url, download: "data.js" });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("⬇️ data.js baixado!");
  });

  // --- Forçar re-sync do JSONBin ---
  document.getElementById("btn-sync-jsonbin") &&
  document.getElementById("btn-sync-jsonbin").addEventListener("click", async () => {
    if (!DB.isConfigurado()) { showToast("⚠️ Configure o JSONBin primeiro."); return; }
    showToast("🔄 Buscando dados do JSONBin...", 2000);
    DB.invalidarCache();
    try {
      dados = await DB.ler();
      preencherGeral(); preencherHino();
      renderPedidosAdmin(); renderMotivosAdmin();
      renderListaAdmin(); preencherConfig();
      showToast("✅ Dados sincronizados do JSONBin!");
      atualizarIndicadorDB(true);
    } catch(e) {
      showToast("❌ Erro ao sincronizar: " + e.message, 4000);
      atualizarIndicadorDB(false);
    }
  });

  // --- Resetar ---
  document.getElementById("btn-resetar").addEventListener("click", async () => {
    if (!confirm("Apagar TODAS as edições e restaurar o conteúdo original do data.js?")) return;
    dados = JSON.parse(JSON.stringify(SITE_DATA));
    preencherGeral(); preencherHino();
    renderPedidosAdmin(); renderMotivosAdmin();
    renderListaAdmin(); preencherConfig();
    await salvar("🔄 Dados restaurados para o original!");
  });

  // --- Sair ---
  document.getElementById("btn-sair").addEventListener("click", () => {
    sessionStorage.removeItem("admin_logado");
    window.location.reload();
  });

  // ============================================================
  // DRAG-AND-DROP GENÉRICO (HTML5)
  // ============================================================
  function ativarDragDrop(container, seletor, onReorder) {
    let dragging = null;

    container.addEventListener("dragstart", e => {
      const card = e.target.closest(seletor);
      if (!card) return;
      dragging = card;
      setTimeout(() => card.style.opacity = "0.4", 0);
    });
    container.addEventListener("dragend", e => {
      const card = e.target.closest(seletor);
      if (card) card.style.opacity = "";
      dragging = null;
    });
    container.addEventListener("dragover", e => {
      e.preventDefault();
      const over = e.target.closest(seletor);
      if (!over || over === dragging) return;
      const midY = over.getBoundingClientRect().top + over.getBoundingClientRect().height / 2;
      container.querySelectorAll(seletor).forEach(c => { c.style.borderTop = ""; c.style.borderBottom = ""; });
      if (e.clientY > midY) over.style.borderBottom = "2px solid var(--roxo)";
      else                   over.style.borderTop    = "2px solid var(--roxo)";
    });
    container.addEventListener("dragleave", e => {
      const over = e.target.closest(seletor);
      if (over) { over.style.borderTop = ""; over.style.borderBottom = ""; }
    });
    container.addEventListener("drop", e => {
      e.preventDefault();
      const over = e.target.closest(seletor);
      if (!over || !dragging || over === dragging) return;
      over.style.borderTop = ""; over.style.borderBottom = "";
      const midY = over.getBoundingClientRect().top + over.getBoundingClientRect().height / 2;
      if (e.clientY > midY) over.after(dragging);
      else                   over.before(dragging);
      onReorder(Array.from(container.querySelectorAll(seletor)));
    });
  }

  // ============================================================
  // TOAST
  // ============================================================
  function showToast(msg, duration) {
    const t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), duration || 2800);
  }

})();
