exports.handler = async function () {
  try {
    const response = await fetch('https://services.swpc.noaa.gov/products/noaa-scales.json');

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Upstream NOAA error: ${response.status} ${response.statusText} - ${text.slice(0, 100)}...`);
    }

    const data = await response.json();
    const [, row] = data; // skip header

    const parsed = {
      gScale: row[2],
      sScale: row[3],
      rScale: row[4],
      description: row[1],
      time: row[5]
    };

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsed),
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

