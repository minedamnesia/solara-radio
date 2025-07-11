import { useState } from 'react';

export default function MUFMapWidget() {
  const [source, setSource] = useState('propquest');

  const sources = {
    propquest: {
      label: 'Propquest',
      url: 'https://propquest.co.uk/map.php',
    },
    hamdxmap: {
      label: 'HamDXMap',
      url: 'https://dxmap.f5uii.net',
    },
  };

  const current = sources[source];

  const handleOpenMap = () => {
    if (current?.url) {
      window.open(current.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="sidebar-widget short-widget">
      <h3 className="sidebar-heading">MUF Map</h3>

      <p className="font-sans text-coffee text-sm mb-3">
        Choose a source. Map opens in a new tab.
      </p>

      <div className="mb-3 flex flex-wrap gap-2">
        {Object.entries(sources).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setSource(key)}
            className={`px-2.5 py-1.5 rounded text-xs font-semibold transition ${
              source === key
                ? 'bg-persian-orange text-gunmetal'
                : 'bg-tan text-coffee hover:bg-tan/80'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        onClick={handleOpenMap}
        className="w-full sidebar-button"
      >
        Open {current.label} →
      </button>
    </div>
  );
}

