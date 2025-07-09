import React, { useState } from 'react';

export default function SpotifyEmbedWidget() {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div className="bg-coffee p-4 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">
        Solara Radio
      </h2>

      {!showPlayer ? (
        <button
          onClick={() => setShowPlayer(true)}
          className="px-6 py-2 bg-sage text-white rounded-xl hover:bg-[#88A074]"
        >
          🎧 Launch Spotify Player
        </button>
      ) : (
        <iframe
          src="https://solara-spotify.vercel.app/"
          width="100%"
          height="600"
          className="rounded-xl border border-sage shadow-inner mt-4"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
          title="Solara's Space Cowgirl Radio"
        />
      )}
    </div>
  );
}

