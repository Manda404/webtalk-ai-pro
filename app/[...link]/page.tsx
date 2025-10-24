import { isAllowedUrl } from "@/lib/security/url-guard";
import { ragChat } from "@/lib/rag/rag-chat";
import { fetchHtmlAndHash } from "@/lib/rag/ingestion";
import { redis } from "@/lib/redis";
import Chat from "@/components/Chat";

export default async function TalkPage({ params }: { params: { link: string[] } }) {
  const encoded = decodeURIComponent(params.link.join("/"));
  const targetUrl = encoded.startsWith("http") ? encoded : `https://${encoded}`;

  if (!isAllowedUrl(targetUrl)) {
    return <main><h1 className="text-2xl font-semibold">URL non autorisée</h1><p>Configurez <code>ALLOWED_HOSTS</code> ou utilisez un domaine public valide.</p></main>;
  }

  // Idempotent ingestion with hash in Redis
  const hashKey = `wt:url:hash:${targetUrl}`;
  try {
    const prev = await redis.get<string>(hashKey);
    const { html, hash } = await fetchHtmlAndHash(targetUrl);
    if (prev !== hash) {
      await ragChat.context.add({ type: "html", source: targetUrl, config: { chunkSize: 800, chunkOverlap: 80 } });
      await redis.set(hashKey, hash, { ex: 60 * 60 * 24 * 7 });
    }
  } catch (e) {
    console.error(e);
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold mb-2">Conversation avec : <span className="underline">{targetUrl}</span></h1>
      <p className="text-sm text-neutral-600 mb-4">Posez vos questions, l’IA s’appuie sur le contenu de cette page.</p>
      <Chat />
    </main>
  );
}
