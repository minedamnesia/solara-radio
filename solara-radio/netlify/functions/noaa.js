exports.handler = async function () {
  try {
    const response = await fetch('https://services.swpc.noaa.gov/products/noaa-scales.json');

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Upstream NOAA error: ${response.status} ${response.statusText} - ${text.slice(0, 100)}...`);
    }

    const data = await response.json();

    // ✅ Get the first entry object (assuming keys like "0", "1", etc.)
    const firstKey = Object.keys(data)[0];
    const row = data[firstKey];

    if (!row || !row.G || !row.S || !row.R) {
      throw new Error(`Unexpected NOAA response format: ${JSON.stringify(data).slice(0, 100)}...`);
    }

    const parsed = {
      gScale: row.G.Scale,
      sScale: row.S.Scale,
      rScale: row.R.Scale,
      description: row.Description || "",
      time: row.TimeStamp || ""
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

