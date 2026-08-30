// ============================================================
// build-env.js — Gerador do env-config.js
// Executado pelo Netlify antes de cada deploy (ver netlify.toml)
//
// Lê as variáveis de ambiente JSONBIN_BIN_ID e JSONBIN_API_KEY
// e gera o arquivo env-config.js que o site carrega em runtime.
//
// Se as variáveis não estiverem definidas (ex: ambiente local),
// gera o arquivo com valores vazios — o site cai no fallback
// de localStorage normalmente.
// ============================================================

const fs   = require("fs");
const path = require("path");

const binId  = process.env.JSONBIN_BIN_ID  || "";
const apiKey = process.env.JSONBIN_API_KEY || "";

const conteudo = `// GERADO AUTOMATICAMENTE pelo build-env.js — NÃO EDITE MANUALMENTE
// Este arquivo é recriado a cada deploy no Netlify.
// As credenciais vêm das Environment Variables configuradas no painel do Netlify.
window.ENV_CONFIG = {
  JSONBIN_BIN_ID:  "${binId}",
  JSONBIN_API_KEY: "${apiKey}"
};
`;

const destino = path.join(__dirname, "env-config.js");
fs.writeFileSync(destino, conteudo, "utf8");

if (binId && apiKey) {
  console.log("[build-env] ✅ env-config.js gerado com BIN ID e API Key.");
} else {
  console.log("[build-env] ⚠️  env-config.js gerado SEM credenciais (variáveis de ambiente não definidas).");
  console.log("            Configure JSONBIN_BIN_ID e JSONBIN_API_KEY nas Environment Variables do Netlify.");
}
