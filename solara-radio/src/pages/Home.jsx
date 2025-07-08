import Widget from '../components/Widget';
import HikingMapsWidget from '../components/HikingMapsWidget';
import OnlineRadioContactsWidget from '../components/OnlineRadioContactsWidget';
import LocalPlantsWidget from '../components/LocalPlantsWidget';
import SolarPositionsWidget from '../components/SolarPositionsWidget';
import MUFMapWidget from '../components/MUFMapWidget';
import PskreporterWidget from '../components/PskreporterWidget';
import SpotifyEmbedWidget from '../components/SpotifyEmbedWidget';

export default function Home() {

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-6">
      <OnlineRadioContactsWidget />
      <Widget
        title="About KK7QEA / Kelly Simer "
        customClass="row-span-2"
        link="/about"
        image="/qsl.png"
      />
      <MUFMapWidget />
      <HikingMapsWidget />
      <PskreporterWidget />
      <SolarPositionsWidget />
      <LocalPlantsWidget />
      <SpotifyEmbedWidget />
      <Widget title="Radio Guides" description="Quick reference for bands, modes, and emergency protocols." link="/guides" />
      <Widget title="Photo Archive" description="Gallery of fieldwork and antenna setups." link="/photos" />
      <Widget title="Creative" description="Creative projects and visual explorations." link="/creative" />

    </div>
  );
}
