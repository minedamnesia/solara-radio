import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const links = [
    { path: '/', label: 'Home' },
    { path: '/radio-contacts', label: 'Radio Contacts' },
    { path: '/guides', label: 'Guides' },
    { path: '/solar-positions', label: 'Solar Positions' },
    { path: '/maps', label: 'Maps' },
    { path: '/plant-info', label: 'Plant Info' },
    { path: '/photos', label: 'Photos' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' }
  ];

  return (
    <aside className="w-64 bg-feldgrau p-6 flex flex-col justify-between">
      <nav className="space-y-4">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `block text-2xl font-heading tracking-wide py-2 px-4 rounded-lg transition-colors duration-300 ${isActive ? 'bg-persian-orange text-gunmetal' : 'hover:bg-tan hover:text-gunmetal'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
