import { useEffect, useState } from 'react';

export default function RecentLogbookWidget() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentContacts() {
      try {
        // Placeholder fetch from your backend that handles QRZ scraping server-side
        const response = await fetch('https://solara-radio.onrender.com/api/recent-logbook');
        const data = await response.json();
        setContacts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recent contacts:', error);
        setLoading(false);
      }
    }

    fetchRecentContacts();
  }, []);

  function getFlagEmoji(country) {
    if (country === 'United States') return '🇺🇸';
    if (country === 'Canada') return '🇨🇦';
    if (country === 'Japan') return '🇯🇵';
    if (country === 'Germany') return '🇩🇪';
    if (country === 'Australia') return '🇦🇺';
    return '🏳️';
  }

  return (
    <div className="bg-coffee p-4 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">Recent Logbook</h2>

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
    </div>
  );
}

