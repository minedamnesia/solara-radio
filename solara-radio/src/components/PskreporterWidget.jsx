import { useState } from 'react';
import Modal from '../components/Modal';

export default function PSKReporterWidget() {
  const [callsign, setCallsign] = useState('');
  const [mapUrl, setMapUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSearch = () => {
    if (!callsign) return;
    const encodedCallsign = encodeURIComponent(callsign);
    const url = `https://pskreporter.info/pskmap.html?preset&callsign=${encodedCallsign}`;
    setMapUrl(url);
  };

  return (
    <div className="solara-widget">
      <h3 className="widget-heading">PSK Reporter - Where You Are Heard</h3>

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
        <div>
          <img
            src="/pskreporter-thumbnail.png"
            alt="PSK Reporter Thumbnail"
            className="w-full h-48 object-cover rounded-lg cursor-pointer border-2 border-persian-orange"
            onClick={() => setShowModal(true)}
          />

          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <iframe
                src={mapUrl}
                title="PSK Reporter Map"
                className="w-3/4 h-[75vh] rounded-lg border-2 border-persian-orange"
              ></iframe>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}
