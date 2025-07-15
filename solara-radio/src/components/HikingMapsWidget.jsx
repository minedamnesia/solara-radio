import { useState, useEffect } from 'react';
import { FiCompass } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { GiParkBench,GiHiking } from 'react-icons/gi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FaMapMarkedAlt } from 'react-icons/fa';

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
  const [nearbyPark, setNearbyPark] = useState(null);
  const [userCoords, setUserCoords] = useState(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false); // ✅ New state

  // <FiCompass size={18} className="text-coffee" /> Auto-detect location if checkbox is checked
  useEffect(() => {
    if (!useCurrentLocation || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lon = position.coords.longitude.toFixed(4);
        setUserCoords({ lat, lon });

        try {
          const res = await fetch(`https://solara-radio.onrender.com/api/nearest-park?lat=${lat}&lon=${lon}`);
          const data = await res.json();
          if (data && data.reference && data.state) {
            setNearbyPark(data);
            setSelectedState(data.state);
            setSelectedPark(data);
          }
        } catch (err) {
          console.error('Error fetching nearby POTA site:', err);
        }
      },
      (err) => console.warn('Geolocation denied or failed:', err),
      { enableHighAccuracy: true }
    );
  }, [useCurrentLocation]);

  // <GiParkBench size={18} className="text-coffee" /> Fetch parks for selected state
  useEffect(() => {
    if (!selectedState || useCurrentLocation) return;

    async function fetchParks() {
      try {
        const response = await fetch(`https://solara-radio.onrender.com/api/parks?state=${selectedState}`);
        const data = await response.json();
        setParks(data);
        if (!nearbyPark || nearbyPark.state !== selectedState) {
          setSelectedPark(null);
          setTrails([]);
        }
      } catch (error) {
        console.error('Error fetching parks:', error);
      }
    }

    fetchParks();
  }, [selectedState, useCurrentLocation]);

  // <GiHiking size={18} className="text-coffee" /> Fetch hiking trails
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
    <div className="solara-widget">
      <h2 className="widget-heading">Hiking Trails near POTA spots</h2>

      {/* <FiCompass size={18} className="text-coffee" /> Location Checkbox */}
      <label className="block mb-4 text-tan text-sm">
        <input
          type="checkbox"
          checked={useCurrentLocation}
          onChange={(e) => {
            setUseCurrentLocation(e.target.checked);
            if (!e.target.checked) {
              setNearbyPark(null);
              setSelectedPark(null);
              setSelectedState('');
              setUserCoords(null);
              setParks([]);
              setTrails([]);
            }
          }}
          className="mr-2"
        />
        Use my current location
      </label>

      {/* <GiParkBench size={18} className="text-coffee" /> Nearby Park Display */}
      {useCurrentLocation && nearbyPark && (
        <div className="p-2 mb-4 rounded bg-tan text-gunmetal shadow-md">
          <p className="font-semibold text-sm">Your current POTA location is:</p>
          <p className="text-md font-heading text-persian-orange">
            {nearbyPark.name} ({nearbyPark.reference})
          </p>
          <p className="text-xs">Lat: {nearbyPark.latitude}, Lon: {nearbyPark.longitude}</p>
        </div>
      )}

      {/* <HiOutlineLocationMarker size={18} className="text-coffee" /> State Dropdown (hidden in auto-mode) */}
      {!useCurrentLocation && (
        <select
          onChange={(e) => setSelectedState(e.target.value)}
          value={selectedState}
          className="mb-4 p-2 rounded w-full bg-tan text-gunmetal"
        >
          <option value="">Select a State</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      )}

      {/* <GiParkBench size={18} className="text-coffee" /> Park Dropdown (hidden in auto-mode) */}
      {!useCurrentLocation && parks.length > 0 && (
        <select
          onChange={(e) => {
            const park = parks.find(p => p.reference === e.target.value);
            setSelectedPark(park);
          }}
          value={selectedPark?.reference || ''}
          className="mb-4 p-2 rounded w-full bg-tan text-gunmetal"
        >
          <option value="">Select a POTA Site</option>
          {parks.map((park) => (
            <option key={park.reference} value={park.reference}>
              {park.name} ({park.reference})
            </option>
          ))}
        </select>
      )}

      {/* <AiOutlineInfoCircle size={18} className="text-coffee" /> Park Info */}
      {selectedPark && (
        <div className="font-sans text-tan mb-4">
          <p>Selected Park: {selectedPark.name}</p>
          <p>Coordinates: {selectedPark.latitude}, {selectedPark.longitude}</p>
        </div>
      )}

      {/* <GiHiking size={18} className="text-coffee" /> Trail List */}
      {trails.length > 0 && (
        <div className="mt-4 font-sans text-coffee">
          <h3 className="text-xl font-heading mb-2 text-persian-orange">Nearby Hiking Trails</h3>
          <ul className="list-disc list-inside text-sm space-y-1 bg-tan text-gunmetal">
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

      {/* <FaMapMarkedAlt size={18} className="text-coffee" /> Modal with Trail Map */}
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

