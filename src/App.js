import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { auth, db } from './firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const TECHNIQUES = [
  'Passing', 'Guard', 'Closed Guard', 'Judo Trips',
  'Mount', 'Back Control', 'Submissions', 'Escapes', 'Leg Locks', 'Other'
];

const TECHNIQUE_ICONS = {
  'Passing': '⟶', 'Guard': '◉', 'Closed Guard': '⊕', 'Judo Trips': '↯',
  'Mount': '▲', 'Back Control': '◀', 'Submissions': '✕',
  'Escapes': '↗', 'Leg Locks': '⌇', 'Other': '◈'
};

const HARDCODED_UID = 'N49NTTNuEVOxzo79QyrYvGjt6Vk1';

function LogRow({ log, onClick, onDelete }) {
  return (
    <div className="log-row-wrapper">
      <button className="session-row" onClick={onClick}>
        <div className="session-row-icon">{TECHNIQUE_ICONS[log.technique] || '◈'}</div>
        <div className="session-row-info">
          <div className="session-row-title">{log.title.toUpperCase()}</div>
          <div className="session-row-date">{log.date}</div>
        </div>
        {log.technique && <div className="session-tag">{log.technique.toUpperCase()}</div>}
      </button>
      <button className="trash-btn" onClick={e => { e.stopPropagation(); onDelete(); }}>🗑</button>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [screen, setScreen] = useState('home');
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [selectedTechnique, setSelectedTechnique] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (user) fetchLogs();
  }, [user]);

  const fetchLogs = async () => {
    try {
      const q = query(collection(db, `users/${HARDCODED_UID}/logs`), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setLogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error(e); }
  };

  const addLog = async (log) => {
    try {
      const docRef = await addDoc(collection(db, `users/${HARDCODED_UID}/logs`), {
        ...log, createdAt: serverTimestamp()
      });
      setLogs([{ id: docRef.id, ...log }, ...logs]);
      setScreen('home');
    } catch (e) { console.error(e); }
  };

  const updateLog = async (id, updates) => {
    try {
      await updateDoc(doc(db, `users/${HARDCODED_UID}/logs`, id), updates);
      setLogs(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
    } catch (e) { console.error(e); }
  };

  const deleteLog = async (id) => {
    try {
      await deleteDoc(doc(db, `users/${HARDCODED_UID}/logs`, id));
      setLogs(prev => prev.filter(l => l.id !== id));
    } catch (e) { console.error(e); }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e) { console.error(e); }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setLogs([]);
    setScreen('home');
  };

  const getTechniqueCount = (t) => logs.filter(l => l.technique === t).length;
  const getLogsForTechnique = (t) => logs.filter(l => l.technique === t);

  if (authLoading) return <LoadingScreen />;
  if (!user) return <SignInScreen onSignIn={handleGoogleSignIn} />;
  if (screen === 'home') return <HomeScreen setScreen={setScreen} logs={logs} setSelectedLog={setSelectedLog} user={user} onSignOut={handleSignOut} deleteLog={deleteLog} updateLog={updateLog} />;
  if (screen === 'newLog') return <NewLogScreen setScreen={setScreen} addLog={addLog} />;
  if (screen === 'viewLogs') return <ViewLogsScreen setScreen={setScreen} logs={logs} setSelectedLog={setSelectedLog} deleteLog={deleteLog} updateLog={updateLog} />;
  if (screen === 'logDetail') return <LogDetailScreen setScreen={setScreen} log={selectedLog} setLog={setSelectedLog} updateLog={updateLog} />;
  if (screen === 'techniques') return <TechniquesScreen setScreen={setScreen} techniques={TECHNIQUES} getTechniqueCount={getTechniqueCount} setSelectedTechnique={setSelectedTechnique} />;
  if (screen === 'techniqueDetail') return <TechniqueDetailScreen setScreen={setScreen} technique={selectedTechnique} logs={getLogsForTechnique(selectedTechnique)} setSelectedLog={setSelectedLog} deleteLog={deleteLog} updateLog={updateLog} />;
}

function LoadingScreen() {
  return (
    <div className="app">
      <div className="loading-screen">
        <h1 className="hero-title" style={{ fontSize: '60px' }}>BJJ</h1>
        <p className="hero-sub" style={{ marginTop: '12px' }}>LOADING...</p>
      </div>
    </div>
  );
}

