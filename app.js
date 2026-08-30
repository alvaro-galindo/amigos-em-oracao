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
    renderPedidos(D.pedidos || []);

    // --- MOTIVOS GERAIS ---
    renderMotivos(D.motivosGerais || []);

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
  function renderPedidos(pedidos) {
    const container = document.getElementById("pedidos-container");
    container.innerHTML = "";

    pedidos.forEach((p, idx) => {
      if (idx > 0 && idx % 10 === 0) container.appendChild(criarReavivamento());

      const card = document.createElement("div");
      if (p.destaque) {
        card.className = "card pedido-card reavivamento";
        card.innerHTML = `
          <div class="card-body" style="padding:16px">
            <div class="reavivamento-text">🙏 REAVIVAMENTO e REFORMA 🙏</div>
            <div style="font-size:0.82rem;opacity:0.85;margin-top:6px">${p.descricao || ""}</div>
          </div>`;
        container.appendChild(card);
        return;
      }

      let classes = "card pedido-card";
      if (p.milagre)          classes += " milagre";
      else if (p.agradecimento) classes += " gratidao";
      else if (p.urgente)       classes += " urgente";
      card.className = classes;

      let tagHtml = "";
      if (p.milagre)            tagHtml = `<span class="pedido-tag tag-milagre">✨ MILAGRE!</span>`;
      else if (p.agradecimento) tagHtml = `<span class="pedido-tag tag-gratidao">🙌 GRATIDÃO</span>`;
      else if (p.urgente)       tagHtml = `<span class="pedido-tag tag-urgente">⚡ URGENTE</span>`;
      else                      tagHtml = `<span class="pedido-tag tag-pedido">🙏 ORAÇÃO</span>`;

      card.innerHTML = `
        <div class="card-body" style="padding:14px 16px">
          ${tagHtml}
          ${p.de       ? `<div class="pedido-de">De: ${p.de}</div>` : ""}
          <div class="pedido-nome">${p.nome || ""}</div>
          ${p.detalhe  ? `<div class="pedido-detalhe">(${p.detalhe})</div>` : ""}
          ${p.pedido   ? `<div class="pedido-motivo">🛐 ${p.pedido}</div>` : ""}
          ${p.descricao? `<div class="pedido-descricao">${p.descricao}</div>` : ""}
        </div>`;
      container.appendChild(card);
    });

    container.appendChild(criarReavivamento());
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
      const card = document.createElement("div");
      card.className = "motivo-card" + (m.link ? " tem-link" : "");
      card.innerHTML = `
        <div class="motivo-titulo">${m.titulo}</div>
        ${m.referencia ? `<div class="motivo-ref">${m.referencia}</div>` : ""}
        ${m.descricao  ? `<div class="motivo-desc">${m.descricao}</div>`  : ""}
        ${m.link       ? `<a href="${m.link}" target="_blank" rel="noopener" class="motivo-link">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          Assistir</a>` : ""}`;
      if (m.link) card.addEventListener("click", e => {
        if (!e.target.closest("a")) window.open(m.link, "_blank", "noopener");
      });
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
    const cfg          = D.config || {};
    const linkSiteVal  = cfg.linkSite || "https://seu-site.netlify.app";
    const hino         = D.hinodia ? `${D.hinodia.numero} — ${D.hinodia.titulo} (${D.hinodia.referencia})` : "";
    const linkYt       = D.hinodia ? D.hinodia.link : "";
    const intercedido  = D.intercedidoDia ? `🛐 *Intercedido do dia:* ${D.intercedidoDia}` : "";

    // Data atual do dispositivo
    const dataHoje = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

    // --- Mensagem resumida ---
    const templateResum = cfg.mensagemWhatsApp ||
      "🙏 *DOS AMIGOS EM ORAÇÃO* — {DATA}\n\n🙏 *Oração do Dia:* {HINO}\n▶️ {LINK_YOUTUBE}\n\n{INTERCEDIDO_DIA}\n\n📋 Veja a lista completa de pedidos e intercessões:\n🔗 {LINK_SITE}\n\n_Oremos juntos uns pelos outros_ 🔥";

    const resumida = templateResum
      .replace("{DATA}",            dataHoje)
      .replace("{HINO}",            hino)
      .replace("{LINK_YOUTUBE}",    linkYt)
      .replace("{LINK_SITE}",       linkSiteVal)
      .replace("{INTERCEDIDO_DIA}", intercedido);

    document.getElementById("wpp-preview").textContent = resumida;

    // --- Link do site ---
    const linkEl = document.getElementById("link-site-display");
    linkEl.textContent = linkSiteVal;
    linkEl.href        = linkSiteVal;

    // --- Mensagem completa ---
    function gerarCompleta() {
      const linhas = [];
      linhas.push(`🙏 *DOS AMIGOS EM ORAÇÃO* — ${dataHoje}`);
      linhas.push("");
      linhas.push(`🙏 *Oração do Dia:* ${hino}`);
      if (linkYt)      linhas.push(`▶️ ${linkYt}`);
      if (intercedido) linhas.push(intercedido);
      linhas.push("");
      linhas.push("🛐🛐🛐 *PEDIDOS E AGRADECIMENTOS* 🛐🛐🛐");
      linhas.push("");
      (D.pedidos || []).forEach(p => {
        if (p.destaque) { linhas.push("🙏 REAVIVAMENTO e REFORMA 🙏"); linhas.push("======================"); return; }
        if (p.agradecimento || p.milagre) linhas.push("GRATIDÃO");
        if (p.de)       linhas.push(`De: ${p.de}`);
        if (p.nome)     linhas.push(`🙏 ${p.nome}`);
        if (p.detalhe)  linhas.push(`(${p.detalhe})`);
        if (p.pedido)   linhas.push(`🛐 ${p.pedido}`);
        if (p.descricao) linhas.push(p.descricao);
        linhas.push("======================");
      });
      linhas.push(""); linhas.push(`📋 Site completo: ${linkSiteVal}`);
      linhas.push(""); linhas.push("_Oremos juntos uns pelos outros_ 🔥");
      return linhas.join("\n");
    }

    // Botões
    document.getElementById("btn-wpp-enviar").onclick = () =>
      window.open(`https://wa.me/?text=${encodeURIComponent(resumida)}`, "_blank", "noopener");

    document.getElementById("btn-copiar").onclick = function () {
      navigator.clipboard.writeText(resumida).then(() => {
        this.textContent = "✅ Copiado!"; this.classList.add("copied");
        showToast("Mensagem resumida copiada!");
        setTimeout(() => { this.textContent = "📋 Copiar Mensagem Resumida"; this.classList.remove("copied"); }, 2500);
      });
    };

    document.getElementById("btn-copiar-completa").onclick = function () {
      navigator.clipboard.writeText(gerarCompleta()).then(() => {
        this.textContent = "✅ Copiado!"; this.classList.add("copied");
        showToast("Mensagem completa copiada!");
        setTimeout(() => { this.textContent = "📄 Copiar Mensagem Completa"; this.classList.remove("copied"); }, 2500);
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

    btn.addEventListener("click", async () => {
      const de       = (document.getElementById("np-de").value       || "").trim();
      const nome     = (document.getElementById("np-nome").value     || "").trim();
      const pedido   = (document.getElementById("np-pedido").value   || "").trim();
      const descricao= (document.getElementById("np-descricao").value|| "").trim();
      const urgente  = document.getElementById("np-urgente").checked;

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
          urgente:   urgente
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
          // Re-renderiza a lista de pedidos com o novo item
          renderPedidos(dadosAtuais.pedidos);
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
