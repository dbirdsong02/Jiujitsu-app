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
const UID = 'N49NTTNuEVOxzo79QyrYvGjt6Vk1';

const entries = [
  {
    title: "* JD Arm Bar Vol 1 - Elbow Off Centerline",
    date: "", technique: "Submissions", subtechnique: "Arm Locks",
    notes: `GOAL: Remove opponent's elbow from the centerline to set up arm bar from side control or back.

SETUP / ENTRY:
- From side control / chest to chest position
- From back control

KEY DETAILS / COACHING NOTES:
- Primary goal in both positions: get the elbow off the centerline
- This is the prerequisite to finishing the arm bar

DB NOTES:
- JD instructional Vol 1 reference. Sparse notes - revisit and flesh out when drilled.`
  },
  {
    title: "* 4/30 Luke K Guard - Entry from Closed Guard",
    date: "2026-04-30", technique: "Open Guard", subtechnique: "Single Leg X / K Guard",
    notes: `GOAL: Enter K guard from closed guard by inverting and entering leg entanglement.

SETUP / ENTRY:
- Start in closed guard
- Shoot right arm through legs to hook one leg, connect hands with gable grip
- While breaking guard and inverting: same side foot posts on hip, open foot shields and kicks over to match other foot
- Opponent should be over you with knee closed on the floor

ATTACKS / SWEEPS:
1. Backside 50/50
- Pummel left leg over/around opponent's already-controlled leg
- Keep knees tight, pummel left leg under for figure 4 / modified figure 4
- Enter inside heel hook

2. Switch to X guard

KEY DETAILS / COACHING NOTES:
- Pull hips and off-balance opponent with feet throughout
- Opponent's knee must be closed on the floor before attacking

DB NOTES:
- Entry timing and inversion mechanics need more reps.`
  },
  {
    title: "* Match #5 - Leo Valentine - Semi Final",
    date: "2026-04-19", technique: "Other", subtechnique: "Comp Notes",
    notes: `GOAL: Competition match review - Semi Final vs Leo Valentine.

STANDING:
- Overall good - keep hands inside and active

PASSING - GOOD:
- 34sec - stuffing feet and stepping over
- Heavy crossface, pressure from top half (happened multiple times)

WORK ON:
- Mount and side control retention
- 3:20 sweep - overextending on tripod pass at 1:18 and getting swept
- Side control head placement
- Lockdown passing from top half - drill
- Side control - neon belly - mount mechanics chain
- Gameplan at 2:39

GUARD:
- Not much time in guard but good recovery at 3:27

BACK ATTACKS - WORK ON:
- 4:10 - get higher on back once kimura grip established
- High hips and hooks, stay on top
- Arm bar hand placement / elbow control mechanics

DB NOTES:
- Review flagged video timestamps. Side control retention after passing is the main gap.`
  },
  {
    title: "* Match #4 - Joseph Johnson - Win by Wristlock",
    date: "2026-04-19", technique: "Other", subtechnique: "Comp Notes",
    notes: `GOAL: Competition match review - Match #4 vs Joseph Johnson, finished by wristlock.

STANDING - GOOD:
- Strong collar tie, ankle pick, trips

PASSING - WORK ON:
- Hand placement idle / touching mat / inactive at times

PASSING - GOOD:
- Single leg defense, stripping foot, stepping over leg
- Backstep (still want to drill more)
- More active hands/grips and heavy hips

FINISHING - WORK ON:
- Both triangles from back - reverse triangle and torture chamber, switching between and threatening
- Staying HIGH on back with kimura grip
- Mounted triangle arm bar mechanics

DB NOTES:
- Hand activity when passing is the recurring issue. Hands must be gripping or framing at all times.`
  },
  {
    title: "* Match #3 - Sergio Lopez - Win by Points",
    date: "2026-04-19", technique: "Other", subtechnique: "Comp Notes",
    notes: `GOAL: Competition match review - Match #3 vs Sergio Lopez, win by points.

STANDUP:
- Good underhooks
- Work on committing to inside trip

PASSING - GOOD:
- Outside passing, threatening outside speed pass
- Getting to HQ and other familiar positions

PASSING - WORK ON:
- Maintaining side control / blocking inside knee
- Opponent recovering guard or stiff-arming to hips
- Finishing backstep/pass
- NOT putting hands on ground
- More active grips/posts on knee/shin/hips

FINISHING - WORK ON:
- Punch/Ezekiel choke finishing mechanic
- Scrambly kimura grip from back - gain control, stay high, get hooks

DB NOTES:
- Win but left points on table. Losing side control and not finishing from back are key gaps.`
  },
  {
    title: "* 4/4 Shin on Shin Passing - Phil Class - Backstep Variations",
    date: "2026-04-04", technique: "Passing", subtechnique: "Outside Passing",
    notes: `GOAL: Use shin-on-shin to backstep into mounted triangle, hip-facing side control, or knee bar.

SETUP / ENTRY:
- Builds on 4/3 shin-on-shin entry mechanics
- Make shin/ankle grips as before
- Non-contact shin comes from outside to connect with passing side hip

EXECUTION:
1. Make shin/ankle grips
2. Non-contact shin connects with passing side hip from outside
3. Shin-on-shin with backstep - either:
   - Big backstep - modified mount / mounted triangle entries
   - Backstep - hip-facing side control

VARIATION - Knee Bar:
- Goes to opposite (non-passing) leg for knee bar
- If passing left side, right arm hooks and falls into kneebar on that side
- Need to refresh exact mechanics

DB NOTES:
- New technique, still developing. Knee bar variation mechanics incomplete - revisit when drilled more.`
  },
  {
    title: "* 4/3 Shin to Shin Passing - Inside Heel Hook Entry",
    date: "2026-04-03", technique: "Passing", subtechnique: "Outside Passing",
    notes: `GOAL: Control opponent's outside leg from shin-to-shin to enter inside heel hook.

SETUP / ENTRY:
- Maintain ankle/shin grips throughout
- Turn body to face the shin-on-shin contact

EXECUTION:
- Slide open/outside knee across opponent's stomach
- Pinch down on their leg with both thighs
- KEY: maintain knee control throughout
- Slowly raise left knee while pinching
- Windshield wiper leg over to figure 4 position

FINISH:
- Stay facing ceiling - do not turn away to finish
- Clamp toes with armpit
- Gable grip at wrist (boney part) for inside heel hook

KEY DETAILS / COACHING NOTES:
- Windshield wiper must be slow and controlled
- Pinching with thighs is the key to maintaining control during transition

DB NOTES:
- Knee control during windshield wiper is the critical detail. Practice slow.`
  },
  {
    title: "* 2/24 Half Guard - Coyote Guard / Overhook Sweeps",
    date: "2026-02-24", technique: "Half Guard", subtechnique: "Sweeps/Reversals",
    notes: `GOAL: Distance and posture control from bottom half using overhook to set up sweeps.

SETUP / ENTRY:
- Bottom half guard, variation on coyote guard
- Establish overhook

EXECUTION:
1. Overhook - shoot arm up for underhook on opponent's shoulder, drive down to break posture
2. Shrimp away and REPLACE with butterfly hook (same side as overhook)
3. Maintain overhook and control their posting arm with open hand
4. Pull their posting hand under you and sweep to that side using butterfly hook

VARIATION A - Scissor Sweep:
- No butterfly hook, post knee shield
- Trap posting arm and kick their posting knee through to roll them

VARIATION B - High Guard:
- Get to high guard
- Turn overhook to arm drag while posture is broken to take back
- OR drive posture down with high top leg/knee and shoot inverted armbar

DB NOTES:
- Multiple paths from overhook - drill each option separately.`
  },
  {
    title: "* 3/6 Training Focus and Curiosity List",
    date: "2026-03-06", technique: "Other", subtechnique: "Improvement Notes",
    notes: `GOAL: Training focus areas and techniques to explore and implement.

CURIOUS ABOUT:
- Overhook attacks from bottom half / standing
- Other Russian tie takedowns
- Leg locks and entries - legal at white belt
- Kneebars
- Darce bars

TO PRACTICE AND IMPLEMENT:
- Mounted triangle
- Butterfly / half butterfly guard
- Shoulder crunches
- Half butterfly sweeps
- Ghost escapes
- Ankle picks
- Uchi Mata

DB NOTES:
- Use as a reference checklist for class questions and drilling priorities.`
  },
  {
    title: "* 3/6 Russian Tie",
    date: "2026-03-06", technique: "Wrestling", subtechnique: "Clinch Work",
    notes: `GOAL: Establish Russian tie (2-on-1) to control opponent's arm and attack takedowns.

SETUP / ENTRY:
1. Control opponent's wrist (across-side) - hand facing opposite direction from theirs
2. Control above the elbow with free hand - higher the better
3. Use two points of control to get to their side
4. Top of head drives into their neck - single leg style head mechanics

ATTACKS:
- Foot sweeps
- Uchi Matas
- Key grip / weave grip - plant their shoulder to ground

KEY DETAILS / COACHING NOTES:
- Two points of control (wrist and above elbow) required to get to their side
- Head position into neck is critical for positioning

DB NOTES:
- Entry and grip establishment need reps. Explore foot sweep and uchi mata from here.`
  },
  {
    title: "* 2/6 Leg Locks Vol 1 - CJ - Single Leg X Fundamentals",
    date: "2026-02-06", technique: "Leg Locks", subtechnique: "Ashi Garami / Entries",
    notes: `GOAL: Establish single leg X to control opponent's knee and attack heel hook or transition to saddle.

CONCEPT:
- Offensively and defensively advantageous to keep legs INSIDE opponent's - when passing and guarding

SETUP / ENTRY - Single Leg X:
- Control their knee
- Hip foot as deep in as possible
- Opposite foot butterfly hooking other leg

IF OPPONENT ROLLS AWAY:
- Heel is exposed for heel hook

TRANSITION TO HEEL HOOK:
- Switch feet to half-body triangle / figure 4 leg position
- Note: not locking figure 4, body triangle on shin

FINISHING GRIPS:
- Gable grip or butterfly grips

ALL THE WHILE:
- Pinch knees, expose heel, stay flat on back
- Create bend in their leg, move upper body

DB NOTES:
- CJ instructional reference. Figure 4 vs body triangle distinction is key.`
  },
  {
    title: "* 3/27 Training Session - Attacking Chains",
    date: "2026-03-27", technique: "Other", subtechnique: "Concepts",
    notes: `GOAL: Session notes - attacking chains and positional transitions to drill.

CHAINS TO WORK:
- Closed guard - high guard / back takes
- Russian / 2-on-1 - double ankle pick - uchi mata - duck under to back - suicide throws
- Front head lock - anaconda roll
- Top side control - take space at side - attacks: arm bar, mounted triangle, north-south kimura grip

DB NOTES:
- Drill these as connected chains, not isolated techniques.`
  },
  {
    title: "* 4/1 Stiff Arm Escapes from Bottom Side Control",
    date: "2026-04-01", technique: "Side Control", subtechnique: "Side Control Escapes",
    notes: `GOAL: Escape from bottom side control using stiff arm frames, sit-up escape, and crossface transition.

ESCAPE 1 - Stiff Arm Roll:
- Turn body onto side away from opponent's top side control
- Contract abs, straighten legs and arms
- Top arm reaches over opponent's back, bottom arm stiff arms opponent's face
- Plant backside foot and sweep them the way you're facing

ESCAPE 2 - Sit-Up Escape (Kesa Gatame):
- Three grip options: opposite hand in armpit, controlling inside elbow, controlling wrist
- While other arm gets to elbow
- Shrimp out, scramble to recover guard

ESCAPE 3 - Transition Stiff Arm (against crossface):
- As opponent goes to crossface, opposite arm posts on their opposite armpit
- Get to your elbow on other arm
- Shrimp / recover guard

DB NOTES:
- Still experimenting with grip variations on escape 2. Three options need more reps to find preferred one.`
  },
  {
    title: "* 4/2 Playing With - Sumi Gaeshi, Darce, Shin on Shin",
    date: "2026-04-02", technique: "Other", subtechnique: "Concepts",
    notes: `GOAL: Exploration session - sumi gaeshi from butterfly, octopus counter, short darce, sasai, uchi mata.

PLAYING WITH:
- Sumi gaeshi from butterfly guard
- Top octopus counter to opponent building up to elbow
- Short darce from half guard

STANDING:
- Sasai from both sides, switching feet to trip other side
- Uchi mata ankle pick

NOTE:
- Shin on shin passing referenced - see dedicated entry for mechanics

DB NOTES:
- Exploration session, no deep mechanics captured. Follow up on each concept separately.`
  },
  {
    title: "* 2/19 Luke Class - Single Leg X to MOD X to Saddle",
    date: "2026-02-19", technique: "Leg Locks", subtechnique: "Ashi Garami / Entries",
    notes: `GOAL: Transition from single leg X to modified X to saddle when opponent shoves ankle away.

EXECUTION:
1. Enter single leg X
2. When opponent shoves ankle away - kick and drive them over your head
3. Get reverse triangle hooks
   - X Guard: top foot on opponent's hip
   - Reverse X Guard: top foot NOT on hip (on back of thigh)
4. Unbalance opponent by extending legs apart
4.5. Lift up over hips (slightly inverting) and shoot bottom foot straight through/up - to figure 4
5. Enter saddle
   - Finishes: heel hook, straight ankle lock

KEY DETAILS / COACHING NOTES:
- Practice entry into single leg X - timing and positioning are key
- Distinction between X guard and reverse X guard foot placement is critical

DB NOTES:
- Note: Q - when/how exactly to enter single leg X? Practice entry specifically.`
  },
  {
    title: "* 2/19 Luke Class - Shin to Shin Sweep in Open Guard",
    date: "2026-02-19", technique: "Open Guard", subtechnique: "De La Riva",
    notes: `GOAL: Sweep opponent from open guard using shin-to-shin connection - make opponent post with hands.

SETUP:
- Open guard scenario, shin to shin
- Variation: want opponent to post with hands and follow (not sweep over head)

EXECUTION:
1. Move left foot inside so shin is ACROSS opponent's shin
2. Grip for single and butterfly sweep over right - my shin - sit back and move him over your shoulder
3. Goes to end scrambly - follow them and keep hold of leg

TO PRACTICE:
- Drill easy open guard at slow speed to practice entry
- Reps on the sweep

DB NOTES:
- Entry into shin-to-shin from open guard needs to be drilled at slow speed first.`
  },
  {
    title: "* 2/11 Half Guard Butterfly Hook - Upright Half Guard Sweep",
    date: "2026-02-11", technique: "Half Guard", subtechnique: "Sweeps/Reversals",
    notes: `GOAL: Sweep from upright/elbow half guard using butterfly hook and double butterfly hooks.

EXECUTION:
1. Same sweep as from high guard but from elbow (upright half guard)
   - Pull opponent's posting arm under me with row motion

2. Double butterfly hooks to spread out and sweep opponent
   - Grips high on back, interlocking hands
   - Prevent post by trapping arms high

3. Finding high guard (to be determined - mechanics incomplete)

DB NOTES:
- Building on half guard butterfly hook concept from previous page. High guard entry from here is TBD.`
  },
  {
    title: "* 2/11 Bottom Half Guard Escape - Butterfly Hook Insert and Sweep",
    date: "2026-02-11", technique: "Half Guard", subtechnique: "Escapes",
    notes: `GOAL: Escape from flattened bottom half guard with crossface by inserting butterfly hook and sweeping.

MAIN IDEA: Insert top-side butterfly hook and sweep.

GETTING THE BUTTERFLY HOOK:
1. Right arm frames on opponent's hip/thigh
2. Left arm raised across body to create space
3. Shrimp out
4. Replace with butterfly hook

SWEEP:
1. Post non-butterfly foot
2. Pull opponent onto/higher onto me
3. Head/shoulder to mat as you shrimp a bit more
4. Block opponent's posting arm and sweep with bridge/butterfly hook

DB NOTES:
- Small detail on step 4: block posting arm before sweeping. Explore further.`
  },
  {
    title: "* 1/23 Uchi Mata",
    date: "2026-01-23", technique: "Judo", subtechnique: "Throws",
    notes: `GOAL: Throw opponent with uchi mata using wizzer entry, arm control, and inside leg reap.

SETUP / ENTRY:
1. Wizzer opponent (standing off to their side)
2. Control opponent's opposite arm - tricep or wrist
3. Off-balance opponent and break posture
4. Take a small step forward with outside foot

EXECUTION:
- Kick inside foot back through their knee

KEY DETAILS / COACHING NOTES:
- Off-balance and posture break must happen before the reap
- Small step forward with outside foot sets up the angle

DB NOTES:
- Basic uchi mata mechanics from 1/23. Need to add more detail on timing and follow-up when drilled more.`
  },
  {
    title: "* 1/20 Dude Class - Guard Pull Armbar and Mindset",
    date: "2026-01-20", technique: "Open Guard", subtechnique: "Guard Retention",
    notes: `GOAL: Execute guard pull directly into arm bar from closed guard standing position.

MINDSET:
- Focus on 1-2 things at a time and drill them every time
- Don't be cocky and don't give an inch
- Don't have to go all out but don't give any space
- Don't allow them anything - grip STRONG, position STRONG every time

GUARD PULL TO ARMBAR (different from yesterday's entry):
1. Grip left collar with right hand (left sleeve grip)
2. Roll onto right buttcheek
3. Arm bar their right arm - left grip halfway up arm

KEY DETAILS / COACHING NOTES:
- Note: also post on other hip during guard pull for arm bar setup

DB NOTES:
- Mindset reminder is the main takeaway here. Armbar entry from guard pull needs more reps.`
  },
  {
    title: "* Standing Game - Gi - Guard Pull Options and Sweeps",
    date: "", technique: "Open Guard", subtechnique: "Guard Retention",
    notes: `GOAL: Establish guard from standing with grips, then sweep or attack triangle.

GRIPS:
- Collar grip, outside sleeve grip
- Breaking grips: 2-on-1, push out or up

GUARD PULL:
- Left leg on opponent's left hip as you rotate towards left
- Butterfly hook right leg and sit to left hip/buttcheek

OPTION 1 - Shoot Triangle:
- Leg to opponent's shoulder and shoot triangle aggressively
- Hips off the ground

OPTION 2 - Trip/Sweep Backwards:
1. Push hip and pull butterfly hook (Ageha style)
2. Grab ankle

DB NOTES:
- Gi standing game concepts. Practice breaking grips and guard pull entry.`
  },
  {
    title: "* 10/23 Turtle Attacks - Back Take and Truck",
    date: "2025-10-23", technique: "Back", subtechnique: "Taking the Back",
    notes: `GOAL: Attack from turtle position - establish hooks and enter truck position for submissions.

BACK TAKE FROM TURTLE:
1. Punch opponent's inner thigh to clear room for hooks
2. Get solid seatbelt and second hook - either before rolling or while rolling
3. Back take key details: no crossing feet - get hooks and apply outward pressure on their legs, bend knees in

TRUCK POSITION:
1. Punch inner thigh same way to clear room for first hook
2. Turn body towards opponent
3. Put same side arm over opponent's back and grab their shin
4. Hooked foot slides through their legs as you roll over shoulder
5. Foot in kimura grip - lock legs (triangle/crossed legs)

SUBMISSIONS FROM TRUCK:
- Banana split - spreads hips
- Twister - grip around their head and twist spine

DB NOTES:
- Truck position mechanics need more detail. Banana split and twister entries incomplete.`
  },
  {
    title: "* Bottom Half Guard Escape - High Guard and Back Take",
    date: "", technique: "Half Guard", subtechnique: "Escapes",
    notes: `GOAL: Escape from bottom half guard into closed guard offense, high guard, or back take.

ESCAPE TO CLOSED GUARD:
- Reach under opponent's leg to gain foot control
- Head to hip/crotch position

HIGH GUARD ATTACKS:
1. Deep collar grip - look for immediate collar choke
2. Unhook legs briefly - angle self off to collar grip side, keep high leg HIGH on back
3. Grab opponent's lat with non-collar hand
4. Slide into hooks for back take

PLAN B - Sweep:
- Plant left foot blocking opponent's knee and sweep

KEY DETAILS / COACHING NOTES:
- GO TO CLOSED GUARD OFFENSE as primary objective
- High leg must stay HIGH on their back throughout

DB NOTES:
- Back take from high guard sliding into hooks needs more reps.`
  },
  {
    title: "* Lasso Guard - Backwards Sweep",
    date: "", technique: "Open Guard", subtechnique: "Spider",
    notes: `GOAL: Sweep opponent backwards from lasso guard using foot restriction and hip pressure.

SETUP / ENTRY:
- Lasso guard established

EXECUTION - Backwards Sweep:
1. Adjust lasso foot to their hip
2. Trap their front foot with your opposite foot (non-lasso foot) - if possible, grab front heel
3. Pull and push to sweep them onto their back
4. Foot pressure on hip
5. Restrict front foot with leg and heel grip

DB NOTES:
- Lasso backward sweep - mechanics straightforward but timing of foot trap needs drilling.`
  },
  {
    title: "* High Guard - Americana, Bow and Arrow, Armbar",
    date: "", technique: "Closed Guard", subtechnique: "Submissions",
    notes: `GOAL: Attack from high guard using americana, bow and arrow, and armbar - think corner back position.

CONCEPT: Think of high guard like the corner back position.

1. AMERICANA:
- Finish more like an armbar motion
- Use hips, target opponent's shoulder, pull towards myself

2. BOW AND ARROW:
- RNC motion, high on back
- Choking arm seals for cross lapel
- Opposite arm can hook opponent's near arm

3. ARMBAR:
- Hook high arm through their near arm
- HEAD roll (face the hips)
- Set variety of leg positions to finish tight armbar

DB NOTES:
- High guard continued from previous page. Armbar head roll mechanic is the key detail.`
  },
  {
    title: "* 1/14 Green Belt - Standing Guillotine and Sumi Gaeshi",
    date: "2026-01-14", technique: "Submissions", subtechnique: "Chokes",
    notes: `GOAL: Finish standing guillotine using butterfly hook and hip sit, transitioning to sumi gaeshi sweep.

EXECUTION:
1. Butterfly hook into same side as choking arm
2. Sit down on choking arm hip
3. While opposite foot posts on hip

SUMI GAESHI VARIATION:
- Complete over-the-shoulder sweep on choking arm side

KEY DETAILS / COACHING NOTES:
- Infinite mount/darce/anaconda opportunities after sumi gaeshi landing

DB NOTES:
- Green belt milestone noted. Standing guillotine to sumi gaeshi chain - drill the sweep finish.`
  },
  {
    title: "* Side Control Bottom Escape - Frames, Bridge, Reverse Shrimp",
    date: "", technique: "Side Control", subtechnique: "Side Control Escapes",
    notes: `GOAL: Escape from bottom side control using frames to prevent crossface, then bridge and reverse shrimp.

PREVENTIVE - FRAMES:
- CJ thought: block crossface with opposite arm - keeps you on side facing opponent
- Think: sneak in posts on him / butterfly hooks
- OR reach under to coyote guard

ESCAPE SEQUENCE (separate steps, simple concepts, focus on details sequentially):
1. Bridge
2. Reverse shrimp
3. Post / square up hips / closed guard / butterfly hook

KEY DETAILS / COACHING NOTES:
- Do each step sequentially, focus on details of each before moving to next

DB NOTES:
- Bridge and reverse shrimp must be drilled as separate isolated movements first.`
  },
  {
    title: "* 1/14 Training Check-Up - Positions and Goals",
    date: "2026-01-14", technique: "Other", subtechnique: "Improvement Notes",
    notes: `GOAL: Training check-up - assess current strengths, focus positions, and future goals.

FAMILIAR / STRENGTH POSITIONS:
- Coyote guard
- Tech mount

SUBMISSIONS: Nothing currently

INTERESTED IN / FOCUS POSITIONS:
- Bottom closed guard
- High guard
- Butterfly guard
- Armbar

TO PURSUE IN FUTURE:
- Octopus guard
- X guard

DB NOTES:
- Baseline check-up from 1/14. Use as reference for tracking development over time.`
  },
  {
    title: "* 10/22 Half Guard Work - Underhook, Dogfight, Kimura",
    date: "2025-10-22", technique: "Half Guard", subtechnique: "Sweeps/Reversals",
    notes: `GOAL: Objectives from bottom half guard - create angle, enter dogfight/coyote guard, attack kimura.

EXECUTION:
1. Shoot arm up through opponent (underhook), create angle so not flattened
   - Trap leg and drive through
   - Look to grab knee or foot if they try to spread base
   - IF no wizzer available, take back

2. Get to dogfight / coyote guard
   - Can post leg and wrestle into opponent

SLIDE UNDER SWEEP:
   - Shoot opposite knee under opponent forming chest to chest while pulling them over you
   - Look to clear their leg to side control

3. Kimura:
   - Use to gain position before thinking about submission
   - Explosive up (lose the knee shield), grip without thumb
   - Put their face into mat and keep it there with kimura arm angle
   - If they defend kimura on inside leg - hip bump sweep: big feet left, bridge over right shoulder

KEY DETAILS / COACHING NOTES:
- Underhook and angle creation is the foundation of all bottom half guard attacks

DB NOTES:
- Hip bump sweep counter to kimura defense needs more detail.`
  },
  {
    title: "* 9/28 Training Session - Wrestling and Back Control",
    date: "2025-09-28", technique: "Back", subtechnique: "Maintaining Back",
    notes: `GOAL: Session notes - wrestling flowing better, back control improvement areas.

GENERAL: Wrestling starting to flow better, getting to back.

POINTS OF IMPROVEMENT:
- Getting arm triangled from half guard to mount
  - Keep elbow framed, don't default to rolling onto side
  - Shrimp and bridge instead
- Not losing seatbelt / back control - opponent's shoulder to mat
- Get knee through bottom-side and prioritize hooks, head placement, and seatbelt
- Patience for submission

DB NOTES:
- Elbow framing when transitioning through half guard is the main technical gap. Shrimp/bridge vs rolling to side.`
  },
  {
    title: "* 10/6 Coyote Guard - Shark Bite Attacks and Arm Bar",
    date: "2025-10-06", technique: "Half Guard", subtechnique: "Arm Attacks",
    notes: `GOAL: Explore coyote guard and half guard escapes - shark bite to triangle, arm bar, omoplata.

SHARK BITE ATTACKS:
- Leads to triangle as opposed to standing on triangle
- Hip to triangle
- Note: control head with leg or hands
- Bridge to get leg deep around head and turn

ARM BAR FROM COYOTE GUARD:
1. Break posture
2. Pull through arm
3. Snap head down

OMOPLATA:
- Entry noted, mechanics incomplete

DB NOTES:
- Shark bite to triangle chain needs full mechanics written out. Omoplata entry incomplete.`
  },
  {
    title: "* 9/30 Dude Class - Breaking Out of Closed Guard",
    date: "2025-09-30", technique: "Closed Guard", subtechnique: "Guard Breaks",
    notes: `GOAL: Break opponent's closed guard using three methods: stand up, middle knee, pin arm and rotate.

METHOD 1 - STAND UP:
- Wide strong stance, one foot at a time
- Move into deadlift/sumo squat stance
- Both hands on lapel
- 10/1 addition: knee up as constant

METHOD 2 - MIDDLE KNEE:
- Same first big step as standing up
- Hand in opponent's pits, keep their shoulders on mat
- Cat back and bow body to break ankles
- Put in middle stance

METHOD 3 - PIN ARM + FORWARD STEP + ROTATE:
- Pin arm to chest
- Big forward step same side
- Posture, break legs with elbow and twist

FOR ALL OPTIONS:
- ELBOWS IN AND PAINFUL
- Good posture (deadlift)

DB NOTES:
- Knee up as constant was added 10/1. Drill all three options.`
  },
  {
    title: "* Passing - Knee Slice, Smash Pass, X Pass",
    date: "", technique: "Passing", subtechnique: "Inside Passing",
    notes: `GOAL: Select appropriate pass based on what opponent gives - knee slice, smash pass, or X pass.

1. KNEE SLICE / CUT:
- Control opponent's feet/knees when entering
- Control lapel with one side, foot with other (can sit on foot side)
- Cut opposite knee steeply down into side control

2. SMASH PASS:
- Occurs when opponent gives both legs towards one side
- Opposite knee drives down and smashes both legs to floor

PASS SELECTION (based on what you're given):
1. X Pass
2. Knee Slice
3. Smash Pass

KNEE SLICE NOTES:
- Keep opponent hips square (prevents knee shield)

DB NOTES:
- Pass selection framework is the key concept. Read opponent's leg position to choose.`
  },
  {
    title: "* Closed Guard Escape / Open Guard Knee Slice Passing",
    date: "", technique: "Passing", subtechnique: "Inside Passing",
    notes: `GOAL: Break closed guard and immediately transition to knee slice or same-side knee cut pass.

CLOSED GUARD ESCAPE:
- Isolate one arm against chest
- Step forward with same side foot and stand up to break feet
- Think deadlift squat to avoid getting pulled back in

OPEN GUARD PASSING:
1. KNEE SLICER / CUT:
- Control legs with hands, step opposite leg across body
- Slice through with knee, heavy hips, land in side control
- Control opposite shoulder with underhook or baby underhook to prevent sweep/back take

2. SAME SIDE KNEE CUT:
- Like knee slicer but with same side leg
- Must high kick other leg around to get to side control

DB NOTES:
- Baby underhook detail on opposite shoulder is the key to preventing the back take after knee slice.`
  },
  {
    title: "* 9/20/25 Thoughts in Mount - High Mount, Arm Isolation, Ezekiel",
    date: "2025-09-20", technique: "Mount", subtechnique: "Mount Attacks",
    notes: `GOAL: Control and attack from mount using high mount, arm isolation, and Ezekiel choke.

1. GET TO HIGH MOUNT:
- Restricts opponent movement
- Further isolates and attacks arms
- Can cause them to cross an arm - leads to S-mount if they turn

2. ISOLATE ARM (Gordon Ryan technique via Phil class):
- Cross body arm straightened to shove opponent's arm from chest frame to mat
- Use shoulders rather than strength
- Then attack Americana / crawl hand up mat for arm triangle / gift wrap

3. POST ARMS ABOVE HEAD:
- Maintain top control, wait for them to present something
- Think: hips weight - am I getting swept? What is their next mistake?

4. EZEKIEL CHOKE (gi only so far):
- Punch arm under neck, grab deep
- Think about their field of vision - be sneaky
- Can reverse sides easily by clamping hands and punching through again
- Want to learn: Ezekiel from back / no-gi zeke (ask CJ)
- Careful not to lose underhook because of back take

DB NOTES:
- Ask CJ about no-gi Ezekiel. Gordon Ryan arm isolation technique from Phil class - need to drill.`
  },
];

async function seed() {
  console.log(`Inserting ${entries.length} entries...`);
  for (const entry of entries) {
    await addDoc(collection(db, `users/${UID}/logs`), {
      ...entry,
      createdAt: entry.date ? Timestamp.fromDate(new Date(entry.date)) : Timestamp.now()
    });
    console.log('Added:', entry.title);
  }
  console.log('Done! All entries inserted.');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
