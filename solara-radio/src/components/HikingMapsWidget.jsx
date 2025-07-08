import { useState, useEffect } from 'react';
import Modal from './Modal';

export default function HikingMapsWidget() {
  const [states] = useState([
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ]);
  const [selectedState, setSelectedState] = useState('');
  const [parks, setParks] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null);
  const [trails, setTrails] = useState([]);
  const [selectedTrail, setSelectedTrail] = useState(null);

  useEffect(() => {
    if (!selectedState) return;

    async function fetchParks() {
      try {
        const response = await fetch(`https://solara-radio.onrender.com/api/parks?state=${selectedState}`);
        const data = await response.json();
        setParks(data);
        setSelectedPark(null);
        setTrails([]);
      } catch (error) {
        console.error('Error fetching parks:', error);
      }
    }

    fetchParks();
  }, [selectedState]);

  useEffect(() => {
    if (!selectedPark || !selectedPark.latitude || !selectedPark.longitude) return;

    async function fetchNearbyTrails(lat, lon) {
      const query = `
        [out:json];
        (
          way["highway"="path"](around:5000,${lat},${lon});
          relation["highway"="path"](around:5000,${lat},${lon});
        );
        out body;
        >;
        out skel qt;
      `;

      try {
        const response = await fetch("https://overpass-api.de/api/interpreter", {
          method: 'POST',
          body: query,
        });
        const data = await response.json();
        setTrails(data.elements || []);
      } catch (error) {
        console.error('Error fetching trails:', error);
      }
    }

    fetchNearbyTrails(selectedPark.latitude, selectedPark.longitude);
  }, [selectedPark]);

  return (
    <div className="bg-coffee p-4 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">Hiking Maps</h2>

      {/* State Dropdown */}
      <select
        onChange={(e) => setSelectedState(e.target.value)}
        value={selectedState}
        className="mb-4 p-2 rounded w-full"
      >
        <option value="">Select a State</option>
        {states.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      {/* Park Dropdown */}
      {parks.length > 0 && (
        <select
          onChange={(e) => {
            const park = parks.find(p => p.reference === e.target.value);
            setSelectedPark(park);
          }}
          className="mb-4 p-2 rounded w-full"
        >
          <option value="">Select a POTA Park</option>
          {parks.map((park) => (
            <option key={park.reference} value={park.reference}>
              {park.name} ({park.reference})
            </option>
          ))}
        </select>
      )}

      {/* Park Info */}
      {selectedPark && (
        <div className="font-sans text-tan mb-4">
          <p>Selected Park: {selectedPark.name}</p>
          <p>Coordinates: {selectedPark.latitude}, {selectedPark.longitude}</p>
        </div>
      )}

      {/* Trails */}
      {trails.length > 0 && (
        <div className="mt-4 font-sans text-tan">
          <h3 className="text-xl font-heading mb-2 text-persian-orange">Nearby Hiking Trails</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {trails.slice(0, 5).map((trail, index) => (
              <li key={index}>
                <button
                  onClick={() => setSelectedTrail(trail)}
                  className="text-amber-300 hover:underline"
                >
                  {trail.tags?.name || `Unnamed Trail (${trail.id})`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal Trail Map */}
      {selectedTrail && (
        <Modal onClose={() => setSelectedTrail(null)}>
          <div className="p-4 text-tan">
            <h2 className="text-2xl font-heading mb-2 text-persian-orange">
              {selectedTrail.tags?.name || 'Trail Visualization'}
            </h2>
            <iframe
              title="OSM Trail Map"
              width="100%"
              height="500"
              className="rounded-lg shadow-md"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedPark.longitude - 0.01},${selectedPark.latitude - 0.01},${selectedPark.longitude + 0.01},${selectedPark.latitude + 0.01}&layer=mapnik&marker=${selectedPark.latitude},${selectedPark.longitude}`}
            />
            <p className="mt-2 text-sm">Visualizing trail area around park center.</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

