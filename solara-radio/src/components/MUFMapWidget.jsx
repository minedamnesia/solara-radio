import { useState } from 'react';
import Modal from '../components/Modal';

export default function MUFMapWidget() {
  const [source, setSource] = useState('propquest');
  const [showModal, setShowModal] = useState(false);

  const sources = {
    propquest: {
      label: "Propquest (3000 km MUF)",
      url: 'https://propquest.co.uk/map.php'
    },
    hamdxmap: {
      label: "HamDXMap (global MUF & foF2)",
      url: 'https://dxmap.f5uii.net'
    }
  };

  const thumbnailSrc = '/mufmap-thumbnail.png';

  return (
    <div className="bg-coffee p-4 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">
        MUF Map
      </h2>

      <p className="font-sans text-tan mb-4">
        Choose a MUF propagation source and view it fullscreen.
      </p>

      <div className="mb-4 flex space-x-4">
        {Object.entries(sources).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setSource(key)}
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

      <img
        src={thumbnailSrc}
        alt="MUF Map thumbnail"
        onError={e => {
          e.target.onerror = null;
          e.target.src = thumbnailSrc;
        }}
        className="w-full h-48 object-cover rounded-lg cursor-pointer border-2 border-persian-orange"
        onClick={() => setShowModal(true)}
      />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <iframe
            src={sources[source].url}
            title="MUF Map"
            className="w-full h-full rounded-lg border-2 border-persian-orange"
          ></iframe>
        </Modal>
      )}
    </div>
  );
}

