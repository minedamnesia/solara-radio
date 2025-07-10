import { useState } from 'react';
import Modal from '../components/Modal';

export default function MUFMapWidget() {
  const [source, setSource] = useState('propquest');
  const [showModal, setShowModal] = useState(false);

  const sources = {
    propquest: {
      label: "Propquest (3000 km MUF)",
      url: 'https://propquest.co.uk/map.php',
      type: 'modal'
    },
    hamdxmap: {
      label: "HamDXMap (global MUF & foF2)",
      url: 'https://dxmap.f5uii.net',
      type: 'external'
    }
  };

  const thumbnailSrc = '/mufmap-thumbnail.png';

  const current = sources[source];

  return (
    <div className="bg-coffee p-4 rounded-2xl shadow-lg solara-widget">
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">
        MUF Map
      </h2>

      <p className="font-sans text-tan mb-4">
        Choose a MUF propagation source. Some maps open fullscreen, others open in a new tab.
      </p>

      <div className="mb-4 flex space-x-4">
        {Object.entries(sources).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => {
              setSource(key);
              setShowModal(false); // close any open modal when switching
            }}
            className={`px-4 py-2 rounded-lg ${
              source === key
                ? 'bg-persian-orange text-gunmetal'
                : 'bg-tan text-coffee'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative">
        <img
          src={thumbnailSrc}
          alt="MUF Map thumbnail"
          onError={e => {
            e.target.onerror = null;
            e.target.src = thumbnailSrc;
          }}
          className={`w-full h-48 object-cover rounded-lg border-2 border-persian-orange ${
            current.type === 'modal' ? 'cursor-pointer' : 'opacity-70 cursor-default'
          }`}
          onClick={() => {
            if (current.type === 'modal') setShowModal(true);
          }}
        />

        {current.type === 'external' && (
          <div className="mt-4 text-center">
            <a
              href={current.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-persian-orange text-gunmetal rounded-lg hover:bg-amber-400 text-sm font-bold"
            >
              Open {current.label} →
            </a>
            <p className="text-xs text-tan mt-1">This map opens in a new tab.</p>
          </div>
        )}
      </div>

      {showModal && current.type === 'modal' && (
        <Modal onClose={() => setShowModal(false)}>
          <iframe
            src={current.url}
            title="MUF Map"
            className="w-full h-full rounded-lg border-2 border-persian-orange"
          ></iframe>
        </Modal>
      )}
    </div>
  );
}

