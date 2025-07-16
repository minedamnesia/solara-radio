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
    const gsr = entries[0];

    const parsed = {
      gScale: `G${gsr.G.Scale}`,
      sScale: `S${gsr.S.Scale}`,
      rScale: `R${gsr.R.Scale}`,
      description: gsr.G.Text ?? "No geomagnetic activity",
      time: `${gsr.DateStamp} ${gsr.TimeStamp}`,
    };

    // Fetch Planetary K-index
    const kpRes = await fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json');
    if (!kpRes.ok) throw new Error(`K-index fetch failed: ${kpRes.status}`);
    const kpData = await kpRes.json();
    const latestKp = kpData[kpData.length - 1];
    parsed.kp = latestKp.kp_index;
    //parsed.ap = Math.round(latestKp.kp_index * 10);

    // Fetch Solar Flux Index and Ap from JSON endpoint
    const reportRes = await fetch('https://services.swpc.noaa.gov/text/daily-solar-indices.txt');
    if (!reportRes.ok) throw new Error(`SFI fetch failed: ${reportRes.status}`);

    const reportText = await reportRes.text();
    const lines = reportText.trim().split('\n');

    // Get the last non-header, non-empty line
    const dataLine = lines.reverse().find(line => /^\d{4}\s+\d{2}\s+\d{2}/.test(line));
    if (!dataLine) throw new Error("No valid data line found in solar report");

    const parts = dataLine.trim().split(/\s+/);

    // Ensure we have enough fields
    if (parts.length < 6) throw new Error("Unexpected solar data line format: " + dataLine);

    const observedSFI = parseInt(parts[3]); // f10.7
    const apIndex = parseInt(parts[5]);     // Ap

    parsed.sfi = isNaN(observedSFI) ? null : observedSFI;
    parsed.ap = isNaN(apIndex) ? null : apIndex;

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

