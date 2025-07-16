import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import POTAWidget from "./POTAWidget";
import HikingMapsWidget from "./HikingMapsWidget";
import LocalPlantsWidget from "./LocalPlantsWidget";

export default function PotaHikingPlantsTabs() {
  const [tab, setTab] = useState("pota");
  const [resetSignal, setResetSignal] = useState(0);

  function handleTabChange(value) {
    setTab(value);
    setResetSignal((prev) => prev + 1); // force reset on change
  }

  return (
    <Tabs.Root value={tab} onValueChange={handleTabChange} className="w-full">
      {/* Tabs List */}
      <Tabs.List className="flex w-full border-b border-persian-orange mb-4">
        <Tabs.Trigger
          value="pota"
          className="flex-1 text-center px-4 py-2 font-semibold text-gunmetal 
                     bg-persian-orange data-[state=active]:bg-tan rounded-t-md"
        >
          POTA
        </Tabs.Trigger>
        <Tabs.Trigger
          value="hiking"
          className="flex-1 text-center px-4 py-2 font-semibold text-gunmetal 
                     bg-persian-orange data-[state=active]:bg-tan rounded-t-md"
        >
          Hiking Trails
        </Tabs.Trigger>
        <Tabs.Trigger
          value="plants"
          className="flex-1 text-center px-4 py-2 font-semibold text-gunmetal 
                     bg-persian-orange data-[state=active]:bg-tan rounded-t-md"
        >
          Local Plants
        </Tabs.Trigger>
      </Tabs.List>

      {/* Tabs Content */}
      <Tabs.Content
        value="pota"
        className="w-full border border-persian-orange rounded-xl p-4"
      >
        <POTAWidget resetSignal={resetSignal} />
      </Tabs.Content>

      <Tabs.Content
        value="hiking"
        className="w-full border border-persian-orange rounded-xl p-4"
      >
        <HikingMapsWidget />
      </Tabs.Content>

      <Tabs.Content
        value="plants"
        className="w-full border border-persian-orange rounded-xl p-4"
      >
        <LocalPlantsWidget />
      </Tabs.Content>
    </Tabs.Root>
  );
}

