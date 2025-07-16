import { useEffect, useState } from "react";
import { FiCompass } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function POTAWidget({ resetSignal }) {
  const [states] = useState([
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ]);
  const [selectedState, setSelectedState] = useState("");
  const [parks, setParks] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null);
  const [nearbyPark, setNearbyPark] = useState(null);
  const [userCoords, setUserCoords] = useState(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  // ✅ Reset state when resetSignal changes
  useEffect(() => {
    setSelectedState('');
    setParks([]);
    setSelectedPark(null);
    setNearbyPark(null);
    setUserCoords(null);
    setUseCurrentLocation(false);
  }, [resetSignal]);

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
          }
        } catch (err) {
          console.error("Error fetching nearest POTA site:", err);
        }
      },
      (err) => console.warn("Geolocation error:", err),
      { enableHighAccuracy: true }
    );
  }, [useCurrentLocation]);

  // Fetch parks for selected state
  useEffect(() => {
    if (!selectedState) return;

    async function fetchParks() {
      try {
        const response = await fetch(`https://solara-radio.onrender.com/api/parks?state=${selectedState}`);
        const data = await response.json();
        setParks(data);
        setSelectedPark(null);
      } catch (error) {
        console.error("Error fetching parks:", error);
      }
    }

    fetchParks();
  }, [selectedState]);

  return (
    <div className="solara-widget">
      <h2 className="widget-heading flex items-center gap-2">
        <FiCompass size={18} className="text-coffee" />
        POTA Essentials
      </h2>

      <label className="block mb-4 text-tan text-sm flex items-center gap-2">
        <HiOutlineLocationMarker size={18} className="text-coffee" />
        <input
          type="checkbox"
          checked={useCurrentLocation}
          onChange={(e) => {
            setUseCurrentLocation(e.target.checked);
            if (!e.target.checked) {
              setNearbyPark(null);
              setUserCoords(null);
            }
          }}
          className="mr-2"
        />
        Use my current location
      </label>

      {useCurrentLocation && nearbyPark && (
        <div className="p-2 mb-4 rounded bg-tan text-gunmetal shadow-md">
          <p className="font-semibold text-sm flex items-center gap-1">
            <AiOutlineInfoCircle size={18} className="text-coffee" />
            Your nearest POTA location is:
          </p>
          <p className="text-md font-heading text-coffee">
            {nearbyPark.name} ({nearbyPark.reference})
            {userCoords && (
              <span className="ml-2 text-xs text-tan">
                ({userCoords.lat}, {userCoords.lon})
              </span>
            )}
          </p>
        </div>
      )}

      {/* 🧭 Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 📚 Left: POTA Resources */}
        <div className="flex flex-col space-y-2">
          <h3>POTA Resources </h3>
          <a
            href="https://pota.app/#/activator"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-persian-orange text-gunmetal rounded shadow text-sm text-center font-semibold hover:underline"
          >
            Activator Guide <span className="pl-4 text-xs text-tan italic">Requires LogIn</span>
          </a>
          <a
            href="https://pota.app/#/hunter"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-persian-orange text-gunmetal rounded shadow text-sm text-center font-semibold hover:underline"
          >
             Hunter Info <span className="pl-4 text-xs text-tan italic">Requires LogIn</span>
          </a>
          <a
            href="https://pota.app/#/spots"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-persian-orange text-gunmetal rounded shadow text-sm text-center font-semibold hover:underline"
          >
             Spotting Page <span className="pl-4 text-xs text-tan italic">Requires LogIn</span>
          </a>
        </div>

        {/* 🔍 Right: Manual Lookup */}
        <div className="space-y-3">
          <h3>POTA Locations by State </h3>
          <select
            onChange={(e) => setSelectedState(e.target.value)}
            value={selectedState}
            className="p-2 rounded w-full bg-tan text-gunmetal border border-persian-orange"
          >
            <option value="">Select a State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          {parks.length > 0 && (
            <select
              onChange={(e) => {
                const park = parks.find((p) => p.reference === e.target.value);
                setSelectedPark(park);
              }}
              value={selectedPark?.reference || ""}
              className="p-2 rounded w-full bg-tan text-gunmetal border border-persian-orange"
            >
              <option value="">Select a POTA Park</option>
              {parks.map((park) => (
                <option key={park.reference} value={park.reference}>
                  {park.name} ({park.reference})
                </option>
              ))}
            </select>
          )}

          {selectedPark && (
            <div className="text-sm text-tan">
              <strong>{selectedPark.name}</strong> ({selectedPark.reference})<br />
              Coordinates: {selectedPark.latitude}, {selectedPark.longitude}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

