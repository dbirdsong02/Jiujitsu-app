import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { auth, db } from './firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';

const TECHNIQUES = [
  'Passing', 'Guard', 'Closed Guard', 'Judo Trips',
  'Mount', 'Back Control', 'Submissions', 'Escapes', 'Leg Locks', 'Other'
];

const TECHNIQUE_ICONS = {
  'Passing': '⟶', 'Guard': '◉', 'Closed Guard': '⊕', 'Judo Trips': '↯',
  'Mount': '▲', 'Back Control': '◀', 'Submissions': '✕',
  'Escapes': '↗', 'Leg Locks': '⌇', 'Other': '◈'
};

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
      const q = query(collection(db, `users/${auth.currentUser.uid}/logs`), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setLogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    }
  };

  const addLog = async (log) => {
    try {
      const docRef = await addDoc(collection(db, `users/${auth.currentUser.uid}/logs`), {
        ...log,
        createdAt: serverTimestamp()
      });
      setLogs([{ id: docRef.id, ...log }, ...logs]);
      setScreen('home');
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error(e);
    }
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

  if (screen === 'home') return <HomeScreen setScreen={setScreen} logs={logs} setSelectedLog={setSelectedLog} setSelectedTechnique={setSelectedTechnique} user={user} onSignOut={handleSignOut} />;
  if (screen === 'newLog') return <NewLogScreen setScreen={setScreen} addLog={addLog} />;
  if (screen === 'viewLogs') return <ViewLogsScreen setScreen={setScreen} logs={logs} setSelectedLog={setSelectedLog} />;
  if (screen === 'logDetail') return <LogDetailScreen setScreen={setScreen} log={selectedLog} />;
  if (screen === 'techniques') return <TechniquesScreen setScreen={setScreen} techniques={TECHNIQUES} getTechniqueCount={getTechniqueCount} setSelectedTechnique={setSelectedTechnique} />;
  if (screen === 'techniqueDetail') return <TechniqueDetailScreen setScreen={setScreen} technique={selectedTechnique} logs={getLogsForTechnique(selectedTechnique)} setSelectedLog={setSelectedLog} />;
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
            <div className="hero-line" />
            <span className="hero-sub">TRAINING JOURNAL</span>
            <div className="hero-line" />
          </div>
        </div>
        <div className="signin-bottom">
          <p className="signin-desc">Track your training. Own your progress.</p>
          <button className="btn-google" onClick={onSignIn}>
            <span className="google-icon">G</span>
            CONTINUE WITH GOOGLE
          </button>
          <p className="signin-fine">Your data is private and tied to your account.</p>
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ setScreen, logs, setSelectedLog, setSelectedTechnique, user, onSignOut }) {
  return (
    <div className="app">
      <div className="screen home-screen">
        <div className="home-hero">
          <h1 className="hero-title">BJJ<br/>JOURNAL</h1>
          <div className="hero-divider">
            <div className="hero-line" />
            <span className="hero-sub">TRAINING JOURNAL</span>
            <div className="hero-line" />
          </div>
        </div>

        <div className="nav-list">
          <button className="nav-row" onClick={() => setScreen('newLog')}>
            <div className="nav-row-left">
              <div className="nav-icon-circle"><span className="nav-icon">+</span></div>
              <span className="nav-row-label">NEW LOG</span>
            </div>
            <span className="nav-chevron">›</span>
          </button>
          <button className="nav-row" onClick={() => setScreen('viewLogs')}>
            <div className="nav-row-left">
              <div className="nav-icon-circle"><span className="nav-icon">≡</span></div>
              <span className="nav-row-label">ALL SESSIONS</span>
            </div>
            <span className="nav-chevron">›</span>
          </button>
          <button className="nav-row" onClick={() => setScreen('techniques')}>
            <div className="nav-row-left">
              <div className="nav-icon-circle"><span className="nav-icon">◈</span></div>
              <span className="nav-row-label">TECHNIQUES</span>
            </div>
            <span className="nav-chevron">›</span>
          </button>
        </div>

        <div className="recent-section">
          <div className="recent-header">
            <div className="recent-header-left">
              <div className="recent-bar" />
              <span className="recent-label">RECENT SESSIONS</span>
            </div>
            {logs.length > 0 && (
              <button className="view-all-btn" onClick={() => setScreen('viewLogs')}>VIEW ALL ›</button>
            )}
          </div>
          {logs.length === 0 && <div className="empty-state">No sessions logged yet.</div>}
          {logs.slice(0, 3).map(log => (
            <button key={log.id} className="session-row" onClick={() => { setSelectedLog(log); setScreen('logDetail'); }}>
              <div className="session-row-icon">{TECHNIQUE_ICONS[log.technique] || '◈'}</div>
              <div className="session-row-info">
                <div className="session-row-title">{log.title.toUpperCase()}</div>
                <div className="session-row-date">{log.date}</div>
              </div>
              {log.technique && <div className="session-tag">{log.technique.toUpperCase()}</div>}
            </button>
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

function NewLogScreen({ setScreen, addLog }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [technique, setTechnique] = useState('');
  const [notes, setNotes] = useState('');
  const [titleError, setTitleError] = useState('');
  const [saving, setSaving] = useState(false);
  const [notesMode, setNotesMode] = useState('text'); // 'text' | 'voice' | 'ai'
  const [recording, setRecording] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const recognitionRef = useRef(null);

  const startVoice = (onResult) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { alert('Voice not supported on this browser.'); return; }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join(' ');
      onResult(transcript);
    };
    recognition.onerror = () => setRecording(false);
    recognition.onend = () => setRecording(false);
    recognitionRef.current = recognition;
    recognition.start();
    setRecording(true);
  };

  const stopVoice = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setRecording(false);
  };

  const handleVoiceTap = () => {
    if (recording) { stopVoice(); return; }
    startVoice((transcript) => {
      setNotes(prev => prev ? prev + ' ' + transcript : transcript);
    });
  };

  const handleAITap = async () => {
    if (recording) { stopVoice(); return; }
    let rawTranscript = '';
    startVoice((transcript) => { rawTranscript = transcript; });
    setTimeout(async () => {
      stopVoice();
      if (!rawTranscript) return;
      setAiLoading(true);
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.REACT_APP_ANTHROPIC_KEY,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-opus-4-6',
            max_tokens: 1024,
            system: 'You are a BJJ training assistant. The user will give you a raw voice note from their training session. Summarize it into clean, organized training notes. Include: techniques worked on, key details or concepts learned, things to improve, and any notable moments from rolling. Be concise and structured. Use plain text, no markdown.',
            messages: [{ role: 'user', content: rawTranscript }]
          })
        });
        const data = await res.json();
        const summary = data.content[0].text;
        setNotes(summary);
      } catch (e) {
        console.error(e);
        alert('AI summary failed. Check your API key.');
      }
      setAiLoading(false);
    }, 15000);
  };

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
          <input
            className={`form-input ${titleError ? 'error' : ''}`}
            placeholder="e.g. 5/14/26 - Knee Slice Pass"
            value={title}
            onChange={e => { setTitle(e.target.value); setTitleError(''); }}
          />
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
          <div className="notes-header">
            <label className="form-label">NOTES <span className="optional-label">OPTIONAL</span></label>
            <div className="notes-toggle">
              <button className={`toggle-btn ${notesMode === 'text' ? 'active' : ''}`} onClick={() => setNotesMode('text')}>TEXT</button>
              <button className={`toggle-btn ${notesMode === 'voice' ? 'active' : ''}`} onClick={() => setNotesMode('voice')}>VOICE</button>
              <button className={`toggle-btn ${notesMode === 'ai' ? 'active' : ''}`} onClick={() => setNotesMode('ai')}>AI</button>
            </div>
          </div>

          {notesMode === 'text' && (
            <textarea
              className="form-input textarea"
              placeholder="Log what you worked on today."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          )}

          {notesMode === 'voice' && (
            <div className="voice-container">
              <button className={`mic-btn ${recording ? 'recording' : ''}`} onClick={handleVoiceTap}>
                {recording ? '⏹ STOP' : '🎙 TAP TO SPEAK'}
              </button>
              {notes && (
                <textarea
                  className="form-input textarea"
                  style={{ marginTop: '12px' }}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              )}
            </div>
          )}

          {notesMode === 'ai' && (
            <div className="voice-container">
              <p className="ai-desc">Speak your session recap. AI will organize it into structured notes.</p>
              <button className={`mic-btn ${recording ? 'recording' : ''}`} onClick={handleAITap} disabled={aiLoading}>
                {aiLoading ? 'SUMMARIZING...' : recording ? '⏹ STOP & SUMMARIZE' : '🎙 SPEAK YOUR SESSION'}
              </button>
              {notes && (
                <textarea
                  className="form-input textarea"
                  style={{ marginTop: '12px' }}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              )}
            </div>
          )}
        </div>

        <button className="btn-primary" onClick={handleSubmit} disabled={saving}>
          {saving ? 'SAVING...' : 'SAVE SESSION'}
        </button>
      </div>
    </div>
  );
}

