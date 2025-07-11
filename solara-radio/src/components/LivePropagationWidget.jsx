import { useEffect, useState } from "react";
import VOACAPPrediction from "./VOACAPPrediction"; // adjust the path as needed

export default function LivePropagationWidget() {
  const [position, setPosition] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [propData, setPropData] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setShowMessage(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude.toFixed(4),
          lon: pos.coords.longitude.toFixed(4),
        });
      },
      (err) => {
        console.warn("Geolocation error:", err.message);
        setShowMessage(true);
      }
    );
  }, []);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  useEffect(() => {
    async function fetchPropagationData() {
      try {
        const res = await fetch("/.netlify/functions/noaa");

        const data = await res.json();
        if (data && data.length > 0) {
          setPropData(data[0]);
        }
      } catch (err) {
        console.error("Error fetching propagation data:", err);
      }
    }

    fetchPropagationData();
  }, []);

  function getBandCondition(sfi, a, k) {
    const score = sfi - (a + k) * 2;
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Fair";
    return "Poor";
  }

  const bands = [
    { name: "80m", freq: "3.5 MHz" },
    { name: "40m", freq: "7 MHz" },
    { name: "30m", freq: "10 MHz" },
    { name: "20m", freq: "14 MHz" },
    { name: "17m", freq: "18 MHz" },
    { name: "15m", freq: "21 MHz" },
    { name: "12m", freq: "24 MHz" },
    { name: "10m", freq: "28 MHz" },
  ];

  return (
    <div className="solara-widget">
      <h2 className="widget-heading">
        Live Propagation Conditions
      </h2>

      {showMessage && (
        <div className="bg-yellow-100 text-yellow-800 border border-yellow-400 rounded p-2 mb-3">
          Geolocation is required to show conditions for your location.
        </div>
      )}

      {position && propData ? (
        <>
          <div className="text-white space-y-4">
            <div>
              <p>
                <strong>Your Position:</strong> {position.lat}°, {position.lon}°
              </p>
              <p>
                <strong>SFI:</strong> {propData.solar_flux_index}, <strong>A:</strong>{" "}
                {propData.a_index}, <strong>K:</strong> {propData.k_index}
              </p>
              <p className="text-sm italic">
                Updated: {propData.date.replace("T", " ").slice(0, 19)} UTC
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-persian-orange mb-1">Band Conditions</h3>
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white">
                    <th className="py-1">Band</th>
                    <th>Freq</th>
                    <th>Condition</th>
                  </tr>
                </thead>
                <tbody>
                  {bands.map((band) => (
                    <tr key={band.name} className="border-b border-white">
                      <td className="py-1">{band.name}</td>
                      <td>{band.freq}</td>
                      <td>
                        {getBandCondition(
                          propData.solar_flux_index,
                          propData.a_index,
                          propData.k_index
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-lg font-bold text-persian-orange mt-4 mb-1">Legend</h3>
              <ul className="text-sm list-disc ml-5 space-y-1">
                <li>
                  <strong>SFI ≥ 100</strong>: Great high-band propagation (20m–10m)
                </li>
                <li>
                  <strong>A-index ≤ 15</strong>: Quiet geomagnetic conditions
                </li>
                <li>
                  <strong>K-index ≤ 3</strong>: Good short-term band stability
                </li>
                <li>
                  <strong>Higher A/K</strong>: Expect disturbances, especially on high bands
                </li>
              </ul>
            </div>
          </div>

          {/* ✅ VOACAP Component goes here */}
          <VOACAPPrediction txLat={position.lat} txLon={position.lon} />
        </>
      ) : (
        <div className="text-white text-sm italic">
         <p className="mb-2">Showing default HF conditions map:</p>
         <img
           src="https://prop.kc2g.com/coverage/coverage.png"
           alt="Real-Time MUF Map"
           className="w-full rounded border border-white"
        />
        </div>
      )}
    </div>
  );
}

