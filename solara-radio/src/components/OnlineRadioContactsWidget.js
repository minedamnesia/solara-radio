import { useEffect, useState } from 'react';

export default function OnlineRadioContactsWidget({ refreshKey, onShowUploader }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContacts() {
      try {
        const response = await fetch('http://solara-radio.onrender.com/uploads/logbook.adi');
        const adifText = await response.text();

        const parsedContacts = parseAdif(adifText);
        const recentContacts = parsedContacts.slice(-10).reverse();

        // Perform QRZ lookups
        const detailedContacts = await Promise.all(
          recentContacts.map(async contact => {
            const lookupResponse = await fetch(`http://localhost:5000/api/lookup/${contact.callsign}`);
            const lookupData = await lookupResponse.json();
            return { ...contact, country: lookupData.country, state: lookupData.state };
          })
        );

        setContacts(detailedContacts);
        setLoading(false);
      } catch (error) {
        console.error('Error loading contacts:', error);
        setLoading(false);
      }
    }

    loadContacts();
  }, [refreshKey]);

  function parseAdif(adif) {
    const records = adif.split('<eor>').map(record => record.trim()).filter(record => record);
    return records.map(record => {
      const callsignMatch = record.match(/<CALL:\d+>([^<\s]+)/i);
      const freqMatch = record.match(/<FREQ:\d+>([\d.]+)/i);
      const modeMatch = record.match(/<MODE:\d+>([^<\s]+)/i);
      const dateMatch = record.match(/<QSO_DATE:\d+>(\d{8})/i);
      const timeMatch = record.match(/<TIME_ON:\d+>(\d{4})/i);

      return {
        callsign: callsignMatch ? callsignMatch[1] : 'Unknown',
        frequency: freqMatch ? freqMatch[1] : 'Unknown',
        mode: modeMatch ? modeMatch[1] : 'Unknown',
        datetime: dateMatch && timeMatch ? `${dateMatch[1]} ${timeMatch[1]}` : 'Unknown'
      };
    });
  }

  function getFlagEmoji(country) {
    // Quick hack for common countries; for a full solution you'd need a mapping
    if (country === 'United States') return '🇺🇸';
    if (country === 'Canada') return '🇨🇦';
    if (country === 'Japan') return '🇯🇵';
    if (country === 'Germany') return '🇩🇪';
    if (country === 'Australia') return '🇦🇺';
    return '🏳️'; // Fallback flag
  }

  return (
    <div className="bg-coffee p-4 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">Online Radio Contacts</h2>

      {loading ? (
        <p className="font-sans text-tan">Loading contacts...</p>
      ) : (
        <ul className="font-sans text-tan mb-4">
          {contacts.map((contact, index) => (
            <li key={index}>
              {contact.callsign} {getFlagEmoji(contact.country)} - {contact.frequency} MHz
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onShowUploader}
        className="mt-4 px-4 py-2 bg-persian-orange text-gunmetal rounded-lg hover:bg-amber-400"
      >
        Upload New Logbook
      </button>
    </div>
  );
}

