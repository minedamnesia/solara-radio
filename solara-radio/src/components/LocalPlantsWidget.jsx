import { useState } from 'react';
import { toLatLon, toMaiden } from 'maidenhead';

export default function LocalPlantsWidget() {
  const [gridSquare, setGridSquare] = useState('');
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [useGps, setUseGps] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const plantsPerPage = 5;

  const fetchPlants = async (lat, lon) => {
    setLoading(true);
    console.log('Fetching plants near:', lat, lon);

    try {
      const response = await fetch(
        `https://api.inaturalist.org/v1/observations?lat=${lat}&lng=${lon}&radius=10&taxon_id=47126&per_page=50`
      );
      const data = await response.json();
      console.log('Fetched data:', data);

      const plantMap = new Map();

      data.results.forEach(item => {
        if (item.taxon && item.taxon.preferred_common_name && item.taxon.default_photo) {
          plantMap.set(item.taxon.id, {
            id: item.taxon.id,
            name: item.taxon.preferred_common_name,
            photoUrl: item.taxon.default_photo.medium_url || item.taxon.default_photo.url
          });
        }
      });

      setPlants(Array.from(plantMap.values()));
      setCurrentPage(1); // Reset pagination
    } catch (error) {
      console.error('Error fetching plant data:', error);
    }

    setLoading(false);
  };

  const handleFetch = async () => {
    if (useGps) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const grid = toMaiden(latitude, longitude);
            setGridSquare(grid);
            fetchPlants(latitude, longitude);
          },
          (error) => {
            console.error('GPS Error:', error);
            setLoading(false);
          }
        );
      } else {
        console.error('Geolocation not supported.');
      }
    } else {
      if (!gridSquare) return;
      try {
        const [lat, lon] = toLatLon(gridSquare.toUpperCase()); // FIXED
        fetchPlants(lat, lon);
      } catch (e) {
        console.error('Invalid grid square:', e);
      }
    }
  };

  const indexOfLastPlant = currentPage * plantsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
  const currentPlants = plants.slice(indexOfFirstPlant, indexOfLastPlant);
  const totalPages = Math.ceil(plants.length / plantsPerPage);

  return (
    <div className="bg-coffee p-4 rounded-2xl shadow-lg solara-widget">
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">Local Plants</h2>

      <div className="mb-4">
        <label className="flex items-center space-x-2 text-tan">
          <input
            type="checkbox"
            checked={useGps}
            onChange={(e) => setUseGps(e.target.checked)}
          />
          <span>Use GPS Auto-Detect</span>
        </label>
      </div>

      <input
        type="text"
        placeholder="Enter Grid Square (e.g. DM13)"
        value={gridSquare}
        onChange={(e) => setGridSquare(e.target.value)}
        className="mb-4 p-2 rounded w-full"
        disabled={useGps}
      />

      <button
        onClick={handleFetch}
        className="mb-4 px-4 py-2 bg-persian-orange text-gunmetal rounded-lg hover:bg-amber-400"
      >
        Find Local Plants
      </button>

      {loading && <p className="font-sans text-tan">Loading plants...</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {currentPlants.length > 0 ? currentPlants.map((plant) => (
          <div key={plant.id} className="bg-sage p-2 rounded-lg shadow-md flex flex-col items-center">
            <img src={plant.photoUrl} alt={plant.name} className="w-full h-40 object-cover rounded mb-2" />
            <p className="font-sans text-gunmetal text-center">{plant.name}</p>
          </div>
        )) : !loading && <p className="font-sans text-tan">No plants found for this location.</p>}
      </div>

      {plants.length > plantsPerPage && (
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-persian-orange text-gunmetal rounded-lg hover:bg-amber-400 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-persian-orange text-gunmetal rounded-lg hover:bg-amber-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

