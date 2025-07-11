import { useEffect, useState, useContext, useRef } from 'react';
import { GeolocationContext } from '../context/GeolocationProvider';

export default function CompassWidget() {
  const [heading, setHeading] = useState(0);
  const [geoHeading, setGeoHeading] = useState(null);
  const [sensorSupported, setSensorSupported] = useState(true);
  const { enabled: geolocationEnabled } = useContext(GeolocationContext);

  const fallbackRef = useRef(null);

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

      if (event.alpha !== null || event.webkitCompassHeading !== undefined) {
        setSensorSupported(true);
        setHeading(deviceHeading);
        clearInterval(fallbackInterval);
      } else {
        setSensorSupported(false);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      window.addEventListener('deviceorientation', handleOrientation, true);
    } else {
      setSensorSupported(false);
    }

    if (!sensorSupported) {
      // Start fallback simulated rotation
      let angle = 0;
      fallbackInterval = setInterval(() => {
        angle = (angle + 1) % 360;
        setHeading(angle);
      }, 100);
    }

    if (geolocationEnabled && navigator.geolocation) {
      geoWatchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { heading } = pos.coords;
          if (heading != null) setGeoHeading(Math.round(heading));
        },
        (err) => {
          console.warn('Geolocation heading not available:', err.message);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    }

    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation);
      window.removeEventListener('deviceorientation', handleOrientation);
      if (geoWatchId) navigator.geolocation.clearWatch(geoWatchId);
      if (fallbackInterval) clearInterval(fallbackInterval);
    };
  }, [geolocationEnabled, sensorSupported]);

  return (
    <div className="sidebar-widget text-center">
      <h2 className="sidebar-heading">Live Compass</h2>

      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 border-4 border-coffee rounded-full flex items-center justify-center">
          <div
            className="absolute w-1 h-16 bg-persian-orange origin-bottom transition-transform duration-300 ease-out"
            style={{ transform: `rotate(${heading}deg)` }}
          />
          <span className="absolute top-2 text-xs text-gunmetal">N</span>
          <span className="absolute right-2 text-xs text-gunmetal">E</span>
          <span className="absolute bottom-2 text-xs text-gunmetal">S</span>
          <span className="absolute left-2 text-xs text-gunmetal">W</span>
        </div>

        <p className="mt-4 font-sans text-coffee">
          {sensorSupported
            ? `Device Heading: ${Math.round(heading)}°`
            : `Simulated Heading: ${Math.round(heading)}°`}
        </p>

        {geoHeading !== null && geolocationEnabled && (
          <p className="text-xs text-gunmetal mt-1">Geo Heading: {geoHeading}°</p>
        )}
      </div>
    </div>
  );
}

