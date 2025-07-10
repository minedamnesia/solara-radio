import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Radio } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gunmetal text-tan shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <Radio className="text-persian-orange" size={28} />
          <h1 className="text-3xl font-heading text-persian-orange">Solara Radio</h1>
          <p className="text-lg font-sans tracking-normal">Exploring the world through waves and trails</p>
        </div>
      </div>

      {/* Rust-colored link bar */}
      <div className="bg-persian-orange text-gunmetal text-sm px-6 py-2 flex space-x-4 justify-end font-sans">
        <a href="https://www.linkedin.com/in/kelly-simer" target="_blank" rel="noopener noreferrer" className="hover:underline">
          LinkedIn
        </a>
        <a href="https://github.com/minedamnesia" target="_blank" rel="noopener noreferrer" className="hover:underline">
          GitHub
        </a>
        <a href="https://www.qrz.com/db/KK7QEA" target="_blank" rel="noopener noreferrer" className="hover:underline">
          QRZ Profile
        </a>
      </div>
    </header>
  );
}


    </header>
  );
}
