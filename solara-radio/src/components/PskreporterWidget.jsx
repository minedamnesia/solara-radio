import { useState } from 'react';

export default function PSKReporterWidget() {
  const [callsign, setCallsign] = useState('');

  const handleSearch = () => {
    if (!callsign) return;
    const encodedCallsign = encodeURIComponent(callsign);
    const url = `https://pskreporter.info/pskmap.html?preset&callsign=${encodedCallsign}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="sidebar-widget short-widget">
      <h2 className="sidebar-heading">PSK Reporter</h2>
      <p>  Where You Are Heard</p>

      <input
        type="text"
        placeholder="Enter Your Callsign"
        value={callsign}
        onChange={(e) => setCallsign(e.target.value)}
        className="mb-4 p-2 rounded w-full"
      />

      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-persian-orange text-gunmetal rounded-lg hover:bg-amber-400 transition"
      >
        Show Reception Map
      </button>
    </div>
  );
}

