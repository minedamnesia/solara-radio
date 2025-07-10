import { MdApps, MdWarningAmber } from 'react-icons/md';
import { FaSatelliteDish, FaNetworkWired,FaBroadcastTower } from 'react-icons/fa';
import { HiChip } from 'react-icons/hi';
import { GiBackpack } from 'react-icons/gi';
import { useState } from 'react';

const linkData = {
  General: [
    ["QRZ.com", "https://www.qrz.com"],
    ["FCC ULS", "https://wireless2.fcc.gov/UlsApp/UlsSearch/searchLicense.jsp"],
    ["PSKReporter", "https://pskreporter.info/pskmap.html"],
    ["DXMaps", "https://www.dxmaps.com/"],
    ["SolarHam", "https://www.solarham.net/"],
    ["ARRL", "https://www.arrl.org/"],
    ["eHam.net", "https://www.eham.net/"],
    ["Logbook of the World", "https://lotw.arrl.org/lotwuser/default"],
    ["HamQTH", "https://www.hamqth.com/"],
    ["K0BG Mobile HF", "https://www.k0bg.com/"],
  ],
  Satellites: [
    ["AMSAT", "https://www.amsat.org"],
    ["SatNOGS", "https://network.satnogs.org/"],
    ["Heavens-Above", "https://www.heavens-above.com"],
    ["N2YO", "https://www.n2yo.com/"],
    ["Gpredict", "https://sourceforge.net/projects/gpredict/"],
    ["ARISS", "https://www.ariss.org/"],
    ["SatPC32", "http://www.dk1tb.de/indexeng.htm"],
    ["AMSAT Status", "https://www.amsat.org/status/"],
    ["FUNCube Dashboard", "https://funcube.org.uk/working-documents/funcube-telemetry-dashboard/"],
    ["Oscar List", "https://www.n2yo.com/satellites/?c=18"],
  ],
  "Emergency Comms": [
    ["ARRL ARES", "https://www.arrl.org/ares"],
    ["FEMA ICS Training", "https://training.fema.gov/is/courseoverview.aspx?code=IS-100.c"],
    ["Skywarn", "https://www.weather.gov/SKYWARN"],
    ["SEEN Net", "https://seen-net.com"],
    ["SATERN", "https://salvationarmyradio.org/"],
    ["ARES Connect", "https://arrl.volunteerhub.com/"],
    ["Winlink", "https://winlink.org/"],
    ["RACES", "https://www.usraces.org/"],
    ["VOAD", "https://www.nvoad.org/"],
    ["ARRL EmComm Training", "https://www.arrl.org/emergency-communications-training"],
  ],
  "Digital Modes": [
    ["WSJT-X", "https://physics.princeton.edu/pulsar/k1jt/wsjtx.html"],
    ["JS8Call", "https://js8call.com/"],
    ["FLDigi", "http://www.w1hkj.com/"],
    ["Ham Radio Deluxe", "https://www.hamradiodeluxe.com/"],
    ["VARA Modem", "https://rosmodem.wordpress.com/"],
    ["NBEMS Guide", "https://www.arrl.org/files/file/Get%20on%20the%20Air/NBEMS.pdf"],
    ["ARRL Digital Overview", "https://www.arrl.org/digital-modes"],
    ["FT8 Guide", "https://www.g4ifb.com/FT8_Hinson_tips_for_HF_DXers.pdf"],
    ["DM780", "https://www.hamradiodeluxe.com/features/digital-modes.html"],
    ["WSJT-X Frequencies", "https://www.dxzone.com/wsjt-x-frequency-list/"],
  ],
  "Packet Radio": [
    ["Dire Wolf", "https://github.com/wb2osz/direwolf"],
    ["APRS.fi", "https://aprs.fi"],
    ["PinPoint APRS", "http://www.pinpointaprs.com/"],
    ["AGWPE", "http://www.sv2agw.com/ham/agwpe.htm"],
    ["YAAC", "https://www.ka2ddo.org/ka2ddo/YAAC.html"],
    ["UI-View", "http://www.ui-view.net/"],
    ["AX.25 Protocol", "https://tldp.org/HOWTO/AX25-HOWTO/index.html"],
    ["Winlink Book", "https://winlink.org/book"],
    ["Byonics", "http://www.byonics.com/"],
    ["TAPR", "https://www.tapr.org/"],
  ],
  Supplies: [
    ["DX Engineering", "https://www.dxengineering.com/"],
    ["Ham Radio Outlet", "https://www.hamradio.com/"],
    ["GigaParts", "https://www.gigaparts.com/"],
    ["R&L Electronics", "https://www.randl.com/"],
    ["Universal Radio", "https://www.universal-radio.com/"],
    ["Mouser", "https://www.mouser.com/"],
    ["Allied Electronics", "https://www.alliedelec.com/"],
    ["Arrow Antennas", "https://www.arrowantennas.com/"],
    ["Powerwerx", "https://powerwerx.com/"],
    ["MFJ Enterprises", "https://www.mfjenterprises.com/"],
  ],
  Antennas: [
    ["Antenna Theory", "https://www.antenna-theory.com/"],
    ["M0UKD Projects", "https://www.m0ukd.com/"],
    ["K7MEM Calculators", "http://www.k7mem.com/"],
    ["ARRL Antenna Book", "https://www.arrl.org/shop/ARRL-Antenna-Book-for-Radio-Communications-24th-Softcover-Edition/"],
    ["NEC2/4nec2", "https://www.qsl.net/4nec2/"],
    ["DX Engineering Articles", "https://www.dxengineering.com/techarticles"],
    ["Hamuniverse Antennas", "https://www.hamuniverse.com/antennas.html"],
    ["VE3SQB Designs", "http://www.ve3sqb.com/"],
    ["W8JI Antenna Theory", "https://www.w8ji.com/"],
    ["VK1NAM Portable", "https://vk1nam.wordpress.com/"],
  ],
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
    <div className="solara-widget">
      <h2 className="widget-heading">Ham Links</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.keys(linkData).map((category) => {
          const Icon = categoryIcons[category]; // grab the icon
          return (
            <div
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="cursor-pointer bg-sage hover:bg-sage/80 text-coffee p-4 rounded-2xl shadow-lg font-semibold text-center flex flex-col items-center"
            >
              {Icon && <Icon size={24} className="mb-2 text-gunmetal" />}
              <span className="text-center break-words leading-tight">{category}</span>
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
            <h3 className="text-xl font-heading mb-4 text-persian-orange">{selectedCategory} Links</h3>
            <ul className="list-disc list-inside space-y-2">
              {linkData[selectedCategory].map(([name, url]) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="underline hover:text-persian-orange">
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
