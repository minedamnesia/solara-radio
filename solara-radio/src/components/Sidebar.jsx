export default function SidebarRight() {
  return (
    <aside className="w-full md:w-64 p-4">
      <div className="bg-sage p-4 rounded-2xl shadow-lg">
        <h2 className="text-xl font-heading mb-4 text-persian-orange">Coding Projects</h2>
        <ul className="list-disc list-inside text-gunmetal text-sm space-y-2">
          <li>
            <a
              href="https://github.com/minedamnesia/solara-prop"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-persian-orange"
            >
              Propagation Project
            </a>
          </li>
          <li>
            <a
              href="https://github.com/minedamnesia/another-project"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-persian-orange"
            >
              Signal Mapper
            </a>
          </li>
          {/* Add more projects as needed */}
        </ul>
      </div>
    </aside>
  );
}

