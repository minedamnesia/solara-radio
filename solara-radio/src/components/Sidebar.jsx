import { useEffect, useState } from 'react';
import MaidenheadWidget from '../components/MaidenheadWidget';

export default function SidebarRight() {
  const [heading, setHeading] = useState(0); 
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const handleOrientation = (event) => {
      if (event.webkitCompassHeading !== undefined) {
        // iOS
        setHeading(event.webkitCompassHeading || 0);
      } else if (event.alpha !== null) {
        // Android or generic browser 
        setHeading(360 - event.alpha);
      }
    };
    
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      window.addEventListener('deviceorientation', handleOrientation, true);
    } else {
      setSupported(false);
    }
    
    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation);
      window.removeEventListener('deviceorientation', handleOrientation);
    };   
  }, []);

  return (
    <aside className="w-full md:w-64 p-4">
      <div className="bg-sage p-4 rounded-2xl shadow-lg text-coffee text-center">
        <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">Live Compass</h2>
        {supported ? (
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 border-4 border-sage rounded-full flex items-center justify-center">
              <div
                className="absolute w-1 h-16 bg-persian-orange origin-bottom"
                style={{ transform: `rotate(${heading}deg)` }}
              />
              <span className="absolute top-2 text-xs text-coffee">N</span>
              <span className="absolute right-2 text-xs text-coffee">E</span>
              <span className="absolute bottom-2 text-xs text-coffee">S</span>
              <span className="absolute left-2 text-xs text-coffee">W</span>
            </div>
            <p className="mt-4 font-sans text-coffee">Heading: {Math.round(heading)}°</p>
          </div>
        ) : (
          <p className="text-coffee font-sans">Compass not supported on this device.</p>
        )}
      </div>
      <MaidenheadWidget />
    </aside>
  );
}

