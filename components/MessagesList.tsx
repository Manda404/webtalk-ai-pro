"use client";

import type { Message } from "ai";
import MessageView from "./Message";

export default function MessagesList({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-3">
      {messages.length === 0 && (
        <div className="text-sm text-neutral-600">Aucun message. Commencez la conversation !</div>
      )}
      {messages.map((m) => (
        <MessageView key={m.id} message={m} />
      ))}
    </div>
  );
}
