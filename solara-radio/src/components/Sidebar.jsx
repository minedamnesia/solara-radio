import CompassWidget from '../components/CompassWidget';
import MaidenheadWidget from '../components/MaidenheadWidget';
import BuyMeCoffeeWidget from '../components/BuyMeCoffeeWidget';
import PskreporterWidget from '../components/PskreporterWidget';
import MUFMapWidget from '../components/MUFMapWidget';

export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 p-4 text-coffee">
      <div className="sidebar-widget">
        <CompassWidget />
      </div>
      <div className="sidebar-widget">
        <MaidenheadWidget />
      </div>
      <div className-"sidebar-widget" >
        <MUFMapWidget />
      </div>
      <div className-"sidebar-widget" >
        <PskreporterWidget />
      </div>
      <div className="sidebar-widget">
        <BuyMeCoffeeWidget />
      </div>
    </aside>
  );
}

