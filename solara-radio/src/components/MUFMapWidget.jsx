import { useState } from 'react';
import Modal from '../components/Modal';

export default function MUFMapWidget() {
  const [source, setSource] = useState('propquest');
  const [showModal, setShowModal] = useState(false);

  const sources = {
    propquest: 'https://propquest.co.uk/map.php',
    bom: 'http://www.ips.gov.au/HF_Systems/6/5'
  };

  return (
    <div className="bg-coffee p-4 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">MUF Map</h2>

      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setSource('propquest')}
          className={`px-4 py-2 rounded-lg ${source === 'propquest' ? 'bg-persian-orange text-gunmetal' : 'bg-tan text-coffee'}`}
        >
          Propquest
        </button>
        <button
          onClick={() => setSource('bom')}
          className={`px-4 py-2 rounded-lg ${source === 'bom' ? 'bg-persian-orange text-gunmetal' : 'bg-tan text-coffee'}`}
        >
          BOM Australia
        </button>
      </div>

      <img
        src="/mufmap-thumbnail.png"
        alt="MUF Map Thumbnail"
        className="w-full h-48 object-cover rounded-lg cursor-pointer border-2 border-persian-orange"
        onClick={() => setShowModal(true)}
      />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <iframe
            src={sources[source]}
            title="MUF Map"
            className="w-full h-full rounded-lg border-2 border-persian-orange"
          ></iframe>
        </Modal>
      )}
    </div>
  );
}
