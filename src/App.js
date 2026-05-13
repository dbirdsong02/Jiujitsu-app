import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { auth, db } from './firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, deleteDoc, updateDoc, setDoc, getDoc } from 'firebase/firestore';

const DEFAULT_TECHNIQUE_TREE = {
  'Half Guard': ['Arm Attacks', 'Deep Half', 'Sweeps/Reversals', 'Octopus Guard', 'Coyote Guard', 'Other'],
  'Open Guard': ['De La Riva', 'Reverse DLR', 'Butterfly', 'X Guard', 'Single Leg X / K Guard', 'Spider', 'Lasso', 'Guard Retention'],
  'Passing': ['Outside Passing', 'Inside Passing', 'Dynamic', 'Pressure Passing', 'Passing Concepts'],
  'Closed Guard': ['Sweeps', 'Submissions', 'Guard Break Defense', 'Posture Control'],
  'Mount': ['Mount Concepts', 'Mount Attacks', 'Mount Escapes', 'S Mount'],
  'Back': ['Taking the Back', 'Maintaining Back', 'Back Attacks', 'Back Escapes'],
  'Side Control': ['Maintaining Side Control', 'Side Control Attacks', 'Side Control Escapes', 'North South'],
  'Leg Locks': ['50/50', 'Single Leg X', 'Cross Ashi', 'Outside Ashi', 'Saddle', 'Knee Shield Ashi'],
  'Judo': ['Throws', 'Takedowns', 'Trips'],
  'Wrestling': ['Double Leg', 'Single Leg', 'Arm Drag', 'Clinch Work', 'Wrestling Defense'],
  'Other': ['Concepts', 'Drills', 'Improvement Notes', 'Comp Notes', 'Issues'],
};

const TECHNIQUE_ICONS = {
  'Closed Guard': '⊕', 'Half Guard': '◑', 'Open Guard': '◉',
  'Mount': '▲', 'Back': '◀', 'Side Control': '▶',
  'Passing': '⟶', 'Judo': '↯', 'Wrestling': '⤵',
  'Leg Locks': '⌇', 'Other': '◈'
};

const HARDCODED_UID = 'N49NTTNuEVOxzo79QyrYvGjt6Vk1';
const clean = (str) => (str || '').replace(/\?{2,}/g, '-');

