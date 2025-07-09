import Widget from '../components/Widget';
import HikingMapsWidget from '../components/HikingMapsWidget';
import CodingProjectsWidget from '../components/CodingProjectsWidget';
import LocalPlantsWidget from '../components/LocalPlantsWidget';
import SolarPositionsWidget from '../components/SolarPositionsWidget';
import MUFMapWidget from '../components/MUFMapWidget';
import PskreporterWidget from '../components/PskreporterWidget';
import SpotifySCMEmbedWidget from '../components/SpotifySCMEmbedWidget';

export default function Home() {

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-6">
      <CodingProjectsWidget />
      <Widget
        title="About Me"
        description="Hi! I'm Kelly, otherwise known as KK7QEA..."
        customClass="row-span-2"
        link="/about"
        image="/qsl.png"
      />
      <MUFMapWidget />
      <HikingMapsWidget />
      <PskreporterWidget />
      <SolarPositionsWidget />
      <LocalPlantsWidget />
      <SpotifySCMEmbedWidget />
      <Widget title="Radio Guides" description="Quick reference for bands, modes, and emergency protocols." link="/guides" />
      <Widget title="Photo Archive" description="Gallery of fieldwork and antenna setups." link="/photos" />
      <Widget title="Creative" description="Creative projects and visual explorations." link="/creative" />

    </div>
  );
}
