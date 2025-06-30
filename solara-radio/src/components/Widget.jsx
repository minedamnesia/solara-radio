import { Link } from 'react-router-dom';

export default function Widget({ title, description, customClass, nestedWidget, link, image }) {

  return (
    <div className={`bg-coffee p-4 rounded-2xl shadow-lg ${customClass || ''}`}>
      {image && (
        <img
          src={image}
          alt={`${title} QSL Card`}
          className="w-32 h-auto mb-4 rounded-xl shadow-lg"
        />
      )}
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">
        <Link to={link} className="hover:underline">
          {title}
        </Link>
      </h2>
      <p className="font-sans mb-4 text-tan">{description}</p>
      {nestedWidget && (
        <div className="bg-sage p-4 rounded-xl shadow-md">
          <h3 className="text-2xl font-heading mb-2 text-gunmetal">
            <Link to={nestedWidget.link} className="hover:underline">
              {nestedWidget.title}
            </Link>
          </h3>
          <p className="font-sans text-gunmetal">{nestedWidget.description}</p>
        </div>
      )}
    </div>
  );

}
