import { useEffect, useState, useContext } from 'react';
import { GeolocationContext } from '../context/GeolocationProvider';

const getCardinalDirection = (deg) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

export default function CompassWidget() {
  const [heading, setHeading] = useState(0);
  const { enabled: geolocationEnabled } = useContext(GeolocationContext);

  useEffect(() => {
    const handleOrientation = (event) => {
      let deviceHeading = 0;

      if (typeof event.webkitCompassHeading === 'number') {
        deviceHeading = event.webkitCompassHeading;
      } else if (typeof event.alpha === 'number') {
        deviceHeading = 360 - event.alpha;
      }

      setHeading((deviceHeading + 360) % 360); // Normalize
    };

    const enableOrientation = () => {
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function'
      ) {
        // iOS 13+ support
        DeviceOrientationEvent.requestPermission()
          .then((response) => {
            if (response === 'granted') {
              window.addEventListener('deviceorientationabsolute', handleOrientation, true);
              window.addEventListener('deviceorientation', handleOrientation, true);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientationabsolute', handleOrientation, true);
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    };

    enableOrientation();

    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return (
    <div className="sidebar-widget text-center">
      <h3 className="sidebar-heading mb-4">Live Compass</h3>

      <div className="relative w-48 h-48 mx-auto">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-coffee rounded-full"></div>

        <svg
          className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out"
          style={{ transform: `rotate(${heading}deg)` }}
          viewBox="0 0 100 100"
        >
          {/* Radial ticks every 10° */}
          {[...Array(36)].map((_, i) => {
            const angle = i * 10;
            const radians = angle * (Math.PI / 180);
            const x1 = 50 + 48 * Math.sin(radians);
            const y1 = 50 - 48 * Math.cos(radians);
            const x2 = 50 + 45 * Math.sin(radians);
            const y2 = 50 - 45 * Math.cos(radians);

            let strokeWidth = 0.4;
            let strokeColor = "#333";
            let opacity = 0.3;

            if (angle % 90 === 0) {
              strokeWidth = 1.4;     // Cardinal directions
              strokeColor = "#222";
              opacity = 0.9;
            } else if (angle % 30 === 0) {
              strokeWidth = 0.8;     // Intercardinal
              strokeColor = "#444";
              opacity = 0.5;
            }

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                opacity={opacity}
              />
            );
          })}

          {/* Compass needle */}
          <polygon
            points="50,10 45,40 55,40"
            fill="#F97316"
            stroke="#D97706"
            strokeWidth="1"
            filter="drop-shadow(0 0 2px rgba(0,0,0,0.4))"
          />
          <circle cx="50" cy="50" r="3" fill="#D97706" />
        </svg>

        {/* Cardinal labels */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gunmetal">N</div>
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gunmetal">S</div>
        <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 text-sm font-bold text-gunmetal">W</div>
        <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 text-sm font-bold text-gunmetal">E</div>
      </div>

      <div className="mt-4 text-coffee font-semibold">
        Heading: {Math.round(heading)}° ({getCardinalDirection(heading)})
      </div>
    </div>
  );
}

