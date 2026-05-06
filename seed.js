import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

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

const USER_ID = 'N49NTTNuEVOxzo79QyrYvGjtei02';

const entries = [
  {
    title: "Outside Open Guard Passing",
    date: "2026-04-02",
    technique: "Passing",
    notes: `Date: April 2 | Instructor: Andrew | Location: Home Gym

GOAL: Break the DLR hook and immediately pass.

DE LA RIVA DEFENSE & PASS:
- Small step back with rear foot — stay facing opponent, don't turn sideways
- Straighten and flare front knee to kill the DLR hook
- Don't step too far back — risk of back take or trip

Option 1 — Smash Pass:
- Stuff the close leg down toward smash side
- Drive through with pressure to mount

Option 2 — Elvis Hips:
- Fake the stuff, pull leg to the sky
- Duck hips underneath, rotate opposite direction from smash pass

SHIN TO SHIN PASS TO LEG LOCK ENTRY:
- Headquarters-style grips: one hand on ankle, one on shin
- Get shin to shin contact, stuffing their close leg
- Left hand grips ankle — positioned to push down or pull up
- Pass to the outside, turn to face the leg

Leg Lock Entry:
- Slide left knee around (knee on belly style)
- Windshield wiper slowly across — pinch and maintain pressure throughout
- No big motions — fall into figure four knee control

Heel Hook Finish:
- Stay pointed to ceiling — don't turn into ground
- Clamp shoulder onto toes, secure heel hook at the wrist
- Slow bridge and turn over right shoulder to finish`,
    createdAt: Timestamp.fromDate(new Date('2026-04-02'))
  },
  {
    title: "Mount Arm Triangle Attack",
    date: "2026-04-10",
    technique: "Mount",
    notes: `GOAL: Flatten opponent in mount and use spine bending combined with arm isolation to set up and finish an arm triangle submission.

SETUP:
- From mount, sprawl hips to ground and lift opponent's feet to flatten them completely
- Cross face and grip their shoulder, pulling to bend spine as far back as possible
- Crawl hand up the mat under their right arm, forcing it across their face
- Keep other arm under their neck, maintaining shoulder grip to sustain spine bend
- Spine bend creates space to slide arm under trapped elbow

FINISHING MECHANICS:
- Punch arm deep under their neck, closing space as much as possible
- Feed their arm across their neck under the chin — not across the face
- If resistance: establish gable grip, drive back-down-forward with shoulder and head repeatedly
- Push across and repeat — choke tightens progressively
- Maintain tight cross face control entire time`,
    createdAt: Timestamp.fromDate(new Date('2026-04-10'))
  },
  {
    title: "Knee Bar from Knee Slide Entry",
    date: "2026-04-15",
    technique: "Leg Locks",
    notes: `GOAL: Use same knee-across-stomach entry as shin to shin leg lock, but attack opposite leg with knee bar.

ENTRY:
- Same initiating entry — slide knee across the stomach
- Target is opposite leg from heel hook
- Requires a back step to reposition

Back step options:
- Back step into mount triangle
- Back step into side control facing the hips

NOTE: Details incomplete — revisit and drill to flesh out finish mechanics.`,
    createdAt: Timestamp.fromDate(new Date('2026-04-15'))
  },
  {
    title: "Straight Ankle Lock from Modified Butterfly Position",
    date: "2026-04-17",
    technique: "Leg Locks",
    notes: `GOAL: Finish straight ankle lock using butterfly hook variation instead of standard single leg X.

SETUP:
- Take outside foot from hip, bring it inside to butterfly hook
- Other foot stays on the hip
- One butterfly hook, one foot on hip
- Finish straight ankle lock from this position

NOTE: Details incomplete — add finish mechanics when drilled more.`,
    createdAt: Timestamp.fromDate(new Date('2026-04-17'))
  },
  {
    title: "Superman Pass",
    date: "2026-04-20",
    technique: "Passing",
    notes: `NOTE: No details captured yet. Incomplete — add mechanics when remembered.`,
    createdAt: Timestamp.fromDate(new Date('2026-04-20'))
  },
  {
    title: "Gordon Ryan Butterfly Sweep — Signature Shoulder Crunch",
    date: "2026-04-30",
    technique: "Guard",
    notes: `Date: April 30 | Source: YouTube

GOAL: Off-balance opponent from bottom butterfly guard and sweep to mount using shoulder crunch to block their post.

SETUP (sweeping to the right):
- Start with left collar tie, right underhook
- Insert butterfly hook on sweep side
- Push and pull to overextend and destabilize their base

TRANSITION TO SHOULDER CRUNCH:
- Switch left collar tie to shoulder crunch on same side as sweep
- Establish gable grip over their head, crunching down on the shoulder
- Keep gable grip high and tight — blocks their post arm

SWEEP EXECUTION:
- Pull them forward over you to load their weight
- Left side: drive butterfly hook up to elevate
- Right side: post on their hip
- Swipe their knee through mid-air with your knee while elevating with butterfly hook
- Land in mount`,
    createdAt: Timestamp.fromDate(new Date('2026-04-30'))
  },
  {
    title: "Arm Drag to Inside Trip Takedown",
    date: "2026-05-02",
    technique: "Judo Trips",
    notes: `Date: May 2 | Source: Judo Flow (YouTube)

GOAL: Use arm drag to break posture and off-balance opponent into a takedown via inside trip.

ARM DRAG SETUP:
- Same side wrist grip on their arm
- Cross arm does the drag
- Pull them down and into you as you drag

TAKEDOWN EXECUTION:
- Drop to opposite knee from drag side as you pull them down
- Inside trip on same side leg you're dragging — hook back of their foot with inside of your knee
- Their momentum carries them backward

LANDING:
- They fall back into top half guard typically
- Or disengage and stand up`,
    createdAt: Timestamp.fromDate(new Date('2026-05-02'))
  },
  {
    title: "Side Control Kimura Grip Control",
    date: "2026-05-02",
    technique: "Back Control",
    notes: `Date: May 2 | Source: Gordon Ryan vs Philip Rowe (YouTube)

GOAL: Establish and maintain dominant control from side control using behind-the-back Kimura grip to immobilize the far arm.

GRIP ESTABLISHMENT:
- From side control, immediately attack the far arm (cross side arm)
- Bottom hand gets initial Kimura grip on far wrist
- Transfer to upper (head side) hand — holding wrist control from behind their back
- Use two-on-one to secure first, then transition to single behind-the-back Kimura grip

CONTROL & PRESSURE:
- Once grip established, put weight on their face
- Stay heavy across their centerline
- Use grip to restrict movement and transition to dominant positions

KEY CONCEPT:
- Behind-the-back Kimura grip neutralizes far arm completely, making escapes and frames much harder`,
    createdAt: Timestamp.fromDate(new Date('2026-05-02'))
  },
  {
    title: "O Soto Gari — Major Outer Reap",
    date: "2026-05-02",
    technique: "Judo Trips",
    notes: `Date: May 2 | Source: Drilling

GOAL: Get parallel and hip to hip with opponent, load their weight onto target leg, and reap it out from behind while driving upper body backward.

SETUP AND OFF-BALANCE (Kuzushi):
- Establish upper body control — sleeve and collar or equivalent no-gi grips
- Pull them slightly forward then snap to side to load weight onto target leg
- Step lead foot level with or past their lead foot — depth is critical

ENTRY (Tsukuri):
- Get hip to hip, parallel to opponent
- Right leg steps past and behind their right leg
- Drive chin down on entry, stay chest to chest throughout

REAP (Kake):
- Reap with full leg — calf is the sweet spot, not heel or high on thigh
- Drive leg upward and back while driving their upper body down and backward — push-pull
- Stay chest to chest to control landing

LANDING:
- They go flat on their back
- Land in side control

KEY DETAIL:
- Reap is a full leg sweeping motion, not just a foot hook
- Power comes from hip driving forward while upper body pulls them back`,
    createdAt: Timestamp.fromDate(new Date('2026-05-02'))
  },
  {
    title: "Lockdown Half Guard Attacks",
    date: "2026-04-15",
    technique: "Guard",
    notes: `Date: Mid-April | Location: Chicago Drop-In

GOAL: Use lockdown from bottom half guard to off-balance opponent and transition to leg entanglements or wrestling scrambles.

SETUP:
- Opponent has you in bottom half guard with lockdown
- Post hands in their armpits — functioning as underhooks, elevating them up and over your body
- Pull them over one shoulder to break their base

TRANSITION:
- Get to rear outside leg position or 50/50
- Wrestle up from there

NOTE: Largely unexplored — details incomplete, mechanics fuzzy. Revisit when drilled more.`,
    createdAt: Timestamp.fromDate(new Date('2026-04-15'))
  },
  {
    title: "Improvement Notes — Open Mat",
    date: "2026-05-03",
    technique: "Other",
    notes: `Date: May 3 — Open Mat

D'ARCE CHOKE MECHANICS:
- Not getting taps despite feeling locked in — both short and deep variations (tricep and bicep entries)
- Need to tighten finish mechanics
- Flag for Andrew or drill specifically next class

HEAD POSITION STANDING:
- Getting front headlocked too often
- Need to stay more upright for judo-based standing game
- Front headlock to turtle to D'Arce from bottom is a chain reaction
- Fix starts standing: don't give up the head

OMOPLATA:
- Finding it more consistently due to better guard posture and K Guard investment
- Losing it before finishing — not off-balancing enough before clamping
- Focus: off-balance first, then clamp and finish
- Highlight: entry is there, just need to convert`,
    createdAt: Timestamp.fromDate(new Date('2026-05-03'))
  }
];

async function seed() {
  console.log('Inserting entries...');
  for (const entry of entries) {
    await addDoc(collection(db, `users/${USER_ID}/logs`), entry);
    console.log('Added:', entry.title);
  }
  console.log('Done! All entries inserted.');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });