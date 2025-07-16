import CompassWidget from '../components/CompassWidget';
import MaidenheadWidget from '../components/MaidenheadWidget';
import BuyMeCoffeeWidget from '../components/BuyMeCoffeeWidget';
import PskreporterWidget from '../components/PskreporterWidget';
import MUFMapWidget from '../components/MUFMapWidget';
import SatellitePassWidget from '../components/SatellitePassWidget';
import MorseCodePracticeWidget from '../components/MorseCodePracticeWidget';
import { GeolocationToggle } from '../components/GeolocationToggle';

export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 p-4 text-coffee">
      <div className="sidebar-widget">
        <GeolocationToggle />
      </div>
      <div className="sidebar-widget">
        <CompassWidget />
      </div>
      <div className="sidebar-widget">
        <MaidenheadWidget />
      </div>
      <div className="sidebar-widget">
        <MUFMapWidget />
      </div>
      <div className="sidebar-widget">
        <PskreporterWidget />
      </div>
      <div className="sidebar-widget">
          <SatellitePassWidget />
      </div>
      <div className="sidebar-widget">
          <MorseCodePracticeWidget />
      </div>
      <div className="sidebar-widget">
        <BuyMeCoffeeWidget />
      </div>
    </aside>
  );
}

