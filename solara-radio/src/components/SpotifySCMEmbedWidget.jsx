import { useEffect, useState } from "react";

export default function SpotifySCMEmbedPlayer() {
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useState("");

  useEffect(() => {
    fetch("https://solara-radio.onrender.com/api/spotify-playlists")
      .then((res) => res.json())
      .then((data) => {
        setPlaylists(data);
        if (data.length) {
          setPlaylistId(data[0].id);
        }
      })
      .catch((err) => console.error("Failed to load playlists:", err));
  }, []);

  const handleChange = (e) => {
    setPlaylistId(e.target.value);
  };

  const embedUrl = playlistId
    ? `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=solara`
    : "";

  const handleRandomSelect = () => {
    if (playlists.length) {
      const random = playlists[Math.floor(Math.random() * playlists.length)];
      setPlaylistId(random.id);
    }
  };

  return (
    <div className="solara-widget pb-2">
      <h2 className="widget-heading">Space Cowgirl Radio</h2>

      <div className="flex flex-col gap-4 mb-4">
        <label className="font-medium text-lg text-tan">
          Select a Playlist:
        </label>

        <select
          className="w-full p-2 px-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-700 whitespace-normal"
          value={playlistId}
          onChange={handleChange}
          disabled={!playlists.length}
        >
          {playlists.map((playlist) => (
            <option
              key={playlist.id}
              value={playlist.id}
              className="whitespace-normal"
            >
              {playlist.name.replace(/^SCM:\s*/, "")}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="px-4 py-2 bg-sage text-gunmetal rounded-lg shadow hover:bg-emerald-600 transition"
          onClick={handleRandomSelect}
          disabled={!playlists.length}
        >
          Surprise Me, Universe
        </button>
      </div>

      {embedUrl && (
        <div className="rounded-xl shadow-md overflow-hidden">
          <iframe
            title="Spotify Playlist Embed"
            src={embedUrl}
            width="100%"
            height="380"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      )}
    </div>
  );
}

