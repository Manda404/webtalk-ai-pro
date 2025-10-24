export function isAllowedUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    if (!["http:", "https:"].includes(url.protocol)) return false;
    const allowed = process.env.ALLOWED_HOSTS?.split(",").map(s => s.trim()).filter(Boolean) ?? [];
    if (allowed.length === 0) return true;
    return allowed.some(d => url.hostname === d || url.hostname.endsWith(`.${d}`));
  } catch {
    return false;
  }
}
