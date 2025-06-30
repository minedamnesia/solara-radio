export default function Page({ title }) {
  return (
    <div className="p-4 bg-beaver rounded-2xl shadow-lg">
      <h2 className="text-4xl font-heading tracking-wide mb-4">{title}</h2>
      <p className="font-sans">This is the {title} page. Content coming soon!</p>
    </div>
  );
}
