import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';

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
const log = (msg) => console.log(msg);

async function run() {

  // ============================================================
  // STEP 1 - DELETE DUPLICATES
  // ============================================================

  // Arm Drag to Inside Trip - keep reOb1N8Aoh1ENvzViPcf, delete rest
  const armDragDups = ['pmpWic1LYO2ZBghiz0gz','iWahmO6hccHaxugLxTdM','5qf40SbBTgYIzWZ8bu2u','4djVtI71Sijmnb5Iiua7'];
  for (const id of armDragDups) { await deleteDoc(doc(db, `users/${UID}/logs`, id)); log(`Deleted dup: ${id}`); }

  // O Soto Gari - keep vgzK0jkgZKQFYLH9WMn5, delete rest
  const oSotoDups = ['dDtEItDXPXALnt5Y1c2W','IA5t9hYbjEWaTEeR6eFF','Fz1BcrzZoQlSboaCOIeE','5OJx5jBquBof8cP00hJw'];
  for (const id of oSotoDups) { await deleteDoc(doc(db, `users/${UID}/logs`, id)); log(`Deleted dup: ${id}`); }

  // Side Control Kimura - keep zArNhocsrwPqR6SvhJOW, delete rest
  const kimuraDups = ['h7a1QhH2WDtPHIMviHHw','aB0vMwF2RjjC7E7jbCRq','ZzYJDK14owqdw59zsHOk','O2yd69Ax7Ol8cNJHmWcm'];
  for (const id of kimuraDups) { await deleteDoc(doc(db, `users/${UID}/logs`, id)); log(`Deleted dup: ${id}`); }

  // Gordon Ryan Butterfly Sweep - keep hhbcif1lUEt6hYnilkZp, delete rest
  const grDups = ['eKH7HWksrczFZ9F0jq6R','bWoAfdRGWaxIkSLrVYwO','AbzTUQZGhvs4y08oJ7rY','AWHduarkeFBsmUnCsLef'];
  for (const id of grDups) { await deleteDoc(doc(db, `users/${UID}/logs`, id)); log(`Deleted dup: ${id}`); }

  // Superman Pass - keep kr6XaY4oAtHlvUdZ5UAs, delete rest
  const supermanDups = ['amnruvAnTEWL4EHaKdrb','WOx0bL6nQRppYLhXkKV4','RE4uAvIPfMn1zubUfjjl','DNcsk9IkRl7vdRdzouSJ'];
  for (const id of supermanDups) { await deleteDoc(doc(db, `users/${UID}/logs`, id)); log(`Deleted dup: ${id}`); }

  // Outside Open Guard Passing - keep qawshmTxgz6YI7V5hriB, delete rest
  const oopDups = ['YVW16Ctv50ZhFwrvpJrj','GyIzOxAFIER1jMAakfMS','2zbb2qkjmGOjH4mlYZWZ','1YiRHi6wvCGbq9ZIb7Q8'];
  for (const id of oopDups) { await deleteDoc(doc(db, `users/${UID}/logs`, id)); log(`Deleted dup: ${id}`); }

  // Straight Ankle Lock from Mod Butterfly - keep pEDmmQ37Woa6EAUvKVKb, delete rest
  const salDups = ['izPaXzdL6dRAdh1VXcYX','IyiGDm8bOABjH4d4HsG7','E29emC68yhVCgkapmaVc'];
  for (const id of salDups) { await deleteDoc(doc(db, `users/${UID}/logs`, id)); log(`Deleted dup: ${id}`); }

  // Lockdown Half Guard - keep qHn3voHYKwG6oADvgDpG, delete rest
  const lockdownDups = ['Q5lkKoIPT3L5JdzKA2JU','Nhy577ArR18Y8k4wpBm4','G2lO82aEWR1hmQFPbptA','99Si5GuCIAyYtswJn34Y'];
  for (const id of lockdownDups) { await deleteDoc(doc(db, `users/${UID}/logs`, id)); log(`Deleted dup: ${id}`); }

  // Knee Bar from Knee Slide - keep sfHvq6Rm7S0xai2JbBVk, delete rest
  const kneeDups = ['pPKQJhL3ajSuxGo0pvvu','dY1t05LoOkPw4wQS57X6','YgaJxpHyn50D9yYsgqDL','1m7RL39g5OAinluf9fez'];
  for (const id of kneeDups) { await deleteDoc(doc(db, `users/${UID}/logs`, id)); log(`Deleted dup: ${id}`); }

  log('\n✓ Step 1 duplicates deleted\n');

  // ============================================================
  // STEP 1 - FIX CATEGORIES
  // ============================================================

  // High Guard Attacks → Closed Guard
  await updateDoc(doc(db, `users/${UID}/logs`, 'wMRBiumPbnZZKTVCktKB'), {
    technique: 'Closed Guard', tags: ['Closed Guard']
  });
  log('Fixed: High Guard Attacks → Closed Guard');

  // Side Control Kimura → Side Control
  await updateDoc(doc(db, `users/${UID}/logs`, 'zArNhocsrwPqR6SvhJOW'), {
    technique: 'Side Control', tags: ['Side Control']
  });
  log('Fixed: Side Control Kimura → Side Control');

  // Judo Trips entries → Judo
  // O Soto Gari
  await updateDoc(doc(db, `users/${UID}/logs`, 'vgzK0jkgZKQFYLH9WMn5'), {
    technique: 'Judo', tags: ['Judo'], subtechnique: 'Other'
  });
  log('Fixed: O Soto Gari → Judo');

  // Arm Drag to Inside Trip
  await updateDoc(doc(db, `users/${UID}/logs`, 'reOb1N8Aoh1ENvzViPcf'), {
    technique: 'Judo', tags: ['Judo'], subtechnique: 'Other'
  });
  log('Fixed: Arm Drag to Inside Trip → Judo');

  // Gordon Ryan Butterfly Sweep → Open Guard / Butterfly
  await updateDoc(doc(db, `users/${UID}/logs`, 'hhbcif1lUEt6hYnilkZp'), {
    technique: 'Open Guard', tags: ['Open Guard', 'Butterfly'], subtechnique: 'Butterfly'
  });
  log('Fixed: Gordon Ryan Butterfly Sweep → Open Guard/Butterfly');

  // Armbar when stacked → Closed Guard
  await updateDoc(doc(db, `users/${UID}/logs`, 'KzNqTDxopYmihYaUKyuv'), {
    technique: 'Closed Guard', tags: ['Closed Guard', 'Armbar']
  });
  log('Fixed: Armbar when stacked → Closed Guard');

  // Lockdown Half Guard → Half Guard
  await updateDoc(doc(db, `users/${UID}/logs`, 'qHn3voHYKwG6oADvgDpG'), {
    technique: 'Half Guard', tags: ['Half Guard'], subtechnique: 'Other'
  });
  log('Fixed: Lockdown Half Guard → Half Guard');

  log('\n✓ Step 1 category fixes done\n');

  // ============================================================
  // STEP 2 - ASSIGN SUBCATEGORIES AND TAGS
  // ============================================================

  // Superman Pass → Passing / Outside Passing
  await updateDoc(doc(db, `users/${UID}/logs`, 'kr6XaY4oAtHlvUdZ5UAs'), {
    tags: ['Passing', 'Outside Passing'], subtechnique: 'Outside Passing'
  });
  log('Fixed: Superman Pass → Outside Passing');

  // Knee Bar from Knee Slide → Leg Locks / Knee Bar
  await updateDoc(doc(db, `users/${UID}/logs`, 'sfHvq6Rm7S0xai2JbBVk'), {
    tags: ['Leg Locks', 'Knee Bar'], subtechnique: 'Knee Bar'
  });
  log('Fixed: Knee Bar → Leg Locks/Knee Bar');

  // Mount Arm Triangle → Mount / Other
  await updateDoc(doc(db, `users/${UID}/logs`, 'o0hE93eztLi57XKwa89E'), {
    tags: ['Mount'], subtechnique: 'Other'
  });
  log('Fixed: Mount Arm Triangle → Mount/Other');

  // Outside Open Guard Passing → Passing / Outside Passing
  await updateDoc(doc(db, `users/${UID}/logs`, 'qawshmTxgz6YI7V5hriB'), {
    tags: ['Passing', 'Outside Passing'], subtechnique: 'Outside Passing'
  });
  log('Fixed: Outside Open Guard Passing → Outside Passing');

  // Uchi Mata → Judo / Other
  await updateDoc(doc(db, `users/${UID}/logs`, '73JmNnTYyfrdVN3bp4nN'), {
    subtechnique: 'Other'
  });
  log('Fixed: Uchi Mata → Judo/Other');

  // K Guard → Open Guard / Other
  await updateDoc(doc(db, `users/${UID}/logs`, 'pJ1mRBvkPh9fIYORrt5L'), {
    subtechnique: 'Other'
  });
  log('Fixed: K Guard → Open Guard/Other');

  // Butterfly Sumi Gashi → Half Guard / Other
  await updateDoc(doc(db, `users/${UID}/logs`, 'J3n6UIKuf4qwDzfMKI9T'), {
    subtechnique: 'Other'
  });
  log('Fixed: Butterfly Sumi Gashi → Half Guard/Other');

  // Power Half Nelson → Back / Other
  await updateDoc(doc(db, `users/${UID}/logs`, 'gkSyetRkeC4QExC759nc'), {
    subtechnique: 'Other'
  });
  log('Fixed: Power Half Nelson → Back/Other');

  // Inside Grips Snapdown → Wrestling / Other
  await updateDoc(doc(db, `users/${UID}/logs`, '7MVMLt88I6k2Yzq42DA5'), {
    subtechnique: 'Other'
  });
  log('Fixed: Inside Grips Snapdown → Wrestling/Other');

  log('\n✓ Step 2 done\n');

  // ============================================================
  // UPDATE TECHNIQUE TREE - add Butterfly Guard + Knee Bar sub to Leg Locks
  // ============================================================
  const treeRef = doc(db, `users/${UID}/settings/techniqueTree`);
  const treeSnap = await getDoc(treeRef);
  const tree = treeSnap.exists() ? treeSnap.data().tree : {};

  // Add Butterfly Guard position
  if (!tree['Butterfly Guard']) {
    tree['Butterfly Guard'] = ['Sweeps', 'Attacks', 'Other'];
  }

  // Add Knee Bar to Leg Locks subcategories
  if (tree['Leg Locks'] && !tree['Leg Locks'].includes('Knee Bar')) {
    tree['Leg Locks'].push('Knee Bar');
  }

  // Remove Judo Trips if it exists as a position
  delete tree['Judo Trips'];

  await setDoc(treeRef, { tree });
  log('✓ Technique tree updated: added Butterfly Guard, Knee Bar, removed Judo Trips\n');

  log('ALL DONE.');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
