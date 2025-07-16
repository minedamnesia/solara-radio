import Widget from '../components/Widget';
import CodingProjectsWidget from '../components/CodingProjectsWidget';
import SolarPositionsWidget from '../components/SolarPositionsWidget';
import SpotifySCMEmbedWidget from '../components/SpotifySCMEmbedWidget';
import Sidebar from '../components/Sidebar';
import LivePropagationWidget from '../components/LivePropagationWidget';
import HamRadioResourcesWidget from '../components/HamRadioResourcesWidget';
import PotaHikingPlantsTabs from '../components/PotaHikingPlantsTabs';

export default function Home() {
  return (
    <div className="flex w-full min-h-screen">
      {/* Main Grid */}
      <main className="w-[80%] p-6 space-y-6">
        <div className="grid grid-cols-3 gap-6 border border-persian-orange rounded-xl p-4">
          <HamRadioResourcesWidget />
          <div className="col-span-1 flex flex-col gap-4">
            <Widget
              title="About Me"
              description="Hi! I'm Kelly, otherwise known as KK7QEA..."
              customClass="row-span-2"
              link="/about"
              image="/qsl.png"
            />
            <SpotifySCMEmbedWidget />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3">
            <PotaHikingPlantsTabs />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 border border-persian-orange rounded-xl p-4">
          <SolarPositionsWidget />
          <div className="col-span-2">
            <LivePropagationWidget />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 border border-persian-orange rounded-xl p-4">
          <CodingProjectsWidget />
        </div>
      </main>

      {/* Sidebar */}
      <aside className="w-[10%] p-2">
        <Sidebar />
      </aside>
    </div>
  );
}

