// ============================================================
// APP.JS — Tela pública
// Carrega dados do JSONBin (via db.js) e renderiza o site
// ============================================================

(function () {
  "use strict";

  // ============================================================
  // BOOTSTRAP — carrega dados e inicializa
  // ============================================================
  async function iniciar() {
    mostrarSkeleton(true);
    let D;
    try {
      D = await DB.ler();
    } catch (e) {
      D = typeof SITE_DATA !== "undefined" ? JSON.parse(JSON.stringify(SITE_DATA)) : {};
    }
    mostrarSkeleton(false);
    renderTudo(D);
  }

  // Spinner/skeleton enquanto carrega
  function mostrarSkeleton(ativo) {
    const sk = document.getElementById("loading-overlay");
    if (sk) sk.style.display = ativo ? "flex" : "none";
  }

  iniciar();

  // ============================================================
  // RENDER PRINCIPAL
  // ============================================================
  function renderTudo(D) {

    // --- HERO ---
    document.getElementById("h-titulo").textContent    = D.titulo    || "DOS AMIGOS EM ORAÇÃO";
    document.getElementById("h-subtitulo").textContent = D.subtitulo || "PAZ SEJA CONVOSCO 🔥";

    // Data: sempre a data atual do dispositivo (ignora o valor salvo no banco)
    const hoje = new Date();
    const dataHoje = hoje.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
    document.getElementById("h-data").textContent = "📅 " + dataHoje;

    const lemaEl = document.getElementById("h-lema");
    lemaEl.innerHTML = "";
    (D.lema || []).forEach(item => {
      const s = document.createElement("span");
      s.textContent = item;
      lemaEl.appendChild(s);
    });

    // --- HINO DO DIA ---
    renderHino(D.hinodia);

    // --- ORADOR DO DIA ---
    renderOrador(D.orador, D.representacao);

    // --- PEDIDOS ---
    renderPedidos(D.pedidos || [], D);

    // --- MOTIVOS GERAIS ---
    renderMotivos(D.motivosGerais || []);

    // --- GRUPOS ---
    renderGrupos(D.grupos || []);

    // --- LISTA ---
    renderListaPublica(D.lista || []);

    // --- MENSAGEM WHATSAPP ---
    renderMensagem(D);

    // --- FORMULÁRIO DE NOVO PEDIDO ---
    iniciarFormularioPedido(D);

    // --- RODAPÉ ---
    document.getElementById("rodape-texto").textContent  = D.rodape || "Deus te abençoe 🌹";
    document.getElementById("rodape-versic").textContent = D.versiculoReavivamento || "";

    // --- ABAS ---
    iniciarAbas();
  }

  // ============================================================
  // HINO DO DIA
  // ============================================================
  function extrairYoutubeId(url) {
    if (!url) return null;
    const patterns = [
      /youtu\.be\/([^?&]+)/,
      /youtube\.com\/watch\?v=([^&]+)/,
      /youtube\.com\/embed\/([^?&]+)/
    ];
    for (const p of patterns) {
      const m = url.match(p);
      if (m) return m[1];
    }
    return null;
  }

  function renderHino(h) {
    const container = document.getElementById("hino-container");
    if (!h) { container.innerHTML = ""; return; }

    const ytId = extrairYoutubeId(h.link);
    const embedHtml = ytId
      ? `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;margin-bottom:10px">
           <iframe
             src="https://www.youtube.com/embed/${ytId}"
             title="${h.numero} — ${h.titulo}"
             frameborder="0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             allowfullscreen loading="lazy"
             style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:10px"
           ></iframe>
         </div>`
      : "";

    const btnAbrir = h.link
      ? `<a href="${h.link}" target="_blank" rel="noopener" class="btn-youtube">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
           Abrir no YouTube
         </a>`
      : "";

    container.innerHTML = `
      <div class="card hino-card" style="margin-top:16px">
        <div class="card-header">
          <span style="font-size:1.4rem">🙏</span>
          <div>
            <span class="hino-badge">Oração do Dia</span>
            <div class="hino-titulo" style="margin-top:4px">${h.numero} — ${h.titulo}</div>
            <div class="hino-ref">${h.referencia}</div>
          </div>
        </div>
        <div class="card-body">${embedHtml}${btnAbrir}</div>
      </div>`;
  }

  // ============================================================
  // ORADOR DO DIA
  // ============================================================
  function renderOrador(orador, representacao) {
    const container = document.getElementById("orador-container");
    if (!orador) { container.innerHTML = ""; return; }
    container.innerHTML = `
      <div class="card orador-card">
        <div class="orador-label">🛐 Todos em oração por</div>
        <div class="orador-nome">${orador}</div>
        <div style="font-size:0.78rem;color:var(--texto-suave);margin-top:6px">${representacao || ""}</div>
      </div>`;
  }

  // ============================================================
  // PEDIDOS
  // ============================================================

  // dadosGlobais guarda a referência dos dados carregados, para que
  // o clique em "Estou orando" possa incrementar e salvar no banco.
  let dadosGlobais = null;

  function renderPedidos(pedidos, D) {
    // Mantém referência global para acesso nos listeners de oração
    if (D) dadosGlobais = D;

    const container = document.getElementById("pedidos-container");
    container.innerHTML = "";

    // Banner sempre no início
    container.appendChild(criarReavivamento());

    // Filtra apenas os pedidos reais (não os de destaque hardcoded antigos)
    // Guarda também o índice original no array pedidos[] para escrita no banco
    const reais = pedidos
      .map((p, originalIdx) => ({ p, originalIdx }))
      .filter(({ p }) => !p.destaque);

    reais.forEach(({ p, originalIdx }, posicao) => {
      // Repete o banner a cada 10 itens (após o 10º, 20º...)
      if (posicao > 0 && posicao % 10 === 0) container.appendChild(criarReavivamento());

      const card = document.createElement("div");
      let classes = "card pedido-card";
      if (p.milagre)            classes += " milagre";
      else if (p.agradecimento) classes += " gratidao";
      else if (p.urgente)       classes += " urgente";
      card.className = classes;

      let tagHtml = "";
      if (p.milagre)            tagHtml = `<span class="pedido-tag tag-milagre">✨ MILAGRE!</span>`;
      else if (p.agradecimento) tagHtml = `<span class="pedido-tag tag-gratidao">🙌 GRATIDÃO</span>`;
      else if (p.urgente)       tagHtml = `<span class="pedido-tag tag-urgente">⚡ URGENTE</span>`;
      else                      tagHtml = `<span class="pedido-tag tag-pedido">🙏 ORAÇÃO</span>`;

      // Nome do grupo (se tiver)
      const grupoHtml = p.grupo
        ? `<div class="pedido-grupo">💬 ${p.grupo}</div>`
        : "";

      // Contagem vem do banco (campo p.oracoes); "eu já orei" fica só no localStorage
      const oracoesCount = parseInt(p.oracoes || 0);
      const localKey     = `orou_${originalIdx}_${(p.nome || "").replace(/\s/g, "_")}`;
      const jaOrou       = localStorage.getItem(localKey) === "1";

      card.innerHTML = `
        <div class="card-body" style="padding:14px 16px">
          ${tagHtml}
          ${p.de       ? `<div class="pedido-de">De: ${p.de}</div>` : ""}
          <div class="pedido-nome">${p.nome || ""}</div>
          ${p.detalhe  ? `<div class="pedido-detalhe">(${p.detalhe})</div>` : ""}
          ${p.pedido   ? `<div class="pedido-motivo">🛐 ${p.pedido}</div>` : ""}
          ${p.descricao? `<div class="pedido-descricao">${p.descricao}</div>` : ""}
          ${grupoHtml}
          <button class="btn-orar${jaOrou ? " orou" : ""}"
                  data-original-idx="${originalIdx}"
                  data-local-key="${localKey}"
                  aria-label="Estou orando por este pedido"
                  aria-pressed="${jaOrou}">
            <span class="btn-orar-icon">🙏</span>
            <span class="btn-orar-texto">${jaOrou ? "Orando!" : "Estou orando"}</span>
            <span class="btn-orar-count">${oracoesCount > 0 ? oracoesCount : ""}</span>
          </button>
        </div>`;
      container.appendChild(card);
    });

    // Banner no final
    container.appendChild(criarReavivamento());

    // Ativa os botões de oração
    container.querySelectorAll(".btn-orar").forEach(btn => {
      btn.addEventListener("click", async function () {
        const originalIdx = parseInt(this.dataset.originalIdx);
        const localKey    = this.dataset.localKey;
        const jaOrou      = localStorage.getItem(localKey) === "1";

        if (this.disabled) return;
        this.disabled = true;

        try {
          // Busca os dados mais recentes do banco para evitar sobrescrever
          // orações de outros usuários que clicaram ao mesmo tempo
          DB.invalidarCache();
          const dadosAtuais = await DB.ler();
          const pedido = dadosAtuais.pedidos && dadosAtuais.pedidos[originalIdx];
          if (!pedido) return;

          if (!jaOrou) {
            // Incrementa no banco
            pedido.oracoes = parseInt(pedido.oracoes || 0) + 1;
            localStorage.setItem(localKey, "1");

            // Atualiza visual imediatamente
            const novoCount = pedido.oracoes;
            this.classList.add("orou");
            this.setAttribute("aria-pressed", "true");
            this.querySelector(".btn-orar-texto").textContent = "Orando!";
            this.querySelector(".btn-orar-count").textContent = novoCount;
            showToast("🙏 Que Deus ouça sua oração!");

            // Salva no banco em background
            await DB.salvar(dadosAtuais);
            dadosGlobais = dadosAtuais;
          } else {
            // Desfazer: decrementa
            pedido.oracoes = Math.max(0, parseInt(pedido.oracoes || 0) - 1);
            localStorage.removeItem(localKey);

            const novoCount = pedido.oracoes;
            this.classList.remove("orou");
            this.setAttribute("aria-pressed", "false");
            this.querySelector(".btn-orar-texto").textContent = "Estou orando";
            this.querySelector(".btn-orar-count").textContent = novoCount > 0 ? novoCount : "";

            await DB.salvar(dadosAtuais);
            dadosGlobais = dadosAtuais;
          }
        } catch (e) {
          showToast("❌ Não foi possível registrar. Tente novamente.", 3000);
        } finally {
          this.disabled = false;
        }
      });
    });
  }

  function criarReavivamento() {
    const el = document.createElement("div");
    el.className = "card pedido-card reavivamento";
    el.innerHTML = `<div class="card-body" style="padding:14px 16px;text-align:center">
      <div class="reavivamento-text">🙏 REAVIVAMENTO e REFORMA 🙏</div></div>`;
    return el;
  }

  // ============================================================
  // MOTIVOS GERAIS
  // ============================================================
  function renderMotivos(motivos) {
    const container = document.getElementById("motivos-container");
    container.innerHTML = "";

    motivos.forEach(m => {
      const ytId = m.link ? extrairYoutubeId(m.link) : null;
      const card = document.createElement("div");
      card.className = "motivo-card" + (m.link ? " tem-link" : "");

      const thumbHtml = ytId
        ? `<div class="motivo-thumb">
             <img src="https://img.youtube.com/vi/${ytId}/mqdefault.jpg"
                  alt="Miniatura do vídeo: ${m.titulo}"
                  loading="lazy" />
             <div class="motivo-thumb-play">▶</div>
           </div>`
        : "";

      card.innerHTML = `
        ${thumbHtml}
        <div class="motivo-titulo">${m.titulo}</div>
        ${m.referencia ? `<div class="motivo-ref">${m.referencia}</div>` : ""}
        ${m.descricao  ? `<div class="motivo-desc">${m.descricao}</div>`  : ""}
        ${m.link       ? `<a href="${m.link}" target="_blank" rel="noopener" class="motivo-link">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          Ore comigo</a>` : ""}`;
      if (m.link) card.addEventListener("click", e => {
        if (!e.target.closest("a")) window.open(m.link, "_blank", "noopener");
      });
      container.appendChild(card);
    });
  }

  // ============================================================
  // GRUPOS DE WHATSAPP
  // ============================================================
  function renderGrupos(grupos) {
    const container = document.getElementById("grupos-container");
    container.innerHTML = "";

    if (!grupos || grupos.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:40px 20px;color:var(--texto-suave)">
          <div style="font-size:2.5rem;margin-bottom:12px">💬</div>
          <div style="font-size:0.9rem">Nenhum grupo cadastrado ainda.</div>
        </div>`;
      return;
    }

    grupos.forEach(g => {
      const card = document.createElement("div");
      card.className = "card grupo-card";
      card.innerHTML = `
        <div class="card-body" style="padding:16px">
          <div class="grupo-nome">${g.nome || "Grupo sem nome"}</div>
          ${g.descricao ? `<div class="grupo-desc">${g.descricao}</div>` : ""}
          <a href="${g.link}" target="_blank" rel="noopener" class="btn-whatsapp-grupo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Entrar no Grupo
          </a>
        </div>`;
      container.appendChild(card);
    });
  }

  // ============================================================
  // LISTA PÚBLICA
  // ============================================================
  function renderListaPublica(lista) {
    const container    = document.getElementById("lista-container");
    const contadorEl   = document.getElementById("lista-contador");
    const buscaEl      = document.getElementById("lista-busca");

    function render(filtro) {
      container.innerHTML = "";
      let visiveis = 0;
      lista.forEach((nome, idx) => {
        const item  = document.createElement("div");
        item.className = "lista-item";
        const match = !filtro || nome.toLowerCase().includes(filtro.toLowerCase());
        if (!match) item.classList.add("lista-hidden");
        else visiveis++;
        item.innerHTML = `<span class="lista-num">${idx + 1}</span><span class="lista-nome">${nome}</span>`;
        container.appendChild(item);
      });
      contadorEl.textContent = `${visiveis} de ${lista.length} pessoas`;
    }

    render("");
    buscaEl.addEventListener("input", e => render(e.target.value));
  }

  // ============================================================
  // MENSAGEM WHATSAPP
  // ============================================================
  function renderMensagem(D) {
    const cfg         = D.config || {};
    const linkSiteVal = cfg.linkSite || "https://seu-site.netlify.app";

    // Monta a string da oração no formato: referencia - numero - titulo
    const hinoObj  = D.hinodia || {};
    const oracao   = [hinoObj.referencia, hinoObj.numero, hinoObj.titulo]
                       .filter(Boolean).join(" - ");
    // {HINO} mantido por compatibilidade (mesmo valor que {ORACAO})
    const linkYt   = hinoObj.link || "";
    const orador   = D.orador        || "";
    const repres   = D.representacao || "";
    const intercedido = D.intercedidoDia
      ? "\uD83D\uDEF0 Intercedido do dia: " + D.intercedidoDia
      : "";

    // Data atual do dispositivo
    const dataHoje = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

    // Template padrão caso nenhum tenha sido configurado
    const templatePadrao =
      "\uD83D\uDE4F DOS AMIGOS EM ORAÇÃO — {DATA}\n\n" +
      "\uD83D\uDE4FOração do Dia: {ORACAO}\n\n" +
      "        POR: {ORADOR}\n\n" +
      "         {REPRESENTACAO}\n\n" +
      "\u25B6\uFE0F {LINK_YOUTUBE}\n\n" +
      "\uD83D\uDCCB Segue a lista completa de pedidos e intercessões:\n\n" +
      "\uD83D\uDD17ORE POR ELES - UM PRIVILÉGIO\n\n " +
      "{LINK_SITE}\n\n" +
      "Oremos juntos uns pelos outros \uD83D\uDD25 \n\n" +
      "PARTICIPE E DESFRUTE DESTA BÊNÇÃO DIARIAMENTE";

    const template = cfg.mensagemWhatsApp || templatePadrao;

    // Substitui todas as variáveis — usa replaceAll para cobrir múltiplas ocorrências
    function substituir(tpl) {
      return tpl
        .replace(/\{DATA\}/g,            dataHoje)
        .replace(/\{ORACAO\}/g,          oracao)
        .replace(/\{HINO\}/g,            oracao)          // alias retrocompatível
        .replace(/\{LINK_YOUTUBE\}/g,    linkYt)
        .replace(/\{ORADOR\}/g,          orador)
        .replace(/\{REPRESENTACAO\}/g,   repres)
        .replace(/\{LINK_SITE\}/g,       linkSiteVal)
        .replace(/\{INTERCEDIDO_DIA\}/g, intercedido);
    }

    const resumida = substituir(template);

    document.getElementById("wpp-preview").textContent = resumida;

    // --- Link do site ---
    const linkEl = document.getElementById("link-site-display");
    linkEl.textContent = linkSiteVal;
    linkEl.href        = linkSiteVal;

    // --- Mensagem completa (com lista de pedidos) ---
    function gerarCompleta() {
      const linhas = [];
      linhas.push(resumida);
      linhas.push("");
      linhas.push("\uD83D\uDEF0\uD83D\uDEF0\uD83D\uDEF0 PEDIDOS E AGRADECIMENTOS \uD83D\uDEF0\uD83D\uDEF0\uD83D\uDEF0");
      linhas.push("");
      (D.pedidos || []).filter(p => !p.destaque).forEach(p => {
        if (p.agradecimento || p.milagre) linhas.push("\uD83D\uDE4C GRATIDÃO");
        if (p.de)       linhas.push("De: " + p.de);
        if (p.nome)     linhas.push("\uD83D\uDE4F " + p.nome);
        if (p.detalhe)  linhas.push("(" + p.detalhe + ")");
        if (p.pedido)   linhas.push("\uD83D\uDEF0 " + p.pedido);
        if (p.descricao) linhas.push(p.descricao);
        linhas.push("======================");
      });
      return linhas.join("\n");
    }

    // Botões
    document.getElementById("btn-wpp-enviar").onclick = () =>
      window.open("https://wa.me/?text=" + encodeURIComponent(resumida), "_blank", "noopener");

    document.getElementById("btn-copiar").onclick = function () {
      navigator.clipboard.writeText(resumida).then(() => {
        this.textContent = "\u2705 Copiado!"; this.classList.add("copied");
        showToast("Mensagem copiada!");
        setTimeout(() => { this.textContent = "\uD83D\uDCCB Copiar Mensagem Resumida"; this.classList.remove("copied"); }, 2500);
      });
    };

    document.getElementById("btn-copiar-completa").onclick = function () {
      navigator.clipboard.writeText(gerarCompleta()).then(() => {
        this.textContent = "\u2705 Copiado!"; this.classList.add("copied");
        showToast("Mensagem completa copiada!");
        setTimeout(() => { this.textContent = "\uD83D\uDCC4 Copiar Mensagem Completa"; this.classList.remove("copied"); }, 2500);
      });
    };

    document.getElementById("btn-copiar-link").onclick = () =>
      navigator.clipboard.writeText(linkSiteVal).then(() => showToast("Link copiado!"));
  }

  // ============================================================
  // ABAS
  // ============================================================
  function iniciarAbas() {
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => { b.classList.remove("active"); b.setAttribute("aria-selected","false"); });
        document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
        btn.classList.add("active"); btn.setAttribute("aria-selected","true");
        document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  // ============================================================
  // TOAST
  // ============================================================
  function showToast(msg, duration) {
    const t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), duration || 2500);
  }

  // ============================================================
  // FORMULÁRIO DE NOVO PEDIDO (tela pública)
  // ============================================================
  function iniciarFormularioPedido(D) {
    const btn      = document.getElementById("btn-enviar-pedido");
    const feedback = document.getElementById("np-feedback");
    if (!btn) return;

    // Popula o select de grupos
    const selectGrupo = document.getElementById("np-grupo");
    if (selectGrupo) {
      selectGrupo.innerHTML = '<option value="">-- Nenhum / Não informar --</option>';
      (D.grupos || []).forEach(g => {
        const opt = document.createElement("option");
        opt.value = g.nome;
        opt.textContent = g.nome;
        selectGrupo.appendChild(opt);
      });
    }

    btn.addEventListener("click", async () => {
      const de       = (document.getElementById("np-de").value       || "").trim();
      const nome     = (document.getElementById("np-nome").value     || "").trim();
      const pedido   = (document.getElementById("np-pedido").value   || "").trim();
      const descricao= (document.getElementById("np-descricao").value|| "").trim();
      const urgente  = document.getElementById("np-urgente").checked;
      const grupo    = selectGrupo ? (selectGrupo.value || "") : "";

      if (!nome || !pedido) {
        mostrarFeedback("⚠️ Preencha o nome e o motivo do pedido.", false);
        return;
      }

      btn.disabled    = true;
      btn.textContent = "Enviando...";

      try {
        // Lê dados atuais do banco (sem cache para ter a versão mais recente)
        DB.invalidarCache();
        const dadosAtuais = await DB.ler();
        if (!dadosAtuais.pedidos) dadosAtuais.pedidos = [];

        const novoPedido = {
          tipo:      "pedido",
          de:        de,
          nome:      nome,
          pedido:    pedido,
          descricao: descricao,
          urgente:   urgente,
          grupo:     grupo
        };

        // Insere no início da lista de pedidos (mais visível)
        const primNaoDestaque = dadosAtuais.pedidos.findIndex(p => !p.destaque);
        if (primNaoDestaque >= 0) dadosAtuais.pedidos.splice(primNaoDestaque, 0, novoPedido);
        else dadosAtuais.pedidos.unshift(novoPedido);

        const resultado = await DB.salvar(dadosAtuais);

        if (resultado.ok || resultado.local) {
          mostrarFeedback("✅ Pedido enviado! Obrigado por compartilhar — oraremos juntos. 🙏", true);
          // Limpa os campos
          ["np-de","np-nome","np-pedido","np-descricao"].forEach(id => {
            document.getElementById(id).value = "";
          });
          document.getElementById("np-urgente").checked = false;
          if (selectGrupo) selectGrupo.value = "";
          // Re-renderiza a lista de pedidos com o novo item
          renderPedidos(dadosAtuais.pedidos, dadosAtuais);
        } else {
          mostrarFeedback("❌ Não foi possível enviar. Tente novamente.", false);
        }
      } catch (e) {
        mostrarFeedback("❌ Erro ao enviar: " + e.message, false);
      } finally {
        btn.disabled    = false;
        btn.textContent = "🙏 Enviar Pedido";
      }
    });

    function mostrarFeedback(msg, sucesso) {
      feedback.textContent   = msg;
      feedback.style.display = "block";
      feedback.style.background = sucesso ? "#e8faf0" : "#fde8e8";
      feedback.style.color      = sucesso ? "#1a6e3a" : "#c0392b";
      feedback.style.border     = `1px solid ${sucesso ? "#a3e0c0" : "#f5b7b1"}`;
      if (sucesso) setTimeout(() => { feedback.style.display = "none"; }, 5000);
    }
  }

})();
