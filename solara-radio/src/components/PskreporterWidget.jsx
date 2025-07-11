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
      <h3 className="sidebar-heading">PSK Reporter</h3>
      <p className="text-sm text-coffee mb-3">Where you are heard (digital modes).</p>

      <input
        type="text"
        placeholder="Enter Your Callsign"
        value={callsign}
        onChange={(e) => setCallsign(e.target.value)}
        className="mb-3 p-2 text-sm rounded w-full border border-tan bg-tan text-gunmetal placeholder-gunmetal"
      />

      <button
        onClick={handleSearch}
        className="w-full sidebar-button"
      >
        Show Reception Map →
      </button>
    </div>
  );
}

