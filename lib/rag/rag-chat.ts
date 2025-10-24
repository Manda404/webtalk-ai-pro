import { RagChat } from "@upstash/rag-chat";
import { redis } from "@/lib/redis";

export const ragChat = new RagChat({
  model: process.env.UPSTASH_RAG_CHAT_MODEL || "meta-llama/Meta-Llama-3-8B-Instruct",
  redis
});
