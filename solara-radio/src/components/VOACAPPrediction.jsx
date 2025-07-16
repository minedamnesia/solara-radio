import { useState } from "react";

const DX_TARGETS = {
  "Europe": { lat: 50, lon: 10 },
  "Japan": { lat: 36, lon: 138 },
  "Australia": { lat: -25, lon: 133 },
  "South America": { lat: -15, lon: -60 },
  "South Africa": { lat: -30, lon: 25 },
};

export default function VOACAPPrediction({ txLat, txLon }) {
  const [target, setTarget] = useState("Europe");
  const [showIframe, setShowIframe] = useState(false);

  const rx = DX_TARGETS[target];
  const url = `https://www.voacap.com/prediction.html?txlat=${txLat}&txlon=${txLon}&rxlat=${rx.lat}&rxlon=${rx.lon}`;

  return (
    <div className="mt-6 bg-coffee p-4 rounded-2xl shadow-lg">
      <h2 className="text-xl font-heading mb-2 text-persian-orange">
        VOACAP Propagation Prediction
      </h2>

      <label className="block mb-2 text-white">
        Select target region:
        <select
          value={target}
          onChange={(e) => {
            setTarget(e.target.value);
            setShowIframe(false); // reset iframe when target changes
          }}
          className="ml-2 px-2 py-1 rounded bg-white text-black"
        >
          {Object.keys(DX_TARGETS).map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
      </label>

      {!showIframe ? (
        <button
          onClick={() => setShowIframe(true)}
          className="mt-2 px-4 py-2 bg-persian-orange text-tan rounded font-semibold hover:bg-tan hover:text-gunmetal transition"
        >
          Load Prediction
        </button>
      ) : (
        <div className="mt-3">
          <iframe
            src={url}
            className="w-full h-[500px] rounded border border-white"
            title="VOACAP Prediction"
          />
        </div>
      )}
    </div>
  );
}

