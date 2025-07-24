import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import ResultsDashboard from './components/ResultsDashboard';
import './App.css';

function App() {
  const [results, setResults] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`App${darkMode ? ' dark' : ''}`}>
      <SearchForm setResults={setResults} darkMode={darkMode} setDarkMode={setDarkMode} />
      {results && typeof results === 'object' && Array.isArray(results.samples) && (
        <ResultsDashboard data={results} darkMode={darkMode} />
      )}
    </div>
  );
}

export default App;
