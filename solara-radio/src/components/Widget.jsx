import { useState } from 'react';
import { Info } from 'lucide-react';
import Modal from '../components/Modal';

export default function Widget({ title, description, customClass, nestedWidget, link, image }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={`bg-coffee p-4 rounded-2xl shadow-lg ${customClass || ''}`}>
      {image && <img src={image} alt={title} className="w-full h-50 object-cover rounded mb-4 mx-auto" />}

      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">
        {link ? <a href={link}>{title}</a> : title}
      </h2>

      <div className="mb-4">
        <p className="font-sans text-tan">{description}</p>
      </div>

      {/* Biographical Text Block */}
      {title === 'About Me' && (
        <div className="bg-sage p-2 rounded-lg mb-4 flex justify-between items-center h-[30%]">
          <p className="font-sans text-gunmetal text-sm">Start of biographical statement...</p>
          <button onClick={() => setShowModal(true)} className="text-gunmetal hover:text-persian-orange">
            <Info size={24} />
          </button>
        </div>
      )}

      {/* Nested Widget */}
      {nestedWidget && (
        <div className="flex justify-center items-center h-[60%] mb-4">
          <div className="bg-sage p-4 rounded-lg shadow-md w-3/4 text-center">
            <h3 className="text-xl font-heading mb-2">
              <a href={nestedWidget.link}>{nestedWidget.title}</a>
            </h3>
            <p className="font-sans text-gunmetal">{nestedWidget.description}</p>
          </div>
        </div>
      )}

      {/* Modal for Biographical Text */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-4 text-tan">
            <h2 className="text-3xl font-heading mb-4 text-persian-orange">About Me - Full Bio</h2>
            <p className="font-sans">Here is the full biographical statement you can expand with more detail...</p>
          </div>
        </Modal>
      )}
    </div>
  );
}
