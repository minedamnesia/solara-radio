import { useState, useEffect } from 'react';
import useGeolocation from './useGeolocation'; // custom hook for user's lat/lon

const API_KEY = 'YOUR_N2YO_API_KEY';
const DEFAULT_NORAD = 25544; // ISS

export default function SatellitePassWidget() {
  const { latitude, longitude, loading: geoLoading, error: geoError } = useGeolocation();
  const [noradId, setNoradId] = useState(DEFAULT_NORAD);
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!latitude || !longitude) return;

    async function fetchPasses() {
      setLoading(true);
      const url = `https://api.n2yo.com/rest/v1/satellite/radiopasses/${noradId}/${latitude}/${longitude}/0/2/60/&apiKey=${API_KEY}`;
      const res = await fetch(url);
      const json = await res.json();
      setPasses(json.passes || []);
      setLoading(false);
    }

    fetchPasses();
  }, [noradId, latitude, longitude]);

  if (geoError) return <p className="text-red-400">Geolocation error: {geoError}</p>;
  if (geoLoading) return <p>Getting location…</p>;

  return (
    <div className="solara-widget">
      <h2 className="widget-heading">Satellite Pass Predictor</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={noradId}
          onChange={(e) => setNoradId(Number(e.target.value))}
          className="w-24 p-1 text-sm rounded bg-gunmetal text-tan border border-tan"
        />
        <button
          onClick={() => {/* trigger via useEffect */}}
          className="px-2 py-1 text-xs bg-persian-orange text-gunmetal rounded hover:bg-amber-400"
        >Track</button>
      </div>

      {loading && <p>Loading pass data…</p>}

      {!loading && passes.length === 0 && (
        <p>No upcoming radio passes in next 2 days.</p>
      )}

      {!loading && passes.length > 0 && (
        <ul className="space-y-2 text-sm font-sans">
          {passes.map((p, i) => (
            <li key={i} className="p-2 bg-sage rounded">
              <strong>{new Date(p.startUTC * 1000).toLocaleString()}</strong> • 
              Max Elevation: {Math.round(p.maxEl)}° • Duration: {Math.round(p.duration/60)} min
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

