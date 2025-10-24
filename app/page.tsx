import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold mb-2">Parlez à une page web avec l'IA</h1>
      <p className="text-neutral-700 mb-6">Entrez une URL dans le chemin de l’application, par exemple :</p>
      <pre className="mb-4">/https://developer.mozilla.org/fr/docs/Web/HTTP</pre>
      <Link className="underline" href="/https://developer.mozilla.org/fr/docs/Web/HTTP">
        Essayer avec MDN HTTP
      </Link>
    </main>
  );
}
