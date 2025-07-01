const express = require('express');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { parseStringPromise } = require('xml2js');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = 5000;

// ===== QRZ Session Setup (Optional for future use) =====
let sessionKey = null;

async function getSessionKey() {
  const url = `https://xmldata.qrz.com/xml/current/?username=${process.env.QRZ_USERNAME};password=${process.env.QRZ_PASSWORD}`;
  const response = await axios.get(url);
  const match = response.data.match(/<Key>(.*?)<\/Key>/);
  sessionKey = match ? match[1] : null;
}

// Secret protection middleware
function verifyUploadSecret(req, res, next) {
  const clientSecret = req.headers['x-upload-secret'];

  if (clientSecret !== process.env.UPLOAD_SECRET) {
    return res.status(403).json({ error: 'Forbidden: Invalid upload secret.' });
  }

  next();
}

// ===== QRZ Callsign Lookup Route =====
app.get('/api/lookup/:callsign', async (req, res) => {
  try {
    if (!sessionKey) {
      await getSessionKey();
    }

    const callsign = req.params.callsign;
    const url = `https://xmldata.qrz.com/xml/current/?s=${sessionKey};callsign=${callsign}`;
    const response = await axios.get(url);

    const jsonData = await parseStringPromise(response.data);

    const callsignData = jsonData.QRZDatabase.Callsign?.[0] || {};
    res.json({
      callsign: callsignData.call?.[0] || callsign,
      country: callsignData.country?.[0] || 'Unknown',
      state: callsignData.state?.[0] || '',
      dxcc: callsignData.dxcc?.[0] || ''
    });
  } catch (error) {
    console.error('Error fetching QRZ data:', error.message);
    res.status(500).json({ error: 'Failed to fetch QRZ data' });
  }
});

// ===== File Upload Setup =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Files saved to /uploads
  },
  filename: (req, file, cb) => {
    cb(null, 'logbook.adi'); // Always overwrite the same file
  }
});

const upload = multer({ storage });

// ===== File Upload Route =====
app.post('/api/upload-logbook', verifyUploadSecret, upload.single('logbook'), (req, res) => {
  console.log('File uploaded:', req.file);
  res.json({ message: 'Logbook uploaded successfully' });
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== Start Server =====
app.listen(PORT, () => console.log(`QRZ backend running on port ${PORT}`));

