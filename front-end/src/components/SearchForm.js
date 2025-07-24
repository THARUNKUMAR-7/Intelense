import React, { useState } from 'react';
import { scrapeData, analyzeData } from '../services/api';

function SearchForm({ setResults, darkMode, setDarkMode }) {
  const [keyword, setKeyword] = useState('');
  const [platform, setPlatform] = useState('reddit');
  const [days, setDays] = useState(7);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rawData = await scrapeData(keyword, platform, days);
    console.log('rawData from backend:', rawData);
    const analysis = await analyzeData(rawData);
    console.log('analysis from backend:', analysis);
    // Attach sample posts to analysis for dashboard
    setResults({
      ...analysis,
      samples: Array.isArray(rawData) ? rawData.slice(0, 5) : []
    });
  };

  return (
    <form className={`search-form${darkMode ? ' dark' : ''}`} onSubmit={handleSubmit}>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Keyword" />
      <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
        <option value="reddit">Reddit</option>
        <option value="twitter">Twitter/X</option>
        <option value="news">News</option>
      </select>
      <input type="number" min="1" value={days} onChange={(e) => setDays(e.target.value)} />
      <button type="submit">Search</button>
      <button type="button" className="dark-toggle" onClick={() => setDarkMode((d) => !d)}>
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </form>
  );
}

export default SearchForm;
