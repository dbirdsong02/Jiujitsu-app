import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAyTP1vWbWI713E0ise_opmy__7n_3sLSc",
  authDomain: "bjj-journal-80c09.firebaseapp.com",
  projectId: "bjj-journal-80c09",
  storageBucket: "bjj-journal-80c09.firebasestorage.app",
  messagingSenderId: "463750420966",
  appId: "1:463750420966:web:7104984b4336b2ec465e27"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const UID = 'N49NTTNuEVOxzo79QyrYvGjtei02';

async function check() {
  const snap = await getDocs(collection(db, `users/${UID}/logs`));
  const entries = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  console.log(`Total entries: ${entries.length}`);
  
  const seen = {};
  const dupes = [];
  for (const e of entries) {
    const key = `${e.title?.trim().toLowerCase()}|${e.date || ''}`;
    if (seen[key]) {
      dupes.push({ title: e.title, date: e.date, keepId: seen[key], deleteId: e.id });
    } else {
      seen[key] = e.id;
    }
  }
  
  if (dupes.length === 0) {
    console.log('No duplicates found.');
  } else {
    console.log(`\nFound ${dupes.length} duplicates:`);
    dupes.forEach(d => console.log(`  - "${d.title}" (${d.date}) → delete: ${d.deleteId}`));
  }
  process.exit(0);
}

check().catch(err => { console.error(err); process.exit(1); });
