exports.handler = async function () {
  try {
    // Fetch NOAA Scales (G/S/R)
    const response = await fetch('https://services.swpc.noaa.gov/products/noaa-scales.json');
    if (!response.ok) throw new Error(`NOAA Scales fetch failed: ${response.status}`);
    const data = await response.json();
    const entries = Object.values(data);
    if (!entries.length || !entries[0].G || !entries[0].S || !entries[0].R) {
      throw new Error("Unexpected NOAA response format: " + JSON.stringify(data).slice(0, 200));
    }
    const latest = entries[0];

    if (!latest?.G || !latest?.S || !latest?.R) {
      throw new Error("Unexpected NOAA structure for G/S/R data.");
    }

    const parsed = {
      gScale: `G${latest.G.Scale}`,
      sScale: `S${latest.S.Scale}`,
      rScale: `R${latest.R.Scale}`,
      description: latest.G.Text ?? "No geomagnetic activity",
      time: `${latest.DateStamp} ${latest.TimeStamp}`,
    };

    // Fetch Planetary K-index (latest Kp and estimate A-index)
    const kpRes = await fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json');
    if (!kpRes.ok) throw new Error(`K-index fetch failed: ${kpRes.status}`);
    const kpData = await kpRes.json();
    if (!Array.isArray(kpData) || kpData.length < 2) {
      throw new Error("Unexpected NOAA response format: " + JSON.stringify(data).slice(0, 200));
    }
    const latestKp = kpData[kpData.length - 1]?.k_index;
    parsed.kp = latestKp;
    parsed.ap = Math.round(latestKp * 10); // simple conversion (approx)

    // Fetch Solar Flux Index from NOAA (via latest solar report text file)
    const reportRes = await fetch('https://services.swpc.noaa.gov/text/daily-solar-indices.txt');
    const reportText = await reportRes.text();
    const lines = reportText.trim().split('\n');
    const latestLine = lines[lines.length - 1];
    const sfiMatch = latestLine.match(/\s(\d{3})\s+\d{2}\s+\d{2}$/);
    parsed.sfi = sfiMatch ? parseInt(sfiMatch[1]) : null;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsed),
    };
  } catch (error) {
    console.error("NOAA API Error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch NOAA data',
        detail: error.message,
      }),
    };
  }
};

