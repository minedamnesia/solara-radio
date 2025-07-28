import { useState, useEffect } from 'react';
import { useGeolocation } from '../context/GeolocationProvider';

export default function TimeAndDateWidget() {
  const { location, enabled, error: geoError } = useGeolocation();
  const [localTime, setLocalTime] = useState('');
  const [utcTime, setUtcTime] = useState('');

  // Get geolocation coordinates
  const [locationData, setLocationData] = useState({ lat: null, lon: null });

  useEffect(() => {
    if (enabled && location) {
      const lat = location.latitude;
      const lon = location.longitude;
      setLocationData({ lat, lon });

      // Update time every second
      const timer = setInterval(() => {
        const localDate = new Date();
        const utcDate = new Date(localDate.toUTCString());
        setLocalTime(localDate.toLocaleString());
        setUtcTime(utcDate.toISOString());
      }, 1000);

      return () => clearInterval(timer); // Cleanup timer on component unmount
    }
  }, [enabled, location]);

  return (
    <div className="widget-container p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-heading mb-4 text-gunmetal">UTC Time Coversion</h2>

      {!enabled ? (
        <p className="text-coffee">Enable geolocation to view time conversion for your location.</p>
      ) : geoError ? (
        <p className="text-persian-orange">Geolocation error: {geoError}</p>
      ) : !locationData.lat || !locationData.lon ? (
        <p className="text-coffee">Waiting for location data...</p>
      ) : (
        <>
          <div className="font-bold text-gunmetal bg-tan py-2 px-4 rounded-lg inline-block border border-persian-orange">
            <p>
              <strong>Your Local Time:</strong><br /><span className="text-coffee font-normal">{localTime}</span>
            </p>
            <p>
              <strong>UTC Time:</strong><br /><span className="text-coffee font-normal">{utcTime}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

