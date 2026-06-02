import { initializeApp } from 'firebase/app';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

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

const toDelete = [
  'XeGk66G7SMEkmTdG0DHE',
  'g3bXdCU7Np3GVoww7wQT',
  'kr6XaY4oAtHlvUdZ5UAs',
  'lUwMRchyGveuDZCGQFsk',
  'mw2ZfjD8qypNoC7AfQIo',
  'o0hE93eztLi57XKwa89E',
  'onvwkOXy7a2TrBtwhxdK',
  'qHn3voHYKwG6oADvgDpG',
  'qawshmTxgz6YI7V5hriB',
  'rEiuaR9gt2T6WXZTcVEH',
  'sfHvq6Rm7S0xai2JbBVk',
  'vdWI9xoXwI6Wu3SDFP8E',
  'wOpafoU8kvYf8i0VaSQ7',
  'wdPImThUKo575apvCvXA',
  'xwGoeGSwsZE2hJvRyvj9',
  'zArNhocsrwPqR6SvhJOW',
];

async function run() {
  for (const id of toDelete) {
    await deleteDoc(doc(db, `users/${UID}/logs`, id));
    console.log(`Deleted: ${id}`);
  }
  console.log(`Done. Deleted ${toDelete.length} duplicates.`);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
