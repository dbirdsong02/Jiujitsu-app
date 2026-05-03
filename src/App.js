import React, { useState } from 'react';
import './App.css';

const TECHNIQUES = [
  'Passing',
  'Guard',
  'Closed Guard',
  'Judo Trips',
  'Mount',
  'Back Control',
  'Submissions',
  'Escapes',
  'Leg Locks',
  'Other'
];

export default function App() {
  const [screen, setScreen] = useState('home');
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [selectedTechnique, setSelectedTechnique] = useState(null);

  const addLog = (log) => {
    setLogs([log, ...logs]);
    setScreen('home');
  };

  const getTechniqueCount = (technique) => {
    return logs.filter(l => l.technique === technique).length;
  };

  const getLogsForTechnique = (technique) => {
    return logs.filter(l => l.technique === technique);
  };

  if (screen === 'home') {
    return <HomeScreen setScreen={setScreen} logs={logs} techniques={TECHNIQUES} getTechniqueCount={getTechniqueCount} setSelectedTechnique={setSelectedTechnique} />;
  }
  if (screen === 'newLog') {
    return <NewLogScreen setScreen={setScreen} addLog={addLog} />;
  }
  if (screen === 'viewLogs') {
    return <ViewLogsScreen setScreen={setScreen} logs={logs} setSelectedLog={setSelectedLog} />;
  }
  if (screen === 'logDetail') {
    return <LogDetailScreen setScreen={setScreen} log={selectedLog} />;
  }
  if (screen === 'techniques') {
    return <TechniquesScreen setScreen={setScreen} techniques={TECHNIQUES} getTechniqueCount={getTechniqueCount} setSelectedTechnique={setSelectedTechnique} />;
  }
  if (screen === 'techniqueDetail') {
    return <TechniqueDetailScreen setScreen={setScreen} technique={selectedTechnique} logs={getLogsForTechnique(selectedTechnique)} setSelectedLog={setSelectedLog} />;
  }
}

