import { useState, useEffect } from 'react';
import { useGeolocation } from '../context/GeolocationProvider';

const API_KEY = 'YOUR_N2YO_API_KEY';

const SATELLITES = [
  { name: 'ISS (ZARYA)', noradId: 25544 },
  { name: 'Hubble Space Telescope', noradId: 20580 },
  { name: 'NOAA 15', noradId: 25338 },
  { name: 'AO-91 (RadFxSat)', noradId: 43017 },
  { name: 'SO-50', noradId: 27607 },
  { name: 'FO-29 (JAS-2)', noradId: 24278 },
  { name: 'FUNCube-1 (AO-73)', noradId: 39444 },
  { name: 'Tiangong Space Station (CSS)', noradId: 48274 },
  // Trimmed for sidebar performance; include more as needed
];

export default function SatellitePassWidget() {
  const { location, enabled, error: geoError } = useGeolocation();
  const [noradId, setNoradId] = useState(SATELLITES[0].noradId);
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const latitude = location?.latitude;
  const longitude = location?.longitude;

  useEffect(() => {
    if (!enabled || !latitude || !longitude || API_KEY === 'REPLACE_ME') return;

    async function fetchPasses() {
      setLoading(true);
      try {
        const url = `https://api.n2yo.com/rest/v1/satellite/radiopasses/${noradId}/${latitude}/${longitude}/0/2/60/&apiKey=${API_KEY}`;
        const res = await fetch(url);
        const json = await res.json();
        setPasses(json.passes || []);
      } catch (err) {
        console.error('Error fetching satellite passes:', err);
        setPasses([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPasses();
  }, [noradId, latitude, longitude, enabled]);

  return (
    <div className="bg-coffee p-4 rounded-2xl shadow-lg max-h-[420px] overflow-auto text-sm">
      <h2 className="text-base font-heading text-persian-orange mb-2">
        Satellite Pass Predictor
      </h2>

      {!enabled ? (
        <p className="text-tan">Enable geolocation to view satellite passes for your location.</p>
      ) : geoError ? (
        <p className="text-red-400">Geolocation error: {geoError}</p>
      ) : !latitude || !longitude ? (
        <p className="text-tan">Waiting for location data…</p>
      ) : (
        <>
          <select
            value={noradId}
            onChange={(e) => setNoradId(Number(e.target.value))}
            className="w-full p-1 mb-3 rounded bg-gunmetal text-tan border border-tan text-xs"
          >
            {SATELLITES.map((sat) => (
              <option key={sat.noradId} value={sat.noradId}>
                {sat.name}
              </option>
            ))}
          </select>

          {loading && <p className="text-tan">Loading passes…</p>}

          {!loading && passes.length === 0 && (
            <p className="text-tan">No upcoming passes in next 2 days.</p>
          )}

          {!loading && passes.length > 0 && (
            <ul className="space-y-2">
              {passes.map((p, i) => (
                <li key={i} className="p-2 rounded bg-sage text-gunmetal leading-snug">
                  <strong>{new Date(p.startUTC * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong><br />
                  Max El: {Math.round(p.maxEl)}° · {Math.round(p.duration / 60)} min
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