function ViewLogsScreen({ setScreen, logs, setSelectedLog }) {
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
          <button key={log.id} className="session-row" onClick={() => { setSelectedLog(log); setScreen('logDetail'); }}>
            <div className="session-row-icon">{TECHNIQUE_ICONS[log.technique] || '◈'}</div>
            <div className="session-row-info">
              <div className="session-row-title">{log.title.toUpperCase()}</div>
              <div className="session-row-date">{log.date}</div>
            </div>
            {log.technique && <div className="session-tag">{log.technique.toUpperCase()}</div>}
          </button>
        ))}
      </div>
    </div>
  );
}

function LogDetailScreen({ setScreen, log }) {
  if (!log) { setScreen('home'); return null; }
  return (
    <div className="app">
      <div className="screen inner-screen">
        <button className="btn-back" onClick={() => setScreen('viewLogs')}>← BACK</button>
        <div className="inner-header">
          <p className="inner-label">{log.date}{log.date && log.technique ? ' · ' : ''}{log.technique ? log.technique.toUpperCase() : ''}</p>
          <h2 className="inner-title">{log.title.toUpperCase()}</h2>
        </div>
        {log.notes && <><p className="inner-label" style={{ marginBottom: '12px' }}>NOTES</p>
        <p className="log-notes">{log.notes}</p></>}
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

function TechniqueDetailScreen({ setScreen, technique, logs, setSelectedLog }) {
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
          <button key={log.id} className="session-row" onClick={() => { setSelectedLog(log); setScreen('logDetail'); }}>
            <div className="session-row-icon">{TECHNIQUE_ICONS[log.technique] || '◈'}</div>
            <div className="session-row-info">
              <div className="session-row-title">{log.title.toUpperCase()}</div>
              <div className="session-row-date">{log.date}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
