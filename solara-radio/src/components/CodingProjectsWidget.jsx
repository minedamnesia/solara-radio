export default function CodingProjectsWidget() {
  const projects = [
    {
      name: 'Propagation Project',
      description: 'Real-time HF propagation predictor using solar data and QRZ lookups.',
      // link: 'https://github.com/minedamnesia/solara-prop',
    },
    {
      name: 'Signal Mapper',
      description: 'Maps and logs amateur radio contacts with geolocation and signal reports.',
      // link: 'https://github.com/minedamnesia/another-project',
    },
    {
      name: 'Spotify Radio Widget',
      description: 'React widget for playing and browsing Spotify playlists via Web Playback SDK.',
      //link: 'https://github.com/minedamnesia/solara-spotify',
    },
    // Add more projects here
  ];

  return (
    <div className="solara-widget col-span-3">
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">Coding Projects<span className="text-tan italic text-xl">  Coming Soon...</span></h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-sage p-4 rounded-xl shadow-md border border-persian-orange">
            <h5 className="text-l font-heading mb-2 text-gunmetal">{project.name}</h5>
            <p className="font-sans text-gunmetal text-sm mb-2">{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-coffee hover:underline text-sm font-bold"
            >
              View on GitHub (Coming Soon) →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

