import React from 'react';
import { Pie } from 'react-chartjs-2';
import WordCloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

function ResultsDashboard({ data, darkMode }) {


  const { keywords = [], hashtags = [], sentiment = {}, samples = [] } = data || {};

  // Ensure sentiment values are always numbers and fallback to 0 if undefined
  const sentimentData = [
    typeof sentiment.positive === 'number' ? sentiment.positive : 0,
    typeof sentiment.neutral === 'number' ? sentiment.neutral : 0,
    typeof sentiment.negative === 'number' ? sentiment.negative : 0
  ];


  const pieData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: sentimentData,
        backgroundColor: ['#4caf50', '#ffeb3b', '#f44336'],
      },
    ],
  };

  const wordCloudWords = Array.isArray(keywords)
    ? keywords.map((word) => ({ text: word, value: 10 }))
    : [];

  return (
    <div className={`results-dashboard${darkMode ? ' dark' : ''}`}>
      <h2>Results</h2>

      <div className="dashboard-section">
        <h3>Sentiment Analysis</h3>
        {(() => {
          // Debug logs to catch any edge case
          console.log('pieData:', pieData);
          console.log('pieData.datasets:', pieData.datasets);
          console.log('pieData.datasets[0]:', pieData.datasets && pieData.datasets[0]);
          console.log('pieData.datasets[0].data:', pieData.datasets && pieData.datasets[0] && pieData.datasets[0].data);
          return (
            Array.isArray(pieData.datasets) &&
            pieData.datasets.length > 0 &&
            typeof pieData.datasets[0] === 'object' && pieData.datasets[0] !== null &&
            Array.isArray(pieData.datasets[0].data) &&
            pieData.datasets[0].data.length === 3 &&
            pieData.datasets[0].data.every((v) => typeof v === 'number' && Number.isFinite(v)) ? (
              <Pie data={pieData} />
            ) : (
              <div>No sentiment data available.</div>
            )
          );
        })()}
      </div>

      <div className="dashboard-section">
        <h3>Word Cloud</h3>
        <WordCloud words={wordCloudWords} />
      </div>

      <div className="dashboard-section">
        <h3>Keywords</h3>
        <ul>
          {Array.isArray(keywords) && keywords.map((word, i) => (
            <li key={i}>{word}</li>
          ))}
        </ul>
      </div>

      <div className="dashboard-section">
        <h3>Hashtags</h3>
        <ul>
          {Array.isArray(hashtags) && hashtags.map((tag, i) => (
            <li key={i}>{tag}</li>
          ))}
        </ul>
      </div>

      <div className="dashboard-section">
        <h3>Sample Posts/Comments</h3>
        {!Array.isArray(samples) || samples.length === 0 ? ( 
          <div>No news or posts found.</div>
        ) : (
          <ul>
            {Array.isArray(samples) && samples.map((item, i) => {
              const textContent = typeof item?.text === 'string' ? item.text : (typeof item?.content === 'string' ? item.content : '');
              let lines = [];
              if (typeof textContent === 'string' && typeof textContent.split === 'function') {
                lines = textContent.split('\n');
              }
              const title = Array.isArray(lines) && lines.length > 0 && typeof lines[0] === 'string' ? lines[0] : '';
              const summary = Array.isArray(lines) && lines.length > 1 ? lines.slice(1).join(' ').slice(0, 200) : '';
              return (
                <li key={i} style={{ marginBottom: '1em' }}>
                  <strong>{title}</strong>
                  <div style={{ fontSize: '0.95em', color: '#555' }}>{summary}{summary.length === 200 ? '...' : ''}</div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ResultsDashboard;
