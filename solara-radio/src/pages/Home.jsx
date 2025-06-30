import Widget from '../components/Widget';

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Widget title="Online Radio Contacts" description="Track active frequencies and connect worldwide." />
      <Widget title="Radio Guides" description="Quick reference for bands, modes, and emergency protocols." />
      <Widget title="Solar Positions" description="Real-time sun tracking for optimal signals." />
      <Widget title="Hiking Maps" description="Explore radio-friendly trails." />
      <Widget title="Local Plant Info" description="Identify flora along your radio expeditions." />
      <Widget title="Photo Archive" description="Gallery of fieldwork and antenna setups." />
      <Widget
        title="About Me"
        description="Learn more about the operator."
        customClass="row-span-2 col-span-1"
        nestedWidget={{ title: 'Coding Projects', description: 'Scripts and software for radio tracking.' }}
      />
    </div>
  );
}
