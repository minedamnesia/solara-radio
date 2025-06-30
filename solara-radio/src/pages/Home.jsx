// solara-radio-app/src/pages/Home.jsx
import Widget from '../components/Widget';

export default function Home() {
  const widgets = [
    { title: 'Online Radio Contacts', description: 'Track active frequencies and connect worldwide.' },
    { title: 'Radio Guides', description: 'Quick reference for bands, modes, and emergency protocols.' },
    { title: 'Solar Positions', description: 'Real-time sun tracking for optimal signals.' },
    { title: 'Hiking Maps', description: 'Explore radio-friendly trails.' },
    { title: 'Local Plant Info', description: 'Identify flora along your radio expeditions.' },
    { title: 'Photo Archive', description: 'Gallery of fieldwork and antenna setups.' },
    { title: 'Coding Projects', description: 'Scripts and software for radio tracking.' },
    { title: 'About Me', description: 'Learn more about the operator.' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {widgets.map((widget, index) => (
        <Widget key={index} title={widget.title} description={widget.description} />
      ))}
    </div>
  );
}
