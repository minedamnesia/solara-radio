const fetch = require('node-fetch'); // ✅ Correct in Node/Netlify

exports.handler = async function (event, context) {
  try {
    const response = await fetch('https://services.swpc.noaa.gov/json/solar-terrestrial.json');
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch NOAA data',
        detail: error.message,
      }),
    };
  }
};

