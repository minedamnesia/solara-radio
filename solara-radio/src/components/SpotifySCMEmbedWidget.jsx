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

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-xl rounded-2xl border border-gray-200 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <label className="font-medium text-lg text-gray-800">
          Select a Playlist:
        </label>
        <select
          className="w-full md:w-2/3 p-2 px-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-700 whitespace-normal"
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
      </div>

      {embedUrl && (
        <iframe
          title="Spotify Playlist Embed"
          src={embedUrl}
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-xl shadow-md"
        ></iframe>
      )}
    </div>
  );
}

