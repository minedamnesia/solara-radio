import Widget from '../components/Widget';
import HikingMapsWidget from '../components/HikingMapsWidget';
import CodingProjectsWidget from '../components/CodingProjectsWidget';
import LocalPlantsWidget from '../components/LocalPlantsWidget';
import SolarPositionsWidget from '../components/SolarPositionsWidget';
import SpotifySCMEmbedWidget from '../components/SpotifySCMEmbedWidget';
import Sidebar from '../components/Sidebar';
import HamRadioResourcesWidget from '../components/HamRadioResourcesWidget';

export default function Home() {

  return (
    <div className="flex w-full min-h-screen">
      {/* Main Grid */}
    <main className="w-[80%] p-6 grid grid-cols-3 grid-rows-4 gap-6">
      <HamRadioResourcesWidget />
      <Widget
        title="About Me"
        description="Hi! I'm Kelly, otherwise known as KK7QEA..."
        customClass="row-span-2"
        link="/about"
        image="/qsl.png"
      />
      <HikingMapsWidget />
      <SolarPositionsWidget />
      <LocalPlantsWidget />
      <SpotifySCMEmbedWidget />
      <CodingProjectsWidget />
      </main>
      {/* Sidebar */}
      <aside className="w-[10%] p-2">
        <Sidebar />
      </aside>
    </div>
  );
}
