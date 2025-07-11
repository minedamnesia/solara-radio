export async function handler(event, context) {
  try {
    const response = await fetch('https://services.swpc.noaa.gov/json/solar-terrestrial.json');
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow CORS
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch NOAA data', detail: error.message }),
    };
  }
}

