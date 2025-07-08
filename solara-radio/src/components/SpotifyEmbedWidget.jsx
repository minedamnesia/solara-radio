export default function SpotifyEmbedWidget() {
  return (
    <div className="bg-coffee p-4 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">Solara Radio</h2>
      <iframe
        src="https://solara-spotify.netlify.app"
        width="100%"
        height="500"
        frameBorder="0"
        className="rounded-lg"
        allow="autoplay; clipboard-write; encrypted-media"
        title="Solara's Space Cowgirl Radio"
      />
    </div>
  );
}

