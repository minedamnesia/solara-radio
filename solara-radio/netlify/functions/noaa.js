exports.handler = async function () {
  try {
    const response = await fetch('https://services.swpc.noaa.gov/products/noaa-scales.json');

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Upstream NOAA error: ${response.status} ${response.statusText} - ${text.slice(0, 100)}...`);
    }

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

