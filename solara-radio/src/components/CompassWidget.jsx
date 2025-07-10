import { useEffect, useState } from 'react';

export default function CompassWidget() {
  const [heading, setHeading] = useState(0);
  const [supported, setSupported] = useState(true);
  const [geoHeading, setGeoHeading] = useState(null);

  useEffect(() => {
    let geoWatchId;

    const handleOrientation = (event) => {
      let deviceHeading = 0;

      if (typeof event.webkitCompassHeading === 'number') {
        // iOS
        deviceHeading = event.webkitCompassHeading;
      } else if (typeof event.alpha === 'number') {
        // Android and others
        deviceHeading = 360 - event.alpha;
      }

      setHeading(deviceHeading);
    };

    // Listen to compass orientation
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      window.addEventListener('deviceorientation', handleOrientation, true);
    } else {
      setSupported(false);
    }

    // Use geolocation to record device orientation relative to true north
    if (navigator.geolocation) {
      geoWatchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { heading } = pos.coords;
          if (heading !== null && heading !== undefined) {
            setGeoHeading(Math.round(heading));
          }
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
      if (geoWatchId) {
        navigator.geolocation.clearWatch(geoWatchId);
      }
    };
  }, []);

  return (
    <div className="solara-widget text-center">
      <h2 className="widget-heading">Live Compass</h2>

      {supported ? (
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 border-4 border-sage rounded-full flex items-center justify-center">
            <div
              className="absolute w-1 h-16 bg-persian-orange origin-bottom transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${heading}deg)` }}
            />
            <span className="absolute top-2 text-xs text-coffee">N</span>
            <span className="absolute right-2 text-xs text-coffee">E</span>
            <span className="absolute bottom-2 text-xs text-coffee">S</span>
            <span className="absolute left-2 text-xs text-coffee">W</span>
          </div>

          <p className="mt-4 font-sans text-coffee">
            Device Heading: {Math.round(heading)}°
          </p>

          {geoHeading !== null && (
            <p className="text-xs text-coffee mt-1">Geo Heading: {geoHeading}°</p>
          )}
        </div>
      ) : (
        <p className="text-coffee font-sans">Compass not supported on this device.</p>
      )}
    </div>
  );
}

