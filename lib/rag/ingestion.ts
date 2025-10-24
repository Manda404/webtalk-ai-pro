import crypto from "node:crypto";

export async function fetchHtmlAndHash(targetUrl: string): Promise<{ html: string; hash: string; }> {
  const res = await fetch(targetUrl, {
    headers: { "User-Agent": "webtalk-ai/1.0 (+https://github.com/Manda404/webtalk-ai)" },
    cache: "no-store"
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  const html = await res.text();
  const hash = crypto.createHash("sha256").update(html).digest("hex");
  return { html, hash };
}
