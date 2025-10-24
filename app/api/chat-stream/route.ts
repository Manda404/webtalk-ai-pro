import { ragChat } from "@/lib/rag/rag-chat";
import { ratelimit } from "@/lib/ratelimit";
import { z } from "zod";

export const runtime = "edge";

const schema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user","assistant","system"]),
    content: z.string().min(1).max(4000)
  })).min(1),
  sessionId: z.string().uuid().optional()
});

const SYSTEM_PROMPT = [
  "Tu es un assistant IA qui répond exclusivement en français.",
  "Tu t'appuies sur le contexte des pages indexées pour répondre.",
  "Si l'information n'est pas disponible, dis-le clairement et propose une recherche ciblée."
].join(" ");

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const body = await req.json();
    const { messages, sessionId } = schema.parse(body);

    const key = sessionId ?? ip;
    const { success } = await ratelimit.limit(key);
    if (!success) {
      return new Response("Trop de requêtes. Réessaie dans une minute.", { status: 429 });
    }

    const response = await ragChat.chat(
      [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      { streaming: true, sessionId: key }
    );

    return new Response(response.toReadableStream(), {
      headers: { "Content-Type": "text/event-stream" }
    });
  } catch (e: any) {
    return new Response(`Erreur: ${e.message}`, { status: 400 });
  }
}
