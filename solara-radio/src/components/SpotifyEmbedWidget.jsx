import React, { useRef, useEffect, useState } from 'react';

export default function SpotifyEmbedWidget() {
  const [showPlayer, setShowPlayer] = useState(false);
  const iframeRef = useRef(null);

  const handleLaunch = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    window.open(
      'https://solara-spotify.vercel.app/popup-login',
      'Spotify Login',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  useEffect(() => {
    const listener = (event) => {
      if (
        event.origin === 'https://solara-spotify.vercel.app' &&
        event.data?.type === 'SPOTIFY_TOKEN'
      ) {
        console.log('[Widget] Received token, forwarding to iframe.');
        setShowPlayer(true);

        // Delay to ensure iframe has mounted
        setTimeout(() => {
          iframeRef.current?.contentWindow?.postMessage(
            {
              type: 'SPOTIFY_TOKEN',
              token: event.data.token
            },
            'https://solara-spotify.vercel.app'
          );
        }, 1000);
      }
    };

    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);

  return (
    <div className="bg-coffee p-4 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">
        Solara Radio
      </h2>

      {!showPlayer ? (
        <button
          onClick={handleLaunch}
          className="px-6 py-2 bg-sage text-white rounded-xl hover:bg-[#88A074]"
        >
          🎧 Launch Spotify Player
        </button>
      ) : (
        <iframe
          ref={iframeRef}
          src="https://solara-spotify.vercel.app/"
          width="100%"
          height="600"
          className="rounded-xl border border-sage shadow-inner mt-4"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen"
          sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms allow-presentation"
          title="Solara's Space Cowgirl Radio"
        />
      )}
    </div>
  );
}

