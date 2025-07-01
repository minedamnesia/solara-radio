import { useState } from 'react';

export default function PSKReporterWidget() {
  const [callsign, setCallsign] = useState('');
  const [mapUrl, setMapUrl] = useState('');

  const handleSearch = () => {
    if (!callsign) return;
    const encodedCallsign = encodeURIComponent(callsign);
    const url = `https://pskreporter.info/pskmap.html?preset&callsign=${encodedCallsign}`;
    setMapUrl(url);
  };

  return (
    <div className="bg-coffee p-4 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">PSK Reporter - Where You Are Heard</h2>

      <input
        type="text"
        placeholder="Enter Your Callsign"
        value={callsign}
        onChange={(e) => setCallsign(e.target.value)}
        className="mb-4 p-2 rounded w-full"
      />

      <button
        onClick={handleSearch}
        className="mb-4 px-4 py-2 bg-persian-orange text-gunmetal rounded-lg hover:bg-amber-400"
      >
        Show Reception Map
      </button>

      {mapUrl && (
        <iframe
          src={mapUrl}
          title="PSK Reporter Map"
          className="w-full h-[500px] rounded-lg border-2 border-persian-orange"
        ></iframe>
      )}
    </div>
  );
}