function SignInScreen({ onSignIn }) {
  return (
    <div className="app">
      <div className="screen signin-screen">
        <div className="signin-hero">
          <p className="inner-label">WELCOME TO</p>
          <h1 className="hero-title">BJJ<br/>JOURNAL</h1>
          <div className="hero-divider">
            <div className="hero-line" /><span className="hero-sub">TRAINING JOURNAL</span><div className="hero-line" />
          </div>
        </div>
        <div className="signin-bottom">
          <p className="signin-desc">Track your training. Own your progress.</p>
          <button className="btn-google" onClick={onSignIn}>
            <span className="google-icon">G</span>CONTINUE WITH GOOGLE
          </button>
          <p className="signin-fine">Your data is private and tied to your account.</p>
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ setScreen, logs, setSelectedLog, user, onSignOut, deleteLog, updateLog }) {
  return (
    <div className="app">
      <div className="screen home-screen">
        <div className="home-hero">
          <h1 className="hero-title">BJJ<br/>JOURNAL</h1>
          <div className="hero-divider">
            <div className="hero-line" /><span className="hero-sub">TRAINING JOURNAL</span><div className="hero-line" />
          </div>
        </div>
        <div className="nav-list">
          <button className="nav-row" onClick={() => setScreen('newLog')}>
            <div className="nav-row-left"><div className="nav-icon-circle"><span className="nav-icon">+</span></div><span className="nav-row-label">NEW LOG</span></div>
            <span className="nav-chevron">›</span>
          </button>
          <button className="nav-row" onClick={() => setScreen('viewLogs')}>
            <div className="nav-row-left"><div className="nav-icon-circle"><span className="nav-icon">≡</span></div><span className="nav-row-label">ALL SESSIONS</span></div>
            <span className="nav-chevron">›</span>
          </button>
          <button className="nav-row" onClick={() => setScreen('techniques')}>
            <div className="nav-row-left"><div className="nav-icon-circle"><span className="nav-icon">◈</span></div><span className="nav-row-label">TECHNIQUES</span></div>
            <span className="nav-chevron">›</span>
          </button>
        </div>
        <div className="recent-section">
          <div className="recent-header">
            <div className="recent-header-left"><div className="recent-bar" /><span className="recent-label">RECENT SESSIONS</span></div>
            {logs.length > 0 && <button className="view-all-btn" onClick={() => setScreen('viewLogs')}>VIEW ALL ›</button>}
          </div>
          {logs.length === 0 && <div className="empty-state">No sessions logged yet.</div>}
          {logs.slice(0, 3).map(log => (
            <LogRow key={log.id} log={log}
              onClick={() => { setSelectedLog(log); setScreen('logDetail'); }}
              onDelete={() => deleteLog(log.id)}
              onEdit={() => { setSelectedLog(log); setScreen('logDetail'); }}
            />
          ))}
        </div>
        <div className="signout-row">
          <p className="signout-user">{user.displayName}</p>
          <button className="signout-btn" onClick={onSignOut}>SIGN OUT</button>
        </div>
      </div>
    </div>
  );
}

function NotesInput({ notes, setNotes }) {
  const [recording, setRecording] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const recognitionRef = useRef(null);

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Voice not supported.'); return; }
    const r = new SR();
    r.continuous = true;
    r.interimResults = false;
    r.lang = 'en-US';
    r.onresult = (e) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join(' ');
      setNotes(prev => prev ? prev + ' ' + t : t);
    };
    r.onerror = () => setRecording(false);
    r.onend = () => setRecording(false);
    recognitionRef.current = r;
    r.start();
    setRecording(true);
  };

  const stopVoice = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setRecording(false);
  };

  const handleAISummarize = async () => {
    if (!notes.trim()) { alert('Add notes first.'); return; }
    setAiLoading(true);
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: notes })
      });
      const data = await res.json();
      if (data.summary) setNotes(data.summary);
      else alert('Failed: ' + (data.error || 'Unknown'));
    } catch (e) {
      alert('Failed: ' + e.message);
    }
    setAiLoading(false);
  };

  return (
    <>
      <textarea
        className="form-input textarea"
        placeholder="Type, speak, or paste your notes. Tap Speak multiple times to keep adding."
        value={notes}
        onChange={e => setNotes(e.target.value)}
        style={{ minHeight: '200px' }}
      />
      <div className="notes-actions">
        <button className={`mic-btn-small ${recording ? 'recording' : ''}`} onClick={() => recording ? stopVoice() : startVoice()}>
          {recording ? '⏹ STOP' : '🎙 SPEAK'}
        </button>
        <button className="ai-btn-small" onClick={handleAISummarize} disabled={aiLoading}>
          {aiLoading ? 'SUMMARIZING...' : '✦ AI SUMMARIZE'}
        </button>
      </div>
    </>
  );
}

function NewLogScreen({ setScreen, addLog }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [technique, setTechnique] = useState('');
  const [notes, setNotes] = useState('');
  const [titleError, setTitleError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) { setTitleError('Title is required'); return; }
    setSaving(true);
    await addLog({ title: title.trim(), date, technique, notes });
    setSaving(false);
  };

  return (
    <div className="app">
      <div className="screen inner-screen">
        <button className="btn-back" onClick={() => setScreen('home')}>← BACK</button>
        <div className="inner-header">
          <p className="inner-label">NEW ENTRY</p>
          <h2 className="inner-title">LOG<br/>SESSION</h2>
        </div>
        <div className="form-group">
          <label className="form-label">TITLE {titleError && <span className="error-msg">{titleError}</span>}</label>
          <input className={`form-input ${titleError ? 'error' : ''}`} placeholder="e.g. 5/14/26 - Knee Slice Pass" value={title} onChange={e => { setTitle(e.target.value); setTitleError(''); }} />
        </div>
        <div className="form-group">
          <label className="form-label">DATE <span className="optional-label">OPTIONAL</span></label>
          <input className="form-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">TECHNIQUE <span className="optional-label">OPTIONAL</span></label>
          <select className="form-input" value={technique} onChange={e => setTechnique(e.target.value)}>
            <option value="">Select...</option>
            {TECHNIQUES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">NOTES <span className="optional-label">OPTIONAL</span></label>
          <NotesInput notes={notes} setNotes={setNotes} />
        </div>
        <button className="btn-primary" onClick={handleSubmit} disabled={saving}>
          {saving ? 'SAVING...' : 'SAVE SESSION'}
        </button>
      </div>
    </div>
  );
}

