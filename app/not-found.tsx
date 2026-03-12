import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body className="bg-[#faf9f7] min-h-screen flex items-center justify-center px-6 font-sans antialiased">
        <div className="text-center">
          <div
            className="font-serif text-[#e5dfd4] font-light select-none leading-none mb-8"
            style={{ fontSize: "clamp(8rem, 20vw, 14rem)" }}
            aria-hidden="true"
          >
            404
          </div>
          <div
            className="h-px max-w-xs mx-auto mb-8"
            style={{
              background:
                "linear-gradient(to right, transparent, #C9A96E, transparent)",
            }}
          />
          <h1 className="text-[#102C26] text-2xl font-light mb-4">
            Page introuvable
          </h1>
          <p className="text-sm text-[#6b6059] font-light leading-relaxed mb-8">
            Cette page n&apos;existe pas.
          </p>
          <Link
            href="/fr"
            className="bg-[#102C26] text-[#F7E7CE] text-xs font-semibold tracking-[0.1em] uppercase px-8 py-4 hover:bg-[#1a4238] transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </body>
    </html>
  );
}
