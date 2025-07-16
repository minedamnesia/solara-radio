import { useState, useEffect } from 'react';
import { useGeolocation } from '../context/GeolocationProvider';

const SATELLITES = [
  { name: 'AO-07 (AMSAT-OSCAR 7)', noradId: 7530 },
  { name: 'AO-73 (FUNcube-1)', noradId: 39444 },
  { name: 'AO-91 (RadFxSat)', noradId: 43017 },
  { name: 'AO-92 (Fox-1D)', noradId: 43137 },
  { name: 'CAS-4A', noradId: 42761 },
  { name: 'CAS-4B', noradId: 42759 },
  { name: 'FO-29 (JAS-2)', noradId: 24278 },
  { name: 'Hubble Space Telescope', noradId: 20580 },
  { name: 'ISS (ZARYA)', noradId: 25544 },
  { name: 'JO-97 (JY1SAT)', noradId: 43803 },
  { name: 'LilacSat-2 (CAS-3H)', noradId: 40908 }, 
  { name: 'NOAA 15', noradId: 25338 },
  { name: 'NO-84 (PSAT)', noradId: 40654 },
  { name: 'PO-101 (Diwata-2)', noradId: 43678 },
  { name: 'SO-50 (SaudiSat-1C)', noradId: 27607 },
  { name: 'TEVEL-1', noradId: 51031 },
  { name: 'TEVEL-2', noradId: 51032 },
  { name: 'Tiangong Space Station (CSS)', noradId: 48274 },
  { name: 'TO-108 (CAS-6)', noradId: 44881 },
  { name: 'UKube-1', noradId: 40074 },
  { name: 'XW-2A', noradId: 40903 },
  { name: 'XW-2B', noradId: 40911 },
  { name: 'XW-2F', noradId: 40910 }
];

export default function SatellitePassWidget() {
  const { location, enabled, error: geoError } = useGeolocation();
  const [noradId, setNoradId] = useState(SATELLITES[0].noradId);
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const latitude = location?.latitude;
  const longitude = location?.longitude;

  useEffect(() => {
    if (!enabled || !latitude || !longitude) return;
    async function fetchPasses() {
      setLoading(true);
      try {
        const url = `https://solara-radio.onrender.com/api/satellite-passes?lat=${latitude}&lon=${longitude}`;
        const res = await fetch(url);
        const json = await res.json();
        setPasses(json.passes || []);
        const now = Date.now() / 1000; // current time in UTC seconds
        const next = json.passes?.find(p => p.startUTC > now);
        setPasses(next ? [next] : []);
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
    <div className="sidebar-widget">
      <h2 className="sidebar-heading">
        Satellite Pass Predictor
      </h2>

      {!enabled ? (
        <p className="text-coffee">Enable geolocation to view satellite passes for your location.</p>
      ) : geoError ? (
        <p className="text-persian-orange">Geolocation error: {geoError}</p>
      ) : !latitude || !longitude ? (
        <p className="text-coffee">Waiting for location data…</p>
      ) : (
        <>
          <select
            value={noradId}
            onChange={(e) => setNoradId(Number(e.target.value))}
            className="w-full p-1 mb-3 rounded bg-tan text-gunmetal border border-tan text-xs"
          >
            {SATELLITES.map((sat) => (
              <option key={sat.noradId} value={sat.noradId}>
                {sat.name}
              </option>
            ))}
          </select>

          {loading && <p className="text-tan">Loading passes…</p>}
          {!loading && passes.length > 0 && (
            <ul className="space-y-2">
              {passes.map((p, i) => (
                <li key={i} className="p-2 rounded bg-sage text-gunmetal leading-snug">
                  <strong>Next Pass:</strong><br />
                  {new Date(p.startUTC * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br />
                  Max El: {Math.round(p.maxEl)}° · {Math.round(p.duration / 60)} min
                </li>
              ))}
            </ul>
          )}

          {!loading && passes.length === 0 && (
            <p className="text-coffee">No upcoming passes in next 2 days.</p>
          )}

        </>
      )}
    </div>
  );
}

