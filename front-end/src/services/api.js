const BASE_URL = "http://localhost:8000";

export async function scrapeData(keyword, platform, days) {
  const res = await fetch(`${BASE_URL}/scrape?keyword=${keyword}&platform=${platform}&days=${days}`);
  return res.json();
}

export async function analyzeData(rawData) {
  const texts = Array.isArray(rawData)
    ? rawData.map(item => (item && (item.text || item.content)) || '')
    : [];
  const res = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texts })
  });
  return res.json();
}

