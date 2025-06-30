import Widget from '../components/Widget';

export default function Home() {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-6">
      <Widget title="Online Radio Contacts" description="Track active frequencies and connect worldwide." link="/radio-contacts" />
      <Widget
        title="About Me"
        description="Learn more about the operator."
        customClass="row-span-2"
        nestedWidget={{ title: 'Coding Projects', description: 'Scripts and software for radio tracking.', link: '/projects' }}
        link="/about"
      />
      <Widget title="Radio Guides" description="Quick reference for bands, modes, and emergency protocols." link="/guides" />
      <Widget title="Hiking Maps" description="Explore radio-friendly trails." link="/hiking-maps" />
      <Widget title="Solar Positions" description="Real-time sun tracking for optimal signals." link="/solar-positions" />
      <Widget title="Local Plant Info" description="Identify flora along your radio expeditions." link="/plant-info" />
      <Widget title="Photo Archive" description="Gallery of fieldwork and antenna setups." link="/photos" />
      <Widget title="Creative" description="Creative projects and visual explorations." link="/creative" />
    </div>
  );
}
