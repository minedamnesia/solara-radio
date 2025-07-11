import { useState, useEffect } from 'react';
import { useGeolocation } from '../context/GeolocationProvider';

const API_KEY = 'YOUR_N2YO_API_KEY';

const SATELLITES = [
  { name: 'ISS (ZARYA)', noradId: 25544 },
  { name: 'Hubble Space Telescope', noradId: 20580 },
  { name: 'NOAA 15', noradId: 25338 },
  { name: 'NOAA 18', noradId: 28654 },
  { name: 'NOAA 19', noradId: 33591 },
  { name: 'GOES 16 (GOES-R)', noradId: 41866 },
  { name: 'GOES 17 (GOES-S)', noradId: 43226 },
  { name: 'GOES 18 (GOES-T)', noradId: 52025 },
  { name: 'AO-07 (AMSAT-OSCAR 7)', noradId: 7530 },
  { name: 'AO-91 (RadFxSat)', noradId: 43017 },
  { name: 'AO-92 (Fox-1D)', noradId: 43137 },
  { name: 'SO-50', noradId: 27607 },
  { name: 'FO-29 (JAS-2)', noradId: 24278 },
  { name: 'XW-2A (CAS-3A)', noradId: 40903 },
  { name: 'XW-2B (CAS-3B)', noradId: 40911 },
  { name: 'XW-2C (CAS-3C)', noradId: 40906 },
  { name: 'XW-2D (CAS-3D)', noradId: 40907 },
  { name: 'XW-2F (CAS-3F)', noradId: 40910 },
  { name: 'LilacSat-2', noradId: 40908 },
  { name: 'UKube-1', noradId: 40074 },
  { name: 'FUNCube-1 (AO-73)', noradId: 39444 },
  { name: 'FalconSat-3', noradId: 30776 },
  { name: 'Meteor-M2', noradId: 40069 },
  { name: 'Tiangong Space Station (CSS)', noradId: 48274 },
  { name: 'Landsat 8', noradId: 39084 },
  { name: 'Landsat 9', noradId: 49260 },
  { name: 'Terra (EOS AM-1)', noradId: 25994 },
  { name: 'Aqua (EOS PM-1)', noradId: 27424 },
  { name: 'Suomi NPP', noradId: 37849 },
  { name: 'Fengyun 3C', noradId: 39260 },
  { name: 'Resurs-P1', noradId: 39186 },
  { name: 'SPOT 6', noradId: 38755 },
  { name: 'SPOT 7', noradId: 40053 },
  { name: 'TERRA SAR-X', noradId: 31698 },
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
    <div className="solara-widget">
      <h2 className="widget-heading">Satellite Pass Predictor</h2>

      {!enabled ? (
        <p className="text-sm text-tan">Enable geolocation to view satellite passes for your location.</p>
      ) : geoError ? (
        <p className="text-sm text-red-400">Geolocation error: {geoError}</p>
      ) : !latitude || !longitude ? (
        <p className="text-sm text-tan">Waiting for location data…</p>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <select
              value={noradId}
              onChange={(e) => setNoradId(Number(e.target.value))}
              className="p-2 text-sm rounded bg-gunmetal text-tan border border-tan"
            >
              {SATELLITES.map((sat) => (
                <option key={sat.noradId} value={sat.noradId}>
                  {sat.name}
                </option>
              ))}
            </select>
          </div>

          {loading && <p className="text-sm text-tan">Loading pass data…</p>}

          {!loading && passes.length === 0 && (
            <p className="text-sm text-tan">No upcoming radio passes in next 2 days.</p>
          )}

          {!loading && passes.length > 0 && (
            <ul className="space-y-2 text-sm font-sans">
              {passes.map((p, i) => (
                <li key={i} className="p-2 bg-sage rounded text-gunmetal">
                  <strong>{new Date(p.startUTC * 1000).toLocaleString()}</strong> • 
                  Max Elevation: {Math.round(p.maxEl)}° • Duration: {Math.round(p.duration / 60)} min
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

