const express = require('express');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { parseStringPromise } = require('xml2js');
const csv = require('csv-parser');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ===== QRZ Session Setup =====
let sessionKey = null;

async function getSessionKey() {
  const url = `https://xmldata.qrz.com/xml/current/?username=${process.env.QRZ_USERNAME};password=${process.env.QRZ_PASSWORD}`;
  const response = await axios.get(url);
  const match = response.data.match(/<Key>(.*?)<\/Key>/);
  sessionKey = match ? match[1] : null;
}

// ===== Middleware: Upload Secret Protection =====
function verifyUploadSecret(req, res, next) {
  const clientSecret = req.headers['x-upload-secret'];
  if (clientSecret !== process.env.UPLOAD_SECRET) {
    return res.status(403).json({ error: 'Forbidden: Invalid upload secret.' });
  }
  next();
}

// ===== Callsign Lookup (QRZ XML) =====
app.get('/api/lookup/:callsign', async (req, res) => {
  try {
    if (!sessionKey) await getSessionKey();

    const { callsign } = req.params;
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
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, 'logbook.adi'),
});
const upload = multer({ storage });

// ===== Upload Logbook (ADIF) =====
app.post('/api/upload-logbook', verifyUploadSecret, upload.single('logbook'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
  res.json({ message: 'Logbook uploaded successfully.' });
});

// ===== Serve Uploaded Files =====
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== ADIF File Parsing + QRZ Lookup (Optional Integration) =====
app.get('/api/recent-contacts', async (req, res) => {
  try {
    const adifPath = path.join(__dirname, 'uploads', 'logbook.adi');
    const file = fs.readFileSync(adifPath, 'utf8');
    const records = [];

    const adifContacts = file.split('<eor>').slice(0, 10);
    for (let entry of adifContacts) {
      const record = {};
      const matches = entry.match(/<([^:]+):(\d+)>([^<]*)/g);
      if (matches) {
        matches.forEach(match => {
          const parts = match.match(/<([^:]+):(\d+)>([^<]*)/);
          if (parts) {
            record[parts[1].toLowerCase()] = parts[3];
          }
        });
      }

      // QRZ lookup
      if (record.call) {
        try {
          if (!sessionKey) await getSessionKey();
          const url = `https://xmldata.qrz.com/xml/current/?s=${sessionKey};callsign=${record.call}`;
          const response = await axios.get(url);
          const jsonData = await parseStringPromise(response.data);
          const callInfo = jsonData.QRZDatabase.Callsign?.[0] || {};

          records.push({
            callsign: record.call,
            frequency: record.freq,
            mode: record.mode,
            datetime: record.qso_date + ' ' + record.time_on,
            country: callInfo.country?.[0] || 'Unknown',
            state: callInfo.state?.[0] || '',
          });
        } catch (err) {
          records.push({
            callsign: record.call,
            frequency: record.freq,
            mode: record.mode,
            datetime: record.qso_date + ' ' + record.time_on,
            country: 'Lookup failed',
            state: '',
          });
        }
      }
    }

    res.json(records);
  } catch (error) {
    console.error('Error parsing ADIF:', error.message);
    res.status(500).json({ error: 'Failed to parse logbook' });
  }
});

// Serve parks from CSV
app.get('/api/parks', (req, res) => {
  const stateFilter = req.query.state?.toUpperCase();
  const results = [];

  fs.createReadStream(path.join(__dirname, 'all_parks_ext.csv'))
    .pipe(csv())
    .on('data', (row) => {
      // Only return parks in the specified state (if provided)
      if (!stateFilter || row.state === stateFilter) {
        results.push({
          reference: row.reference,
          name: row.name,
          latitude: parseFloat(row.latitude),
          longitude: parseFloat(row.longitude),
          grid: row.grid,
          state: row.state,
          country: row.country
        });
      }
    })
    .on('end', () => {
      res.json(results);
    })
    .on('error', (err) => {
      console.error('Error reading CSV:', err);
      res.status(500).json({ error: 'Failed to load parks data.' });
    });
});



// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`QRZ backend running on port ${PORT}`);
});

