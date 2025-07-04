// solara-radio-app/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Page from './pages/Page';

export default function App() {
  return (
    <div className="bg-gunmetal text-persian-orange min-h-screen flex">
      <div className="flex-1 p-6">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/radio-contacts" element={<Page title="Radio Contacts" />} />
          <Route path="/guides" element={<Page title="Guides" />} />
          <Route path="/solar-positions" element={<Page title="Solar Positions" />} />
          <Route path="/maps" element={<Page title="Maps" />} />
          <Route path="/plant-info" element={<Page title="Plant Info" />} />
          <Route path="/photos" element={<Page title="Photos" />} />
          <Route path="/creative" element={<Page title="Creative" />} />
          <Route path="/about" element={<Page title="About" />} />
          <Route path="/projects" element={<Page title="Coding Projects" />} />
        </Routes>
      </div>
      <Sidebar />
    </div>
  );
}
