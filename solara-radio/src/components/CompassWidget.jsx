import { useEffect, useState, useContext } from 'react';
import { GeolocationContext } from '../context/GeolocationProvider';

const getCardinalDirection = (deg) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
  return directions[Math.round(deg / 45) % 8];
};

export default function CompassWidget() {
  const [heading, setHeading] = useState(0);
  const [supported, setSupported] = useState(true);
  const [geoHeading, setGeoHeading] = useState(null);
  const { enabled: geolocationEnabled } = useContext(GeolocationContext);

  useEffect(() => {
    let geoWatchId;
    let fallbackInterval;

    const handleOrientation = (event) => {
      let deviceHeading = 0;
      if (typeof event.webkitCompassHeading === 'number') {
        deviceHeading = event.webkitCompassHeading;
      } else if (typeof event.alpha === 'number') {
        deviceHeading = 360 - event.alpha;
      }
      setHeading(deviceHeading);
    };

    if (window.DeviceOrientationEvent && typeof window.DeviceOrientationEvent.requestPermission === 'function') {
      // iOS specific: request permission
      window.DeviceOrientationEvent.requestPermission().then((response) => {
        if (response === 'granted') {
          window.addEventListener('deviceorientationabsolute', handleOrientation, true);
          window.addEventListener('deviceorientation', handleOrientation, true);
        } else {
          setSupported(false);
        }
      }).catch(() => setSupported(false));
    } else if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      window.addEventListener('deviceorientation', handleOrientation, true);
    } else {
      setSupported(false);
      fallbackInterval = setInterval(() => {
        setHeading((prev) => (prev + 1) % 360);
      }, 100); // fallback rotate every 100ms
    }

    if (geolocationEnabled && navigator.geolocation) {
      geoWatchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { heading } = pos.coords;
          if (heading !== null && heading !== undefined) {
            setGeoHeading(Math.round(heading));
          }
        },
        (err) => console.warn('Geolocation heading not available:', err.message),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    }

    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation);
      window.removeEventListener('deviceorientation', handleOrientation);
      if (geoWatchId) navigator.geolocation.clearWatch(geoWatchId);
      if (fallbackInterval) clearInterval(fallbackInterval);
    };
  }, [geolocationEnabled]);

  return (
    <div className="sidebar-widget text-center">
      <h3 className="sidebar-heading">Live Compass</h3>

      <div className="relative w-40 h-40 mx-auto mb-2">
        <div className="absolute inset-0 rounded-full border-4 border-coffee"></div>

        <svg
          className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out"
          style={{ transform: `rotate(${heading}deg)` }}
          viewBox="0 0 100 100"
        >
          <line
            x1="50"
            y1="10"
            x2="50"
            y2="50"
            stroke="orange"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute top-1/2 left-1/2 text-xs font-bold text-gunmetal -translate-x-1/2 -translate-y-full">
          N
        </div>
        <div className="absolute bottom-1/2 left-1/2 text-xs font-bold text-gunmetal -translate-x-1/2 translate-y-full">
          S
        </div>
        <div className="absolute left-1/2 top-1/2 text-xs font-bold text-gunmetal -translate-y-1/2 -translate-x-full">
          W
        </div>
        <div className="absolute right-1/2 top-1/2 text-xs font-bold text-gunmetal -translate-y-1/2 translate-x-full">
          E
        </div>
      </div>

      <div className="mt-2 text-coffee">
        <p className="text-lg font-semibold">
          Heading: {Math.round(heading)}° ({getCardinalDirection(heading)})
        </p>

        {geoHeading !== null && (
          <p className="text-sm text-gunmetal mt-1">Geo Heading: {geoHeading}°</p>
        )}

        {!supported && (
          <p className="text-xs italic mt-2 text-coffee">
            Sensor not supported — fallback animation running.
          </p>
        )}
      </div>
    </div>
  );
}

