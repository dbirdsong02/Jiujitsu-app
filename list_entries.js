import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

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

async function list() {
  const q = query(collection(db, `users/${UID}/logs`), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  const entries = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  console.log(JSON.stringify(entries, null, 2));
  process.exit(0);
}

list().catch(err => { console.error(err); process.exit(1); });
