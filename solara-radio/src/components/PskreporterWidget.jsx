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
      <p className="text-sm text-coffee mb-3">Where you are heard (digital modes).</p>

      <input
        type="text"
        placeholder="Enter Your Callsign"
        value={callsign}
        onChange={(e) => setCallsign(e.target.value)}
        className="mb-3 p-2 text-sm rounded w-full border border-tan bg-gunmetal text-tan placeholder-tan"
      />

      <button
        onClick={handleSearch}
        className="w-full text-sm px-3 py-2 bg-persian-orange text-gunmetal rounded-lg hover:bg-amber-400 transition"
      >
        Show Reception Map →
      </button>
    </div>
  );
}

