// solara-radio-app/src/components/Sidebar.jsx
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
    <aside className="w-64 bg-green-900 p-6 flex flex-col justify-between">
      <nav className="space-y-4">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `block text-xl font-heading font-medium ${isActive ? 'text-amber-400' : 'hover:text-amber-400'}`
            }

          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
