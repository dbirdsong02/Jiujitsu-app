import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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

async function addPosition() {
  const docRef = doc(db, `users/${UID}/settings/techniqueTree`);
  const snap = await getDoc(docRef);
  const tree = snap.exists() ? snap.data().tree : {};
  
  if (!tree['Upper Body Subs']) {
    tree['Upper Body Subs'] = ['Guillotine', 'Darce', 'Anaconda', 'Arm Triangle', 'Rear Naked Choke', 'North South Choke', 'Other'];
    await setDoc(docRef, { tree });
    console.log('Added Upper Body Subs');
  } else {
    console.log('Already exists');
  }
  process.exit(0);
}

addPosition().catch(err => { console.error(err); process.exit(1); });
