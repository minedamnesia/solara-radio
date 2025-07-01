import { useState } from 'react';
import Widget from '../components/Widget';
import HikingMapsWidget from '../components/HikingMapsWidget';
import OnlineRadioContactsWidget from '../components/OnlineRadioContactsWidget';
import UploadLogbook from '../components/UploadLogbook';
import LocalPlantsWidget from '../components/LocalPlantsWidget';
import SolarPositionsWidget from '../components/SolarPositionsWidget';
import MUFMapWidget from '../components/MUFMapWidget';
import PskreporterWidget from '../components/PskreporterWidget';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showUploader, setShowUploader] = useState(false);

  const handleUploadSuccess = () => {
    setRefreshKey(prev => prev + 1);
    setShowUploader(false); // Hide uploader after successful upload
  };

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-6">
      <OnlineRadioContactsWidget
        refreshKey={refreshKey}
        onShowUploader={() => setShowUploader(true)}
      />
      {showUploader && (
        <UploadLogbook onUploadSuccess={handleUploadSuccess} />
      )}
      <Widget
        title="About Me"
        description="Learn more about the operator."
        customClass="row-span-2"
        nestedWidget={{ title: 'Coding Projects', description: 'Scripts and software for radio tracking.', link: '/projects' }}
        link="/about"
        image="/qsl.png"
      />
      <MUFMapWidget />
      <HikingMapsWidget />
      <PskreporterWidget />
      <SolarPositionsWidget />
      <LocalPlantsWidget />
      <Widget title="Photo Archive" description="Gallery of fieldwork and antenna setups." link="/photos" />
      <Widget title="Radio Guides" description="Quick reference for bands, modes, and emergency protocols." link="/guides" />
      <Widget title="Creative" description="Creative projects and visual explorations." link="/creative" />

    </div>
  );
}
