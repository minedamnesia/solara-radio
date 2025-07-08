export default function SpotifyEmbedWidget() {
  return (
    <div className="bg-coffee p-4 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">
        Solara Radio
      </h2>
      <iframe
        src="https://solara-spotify.vercel.app/"
        width="100%"
        height="600"
        className="rounded-xl border border-sage shadow-inner"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
        title="Solara's Space Cowgirl Radio"
      />
    </div>
  );
}

