import { useState, useEffect } from 'react';

async function fetchTrailsFromOverpass(lat, lon, distanceKm = 5) {
  const radiusMeters = distanceKm * 1000;

  const query = `
    [out:json];
    (
      way(around:${radiusMeters},${lat},${lon})["highway"="path"];
    );
    out body;
    >;
    out skel qt;
  `;

  const url = 'https://overpass-api.de/api/interpreter';

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: query,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const data = await response.json();

    const trails = data.elements
      .filter(element => element.type === 'way')
      .map(way => ({
        id: way.id,
        name: way.tags && way.tags.name ? way.tags.name : 'Unnamed Trail'
      }));

    return trails;
  } catch (error) {
    console.error('Error fetching trails from Overpass API:', error);
    return [];
  }
}

export default function PotaTrailLookup() {
  const [parks, setParks] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null);
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(false);

  // Step 1: Fetch POTA parks
  useEffect(() => {
    async function fetchParks() {
      try {
        const response = await fetch('https://api.pota.app/parks');
        const data = await response.json();
        setParks(data.parks);
      } catch (error) {
        console.error('Error fetching parks:', error);
      }
    }
    fetchParks();
  }, []);

  // Step 2: Fetch trails when park is selected
  const fetchTrails = async (park) => {
    setSelectedPark(park);
    setLoading(true);
    try {
      const trails = await fetchTrailsFromOverpass(park.latitude, park.longitude, 5);
      setTrails(trails);
    } catch (error) {
      console.error('Error fetching trails:', error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-coffee p-4 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">POTA Trail Lookup</h2>

      <select
        onChange={(e) => {
          const park = parks.find(p => p.reference === e.target.value);
          if (park) fetchTrails(park);
        }}
        className="mb-4 p-2 rounded"
      >
        <option>Select a POTA Park</option>
        {parks.map((park) => (
          <option key={park.reference} value={park.reference}>
            {park.name} ({park.reference})
          </option>
        ))}
      </select>

      {loading && <p className="font-sans text-tan">Loading trails...</p>}

      {selectedPark && (
        <>
          <h3 className="text-2xl font-heading mb-2 text-persian-orange">{selectedPark.name}</h3>
          <ul className="font-sans text-tan">
            {trails.length > 0 ? trails.map((trail, index) => (
              <li key={index} className="mb-2">
                <strong>{trail.name}</strong> - {trail.length} miles - {trail.difficulty}
              </li>
            )) : (
              <p>No trails found near this park.</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

