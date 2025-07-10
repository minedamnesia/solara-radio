import CompassWidget from '../components/CompassWidget';
import MaidenheadWidget from '../components/MaidenheadWidget';
import BuyMeCoffeeWidget from '../components/BuyMeCoffeeWidget';

export default function SidebarRight() {
  return (
    <aside className="w-full md:w-64 p-4">
      <CompassWidget />
      <MaidenheadWidget />
      <BuyMeCoffeeWidget />
    </aside>
  );
}

