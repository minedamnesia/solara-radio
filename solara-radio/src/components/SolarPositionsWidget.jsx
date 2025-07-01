import { useState, useEffect } from 'react';

export default function SolarPositionsWidget() {
  const [mode, setMode] = useState('weather'); // 'weather' or 'position'
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data when mode changes
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let response;

        if (mode === 'weather') {
          // Example: NOAA X-ray flares data
          response = await fetch('https://services.swpc.noaa.gov/json/goes/primary/xray-flares.json');
          const json = await response.json();
          setData(json.slice(0, 5)); // Take recent 5 flares
        } else if (mode === 'position') {
          // Example: Sunrise-Sunset API
          response = await fetch('https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&formatted=0');
          const json = await response.json();
          setData(json.results);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, [mode]);

  return (
    <div className="bg-coffee p-4 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">Solar Positions</h2>

      <div className="flex mb-4">
        <button
          className={`px-4 py-2 rounded-l-lg ${mode === 'weather' ? 'bg-persian-orange text-gunmetal' : 'bg-tan text-coffee'}`}
          onClick={() => setMode('weather')}
        >
          Solar Weather
        </button>
        <button
          className={`px-4 py-2 rounded-r-lg ${mode === 'position' ? 'bg-persian-orange text-gunmetal' : 'bg-tan text-coffee'}`}
          onClick={() => setMode('position')}
        >
          Solar Position
        </button>
      </div>

      {loading ? (
        <p className="font-sans text-tan">Loading...</p>
      ) : mode === 'weather' ? (
        <ul className="font-sans text-tan">
          {data && data.length > 0 ? data.map((flare, index) => (
            <li key={index}>Start: {flare.begin_time} | Class: {flare.flux}</li>
          )) : (
            <p>No solar weather data available.</p>
          )}
        </ul>
      ) : (
        <ul className="font-sans text-tan">
          {data ? (
            <>
              <li>Sunrise: {new Date(data.sunrise).toLocaleTimeString()}</li>
              <li>Sunset: {new Date(data.sunset).toLocaleTimeString()}</li>
              <li>Solar Noon: {new Date(data.solar_noon).toLocaleTimeString()}</li>
              <li>Day Length: {data.day_length} seconds</li>
            </>
          ) : (
            <p>No solar position data available.</p>
          )}
        </ul>
      )}
    </div>
  );
}
