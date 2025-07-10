import { useState, useEffect } from 'react';

export default function SolarPositionsWidget() {
  const [mode, setMode] = useState('weather');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let response;

        if (mode === 'weather') {
          // Updated to use NOAA solar probabilities
          response = await fetch('https://services.swpc.noaa.gov/json/solar_probabilities.json');
          const json = await response.json();
          setData(json[0]); // only using the first day’s data for now
        } else if (mode === 'position') {
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
    <div className="solara-widget">
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
        <div className="font-sans text-tan space-y-2">
          {data ? (
            <>
              <h3 className="text-lg font-heading text-persian-orange">Flare Probabilities (1 Day)</h3>
              <ul className="space-y-1">
                <li>C-class: {data.c_class_1_day}%</li>
                <li>M-class: {data.m_class_1_day}%</li>
                <li>X-class: {data.x_class_1_day}%</li>
              </ul>

              <h3 className="text-lg font-heading text-persian-orange mt-4">Proton Events (1 Day)</h3>
              <ul className="space-y-1">
                <li>10MeV Protons: {data['10mev_protons_1_day']}%</li>
              </ul>

              <h3 className="text-lg font-heading text-persian-orange mt-4">Polar Cap Absorption</h3>
              <div
                className={`p-2 rounded text-center font-bold ${
                  data.polar_cap_absorption === 'red'
                    ? 'bg-persian-orange text-coffee'
                    : data.polar_cap_absorption === 'yellow'
                    ? 'bg-tan text-coffee'
                    : 'bg-sage text-gunmetal'
                }`}
              >
                {data.polar_cap_absorption.toUpperCase()}
              </div>
            </>
          ) : (
            <p>No solar weather data available.</p>
          )}
        </div>
      ) : (
        <ul className="font-sans text-tan space-y-1">
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
    {/* Resource Link */}
  <div className="mt-4 text-tan font-sans">
    <p className="mb-1">🔗 Resource for more complete solar conditions:</p>
    <a
      href="https://www.solarham.net/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-persian-orange underline hover:text-persian-orange/80 transition"
    >
      solarham.net
    </a>
  </div>
  </div>
  );
}

