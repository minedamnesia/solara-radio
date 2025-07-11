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
    <div className="solara-widget short-widget">
      <h2 className="widget-heading">MUF Map</h2>

      <p className="font-sans text-tan mb-4">
        Choose a MUF propagation source. Map will open in a new tab.
      </p>

      <div className="mb-4 flex flex-wrap gap-3">
        {Object.entries(sources).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setSource(key)}
            className={`px-4 py-2 rounded-lg text-sm font-bold ${
              source === key
                ? 'bg-persian-orange text-gunmetal'
                : 'bg-tan text-coffee'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        onClick={handleOpenMap}
        className="px-4 py-2 bg-persian-orange text-gunmetal rounded-lg hover:bg-amber-400 transition"
      >
        Open {current.label} →
      </button>
    </div>
  );
}