function HomeScreen({ setScreen, logs, techniques, getTechniqueCount, setSelectedTechnique }) {
  return (
    <div className="app">
      <div className="screen home-screen">
        <div className="home-header">
          <p className="home-label">TRAINING JOURNAL</p>
          <h1 className="home-title">JIU JITSU</h1>
          <p className="home-sub">{logs.length} sessions logged</p>
        </div>

        <div className="action-grid">
          <button className="action-card primary" onClick={() => setScreen('newLog')}>
            <span className="action-icon">+</span>
            <span className="action-label">New Log</span>
          </button>
          <button className="action-card" onClick={() => setScreen('viewLogs')}>
            <span className="action-icon">≡</span>
            <span className="action-label">All Logs</span>
          </button>
          <button className="action-card" onClick={() => setScreen('techniques')}>
            <span className="action-icon">◈</span>
            <span className="action-label">Techniques</span>
          </button>
        </div>

        {logs.length > 0 && (
          <div className="recent-section">
            <p className="section-label">RECENT</p>
            {logs.slice(0, 3).map(log => (
              <div key={log.id} className="log-card" onClick={() => { setScreen('logDetail'); }}>
                <div className="log-card-top">
                  <span className="log-title">{log.title}</span>
                  <span className="log-date">{log.date}</span>
                </div>
                <span className="tag">{log.technique}</span>
              </div>
            ))}
          </div>
        )}

        {logs.length === 0 && (
          <div className="empty-home">
            <p>No sessions yet.</p>
            <p>Tap + New Log to start.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function NewLogScreen({ setScreen, addLog }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [technique, setTechnique] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!date) newErrors.date = 'Date is required';
    if (!technique) newErrors.technique = 'Technique is required';
    if (!notes.trim()) newErrors.notes = 'Notes are required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addLog({ id: Date.now(), title: title.trim(), date, technique, notes: notes.trim() });
  };

  return (
    <div className="app">
      <div className="screen">
        <button className="btn-back" onClick={() => setScreen('home')}>← Back</button>
        <p className="screen-label">NEW ENTRY</p>
        <h2 className="screen-title">Log Session</h2>

        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="e.g. Knee slice passing drill"
            value={title}
            onChange={e => { setTitle(e.target.value); setErrors({...errors, title: ''}); }}
          />
          {errors.title && <p className="error-msg">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            className={`form-input ${errors.date ? 'error' : ''}`}
            type="date"
            value={date}
            onChange={e => { setDate(e.target.value); setErrors({...errors, date: ''}); }}
          />
          {errors.date && <p className="error-msg">{errors.date}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Technique Category</label>
          <select
            className={`form-input ${errors.technique ? 'error' : ''}`}
            value={technique}
            onChange={e => { setTechnique(e.target.value); setErrors({...errors, technique: ''}); }}
          >
            <option value="">Select technique...</option>
            {TECHNIQUES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.technique && <p className="error-msg">{errors.technique}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Notes</label>
          <textarea
            className={`form-input textarea ${errors.notes ? 'error' : ''}`}
            placeholder="Paste your Claude summary or write your own notes..."
            value={notes}
            onChange={e => { setNotes(e.target.value); setErrors({...errors, notes: ''}); }}
          />
          {errors.notes && <p className="error-msg">{errors.notes}</p>}
        </div>

        <button className="btn-primary" onClick={handleSubmit}>Save Session</button>
      </div>
    </div>
  );
}

function ViewLogsScreen({ setScreen, logs, setSelectedLog }) {
  return (
    <div className="app">
      <div className="screen">
        <button className="btn-back" onClick={() => setScreen('home')}>← Back</button>
        <p className="screen-label">HISTORY</p>
        <h2 className="screen-title">All Sessions</h2>

        {logs.length === 0 && <p className="empty-state">No sessions logged yet.</p>}

        {logs.map(log => (
          <div key={log.id} className="log-card" onClick={() => { setSelectedLog(log); setScreen('logDetail'); }}>
            <div className="log-card-top">
              <span className="log-title">{log.title}</span>
              <span className="log-date">{log.date}</span>
            </div>
            <span className="tag">{log.technique}</span>
            <p className="log-preview">{log.notes.substring(0, 80)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LogDetailScreen({ setScreen, log }) {
  if (!log) { setScreen('home'); return null; }
  return (
    <div className="app">
      <div className="screen">
        <button className="btn-back" onClick={() => setScreen('viewLogs')}>← Back</button>
        <p className="screen-label">{log.date}</p>
        <h2 className="screen-title">{log.title}</h2>
        <span className="tag" style={{ marginBottom: '24px', display: 'inline-block' }}>{log.technique}</span>
        <p className="screen-label" style={{ marginTop: '24px' }}>NOTES</p>
        <p className="log-notes">{log.notes}</p>
      </div>
    </div>
  );
}

function TechniquesScreen({ setScreen, techniques, getTechniqueCount, setSelectedTechnique }) {
  return (
    <div className="app">
      <div className="screen">
        <button className="btn-back" onClick={() => setScreen('home')}>← Back</button>
        <p className="screen-label">LIBRARY</p>
        <h2 className="screen-title">Techniques</h2>

        {techniques.map((t, i) => (
          <div key={t} className="technique-tile" onClick={() => { setSelectedTechnique(t); setScreen('techniqueDetail'); }}>
            <div className="technique-rank">#{i + 1}</div>
            <div className="technique-info">
              <span className="technique-name">{t}</span>
            </div>
            <div className="technique-right">
              <span className="technique-count">{getTechniqueCount(t)} sessions</span>
              <span className="technique-arrow">›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechniqueDetailScreen({ setScreen, technique, logs, setSelectedLog }) {
  return (
    <div className="app">
      <div className="screen">
        <button className="btn-back" onClick={() => setScreen('techniques')}>← Back</button>
        <p className="screen-label">TECHNIQUE</p>
        <h2 className="screen-title">{technique}</h2>
        <p className="home-sub">{logs.length} sessions</p>

        {logs.length === 0 && <p className="empty-state">No sessions logged for this technique yet.</p>}

        {logs.map(log => (
          <div key={log.id} className="log-card" onClick={() => { setSelectedLog(log); setScreen('logDetail'); }}>
            <div className="log-card-top">
              <span className="log-title">{log.title}</span>
              <span className="log-date">{log.date}</span>
            </div>
            <p className="log-preview">{log.notes.substring(0, 80)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
