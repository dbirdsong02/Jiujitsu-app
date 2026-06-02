import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

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
const OLD_UID = 'N49NTTNuEVOxzo79QyrYvGjt6Vk1';
const NEW_UID = 'N49NTTNuEVOxzo79QyrYvGjtei02';

async function migrate() {
  const snap = await getDocs(collection(db, `users/${OLD_UID}/logs`));
  console.log(`Found ${snap.docs.length} entries in old UID`);
  
  for (const d of snap.docs) {
    const data = d.data();
    // Remove the old createdAt so serverTimestamp creates a new one
    delete data.createdAt;
    await addDoc(collection(db, `users/${NEW_UID}/logs`), {
      ...data,
      createdAt: serverTimestamp(),
      migratedFrom: OLD_UID
    });
    console.log(`Migrated: ${data.title}`);
  }
  
  console.log('Migration complete.');
  process.exit(0);
}

migrate().catch(err => { console.error(err); process.exit(1); });
