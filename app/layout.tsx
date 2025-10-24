import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebTalk-AI",
  description: "Parlez aux sites web grâce à l'IA (Llama 3, Upstash, Next.js)"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <header className="mb-6 flex items-center gap-2">
            <div className="text-2xl font-semibold">WebTalk-AI</div>
            <span className="text-xs rounded-full px-2 py-0.5 bg-neutral-200">pro</span>
          </header>
          {children}
          <footer className="mt-10 text-xs text-neutral-500">
            Réalisé par <a className="underline" href="https://linkedin.com/in/rostand-surel" target="_blank" rel="noreferrer">Rostand Surel</a>
          </footer>
        </div>
      </body>
    </html>
  );
}