// Log detail is now fully editable — like a notes app
function LogDetailScreen({ setScreen, log, setLog, updateLog }) {
  const [title, setTitle] = useState(log?.title || '');
  const [date, setDate] = useState(log?.date || '');
  const [technique, setTechnique] = useState(log?.technique || '');
  const [notes, setNotes] = useState(log?.notes || '');
  const [saved, setSaved] = useState(false);

  if (!log) { setScreen('home'); return null; }

  const handleSave = async () => {
    await updateLog(log.id, { title: title.trim(), date, technique, notes });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="app">
      <div className="screen inner-screen">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <button className="btn-back" style={{ margin: 0 }} onClick={() => setScreen('viewLogs')}>← BACK</button>
          <button className="save-inline-btn" onClick={handleSave}>{saved ? '✓ SAVED' : 'SAVE'}</button>
        </div>
        <div className="inner-header">
          <p className="inner-label">{date || 'NO DATE'}{date && technique ? ' · ' : ''}{technique ? technique.toUpperCase() : ''}</p>
        </div>
        <div className="form-group">
          <input className="form-input detail-title-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        </div>
        <div className="form-group">
          <label className="form-label">DATE <span className="optional-label">OPTIONAL</span></label>
          <input className="form-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">TECHNIQUE <span className="optional-label">OPTIONAL</span></label>
          <select className="form-input" value={technique} onChange={e => setTechnique(e.target.value)}>
            <option value="">Select...</option>
            {TECHNIQUES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">NOTES</label>
          <NotesInput notes={notes} setNotes={setNotes} />
        </div>
      </div>
    </div>
  );
}

function ViewLogsScreen({ setScreen, logs, setSelectedLog, deleteLog, updateLog }) {
  return (
    <div className="app">
      <div className="screen inner-screen">
        <button className="btn-back" onClick={() => setScreen('home')}>← BACK</button>
        <div className="inner-header">
          <p className="inner-label">HISTORY</p>
          <h2 className="inner-title">ALL<br/>SESSIONS</h2>
        </div>
        {logs.length === 0 && <p className="empty-state">No sessions logged yet.</p>}
        {logs.map(log => (
          <LogRow key={log.id} log={log}
            onClick={() => { setSelectedLog(log); setScreen('logDetail'); }}
            onDelete={() => deleteLog(log.id)}
            onEdit={() => { setSelectedLog(log); setScreen('logDetail'); }}
          />
        ))}
      </div>
    </div>
  );
}

function TechniquesScreen({ setScreen, techniques, getTechniqueCount, setSelectedTechnique }) {
  return (
    <div className="app">
      <div className="screen inner-screen">
        <button className="btn-back" onClick={() => setScreen('home')}>← BACK</button>
        <div className="inner-header">
          <p className="inner-label">LIBRARY</p>
          <h2 className="inner-title">TECH-<br/>NIQUES</h2>
        </div>
        {techniques.map((t) => (
          <button key={t} className="nav-row" onClick={() => { setSelectedTechnique(t); setScreen('techniqueDetail'); }}>
            <div className="nav-row-left">
              <div className="nav-icon-circle"><span className="nav-icon">{TECHNIQUE_ICONS[t]}</span></div>
              <div className="technique-info">
                <span className="nav-row-label">{t.toUpperCase()}</span>
                <span className="technique-count">{getTechniqueCount(t)} sessions</span>
              </div>
            </div>
            <span className="nav-chevron">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TechniqueDetailScreen({ setScreen, technique, logs, setSelectedLog, deleteLog, updateLog }) {
  return (
    <div className="app">
      <div className="screen inner-screen">
        <button className="btn-back" onClick={() => setScreen('techniques')}>← BACK</button>
        <div className="inner-header">
          <p className="inner-label">TECHNIQUE</p>
          <h2 className="inner-title">{technique.toUpperCase()}</h2>
          <p className="inner-label">{logs.length} SESSIONS</p>
        </div>
        {logs.length === 0 && <p className="empty-state">No sessions for this technique yet.</p>}
        {logs.map(log => (
          <LogRow key={log.id} log={log}
            onClick={() => { setSelectedLog(log); setScreen('logDetail'); }}
            onDelete={() => deleteLog(log.id)}
            onEdit={() => { setSelectedLog(log); setScreen('logDetail'); }}
          />
        ))}
      </div>
    </div>
  );
}
