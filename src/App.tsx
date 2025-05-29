import React, { useState } from 'react';
import ContributionGraph, { ContributionData } from './components/ContributionGraph';
import { generateRandomContributions } from './data/generateRandomContributions';
import { generateGitScript } from './utils/generateGitScript';

const App: React.FC = () => {
  const [data, setData] = useState<ContributionData>(() => generateRandomContributions());
  const [deleteMode, setDeleteMode] = useState(false);
  const [singleMode, setSingleMode] = useState(false);

  const handleCellClick = (date: string, current: number) => {
    // Cycle through levels but assign a random value within each level's range
    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const nextCount = deleteMode ? 0 : singleMode ? Math.min(current + 1, 39) : (() => {
      if (current === 0) return randomInt(1, 4);          // level 1
      if (current < 5) return randomInt(5, 9);            // level 2
      if (current < 10) return randomInt(10, 19);         // level 3
      if (current < 20) return randomInt(20, 39);         // level 4
      return 0;                                           // reset
    })();

    setData((prev: ContributionData) => ({
      ...prev,
      [date]: nextCount,
    }));
  };

  const handleDownload = () => {
    const script = generateGitScript(data);
    const blob = new Blob([script], { type: 'text/x-shellscript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contributions.sh';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      <h1>Interactive Contribution Graph</h1>
      <button onClick={() => setData(prev => Object.fromEntries(Object.keys(prev).map(k => [k, 0])) as ContributionData)}>
        Reset All
      </button>
      <button onClick={() => { setDeleteMode(m => !m); if (!deleteMode) setSingleMode(false); }} style={{ marginLeft: 8, background: deleteMode ? '#ffa726' : undefined }}>
        {deleteMode ? 'Exit Delete Mode' : 'Delete Mode'}
      </button>
      <button onClick={() => { setSingleMode(s => !s); if (!singleMode) setDeleteMode(false); }} style={{ marginLeft: 8, background: singleMode ? '#90caf9' : undefined }}>
        {singleMode ? 'Exit +1 Mode' : '+1 Mode'}
      </button>
      <button onClick={handleDownload} style={{ marginLeft: 8 }}>
        Download Script
      </button>
      <ContributionGraph contributions={data} onCellClick={handleCellClick} deleteMode={deleteMode} singleMode={singleMode} />
      <h2 style={{ marginTop: 32 }}>Instructions & Troubleshooting</h2>
      <div style={{ background:'#fafafa', border:'1px solid #ddd', padding:16, borderRadius:4 }}>
        <h3>Before pushing</h3>
        <ul>
          <li>Use a <strong>separate repository or branch</strong> meant only for contributions—this script rewrites history.</li>
          <li>Generate the script, run it in the repo, then <code>git push -f origin &lt;branch&gt;</code>.</li>
        </ul>

        <h3>Troubleshooting</h3>
        <ul>
          <li>Squares not showing? In GitHub go to <em>Settings → Profile</em> and enable "Include private contributions on my profile".</li>
          <li>GitHub graphs can take a few minutes to update—refresh after a short wait.</li>
        </ul>

        <h3>Warnings</h3>
        <ul>
          <li>The contribution script <strong>cannot be undone</strong> once pushed—Git preserves commits forever in the public graph.</li>
          <li>Force-pushing rewritten history can break forks and PRs. Do this only on throw-away repos.</li>
        </ul>
      </div>
      <p style={{ marginTop: 24 }}>Click any square to toggle its contribution count.</p>
    </div>
  );
};

export default App; 