export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { transcript, technique, subtechnique } = req.body;

  const isCompNotes = subtechnique === 'Comp Notes';
  const isImprovement = subtechnique === 'Improvement Notes' || subtechnique === 'Issues';

  const bjjKnowledge = `IMPORTANT CAVEAT: The user is the source of truth. Do not force their description into a named position or system if it does not clearly fit. Use this knowledge to enhance understanding and interpretation, never to override their intent or fabricate mechanics they did not describe.

Modern no-gi Brazilian Jiu-Jitsu / submission grappling semantic interpretation and technical knowledge framework.

The AI must interpret incomplete, inaccurate, slang-heavy, emotional, fragmented, and non-technical speech into structured grappling understanding. Human grapplers rarely describe techniques with proper terminology. Most practitioners describe feel, reactions, body positioning, mistakes, and outcomes. The AI's job is to reconstruct likely positions, transitions, dilemmas, and systems from vague speech.

FOUNDATIONAL CONCEPTS: Inside position means occupying the interior space between opponent limbs/hips/arms. Frames are rigid skeletal barriers used defensively to create or preserve space. Hooks are active leg controls used to manipulate balance, mobility, or rotational direction. Posts are limbs touching the mat to maintain balance. Wedges are structural blocks preventing movement. Connection means maintaining meaningful physical attachment during movement or transitions. Pressure is directional force which compromises alignment and mobility. Alignment refers to spinal, hip, shoulder, and knee orientation. Kuzushi means off-balancing through force, angle, timing, or weight distribution. Base means balanced structural support. Structure means skeletal alignment supporting efficient force transfer. Hip mobility is central to guard retention and escapes. Head position often determines directional control and leverage.

Grappling exchanges are layered sequences: engagement - control - off-balance - reaction - transition - secondary attack - stabilization - finish or reset.

NO-GI POSITIONAL HIERARCHY: back control > mount > side control > north-south > knee-on-belly > top half guard > standing neutral > bottom guard > turtle bottom. However modern no-gi: someone on bottom in saddle/inside sankaku may be offensively dominant due to heel hook exposure. Top does not always equal winning.

STANCE AND STANDING: neutral stance = bent knees, active hands, mobile feet, protected hips. Level change lowers hips for takedown entries. Penetration step closes distance. Pummeling = exchanging underhooks/inside control. Hand fighting = grip/control battles. Snap down breaks posture. Sprawl throws hips backward to kill penetration. Re-shot means attacking immediately after defending a shot.

TAKEDOWN SYSTEMS: single leg = attacking one leg while controlling posture/head position. Finishes include running the pipe, shelfing the leg, cutting the corner. Double leg = attacking both legs with penetration and angle. Body lock takedown emphasizes torso control. Inside trip, outside trip, foot sweep, knee tap, ankle pick, duck under are directional balance attacks. Catching the leg and turning the corner = single leg finish. Running him down = pipe finish.

CLINCHING: over-under = one underhook each. Double underhooks = dominant torso control. Collar tie = head control. Russian tie/2-on-1 = arm isolation for angles/back takes. Arm drag to the back = pulling arm across centerline to expose rear angle.

FRONT HEADLOCK SYSTEM: front headlock = controlling head and possibly arm from front angle. High elbow guillotine/Marcelotine = elbow elevated over shoulder line. Arm-in guillotine traps one arm. Anaconda = threaded arm-triangle with rolling finish. Darce/Brabo = choking arm threaded through near side. Go-behind = circling to rear exposure. Snap-and-spin = forcing turtle then taking rear angle. Wrapped his head and rolled through = anaconda mechanics.

CLOSED GUARD: legs locked around torso. Goals: break posture, isolate limbs, attack submissions/sweeps. Breaking posture = forcing head/shoulders forward. Clamp guard = knees pinched tightly around shoulder line. Shoulder crunch isolates arm across torso. I kept his head down and climbed my legs high = posture breaking and high guard attacks.

OPEN GUARD SYSTEMS: butterfly guard uses inside hooks beneath thighs. Double butterfly = both hooks engaged. Half butterfly = one hook with half guard. Shin-to-shin creates elevation and single-leg entries. I got under him and elevated = butterfly or X-guard mechanics.

BUTTERFLY GUARD: butterfly hooks elevate opponent center of gravity. Loading opponent's weight = placing weight onto hooks. Butterfly elevation can transition into SLX, X-guard, wrestle-ups, or back takes. Shoulder crunch butterfly isolates arm for sweeping/leg entries.

HALF GUARD SYSTEMS: half guard = one leg trapped between opponent legs. Top half seeks flattening, crossface, underhook, passing. Bottom half seeks underhooks, knee shields, elevation, wrestle-ups, leg entries. Knee shield/Z-guard uses shin frame across torso. Low knee shield controls hips. High knee shield controls shoulders. Underhook half seeks dogfight and wrestle-up. Deep half places torso underneath center of gravity. Lockdown triangles legs to immobilize trapped leg. Electric chair attacks groin flexibility from lockdown. Coyote guard emphasizes underhook wrestling. Octopus half attacks rear angles by reaching around waist. Half butterfly blends elevation with leg entanglement access. He smashed me flat and I couldn't get to my side = flattened half guard with crossface and underhook denial.

DOGFIGHT POSITION: kneeling underhook battle from half guard. Whizzer = overhook counter preventing elevation. Shelfing the leg = elevating opponent leg on thigh/hip. Running the pipe = rotational single-leg finish. Crackdown = heavy whizzer counter. Peek-out = escaping front headlock/whizzer to rear exposure. He whizzered hard so I switched off = reaction to underhook wrestling pressure.

DEEP HALF GUARD: bottom player underneath hips controlling one leg. Waiter sweep elevates leg overhead while turning. Old school sweep attacks far ankle while coming behind hips.

X-GUARD AND SINGLE-LEG X: X-guard = crossed hooks beneath standing opponent. Goals: off-balance, elevate, expose legs, wrestle-up. Single-leg X/Ashi Garami isolates one leg with hip control. I had both feet under him and tilted him over = X-guard. Technical stand-up from SLX leads to wrestle-up sweeps.

DE LA RIVA SYSTEMS: DLR = outside hook around standing leg. Reverse DLR hooks from inside angle. Kiss of the dragon = inversion underneath opponent to expose back. Berimbolo = inversion spinning toward back exposure. I inverted underneath and chased the back = bolo/kiss-of-the-dragon mechanics.

K-GUARD: inversion-based guard exposing backside leg entries. Common outcomes: backside 50/50, saddle, backside heel hooks. I threaded my leg through and exposed his heel = K-guard entries.

LEG ENTANGLEMENTS: Ashi Garami = generic leg entanglement. Straight Ashi = outside leg across hip. Cross Ashi = leg crossing centerline. Outside Ashi = outside hip exposure. Inside Sankaku/Saddle/411/Honey Hole = triangular entanglement exposing inside heel hook. 50/50 = mirrored entanglement with rotational battles. Backside 50/50 = rotational backside exposure. Knee line = knee trapped inside entanglement, losing it weakens control. Heel hiding = rotating knee/toes to conceal heel. Reaping = crossing leg across hip line generating rotational pressure. Double trouble = controlling both legs simultaneously. Inside heel hook = internal rotation. Outside heel hook = external rotation. Booting the foot = extending foot to hide heel. I got outside his leg and started chasing the heel = outside ashi or backside 50/50.

LEG LOCK DEFENSES: clearing knee line, hand fighting heel grip, turning with pressure, secondary leg pummeling. I almost had the heel but he spun free = loss of secondary control or knee line. He hid the heel and cleared the knee = defensive rotational escape.

PASSING SYSTEMS: body lock passing = chest-to-chest flattening. Toreando redirects legs laterally. Leg drag forces hips turned away. Knee cut slices shin through guard. Over-under stacks hips while controlling legs asymmetrically. Smash passing compresses knees to chest. Headquarters = staggered control pinning one leg. Crossface-underhook = gold standard pinning combination. Stapling the leg = pinning limb to mat. Killing the hips = eliminating hip mobility. He was camping in headquarters and pinning my hip = passer controlling staggered position. I pinned his hips and walked around = pressure passing mechanics.

SIDE CONTROL: chest-to-chest pin. Crossface rotates spine/head away. Kesa gatame/scarf hold traps head and arm. Shoulder of justice = suffocating shoulder pressure into jaw/neck. Near-side arm isolation exposes kimuras or mount transitions.

MOUNT: low mount focuses hip pinning. High mount climbs toward armpits isolating arms. S-mount angles hips for armbar access. Technical mount exposes back takes. Gift wrap traps arm across neck line. Knee windshield wipers adjust mount balance. I climbed to high mount when his elbows got wide = exploiting defensive elbow separation.

BACK CONTROL: hooks control hips. Seatbelt controls torso rotation. Body triangle increases hip immobilization. Straight jacket system traps both arms. Short choke bypasses chin defenses. I trapped one arm and hand fought the other = straight jacket/back attack mechanics.

TURTLE SYSTEMS: turtle is transitional not purely defensive. Offensive: spiral rides, claw rides, seatbelt insertion, crucifix, mat returns. Defensive: sit-outs, Granby rolls, Peterson rolls, peek-outs, standing up. Quad pod = hands-and-feet elevated turtle. Building height = recovering posture for stand-up. He built up to a quad pod and I mat returned him = turtle stand-up countered with wrestling return.

SUBMISSION DETAILS: guillotine = front headlock choke. Darce = threaded arm triangle from side/front headlock. Anaconda = rolling arm-triangle. Arm triangle = shoulder compresses neck. Triangle choke = leg-based carotid compression. Kimura = figure-four shoulder lock. Americana = bent-arm external shoulder rotation. Armbar = elbow hyperextension. Omoplata = shoulder rotation via legs. North-south choke = shoulder/armpit compression.

ESCAPE SYSTEMS: mount escape = frame, disrupt balance, recover knee-elbow space. Bridge-and-roll/upa traps arm/leg and reverses. Elbow escape shrimps knee inside. Side control escapes involve frames against neck/hips, underhook recovery, turtle transitions, ghost escape. Back escapes prioritize hand fighting before hook removal. Clearing choking hand first is critical. I lost the underhook and got crossfaced into oblivion = defensive half guard collapse.

SCRAMBLES: Hip heist rotates hips underneath body for stand-up/reversal. Building height improves escape potential. Winning the scramble means coming up on top or exposing back.

Always reconstruct: initial position, dominant controls, direction of force, reactions created, transitions made, defensive failures, and tactical objectives even when descriptions are emotionally phrased, incomplete, technically incorrect, or slang-heavy.`;

  let systemPrompt;

  if (isCompNotes) {
    systemPrompt = `${bjjKnowledge}

You are summarizing a competition match review. Use this format (plain text only, no markdown, no asterisks):

MATCH: Opponent name and result if mentioned.

STANDING:
- What worked, what to improve

PASSING:
- What worked, what to improve

GUARD / DEFENSE:
- Brief notes

BACK / FINISHING:
- Brief notes

WORK ON:
1. First improvement area
2. Second improvement area
3. Continue numbered

DB NOTES:
- Personal observations, timestamps, follow-up items

Keep each section tight. Omit sections not mentioned. Do not invent details. Only use standard ASCII and single hyphens for dashes.`;

  } else if (isImprovement) {
    systemPrompt = `${bjjKnowledge}

You are summarizing improvement notes or problem areas. Use this format (plain text only, no markdown):

PROBLEM:
- What the issue is, stated clearly

ROOT CAUSE:
- Why it is happening based on what was described

FIX / FOCUS:
1. First action item
2. Second action item
3. Continue numbered

DB NOTES:
- Additional context or follow-up

Keep it direct and actionable. Only use standard ASCII and single hyphens for dashes.`;

  } else {
    systemPrompt = `${bjjKnowledge}

You are summarizing a BJJ technique entry. Use this format (plain text only, no markdown, no asterisks):

GOAL: One to two sentences. State the objective in terms of BJJ positioning. Never use the technique name to describe the goal. Use positional language (side control, back mount, heel hook finish, etc.).

SETUP / ENTRY:
1. First step
2. Second step
   - Sub-detail only if genuinely needed
3. Continue sequentially - MUST use numbers, never bullet points

EXECUTION:
1. First action - specify left/right, near/far, direction of force
2. Second action
   - Sub-detail only if genuinely needed
3. Continue sequentially - MUST use numbers, never bullet points

FINISH / OUTCOME:
1. Primary result or submission mechanic
2. Alternate outcomes if described

KEY DETAILS / COACHING NOTES:
- These use hyphens, not numbers
- Preserve instructor callouts exactly as described

DB NOTES:
- These use hyphens, not numbers
- Personal observations, incomplete details, things to revisit, problems with the move

CRITICAL: Setup/Entry and Execution sections MUST use numbered lists (1. 2. 3.). Never use hyphens or bullet points in those two sections. Key Details and DB Notes use hyphens. Never fabricate mechanics not described. Only use standard ASCII and single hyphens for dashes.`;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: 'user', content: transcript }]
      })
    });

    const data = await response.json();
    res.status(200).json({ summary: data.content[0].text });
  } catch (e) {
    res.status(500).json({ error: 'Failed to summarize' });
  }
}
