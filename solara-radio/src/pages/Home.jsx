import { useState } from 'react';
import Widget from '../components/Widget';
import OnlineRadioContactsWidget from '../components/OnlineRadioContactsWidget';
import UploadLogbook from '../components/UploadLogbook';
import SolarPositionsWidget from '../components/SolarPositionsWidget'; 
import HikingMapsWidget from '../components/HikingMapsWidget';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showUploader, setShowUploader] = useState(false);

  const handleUploadSuccess = () => {
    setRefreshKey(prev => prev + 1);
    setShowUploader(false); // Hide uploader after successful upload
  };

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-6">
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
        image="/qsl.png" // <-- add this line
      />
      <Widget title="Radio Guides" description="Quick reference for bands, modes, and emergency protocols." link="/guides" />
      <HikingMapsWidget />
      <SolarPositionsWidget />
      <Widget title="Local Plant Info" description="Identify flora along your radio expeditions." link="/plant-info" />
      <Widget title="Photo Archive" description="Gallery of fieldwork and antenna setups." link="/photos" />
      <Widget title="Creative" description="Creative projects and visual explorations." link="/creative" />
    </div>
  );
}
