// solara-radio-app/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Page from './pages/Page';

export default function App() {
  return (
    <div className="bg-gunmetal text-persian-orange min-h-screen flex">
      <div className="flex-1 p-6">
        <Header />
        <Home />
      </div>
    </div>
  );
}
