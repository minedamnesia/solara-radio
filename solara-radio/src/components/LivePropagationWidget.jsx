import { useEffect, useState } from "react";
import VOACAPPrediction from "./VOACAPPrediction";

export default function LivePropagationWidget() {
  const [position, setPosition] = useState(null);
  const [geoError, setGeoError] = useState(false);
  const [loadingGeo, setLoadingGeo] = useState(true);

  const [propData, setPropData] = useState(null);
  const [loadingProp, setLoadingProp] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError(true);
      setLoadingGeo(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: parseFloat(pos.coords.latitude.toFixed(4)),
          lon: parseFloat(pos.coords.longitude.toFixed(4)),
        });
        setLoadingGeo(false);
      },
      (err) => {
        console.warn("Geolocation error:", err.message);
        setGeoError(true);
        setLoadingGeo(false);
      }
    );
  }, []);

  useEffect(() => {
    async function fetchPropagationData() {
      try {
        const res = await fetch('/.netlify/functions/noaa');
        const propData = await res.json();
        setPropData(propData);
      } catch (err) {
        console.error("Error fetching propagation data:", err);
      } finally {
        setLoadingProp(false);
      }
    }

    fetchPropagationData();
  }, []);

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

  const bandCondition = (band, gScale, rScale) => {
    if (["G4", "G5"].includes(gScale) || ["R3", "R4", "R5"].includes(rScale)) return "Poor";
    if (["G1", "G2"].includes(gScale) && ["R1", "R2"].includes(rScale)) return "Good";
    if (gScale === "G3") return band === "80m" || band === "40m" ? "Fair" : "Poor";
    return "Fair";
  };

  const conditionBadge = (condition) => {
    const base = "px-2 py-1 rounded text-xs font-bold text-white";
    if (condition === "Good") return <span className={`text-sage`}>Good</span>;
    if (condition === "Fair") return <span className={`text-amber`}>Fair</span>;
    return <span className={`text-persian-orange`}>Poor</span>;
  };

  return (
    <div className="solara-widget">
      <h2 className="widget-heading">Live Propagation Conditions</h2>

      {geoError && (
        <div className="bg-yellow-100 text-yellow-800 border border-yellow-400 rounded p-2 mb-3">
          Geolocation is required to show personalized propagation predictions.
        </div>
      )}

      {(loadingGeo || loadingProp) && (
        <div className="text-white text-sm italic mb-4">
          Loading propagation data...
        </div>
      )}

      {position && propData && !loadingGeo && !loadingProp ? (
        <>
          <div className="text-white space-y-4">
            <div>
              <p>
                <strong>Your Position:</strong> {position.lat}°, {position.lon}°
              </p>
              <p>
                <strong>Geomagnetic:</strong> {propData.gScale} &nbsp;|&nbsp;
                <strong>Solar Radiation:</strong> {propData.sScale} &nbsp;|&nbsp;
                <strong>Radio Blackouts:</strong> {propData.rScale}
              </p>
              <p className="text-sm italic">Updated: {propData.time}</p>
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
                      <td>{conditionBadge(bandCondition(band.name, propData.gScale, propData.rScale))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-lg font-bold text-persian-orange mt-4 mb-1">Legend</h3>
              <ul className="text-sm list-disc ml-5 space-y-1">
                <li><strong>G1–G2:</strong> Minor to moderate geomagnetic activity — decent conditions</li>
                <li><strong>G3+:</strong> High geomagnetic storms — expect band disruption</li>
                <li><strong>S1–S5:</strong> Solar radiation storm severity</li>
                <li><strong>R1–R5:</strong> Radio blackout scale (esp. on HF)</li>
              </ul>
            </div>
          </div>

          <VOACAPPrediction txLat={position.lat} txLon={position.lon} />
        </>
      ) : (
        !loadingProp && (
          <div className="text-white text-sm italic">
            <p className="mb-2">Showing default HF conditions map:</p>
            <img
              src="https://prop.kc2g.com/coverage/coverage.png"
              alt="Real-Time MUF Map"
              className="w-full rounded border border-white"
            />
          </div>
        )
      )}
    </div>
  );
}
