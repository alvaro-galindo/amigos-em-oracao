// ============================================================
// DB.JS — Camada de abstração JSONBin.io
// Usado por app.js (leitura) e admin.js (leitura + escrita)
//
// Como funciona:
//   - Leitura:  GET  https://api.jsonbin.io/v3/b/{BIN_ID}/latest
//   - Escrita:  PUT  https://api.jsonbin.io/v3/b/{BIN_ID}
//   - localStorage é usado como cache para funcionar offline
//     e evitar bater na API a cada clique.
// ============================================================

const DB = (() => {
  "use strict";

  const JSONBIN_BASE  = "https://api.jsonbin.io/v3/b";
  const CACHE_KEY     = "amigos_data";          // localStorage cache
  const CONFIG_KEY    = "amigos_db_config";     // localStorage config JSONBin
  const CACHE_TTL_MS  = 5 * 60 * 1000;         // 5 min — tempo máx do cache

  // ----------------------------------------------------------
  // CONFIGURAÇÃO (BIN ID e API KEY)
  //
  // Prioridade:
  //   1. window.ENV_CONFIG  → gerado pelo build-env.js no deploy do Netlify
  //                           (funciona em TODOS os dispositivos automaticamente)
  //   2. localStorage       → configurado manualmente pelo admin no painel
  //                           (fallback para uso local / sem env vars)
  // ----------------------------------------------------------
  function getConfig() {
    // 1) Preferência: variáveis injetadas em tempo de build pelo Netlify
    const env = (typeof window !== "undefined" && window.ENV_CONFIG) || {};
    if (env.JSONBIN_BIN_ID && env.JSONBIN_API_KEY) {
      return { binId: env.JSONBIN_BIN_ID, apiKey: env.JSONBIN_API_KEY, fromEnv: true };
    }

    // 2) Fallback: configuração manual salva no localStorage do admin
    try {
      const c = localStorage.getItem(CONFIG_KEY);
      if (c) return JSON.parse(c);
    } catch (e) {}
    return { binId: "", apiKey: "" };
  }

  function setConfig(binId, apiKey) {
    // setConfig só escreve no localStorage (usado pelo painel admin manual)
    // Quando ENV_CONFIG está presente, ele já sobrepõe automaticamente
    localStorage.setItem(CONFIG_KEY, JSON.stringify({ binId: binId.trim(), apiKey: apiKey.trim() }));
  }

  function isConfigurado() {
    const c = getConfig();
    return !!(c.binId && c.apiKey);
  }

  // Indica se as credenciais vieram das env vars do Netlify (somente leitura)
  function isFromEnv() {
    const env = (typeof window !== "undefined" && window.ENV_CONFIG) || {};
    return !!(env.JSONBIN_BIN_ID && env.JSONBIN_API_KEY);
  }

  // ----------------------------------------------------------
  // CACHE LOCAL
  // ----------------------------------------------------------
  function getCacheLocal() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      // Verifica se o cache tem timestamp e se ainda é válido
      if (parsed.__ts && (Date.now() - parsed.__ts) < CACHE_TTL_MS) {
        const dados = Object.assign({}, parsed);
        delete dados.__ts;
        return dados;
      }
      // Cache expirado — retorna mesmo assim para uso offline
      if (parsed.__ts) {
        const dados = Object.assign({}, parsed);
        delete dados.__ts;
        return dados;
      }
      // Cache sem timestamp (formato antigo) — usa direto
      return parsed;
    } catch (e) {}
    return null;
  }

  function setCacheLocal(dados) {
    const comTs = Object.assign({}, dados, { __ts: Date.now() });
    localStorage.setItem(CACHE_KEY, JSON.stringify(comTs));
  }

  function isCacheValido() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      return !!(parsed.__ts && (Date.now() - parsed.__ts) < CACHE_TTL_MS);
    } catch (e) { return false; }
  }

  // ----------------------------------------------------------
  // LEITURA — busca do JSONBin ou fallback para cache/SITE_DATA
  // ----------------------------------------------------------
  async function ler() {
    // 1) Se o cache ainda é válido, usa direto (evita requisição)
    if (isCacheValido()) {
      const cached = getCacheLocal();
      if (cached) return cached;
    }

    // 2) Tenta buscar do JSONBin
    if (isConfigurado()) {
      try {
        const cfg = getConfig();
        const resp = await fetch(`${JSONBIN_BASE}/${cfg.binId}/latest`, {
          headers: {
            "X-Master-Key": cfg.apiKey,
            "X-Bin-Meta":   "false"   // retorna só o record, sem metadados
          }
        });

        if (resp.ok) {
          const dados = await resp.json();
          setCacheLocal(dados);
          return dados;
        }

        // Erro HTTP (ex: chave errada, bin não existe)
        console.warn("[DB] JSONBin retornou erro:", resp.status, resp.statusText);
      } catch (err) {
        console.warn("[DB] Falha ao conectar no JSONBin (offline?):", err.message);
      }
    }

    // 3) Fallback: cache local (mesmo expirado)
    const cached = getCacheLocal();
    if (cached) {
      console.info("[DB] Usando cache local (offline/sem config).");
      return cached;
    }

    // 4) Último recurso: dados hardcoded do data.js
    console.info("[DB] Usando SITE_DATA padrão.");
    return JSON.parse(JSON.stringify(typeof SITE_DATA !== "undefined" ? SITE_DATA : {}));
  }

  // ----------------------------------------------------------
  // ESCRITA — salva no JSONBin E atualiza cache local
  // ----------------------------------------------------------
  async function salvar(dados) {
    // Sempre atualiza cache local imediatamente
    setCacheLocal(dados);

    if (!isConfigurado()) {
      console.info("[DB] JSONBin não configurado — salvo só no cache local.");
      return { ok: false, local: true, erro: "JSONBin não configurado" };
    }

    try {
      const cfg = getConfig();
      const resp = await fetch(`${JSONBIN_BASE}/${cfg.binId}`, {
        method:  "PUT",
        headers: {
          "Content-Type":  "application/json",
          "X-Master-Key":  cfg.apiKey,
          "X-Bin-Versioning": "false"  // não cria versões — economiza cota
        },
        body: JSON.stringify(dados)
      });

      if (resp.ok) {
        console.info("[DB] Dados salvos no JSONBin ✅");
        return { ok: true };
      }

      const texto = await resp.text();
      console.error("[DB] Erro ao salvar no JSONBin:", resp.status, texto);
      return { ok: false, local: true, erro: `HTTP ${resp.status}: ${texto}` };
    } catch (err) {
      console.error("[DB] Falha de rede ao salvar:", err.message);
      return { ok: false, local: true, erro: err.message };
    }
  }

  // ----------------------------------------------------------
  // CRIAR BIN — só na primeira vez (chama no setup)
  // ----------------------------------------------------------
  async function criarBin(apiKey, nomeBin, dadosIniciais) {
    try {
      const resp = await fetch(JSONBIN_BASE, {
        method: "POST",
        headers: {
          "Content-Type":  "application/json",
          "X-Master-Key":  apiKey.trim(),
          "X-Bin-Name":    nomeBin || "amigos-em-oracao",
          "X-Bin-Private": "true"
        },
        body: JSON.stringify(dadosIniciais)
      });

      if (resp.ok) {
        const json = await resp.json();
        const binId = json.metadata && json.metadata.id;
        if (binId) {
          setConfig(binId, apiKey.trim());
          setCacheLocal(dadosIniciais);
          return { ok: true, binId };
        }
      }

      const texto = await resp.text();
      return { ok: false, erro: `HTTP ${resp.status}: ${texto}` };
    } catch (err) {
      return { ok: false, erro: err.message };
    }
  }

  // ----------------------------------------------------------
  // INVALIDAR CACHE — força buscar do JSONBin na próxima leitura
  // ----------------------------------------------------------
  function invalidarCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        parsed.__ts = 0; // zera timestamp → cache "expirado"
        localStorage.setItem(CACHE_KEY, JSON.stringify(parsed));
      }
    } catch (e) {}
  }

  // API pública
  return { ler, salvar, criarBin, getConfig, setConfig, isConfigurado, isFromEnv, invalidarCache, getCacheLocal };

})();
