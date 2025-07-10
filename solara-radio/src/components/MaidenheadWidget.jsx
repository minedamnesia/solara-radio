import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

export default function MaidenheadWidget() {
  const [grid, setGrid] = useState('');
  const [latlon, setLatlon] = useState({ lat: '', lon: '' });
  const [error, setError] = useState('');
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported.');
      setManual(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setLatlon({ lat: lat.toFixed(5), lon: lon.toFixed(5) });
        setGrid(latLonToMaiden(lat, lon));
      },
      () => {
        setError('Unable to access your location.');
        setManual(true);
      }
    );
  }, []);

  function latLonToMaiden(lat, lon) {
    lat += 90;
    lon += 180;

    const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const a = 'abcdefghijklmnopqrstuvwxyz';

    const field = A[Math.floor(lon / 20)] + A[Math.floor(lat / 10)];
    const square = `${Math.floor((lon % 20) / 2)}${Math.floor(lat % 10)}`;
    const subsquare =
      a[Math.floor(((lon % 2) / 2) * 24)] + a[Math.floor(((lat % 1) / 1) * 24)];

    return field + square + subsquare;
  }

  function handleManualSubmit(e) {
    e.preventDefault();
    const lat = parseFloat(latlon.lat);
    const lon = parseFloat(latlon.lon);
    if (isNaN(lat) || isNaN(lon)) {
      setError('Please enter valid numbers.');
      return;
    }
    setError('');
    setGrid(latLonToMaiden(lat, lon));
  }

  return (
    <div className="sidebar-widget text-center">
      <h2 className="sidebar-heading flex justify-center items-center gap-2">
        <MapPin size={20} />
        Grid Locator
      </h2>

      {grid ? (
        <>
          <p className="font-sans text-tan text-sm mb-2">Your grid square is:</p>
          <div className="text-3xl font-bold text-gunmetal bg-tan py-2 px-4 rounded-lg inline-block border border-persian-orange">
            {grid}
          </div>
          {latlon.lat && latlon.lon && (
            <p className="mt-2 text-xs text-tan">
              ({latlon.lat}, {latlon.lon})
            </p>
          )}
        </>
      ) : manual ? (
        <>
          <form onSubmit={handleManualSubmit} className="space-y-2">
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="Latitude (e.g., 36.123)"
                className="rounded p-2 text-gunmetal"
                value={latlon.lat}
                onChange={(e) => setLatlon((prev) => ({ ...prev, lat: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Longitude (e.g., -115.456)"
                className="rounded p-2 text-gunmetal"
                value={latlon.lon}
                onChange={(e) => setLatlon((prev) => ({ ...prev, lon: e.target.value }))}
              />
            </div>
            <button
              type="submit"
              className="bg-persian-orange text-gunmetal font-bold px-4 py-2 rounded hover:underline"
            >
              Calculate Grid Square
            </button>
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
          </form>
        </>
      ) : (
        <p className="text-tan font-sans text-sm">Detecting location...</p>
      )}
    </div>
  );
}

