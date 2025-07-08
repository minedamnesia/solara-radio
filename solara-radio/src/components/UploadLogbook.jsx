import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import UploadErrorModal from './UploadErrorModal';

export default function UploadLogbook({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      setStatus('error');
      return;
    }

    setStatus('uploading');
    setMessage('');

    const formData = new FormData();
    formData.append('logbook', file);

    try {
      const response = await fetch('http://solara-radio.onrender.com/api/upload-logbook', {
        method: 'POST',
        headers: {
          'x-upload-secret': 'my_super_secret_key' // Must match your backend secret
        },
        body: formData,
      });

      const result = await response.json();

      if (response.status === 403) {
        // Show the error modal if forbidden
        setShowErrorModal(true);
        setStatus('idle');
        return;
      }

      if (response.ok) {
        setStatus('success');
        setMessage(result.message);
        setFile(null);

        if (onUploadSuccess) {
          onUploadSuccess();
        }

        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 2000);
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setStatus('error');
      setMessage('Upload failed. Please try again.');
    }
  };

  return (
    <div className="p-4 bg-beaver rounded-2xl shadow-lg mb-4">
      <h2 className="text-2xl font-heading mb-4">Upload Logbook</h2>

      <input
        type="file"
        accept=".adi"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-persian-orange text-gunmetal rounded-lg hover:bg-amber-400"
        disabled={status === 'uploading'}
      >
        {status === 'uploading' ? 'Uploading...' : 'Upload'}
      </button>

      {status === 'success' && (
        <div className="flex items-center mt-4 text-green-500 animate-bounce">
          <CheckCircle className="w-6 h-6 mr-2" />
          <span>{message}</span>
        </div>
      )}

      {status === 'error' && (
        <p className="mt-4 text-red-500">{message}</p>
      )}

      {showErrorModal && <UploadErrorModal onClose={() => setShowErrorModal(false)} />}
    </div>
  );
}

