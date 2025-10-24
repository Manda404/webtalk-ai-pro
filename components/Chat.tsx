"use client";

import { useChat } from "ai/react";
import MessagesList from "./MessagesList";
import { useEffect, useMemo, useRef } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput, stop } = useChat({
    api: "/api/chat-stream",
    initialMessages: []
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        formRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const disabled = useMemo(() => isLoading || input.trim() === "", [isLoading, input]);

  return (
    <div className="space-y-4">
      <MessagesList messages={messages} />
      <form ref={formRef} onSubmit={handleSubmit} className="flex gap-2 items-start">
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Posez une question… (Ctrl/⌘ + Enter pour envoyer)"
          rows={3}
          className="flex-1"
        />
        <div className="flex flex-col gap-2 min-w-[120px]">
          <button type="submit" disabled={disabled} className="px-3 py-2 rounded-md border">
            {isLoading ? "Envoi..." : "Envoyer"}
          </button>
          {isLoading && (
            <button type="button" onClick={stop} className="px-3 py-2 rounded-md border">
              Stop
            </button>
          )}
          <button type="button" onClick={() => setInput("")} className="px-3 py-2 rounded-md border">Effacer</button>
        </div>
      </form>
    </div>
  );
}
