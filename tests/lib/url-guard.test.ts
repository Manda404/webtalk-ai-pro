import { describe, it, expect } from "vitest";
import { isAllowedUrl } from "../../lib/security/url-guard";

describe("isAllowedUrl", () => {
  it("rejects non-http protocols", () => {
    expect(isAllowedUrl("ftp://example.com")).toBe(false);
    expect(isAllowedUrl("file:///etc/passwd")).toBe(false);
  });

  it("accepts https by default when ALLOWED_HOSTS is empty", () => {
    expect(isAllowedUrl("https://developer.mozilla.org")).toBe(true);
  });
});
