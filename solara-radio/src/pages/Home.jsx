import Widget from '../components/Widget';

export default function Home() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-6">
    <Widget title="Online Radio Contacts" description="Track active frequencies and connect worldwide." />
    <Widget
      title="About Me"
      description="Learn more about the operator."
      customClass="row-span-2"
      nestedWidget={{ title: 'Coding Projects', description: 'Scripts and software for radio tracking.' }}
    />
    <Widget title="Radio Guides" description="Quick reference for bands, modes, and emergency protocols." />
    <Widget title="Hiking Maps" description="Explore radio-friendly trails." />
    <Widget title="Solar Positions" description="Real-time sun tracking for optimal signals." />
  </div>
  );
}
