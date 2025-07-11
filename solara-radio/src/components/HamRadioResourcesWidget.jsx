import { MdApps, MdWarningAmber } from 'react-icons/md';
import { FaSatelliteDish, FaNetworkWired, FaBroadcastTower } from 'react-icons/fa';
import { HiChip } from 'react-icons/hi';
import { GiBackpack } from 'react-icons/gi';
import { useState } from 'react';

const linkData = {
  General: [/* ... */],
  Satellites: [/* ... */],
  "Emergency Comms": [/* ... */],
  "Digital Modes": [/* ... */],
  "Packet Radio": [/* ... */],
  Supplies: [/* ... */],
  Antennas: [/* ... */],
};

const categoryIcons = {
  General: MdApps,
  Satellites: FaSatelliteDish,
  'Emergency Comms': MdWarningAmber,
  'Digital Modes': HiChip,
  Antennas: FaBroadcastTower,
  'Packet Radio': FaNetworkWired,
  Supplies: GiBackpack,
};

export default function HamRadioResourcesWidget() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="solara-widget col-span-2 tall-widget">
      <h2 className="widget-heading">Ham Links</h2>

      <div className="grid grid-cols-2 gap-4">
        {Object.keys(linkData).map((category) => {
          const Icon = categoryIcons[category];
          return (
            <div
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="cursor-pointer bg-sage hover:bg-sage/90 text-coffee p-6 rounded-2xl shadow-lg font-semibold text-center flex flex-col items-center justify-center min-h-[120px] transition-transform hover:scale-[1.02]"
            >
              {Icon && <Icon size={32} className="mb-3 text-gunmetal" />}
              <span className="text-lg leading-tight">{category}</span>
            </div>
          );
        })}
      </div>

      {selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gunmetal text-tan p-6 rounded-2xl max-w-lg w-full shadow-xl relative">
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-3 right-4 text-xl text-tan hover:text-persian-orange"
            >
              ×
            </button>
            <h3 className="text-xl font-heading mb-4 text-persian-orange">
              {selectedCategory} Links
            </h3>
            <ul className="list-disc list-inside space-y-2">
              {linkData[selectedCategory].map(([name, url]) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-persian-orange"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

