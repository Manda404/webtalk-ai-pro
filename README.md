# 💬 WebTalk-AI — Parlez aux sites web grâce à l'IA

[![CI](https://github.com/Manda404/webtalk-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/Manda404/webtalk-ai/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-14-blue)](https://nextjs.org)
[![Upstash](https://img.shields.io/badge/Upstash-Redis%20%7C%20RAG-green)](https://upstash.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

> Réalisé par **Rostand Surel**  
> *Data Scientist & ML Engineer*  
> 📍 Versailles, France  
> 📧 rostandsurel@yahoo.com  
> 🔗 https://linkedin.com/in/rostand-surel  
> 💻 https://github.com/Manda404

---

## 🚀 Présentation

**WebTalk-AI** est une application full-stack (Next.js + Upstash + Llama 3) qui permet de **dialoguer avec le contenu d’une page web**.  
Elle illustre un **RAG** minimaliste, du **streaming** de réponses, et de bonnes pratiques de **sécurité** (rate limit, validation, URL guard).

---

## ⚙️ Stack

- **Next.js 14** (App Router, Edge runtime)  
- **Upstash**: Redis, `@upstash/rag-chat`, `@upstash/ratelimit`  
- **LLM**: Llama 3 (configurable via `UPSTASH_RAG_CHAT_MODEL`)  
- **TypeScript**, **Zod**, **ESLint**, **Prettier**, **Vitest**

---

## 🛡️ Sécurité & robustesse

- Cookie de session durci (HttpOnly, Secure, SameSite=Lax, 7j) via `middleware.ts`  
- **Validation Zod** sur l’API `/api/chat-stream`  
- **Rate limiting**: 20 requêtes / minute / session  
- **Garde URL**: whitelisting via `ALLOWED_HOSTS`  
- **Ingestion idempotente**: hash SHA-256 du HTML stocké en Redis (TTL 7j)

---

## 🔧 Installation

```bash
git clone https://github.com/Manda404/webtalk-ai.git
cd webtalk-ai
npm ci   # ou pnpm i / yarn
cp .env.example .env.local
# → Remplissez UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN
# → Optionnel: UPSTASH_RAG_CHAT_MODEL
# → Optionnel: ALLOWED_HOSTS (ex: example.com,developer.mozilla.org)
npm run dev
```

Ouvrez: `http://localhost:3000/https://developer.mozilla.org/fr/docs/Web/HTTP`

---

## 🧪 Tests

```bash
npm test
```

---

## 📦 CI/CD

- **GitHub Actions**: lint + typecheck + build + tests sur chaque push/PR  
- Badge CI présent en haut de ce README

---

## 📄 Licence

MIT © 2025 Rostand
