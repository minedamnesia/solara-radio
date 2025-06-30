export default function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-5xl font-heading tracking-widest mb-4">Solara Radio Network</h1>
        <p className="text-lg font-sans tracking-normal">Exploring the world through waves and trails</p>
      </div>
      <img
        src="/qsl.png"
        alt="QSL Card"
        className="w-32 h-auto rounded-xl shadow-lg"
      />
    </header>
  );
}
