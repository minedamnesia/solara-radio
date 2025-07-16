export default function CodingProjectsWidget() {
  const projects = [
    {
      name: 'SolaraEcho - Real-Time Propagation',
      description:
        'This project is to develop a tool that can predict radio wave propagation characteristics such as: Signal Strength (RSSI), Path Loss and Angle of Arrival (AoA) and make predictions for urban, rural, and indoor environments using real-world and simulated data.',
      // link: 'https://github.com/minedamnesia/solara-prop',
    },
    {
      name: 'SolaraSignal — Signal Detection and Classification',
      description:
        'This project is to develop a system that can: Detect radio signals from raw or processed RF data, classify signals by type (Wi-Fi, Bluetooth, cellular, etc.) and possibly classify them by modulation schemes and sub-type.',
      // link: 'https://github.com/minedamnesia/another-project',
    },
    {
      name: 'SolaraSphere - Dashboard of Ionospheric Data',
      description:
        'This is a dashboard project for hosting ionospheric data.',
      // link: 'https://github.com/minedamnesia/solara-sphere',
    },
    {
      name: 'Spotify Radio Widget',
      description:
        'This is a React widget so I can play and browse Spotify playlists via Web Playback SDK.',
      // link: 'https://github.com/minedamnesia/solara-spotify',
    },
  ];

  return (
    <div className="solara-widget col-span-3">
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">
        Coding Projects
        <span className="text-tan italic text-xl"> Coming Soon...</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-sage p-4 rounded-xl shadow-md border border-persian-orange"
          >
            <h5 className="text-l font-heading mb-2 text-gunmetal">{project.name}</h5>
            <p className="font-sans text-gunmetal text-sm mb-2">{project.description}</p>

            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-coffee hover:underline text-sm font-bold"
              >
                View on GitHub →
              </a>
            ) : (
              <span className="text-sm text-coffee italic">GitHub link coming soon…</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

