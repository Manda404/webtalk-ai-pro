"use client";

import type { Message } from "ai";
import DOMPurify from "isomorphic-dompurify";
import { clsx } from "clsx";

export default function MessageView({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const safe = DOMPurify.sanitize(message.content);

  return (
    <div className={clsx("rounded-lg p-3", isUser ? "bg-white border" : "bg-neutral-100")}>
      <div className="text-xs mb-1 text-neutral-500">{isUser ? "Vous" : "Assistant"}</div>
      <div dangerouslySetInnerHTML={{ __html: safe.replace(/\n/g, "<br/>") }} />
    </div>
  );
}