function LogRow({ log, onClick, onDelete }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginLeft: '-4px', marginRight: '-4px' }}>
      <button className="session-row" style={{ flex: 1, marginBottom: 0, minWidth: 0 }} onClick={onClick}>
        <div className="session-row-icon" style={{ flexShrink: 0 }}>{TECHNIQUE_ICONS[log.technique] || '◈'}</div>
        <div className="session-row-info" style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
          <div className="session-row-title">{clean(log.title).toUpperCase()}</div>
          <div className="session-row-date">{log.date}</div>
        </div>
        {log.technique && <div className="session-tag" style={{ flexShrink: 0 }}>{log.technique.toUpperCase()}</div>}
      </button>
      <button className="trash-btn" style={{ flexShrink: 0, width: '28px', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }} onClick={e => { e.stopPropagation(); onDelete(); }}>🗑</button>
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
  const [selectedSubtechnique, setSelectedSubtechnique] = useState(null);
  const [techniqueTree, setTechniqueTree] = useState(DEFAULT_TECHNIQUE_TREE);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setAuthLoading(false); });
    return unsub;
  }, []);

  useEffect(() => { if (user) { fetchLogs(); fetchTechniqueTree(); } }, [user]);

  const fetchLogs = async () => {
    try {
      const q = query(collection(db, `users/${HARDCODED_UID}/logs`), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setLogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error(e); }
  };

  const fetchTechniqueTree = async () => {
    try {
      const docRef = doc(db, `users/${HARDCODED_UID}/settings/techniqueTree`);
      const snap = await getDoc(docRef);
      if (snap.exists()) setTechniqueTree(snap.data().tree);
    } catch (e) { console.error(e); }
  };

  const saveTechniqueTree = async (tree) => {
    try {
      await setDoc(doc(db, `users/${HARDCODED_UID}/settings/techniqueTree`), { tree });
      setTechniqueTree(tree);
    } catch (e) { console.error(e); }
  };

  const addSubcategory = async (position, newSub) => {
    const updated = { ...techniqueTree, [position]: [...(techniqueTree[position] || []), newSub] };
    await saveTechniqueTree(updated);
  };

  const removeSubcategory = async (position, sub) => {
    const updated = { ...techniqueTree, [position]: (techniqueTree[position] || []).filter(s => s !== sub) };
    await saveTechniqueTree(updated);
  };

  const addLog = async (log) => {
    try {
      const docRef = await addDoc(collection(db, `users/${HARDCODED_UID}/logs`), { ...log, createdAt: serverTimestamp() });
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
    try { const provider = new GoogleAuthProvider(); await signInWithPopup(auth, provider); }
    catch (e) { console.error(e); }
  };

  const handleSignOut = async () => { await signOut(auth); setLogs([]); setScreen('home'); };
  const getTechniqueCount = (t) => logs.filter(l => l.technique === t).length;
  const getLogsForTechnique = (t) => logs.filter(l => l.technique === t);

  if (authLoading) return <LoadingScreen />;
  if (!user) return <SignInScreen onSignIn={handleGoogleSignIn} />;
  if (screen === 'home') return <HomeScreen setScreen={setScreen} logs={logs} setSelectedLog={setSelectedLog} user={user} onSignOut={handleSignOut} deleteLog={deleteLog} />;
  if (screen === 'newLog') return <NewLogScreen setScreen={setScreen} addLog={addLog} techniqueTree={techniqueTree} addSubcategory={addSubcategory} removeSubcategory={removeSubcategory} />;
  if (screen === 'viewLogs') return <ViewLogsScreen setScreen={setScreen} logs={logs} setSelectedLog={setSelectedLog} deleteLog={deleteLog} techniqueTree={techniqueTree} />;
  if (screen === 'logDetail') return <LogDetailScreen setScreen={setScreen} log={selectedLog} updateLog={updateLog} techniqueTree={techniqueTree} addSubcategory={addSubcategory} removeSubcategory={removeSubcategory} />;
  if (screen === 'techniques') return <TechniquesScreen setScreen={setScreen} getTechniqueCount={getTechniqueCount} setSelectedTechnique={setSelectedTechnique} setSelectedSubtechnique={setSelectedSubtechnique} techniqueTree={techniqueTree} />;
  if (screen === 'techniqueDetail') return <TechniqueDetailScreen setScreen={setScreen} technique={selectedTechnique} selectedSubtechnique={selectedSubtechnique} logs={getLogsForTechnique(selectedTechnique)} setSelectedLog={setSelectedLog} deleteLog={deleteLog} removeSubcategory={removeSubcategory} techniqueTree={techniqueTree} />;
}

function LoadingScreen() {
  return (
    <div className="app"><div className="loading-screen">
      <h1 className="hero-title" style={{ fontSize: '60px' }}>BJJ</h1>
      <p className="hero-sub" style={{ marginTop: '12px' }}>LOADING...</p>
    </div></div>
  );
}

function SignInScreen({ onSignIn }) {
  return (
    <div className="app"><div className="screen signin-screen">
      <div className="signin-hero">
        <p className="inner-label">WELCOME TO</p>
        <h1 className="hero-title">BJJ<br/>JOURNAL</h1>
        <div className="hero-divider"><div className="hero-line" /><span className="hero-sub">TRAINING JOURNAL</span><div className="hero-line" /></div>
      </div>
      <div className="signin-bottom">
        <p className="signin-desc">Track your training. Own your progress.</p>
        <button className="btn-google" onClick={onSignIn}><span className="google-icon">G</span>CONTINUE WITH GOOGLE</button>
        <p className="signin-fine">Your data is private and tied to your account.</p>
      </div>
    </div></div>
  );
}

function HomeScreen({ setScreen, logs, setSelectedLog, user, onSignOut, deleteLog }) {
  return (
    <div className="app"><div className="screen home-screen">
      <div className="home-hero">
        <h1 className="hero-title">BJJ<br/>JOURNAL</h1>
        <div className="hero-divider"><div className="hero-line" /><span className="hero-sub">TRAINING JOURNAL</span><div className="hero-line" /></div>
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
          <div className="recent-header-left"><div className="recent-bar" /><span className="recent-label">RECENT</span></div>
          {logs.length > 0 && <button className="view-all-btn" onClick={() => setScreen('viewLogs')}>VIEW ALL ›</button>}
        </div>
        {logs.length === 0 && <div className="empty-state">No sessions logged yet.</div>}
        {logs.slice(0, 3).map(log => (
          <LogRow key={log.id} log={log} onClick={() => { setSelectedLog(log); setScreen('logDetail'); }} onDelete={() => deleteLog(log.id)} />
        ))}
      </div>
      <div className="signout-row">
        <p className="signout-user">{user.displayName}</p>
        <button className="signout-btn" onClick={onSignOut}>SIGN OUT</button>
      </div>
    </div></div>
  );
}

function SubcategorySelect({ technique, subtechnique, setSubtechnique, techniqueTree, addSubcategory }) {
  const [adding, setAdding] = useState(false);
  const [newSub, setNewSub] = useState('');

  const subs = techniqueTree[technique] || [];

  const handleAdd = async () => {
    if (!newSub.trim()) return;
    await addSubcategory(technique, newSub.trim());
    setSubtechnique(newSub.trim());
    setNewSub('');
    setAdding(false);
  };

  if (!technique) return null;

  return (
    <div className="form-group">
      <label className="form-label">SUBCATEGORY <span className="optional-label">OPTIONAL</span></label>
      {!adding ? (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <select className="form-input" style={{ flex: 1 }} value={subtechnique} onChange={e => setSubtechnique(e.target.value)}>
            <option value="Other">Other</option>
            {subs.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button className="btn-add-sub" onClick={() => setAdding(true)}>+</button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            className="form-input"
            style={{ flex: 1 }}
            placeholder="New subcategory..."
            value={newSub}
            onChange={e => setNewSub(e.target.value)}
          />
          <button className="btn-add-sub" onClick={handleAdd}>SAVE</button>
          <button className="btn-cancel-sub" onClick={() => { setAdding(false); setNewSub(''); }}>✕</button>
        </div>
      )}
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
    r.continuous = true; r.interimResults = false; r.lang = 'en-US';
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

  const stopVoice = () => { if (recognitionRef.current) recognitionRef.current.stop(); setRecording(false); };

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
    } catch (e) { alert('Failed: ' + e.message); }
    setAiLoading(false);
  };

  return (
    <>
      <textarea className="form-input textarea" placeholder="Type, speak, or paste. Tap Speak multiple times to keep adding." value={notes} onChange={e => setNotes(e.target.value)} style={{ minHeight: '200px' }} />
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

function NewLogScreen({ setScreen, addLog, techniqueTree, addSubcategory, removeSubcategory }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [technique, setTechnique] = useState('');
  const [subtechnique, setSubtechnique] = useState('');
  const [notes, setNotes] = useState('');
  const [titleError, setTitleError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) { setTitleError('Title is required'); return; }
    setSaving(true);
    await addLog({ title: title.trim(), date, technique, subtechnique, notes });
    setSaving(false);
  };

  return (
    <div className="app"><div className="screen inner-screen">
      <div className="topbar-row">
        <button className="btn-back" onClick={() => setScreen('home')}>← BACK</button>
        <button className="home-btn" onClick={() => setScreen('home')}>⌂</button>
      </div>
      <div className="inner-header">
        <p className="inner-label">NEW ENTRY</p>
        <h2 className="inner-title">LOG<br/>SESSION</h2>
      </div>
      <div className="form-group">
        <label className="form-label">TITLE {titleError && <span className="error-msg">{titleError}</span>}</label>
        <input className={`form-input ${titleError ? 'error' : ''}`} placeholder="e.g. Knee Slice Pass" value={title} onChange={e => { setTitle(e.target.value); setTitleError(''); }} />
      </div>
      <div className="form-group">
        <label className="form-label">DATE <span className="optional-label">OPTIONAL</span></label>
        <input className="form-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label">POSITION <span className="optional-label">OPTIONAL</span></label>
        <select className="form-input" value={technique} onChange={e => { setTechnique(e.target.value); setSubtechnique(''); }}>
          <option value="">Select position...</option>
          {Object.keys(techniqueTree).map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <SubcategorySelect technique={technique} subtechnique={subtechnique} setSubtechnique={setSubtechnique} techniqueTree={techniqueTree} addSubcategory={addSubcategory} removeSubcategory={removeSubcategory} />
      <div className="form-group">
        <label className="form-label">NOTES <span className="optional-label">OPTIONAL</span></label>
        <NotesInput notes={notes} setNotes={setNotes} />
      </div>
      <button className="btn-primary" onClick={handleSubmit} disabled={saving}>{saving ? 'SAVING...' : 'SAVE SESSION'}</button>
    </div></div>
  );
}

function LogDetailScreen({ setScreen, log, updateLog, techniqueTree, addSubcategory, removeSubcategory }) {
  const [title, setTitle] = useState(log?.title || '');
  const [date, setDate] = useState(log?.date || '');
  const [technique, setTechnique] = useState(log?.technique || '');
  const [subtechnique, setSubtechnique] = useState(log?.subtechnique || '');
  const [notes, setNotes] = useState(log?.notes || '');
  const [saved, setSaved] = useState(false);
  const [recording, setRecording] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const recognitionRef = useRef(null);

  if (!log) { setScreen('home'); return null; }

  const handleSave = async () => {
    await updateLog(log.id, { title: title.trim(), date, technique, subtechnique, notes });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Voice not supported.'); return; }
    const r = new SR();
    r.continuous = true; r.interimResults = false; r.lang = 'en-US';
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

  const stopVoice = () => { if (recognitionRef.current) recognitionRef.current.stop(); setRecording(false); };

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
    } catch (e) { alert('Failed: ' + e.message); }
    setAiLoading(false);
  };

  return (
    <div className="app"><div className="screen inner-screen">
      <div className="detail-topbar">
        <button className="btn-back" style={{ margin: 0 }} onClick={() => setScreen('viewLogs')}>← BACK</button>
        <button className="save-inline-btn" onClick={handleSave}>{saved ? '✓ SAVED' : 'SAVE'}</button>
      </div>
      <div className="detail-meta">
        <input className="detail-title-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <div className="detail-meta-inline">
          <input className="detail-meta-chip" type="date" value={date} onChange={e => setDate(e.target.value)} />
          <select className="detail-meta-chip" value={technique} onChange={e => { setTechnique(e.target.value); setSubtechnique(''); }}>
            <option value="">No position</option>
            {Object.keys(techniqueTree).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        {technique && (
          <div style={{ marginTop: '8px' }}>
            <SubcategorySelect technique={technique} subtechnique={subtechnique} setSubtechnique={setSubtechnique} techniqueTree={techniqueTree} addSubcategory={addSubcategory} removeSubcategory={removeSubcategory} />
          </div>
        )}
      </div>
      <div className="detail-notes-section">
        <textarea className="detail-notes-textarea" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes..." />
        <div className="notes-actions">
          <button className={`mic-btn-small ${recording ? 'recording' : ''}`} onClick={() => recording ? stopVoice() : startVoice()}>
            {recording ? '⏹ STOP' : '🎙 SPEAK'}
          </button>
          <button className="ai-btn-small" onClick={handleAISummarize} disabled={aiLoading}>
            {aiLoading ? 'SUMMARIZING...' : '✦ AI SUMMARIZE'}
          </button>
        </div>
      </div>
    </div></div>
  );
}

function ViewLogsScreen({ setScreen, logs, setSelectedLog, deleteLog, techniqueTree }) {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = logs
    .filter(l => filter === 'ALL' || (l.technique || 'Other') === filter)
    .filter(l => !search || clean(l.title).toLowerCase().includes(search.toLowerCase()) || (l.notes || '').toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  return (
    <div className="app"><div className="screen inner-screen">
      <div className="topbar-row">
        <button className="btn-back" onClick={() => setScreen('home')}>← BACK</button>
        <button className="home-btn" onClick={() => setScreen('home')}>⌂</button>
      </div>
      <div className="inner-header">
        <p className="inner-label">HISTORY</p>
        <h2 className="inner-title">ALL<br/>SESSIONS</h2>
      </div>
      <div className="filter-row">
        <input className="search-bar-inline" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="filter-dropdown" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="ALL">All</option>
          {Object.keys(techniqueTree).map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      {filtered.length === 0 && <p className="empty-state">No sessions found.</p>}
      {filtered.map(log => (
        <LogRow key={log.id} log={log} onClick={() => { setSelectedLog(log); setScreen('logDetail'); }} onDelete={() => deleteLog(log.id)} />
      ))}
    </div></div>
  );
}

function TechniquesScreen({ setScreen, getTechniqueCount, setSelectedTechnique, setSelectedSubtechnique, techniqueTree }) {
  const [search, setSearch] = useState('');
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));

  const filteredTree = Object.entries(techniqueTree).filter(([section, subs]) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return section.toLowerCase().includes(s) || subs.some(sub => sub.toLowerCase().includes(s));
  });

  return (
    <div className="app"><div className="screen inner-screen">
      <div className="topbar-row">
        <button className="btn-back" onClick={() => setScreen('home')}>← BACK</button>
        <button className="home-btn" onClick={() => setScreen('home')}>⌂</button>
      </div>
      <div className="inner-header">
        <p className="inner-label">LIBRARY</p>
        <h2 className="inner-title">TECH-<br/>NIQUES</h2>
      </div>
      <input className="search-bar" placeholder="Search techniques..." value={search} onChange={e => setSearch(e.target.value)} />
      {filteredTree.map(([section, subs]) => (
        <div key={section} className="technique-section">
          <button className="technique-section-header" onClick={() => toggleSection(section)}>
            <div className="technique-section-left">
              <span className="technique-section-icon">{TECHNIQUE_ICONS[section] || '◈'}</span>
              <span className="technique-section-name">{section.toUpperCase()}</span>
              <span className="technique-section-count">{getTechniqueCount(section)}</span>
            </div>
            <span className="technique-section-chevron">{openSections[section] ? '∨' : '›'}</span>
          </button>
          {openSections[section] && (
            <div className="technique-subsections">
              {subs.filter(sub => !search || sub.toLowerCase().includes(search.toLowerCase()) || section.toLowerCase().includes(search.toLowerCase())).map(sub => (
                <button key={sub} className="technique-sub-row" onClick={() => { setSelectedTechnique(section); setSelectedSubtechnique(sub); setScreen('techniqueDetail'); }}>
                  <span className="technique-sub-name">{sub}</span>
                  <span className="technique-sub-chevron">›</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div></div>
  );
}

function TechniqueDetailScreen({ setScreen, technique, selectedSubtechnique, logs, setSelectedLog, deleteLog, removeSubcategory, techniqueTree }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteSub = async () => {
    await removeSubcategory(technique, selectedSubtechnique);
    setScreen('techniques');
  };

  const filteredLogs = selectedSubtechnique
    ? logs.filter(l => l.subtechnique === selectedSubtechnique)
    : logs;

  return (
    <div className="app"><div className="screen inner-screen">
      <div className="topbar-row">
        <button className="btn-back" onClick={() => setScreen('techniques')}>← BACK</button>
        <button className="home-btn" onClick={() => setScreen('home')}>⌂</button>
      </div>
      <div className="inner-header">
        <p className="inner-label">{technique.toUpperCase()}</p>
        <h2 className="inner-title">{selectedSubtechnique ? selectedSubtechnique.toUpperCase() : technique.toUpperCase()}</h2>
        <p className="inner-label">{filteredLogs.length} SESSIONS</p>
      </div>
      {filteredLogs.length === 0 && <p className="empty-state">No sessions here yet.</p>}
      {filteredLogs.map(log => (
        <LogRow key={log.id} log={log} onClick={() => { setSelectedLog(log); setScreen('logDetail'); }} onDelete={() => deleteLog(log.id)} />
      ))}
      {selectedSubtechnique && selectedSubtechnique !== 'Other' && (
        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #111' }}>
          {confirmDelete ? (
            <div style={{ background: '#1a0000', border: '1px solid #6b0000', borderRadius: '12px', padding: '16px' }}>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '12px', color: '#cc3333', letterSpacing: '1px', textAlign: 'center', marginBottom: '12px', textTransform: 'uppercase' }}>Delete "{selectedSubtechnique}"?</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handleDeleteSub} style={{ flex: 1, background: '#6b0000', border: 'none', borderRadius: '10px', color: '#fff', fontFamily: 'Barlow Condensed, sans-serif', fontSize: '14px', fontWeight: '700', letterSpacing: '2px', padding: '14px', cursor: 'pointer' }}>CONFIRM DELETE</button>
                <button onClick={() => setConfirmDelete(false)} style={{ flex: 1, background: 'none', border: '1px solid #222', borderRadius: '10px', color: '#555', fontFamily: 'Barlow, sans-serif', fontSize: '12px', letterSpacing: '1px', padding: '14px', cursor: 'pointer' }}>CANCEL</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setConfirmDelete(true)} style={{ background: 'none', border: 'none', color: '#333', fontFamily: 'Barlow, sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', display: 'block', margin: '0 auto', padding: '8px' }}>
              Delete subcategory
            </button>
          )}
        </div>
      )}
    </div></div>
  );
}
