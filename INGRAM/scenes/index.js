import { state } from "../js/engine/state.js";
import { renderIphoneLockscreen, renderEmailContent } from '../js/engine/renderUtils.js';
import { giveItem } from "../js/engine/inventory.js";
import { updateStats } from "../js/engine/stats.js";
import { showToast } from "../js/engine/ui.js";
import { showScene } from '../js/engine/renderer.js';

export const SCENES = {
	opening: {
		text: `The light hurts your eyes.

It arrives too bright, too sudden—piercing the thin membrane of whatever half-sleep you'd managed to claw together. You blink awake into the assault of noon sun glaring through curtains you don't remember opening, or perhaps he opened them before he left, part of some silent choreography you were too unconscious to witness.

There's a strange taste in the back of your mouth. Metallic. Chemical. You run your tongue over your teeth and find the familiar film of the pills he administers each morning, the ones he leaves on the nightstand with a glass of water like a nurse, like a captor, like someone who has decided your body chemistry is his to curate.

Your head pounds in rhythm with your heartbeat. Thump. Thump. Thump. A dull, insistent pressure behind your eyes that makes you wonder, not for the first time, if sanity is something that can leak out gradually, if you're watching yourself go mad in real-time and simply too tired to care anymore.`,
		choices: [{ text: ">> Next", next: "wakeup" }],
	},

	wakeup: {
		text: `You sit up.

The movement costs you—dizziness pools behind your eyes, and for a moment the room tilts, the beige walls sliding sideways before snapping back into place.

The room is quiet. Too quiet. The kind of silence that isn't peaceful but merely waiting, the held-breath silence of a space that knows you're alone in it.

You know this room, of course. You've lived here for the past six or so years, though "lived" feels like the wrong word. Existed. Survived. Occupied. It's a two-person apartment in the middle of Chicago, though increasingly it feels like it holds only one person and one... pet? Patient? Project?

Half of the bed is made. His side, pulled tight enough to bounce a quarter off the sheets. Typical. He makes the bed every morning before he leaves for the hospital, a small violence of order against the chaos he forces on you.
`,
		dynamicChoices: () => {
			const base = [
				{
					id: "wallet",
					text: ">> Look for your wallet",
					check: "checkedWallet",
					stat: "awareness",
					val: 10,
					item: "swedish_id",
					person: "ingram",
					msg: "+10 Awareness",
				},
				{
					id: "phone",
					text: ">> Pick up your phone",
					check: "checkedPhone",
					stat: "sanity",
					val: -5,
					person: "remy",
					item: "phone",
					msg: "-5 Sanity",
				},
			];

			const canLeave = state.checkedWallet && state.checkedPhone;

			const alreadyLeftBed =
				state.inventory && state.inventory.includes("apartment_key");

			return [
				...base.map((c) => ({ ...c, disabled: state[c.check] })),
				canLeave
					? {
							id: "bed",
							text: ">> Get out of bed",
							next: "bed_result",
							item: "apartment_key",
							// Keeps the action explicitly active and clickable
							disabled: false,
							...(alreadyLeftBed
								? {}
								: {
										stat: "energy",
										val: -10,
										msg: "-10 Energy",
									}),
						}
					: {
							text: "Something holds you back from leaving the mattress just yet.",
							disabled: true,
							isInfo: true,
						},
			];
		},
	},

	wallet_result: {
		text: `You find it inside the nightstand drawers, tucked beside the amber bottles he keeps there—the ones with the labels peeled off, the ones he measures by eye and administers with the casual expertise of someone who spent years learning exactly how much of a chemical it takes to keep a body soft and pliant.

He likes to leave cash in it sometimes. Folded twenties, crisp and new, slipped into the leather like offerings. No matter what you say, he insists on 'spoiling' you, on this performance of generosity that makes your throat tight because you haven't held a job in three years and you both know exactly who owns whom here.

How touching, for a man who…

…Well, you know.

You pull out the Swedish ID card—your anchor to a self that feels increasingly theoretical. The photo shows you from before, or perhaps a you that never really existed. You run your thumb over the laminate.

    <div style="background: #f4f6f9; border: 1px solid #d0d5dd; max-width: 440px; padding: 12px; color: #1d2939; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6);"> <div style="border-bottom: 1px solid #e4e7ec; padding-bottom: 6px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;"> <div style="display: flex; gap: 8px; align-items: center; "> <div style="font-size: 7px; font-weight: bold; color: #fff; background: #004b93; padding: 5px; border-radius: 2px; display: flex; align-items: center; gap: 2px; border: 1px solid #003366;"><span style="color: #ffcc00;">★</span>SE<span style="color: #ffcc00;">★</span></div> <div><div style="font-size: 11px; font-weight: bold; color: #3b2273; letter-spacing: 0.5px; ">SVERIGE SWEDEN</div><div style="font-size: 7px; color: #667085; font-weight: bold; text-transform: uppercase;">Nationellt identitetskort / Identity Card</div></div> </div> <div style="width: 18px; height: 11px; border: 1px solid #a4b5d6; background: #e0e7f6; border-radius: 2px; display: flex; align-items: center; justify-content: center; position: relative;"><div style="width: 6px; height: 6px; border-radius: 50%; border: 1px solid #f4f6f9;"></div><div style="position: absolute; width: 100%; height: 1px; background: #a4b5d6; top: 50%;"></div></div> </div> <div style="display: flex; gap: 12px; align-items: flex-start;"> <div style="width: 110px; height: 135px; background: #eaecf0; border: 1px solid #d0d5dd; display: flex; align-items: center; justify-content: center; color: #98a2b3; font-size: 10px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); border-radius: 4px;">[PHOTO]</div> <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;"> <div><div style="color: #667085; font-size: 6.5px; text-transform: uppercase; font-weight: bold;">Efternamn/Surname</div><div style="font-size: 11px; font-weight: bold; color: #101828; letter-spacing: 0.3px;">SVALANDER</div></div> <div><div style="color: #667085; font-size: 6.5px; text-transform: uppercase; font-weight: bold;">Förnamn/Given names</div><div style="font-size: 10px; font-weight: bold; color: #101828;">INGRAM SIGFRID</div></div> <div style="display: flex; gap: 10px;"><div style="flex: 1;"><div style="color: #667085; font-size: 6.5px; text-transform: uppercase; font-weight: bold;">Kön/Sex</div><div style="font-size: 9.5px; color: #101828; font-weight: 500;">M</div></div><div style="flex: 2;"><div style="color: #667085; font-size: 6.5px; text-transform: uppercase; font-weight: bold;">Nationalitet</div><div style="font-size: 9.5px; color: #101828; font-weight: 500;">SVENSK/SWE</div></div></div> <div><div style="color: #667085; font-size: 6.5px; text-transform: uppercase; font-weight: bold;">Personnr</div><div style="font-size: 9.5px; font-weight: bold; color: #101828;">19990822-4837</div></div> <div><div style="color: #667085; font-size: 6.5px; text-transform: uppercase; font-weight: bold;">Kortnr</div><div style="font-size: 9.5px; color: #101828; font-weight: 500;">XA7294013</div></div> </div> <div style="width: 100px; display: flex; flex-direction: column; gap: 6px;"> <div><div style="color: #667085; font-size: 6.5px; text-transform: uppercase; font-weight: bold;">Födelsedatum</div><div style="font-size: 9.5px; color: #101828; font-weight: 500;">22 AUG/AUG 99</div></div> <div><div style="color: #667085; font-size: 6.5px; text-transform: uppercase; font-weight: bold;">Giltig till</div><div style="font-size: 9px; color: #101828; font-weight: 500;">14 JUN/JUN 27</div></div> <div><div style="color: #667085; font-size: 6.5px; text-transform: uppercase; font-weight: bold;">CAN</div><div style="font-size: 9px; color: #101828; font-weight: 500;">482931</div></div> <div style="width: 45px; height: 45px; border: 1px dashed #ced4da; background: #f8f9fa; align-self: flex-end; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #475467; font-size: 7px; font-family: monospace; font-weight: bold; text-align: center;"><div>22 08</div><div>1999</div></div> </div> </div> <div style="margin-top: 8px; padding-top: 5px; border-top: 1px solid #e4e7ec; display: flex; justify-content: space-between; align-items: flex-end;"> <div><div style="color: #667085; font-size: 6.5px; text-transform: uppercase; font-weight: bold;">Innehavarens namnteckning</div><div style="font-family: 'Courier New', monospace; font-size: 13px; color: #344054; font-style: italic; padding-left: 2px;">I. Svalander</div></div> <div style="color: #98a2b3; font-size: 8px; font-weight: bold; letter-spacing: 0.5px;">SWE</div> </div> </div>`,

		choices: [{ id: "wallet_back", text: ">> Return", next: "wakeup" }],
	},

	phone_result: {
		text: `Your fingers find the cold glass of the screen on the bedside table, moving by muscle memory, by rote, by the automated gestures of a life reduced to reflex. You lift the device, and it shifts awake instantly in your palm—no password, he removed that years ago, said it was "silly" for partners to have secrets—and there it is, the notification glowing soft and obscene in the dim room:`,
		onRender: (container) => {
			const phone = renderIphoneLockscreen({
				date: 'Söndag 1 <i class="fa-solid fa-cloud" style="font-family: \'Font Awesome 6 Free\'; font-weight: 900;"></i> Chicago',
				time: "13:17",
				battery: "84",
				appName: "Meddelanden",
				timeAgo: "6 t sedan",
				sender: "rémy",
				message:
					"thought i'd let you sleep in after last night 🥰 make sure to have dinner ready for me? i have a long shift at the hospital",
				footerPrompt: "Svep uppåt för att öppna",
			});
			container.appendChild(phone);

			const after = document.createElement("p");
			after.style.marginTop = "25px";
			after.innerHTML =
				"Domestic theatre, as usual. How predictable.<br><br>The life of an anaesthesiologist isn't easy, you suppose. You suppose a lot of things, these days. You suppose the bruises are love. You suppose the cage is safety. You suppose this is what you deserve after the breakdown, after the hospital, after he found you broken and decided to keep you.<br><br>...And you suppose you should start dinner.";
			container.appendChild(after);
		},
		choices: [{ id: "phone_back", text: ">> Return", next: "wakeup" }],
	},

	bed_result: {
		text: `Your legs work, at least. Small mercies. You stand, wobbling slightly as the blood redistributes, as the room tilts again and steadies. The floor is cold tile—he removed the rug last month, said it was "getting dirty," though you suspect he just likes watching you squirm in the mornings, likes the way you dance on your toes to avoid the chill, likes you small and uncomfortable and grateful when he eventually allows warmth.

You move to the dresser. The brass key sits in the porcelain dish where he leaves it, heavy and obvious. You don't remember him giving it to you, exactly—it appeared one day, part of the mythology of your shared life, the story you tell yourself about choice and consent and how you could leave if you really wanted to, couldn't you? You could just walk out.

The key fits the apartment door. It does not fit the cage.

You open the door with a sigh that sounds like letting go.`,
		choices: [{ text: ">> Next", next: "chapter2" }],
	},

	chapter2: {
		text: `The bedroom door clicks shut behind you with a sound like finality, sealing away the relative safety of the mattress, the only space in the apartment that feels even temporarily yours.

Outside, the apartment stretches into a long, narrow corridor of dark hardwood and beige paint. Everything is exactly where it belongs. The silver keys rest in the porcelain dish by the entryway, aligned at perfect right angles. The copper pots hang in a perfect, descending line above the stove, a museum exhibit of domesticity. It feels less like a home and more like a gallery where the curator is constantly monitoring your footprints, your fingerprints, the angle at which you leave a spoon in the sink.

The air smells faintly of Rémy's cologne—cedar wood and expensive soap, something he buys at the medical supply store that makes him smell like antiseptic and money. It lingers even though he left for the hospital hours ago, a ghost of his presence, a reminder that the walls themselves have been colonized by him, that even in his absence he occupies every cubic inch of breathable space.

The silence here is heavier. It fills the gaps between the ticking of the wall clock, presses against your eardrums, makes you aware of your own breathing, the rise and fall of your chest under the sweater he picked out for you.`,
		dynamicChoices: () => {
			const base = [
				{
					id: "ch2_phone",
					text: ">> Go on your phone",
					check: "checkedCh2Phone",
					next: "ch2_phone_result",
					stat: "sanity",
					val: -5,
					msg: "-5 Sanity",
				},
				{
					id: "ch2_leave",
					text: ">> Leave the house",
					check: "checkedCh2Leave",
					next: "ch2_leave_result",
					stat: "sanity",
					val: -10,
					msg: "-10 Sanity",
				},
				{
					id: "ch2_kitchen",
					text: ">> Go to the kitchen",
					check: "checkedCh2Kitchen",
					next: "ch2_kitchen_prep",
					stat: "awareness",
					val: 5,
					msg: "+5 Awareness",
				},
			];
			const canProgress =
				state.checkedCh2Phone &&
				state.checkedCh2Leave &&
				state.checkedCh2Kitchen;
			return [
				...base.map((c) => ({ ...c, disabled: state[c.check] })),
				canProgress
					? {
							text: ">> Go to the living room",
							next: "ch2_living_room",
						}
					: {
							text: "You should gather your bearings completely before settling down in the living room...",
							disabled: true,
							isInfo: true,
						},
			];
		},
	},

	ch2_phone_result: {
		text: `You unlock the device, staring blankly at the bright grid of applications. Your thumb moves automatically, opening data feeds, scrolling through endless strings of text, local Chicago news notices, and unrelated updates from strangers. 

    Ten minutes slip away in the gray blur of the screen. None of the data fixes the hollowness behind your eyes, but the continuous stream of white noise keeps the silence from pressing too hard against your ears. Your hand feels slightly numb when you finally turn the display dark again.

    The feed refreshes with a jagged, mechanical stutter. A headline details a multi-car collision near the Medical District, complete with a grainy map showing a long, crimson line of gridlock on the digital highway. Below it, an algorithmic ad pitches a subscription service for pre-portioned dinner kits, promising to take the guesswork out of feeding a household. 

    Next come the updates from people you don't know and will never meet. A stranger laments a ruined birthday dinner at a restaurant in Wicker Park. Someone else posts a blurred photograph of a stray orange cat sitting under a porch on the North Side, asking if anyone recognizes its collar. 

    Your thumb flicks upward again. And again. And again.

    By the time you finally lock the device, fifteen more minutes have dissolved into nothing. The screen goes black, cutting off the glare and dropping the room back into the heavy, unblinking quiet of the apartment. Your thumb aches slightly from the repetitive motion, and your reflection stares back at you from the dark glass, pale and entirely unchanged.`,
		choices: [
			{ id: "ch2_phone_back", text: ">> Return", next: "chapter2" },
		],
	},

	ch2_leave_result: {
		text: `You step closer to the heavy wooden front door, your fingers hovering over the cool metallic surface of the handle.

The moment your skin brushes the lock mechanism, a sudden, cold wave of dread tightens in your throat like a hand closing. The thought of stepping out into the bright hallway, of encountering a neighbor, of being observed walking down the street, of the infinite terrifying expanse of the city outside these walls—it makes you feel physically ill, stomach churning with a panic that feels chemical, induced, though perhaps it's just learned.

You pull your arm back as if burned, steadying your breathing, counting to four the way he taught you.

Besides, Rémy always manages the grocery runs on his days off. He prefers to, he says. He likes knowing exactly what comes into the house, likes checking the receipts, likes controlling the calories and the chemicals and the very air you breathe. There is bound to be enough stock inside the pantry to construct dinner. There is no logical reason to step past the threshold.

There is no logical reason to want to.

You turn back toward the kitchen.`,
		choices: [
			{ id: "ch2_leave_back", text: ">> Return", next: "chapter2" },
		],
	},

	ch2_kitchen_prep: {
		text: `The kitchen counters are pristine, wiped down to a high gloss polish that shows your distorted reflection—elongated, strange, a funhouse mirror version of yourself that seems appropriate. You open the refrigerator door, and the interior hum kicks to life as cool light spills across organized glass storage containers, each labeled in his handwriting with dates and contents, expiration times and portion sizes.

Looking through the well-stocked shelves and matching jars in the lower cabinets, you isolate your ingredients. It is time to start dinner, just as Rémy requested, just as he expects, just as he has trained you to do with the precision of a medical procedure. The ritual of it calms you, or perhaps that's just the low hum of compliance, the easy path of obedience that requires no thought, only muscle memory.

      <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: 1fr 1fr; gap: 16px; width: 100%; margin-bottom: 28px;">
  <div style="grid-column: 1; grid-row: 1 / 3; border: 2px solid #b0bec5; border-radius: 16px 4px 4px 16px; padding: 16px; background: #eceff1; box-shadow: inset -5px 0 10px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 12px; position: relative;">
    <div style="position: absolute; right: 6px; top: 15%; bottom: 15%; width: 4px; background: #cfd8dc; border-radius: 2px;"></div>
    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #546e7a; font-weight: 700; border-bottom: 1px solid #cfd8dc; padding-bottom: 6px;">Fridge</div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px; align-content: flex-start; flex: 1;">
      ${["cod fillets", "cooking cream", "butter", "carton of eggs", "milk", "leeks", "Gouda cheese", "lamb", "red wine", "vodka", "soda", "Greek yogurt", "half and half", "mayonnaise", "Dijon mustard", "a head of broccoli", "pickled red onion", "lemon halves wrapped in cling film", "bottles of mineral water", "an excessive amount of sterile saline flushes", "fresh ginger root", "parma ham", "anchovy paste", "capers", "truffle oil", "pickles"].map((i) => `<span style="background: #ffffff; border: 1px solid #b0bec5; border-radius: 6px; padding: 6px 12px; font-size: 13px; color: #1c2833; font-weight: 500; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">${i}</span>`).join("")}
    </div>
  </div>
  <div style="grid-column: 2; grid-row: 1; border: 2px solid #a1887f; border-radius: 8px; padding: 16px; background: #efebe9; box-shadow: inset 0 0 12px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 12px;">
    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #6d4c41; font-weight: 700; border-bottom: 1px solid #d7ccc8; padding-bottom: 6px;">Pantry Cabinet</div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px; align-content: flex-start; flex: 1;">
      ${["olive oil", "panko breadcrumbs", "spices", "fresh herbs", "Parmesan cheese", "chicken broth", "tomato paste", "chickpeas", "chicken bouillon", "instant ramen", "Semolina flour"].map((i) => `<span style="background: #ffffff; border: 1px solid #d7ccc8; border-radius: 6px; padding: 6px 12px; font-size: 13px; color: #1c2833; font-weight: 500; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">${i}</span>`).join("")}
    </div>
  </div>
  <div style="grid-column: 2; grid-row: 2; border: 2px solid #90a4ae; border-top: 6px solid #78909c; border-radius: 4px 4px 16px 4px; padding: 16px; background: #f8f9fa; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 12px;">
    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #455a64; font-weight: 700; border-bottom: 1px solid #cfd8dc; padding-bottom: 6px;">Countertop</div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px; align-content: flex-start; flex: 1;">
      ${["a half-cut bulb of garlic", "potatoes", "carrots", "onions", "celery"].map((i) => `<span style="background: #ffffff; border: 1px solid #cfd8dc; border-radius: 6px; padding: 6px 12px; font-size: 13px; color: #1c2833; font-weight: 500; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">${i}</span>`).join("")}
    </div>
  </div>

</div>
      What do you choose to prepare?`,

		dynamicChoices: () => {
			if (state.dinnerChoice) {
				return [
					{
						text: `You have already decided on the ${state.dinnerChoice}. The ingredients are prepped and waiting.`,
						disabled: true,
						isInfo: true,
					},
					{
						text: ">> Continue to cooking",
						next: "ch2_kitchen_cooked",
					},
				];
			}

			const choicesArray = [
				{
					id: "cook_fish",
					text: ">> Prepare the herb-crusted cod",
					next: "ch2_kitchen_cooked",
					cook: "herb-crusted cod",
					stat: "energy",
					val: -15,
					msg: "-15 Energy",
				},
				{
					id: "cook_stew",
					text: ">> Simmer a root vegetable stew",
					next: "ch2_kitchen_cooked",
					cook: "root vegetable stew",
					stat: "energy",
					val: -15,
					msg: "-15 Energy",
				},
			];

			if (!state.hasRefusedToCook) {
				// First-time configuration: clickable and applies the sanity penalty
				choicesArray.push({
					id: "refuse_to_cook",
					text: ">> You don't want to cook anything for him.",
					next: "ch2_kitchen_refusal",
					stat: "sanity",
					val: -10,
					msg: "-10 Sanity",
				});
			} else {
				// Revisit configuration: remains clickable but strips stat tracking and triggers the CSS class
				choicesArray.push({
					id: "refuse_to_cook",
					text: ">> Be a good boy.",
					next: "ch2_kitchen_refusal",
					disabled: true, //
				});
			}

			return choicesArray;
		},
	},

	ch2_kitchen_refusal: {
		text: "",
		onRender: (container) => {
			state.hasRefusedToCook = true;

			const warningText = document.createElement("p");
			warningText.className = "shake-warning";
			warningText.style.cssText =
				"font-size: 16px; margin-bottom: 24px; line-height: 1.5;";
			warningText.innerText =
				"Don't be silly, Ingram. You know what will happen if you don't listen to him, right?";
			container.appendChild(warningText);
			const subtext = document.createElement("p");
			subtext.style.cssText =
				"font-size: 13px; color: #666; font-style: italic; margin-top: 0px;";
			subtext.innerText =
				"Be a good little housewife. You owe him that much.";
			container.appendChild(subtext);
		},
		choices: [
			{
				id: "refusal_return",
				text: ">> Step back to the counter",
				next: "ch2_kitchen_prep",
			},
		],
	},

	ch2_kitchen_cooked: {
		text: `You spend the next hour working quietly over the stove, tracking measurements with the precision he demands, the precision he beat into you during the early months when you were still learning, still resisting. The kitchen fills with warmth as the meal takes shape, steam rising in clouds that smell of herbs and butter and something else, something chemical you don't want to identify.

You pack the completed portions carefully into separate glass containers—his lunch for tomorrow, your dinner for tonight—cleaning every stray knife and pan immediately after use to ensure no signs of mess remain on the counters, no evidence of your passage, no indication that you were ever here at all. The lingering scent of food helps mask the heavy trace of cedar wood cologne, helps you pretend, for a moment, that this is a normal life, that you are a normal person.`,

		onRender: (container) => {
			const fishIngredients =
				"the cod fillets, garlic, lemon, cooking cream, olive oil, panko breadcrumbs, butter, spices, fresh herbs, eggs, and Parmesan cheese";
			const stewIngredients =
				"the potatoes, carrots, onions, celery, chicken broth, red wine, tomato paste, chickpeas, chicken bouillon, and leeks";
			const chosenList =
				state.dinnerChoice === "herb-crusted cod"
					? fishIngredients
					: stewIngredients;

			const introTextElement = container.querySelector("p") || container;
			introTextElement.insertAdjacentHTML(
				"afterbegin",
				`<p style="margin-bottom: 16px;">You collect ${chosenList}.</p>`,
			);

			const alert = document.createElement("div");
			alert.className = "item-alert";
			alert.style.cssText =
				"margin-top: 16px; font-style: italic; color: #5f6368;";
			alert.innerHTML = `You prepared the <strong>${state.dinnerChoice}</strong>. This choice will have consequences later.`;
			container.appendChild(alert);
		},
		choices: [
			{ id: "ch2_kitchen_back", text: ">> Return", next: "chapter2" },
		],
	},
	ch2_living_room: {
		text: `With the chores resolved and the phone quiet, you finally walk into the living room. The space is arranged with low, geometric furniture that feels clean but uninviting, designed for display rather than comfort, for photographs rather than living.

You do not look at the box-like shape in the corner covered by a blanket. You do not think about it. You cannot.

Instead, you sit down at the table where your laptop sits, the one he bought for you, the one he checks the browser history on, the one with the camera he can access from the hospital. You tap the power button, watching the screen hum to life in the dim light of the room. Password—a simple 1212. He removed your complex ones, said you were too stressed to remember them, said he would take care of everything. You forget otherwise. You forget a lot, these days.

<div class="browser-address-container">
  <div class="browser-search-bar">
    <span class="typing-text">mail.google.com</span>
  </div>
</div>`,
		choices: [{ text: ">> Look through emails", next: "ch2_emails" }],
	},

	ch2_emails: {
		text: ``,
		onRender: (container) => {
			console.log("Rendering email inbox...");

			const gmailDesktop = document.createElement("div");
			gmailDesktop.style.cssText = `
  background: #f6f8fc;
  border-radius: 16px;
  overflow: hidden;
  font-family: 'Google Sans', Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  min-height: 500px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  width: 95vw;
  max-width: 950px;
  margin-left: 50%;
  transform: translateX(-50%);
  position: relative;
`;

			const header = document.createElement("div");
			header.style.cssText =
				"background: #f6f8fc; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid transparent;";
			header.innerHTML = `
  <div style="display: flex; align-items: center; gap: 12px; width: 200px;">
    <div style="width: 24px; height: 24px; background: #ea4335; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; font-weight: bold;">M</div>
    <span style="color: #1f1f1f; font-size: 22px; font-family: 'Google Sans', sans-serif; font-weight: 400;">Gmail</span>
  </div>
  
  <div style="flex: 1; max-width: 550px; background: #eaf1fb; padding: 10px 16px; border-radius: 24px; color: #444746; font-size: 14px; display: flex; align-items: center;">
    <i class="fa-solid fa-magnifying-glass" style="margin-right:10px"></i> Sök i e-post
  </div>
  
  <div style="display: flex; align-items: center; gap: 8px; margin-left: auto; padding-left: 16px;">
    <button style="background: transparent; border: none; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: #5f6368; font-size: 18px; cursor: pointer;" title="Hjälp">
      <i class="fa-regular fa-circle-question"></i>
    </button>
    <button style="background: transparent; border: none; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: #5f6368; font-size: 18px; cursor: pointer;" title="Inställningar">
      <i class="fa-solid fa-gear"></i>
    </button>
    <button style="background: transparent; border: none; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: #5f6368; font-size: 16px; cursor: pointer;" title="Google-appar">
      <i class="fa-solid fa-grip"></i>
    </button>
    <div style="width: 32px; height: 32px; background-color: #137333; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: 4px; cursor: pointer; user-select: none;" title="Google-konto: Ingram">
      <span style="color: #fff; font-size: 15px; font-weight: 500; font-family: sans-serif;">I</span>
    </div>
  </div>
`;
			gmailDesktop.appendChild(header);

			const mainApp = document.createElement("div");
			mainApp.style.cssText = "display: flex; flex: 1;";
			gmailDesktop.appendChild(mainApp); //

			const sidebar = document.createElement("div");
			sidebar.style.cssText =
				"width: 200px; padding: 12px 8px 0 8px; display: flex; flex-direction: column; gap: 4px;";
			sidebar.innerHTML = `
  <div style="background: #c2e7ff; color: #001d35; padding: 16px 24px; border-radius: 16px; font-weight: 500; font-size: 14px; text-align: left; margin-bottom: 16px; max-width: 120px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <i class="fa-solid fa-pen" style="margin-right:20px;"></i> Skriv
  </div>
  <div style="background: #d3e3fd; color: #041e49; font-weight: 600; padding: 8px 12px 8px 24px; border-radius: 0 16px 16px 0; margin-left: -8px; font-size: 14px;">
    <i class="fa-solid fa-inbox"></i> Inkorgen
  </div>
  <div style="color: #444746; padding: 8px 16px; font-size: 14px;"><i class="fa-regular fa-star"></i> Stjärnmärkta</div>
  <div style="color: #444746; padding: 8px 16px; font-size: 14px;"><i class="fa-regular fa-paper-plane"></i> Skickat</div>
`;
			mainApp.appendChild(sidebar);

			const contentBox = document.createElement("div");
			contentBox.style.cssText =
				"flex: 1; background: #ffffff; border-radius: 16px; margin-right: 16px; margin-bottom: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); display: flex; flex-direction: column; overflow: hidden;";
			mainApp.appendChild(contentBox);

			const tabs = document.createElement("div");
			tabs.style.cssText =
				"display: flex; border-bottom: 1px solid #f1f3f4; padding-left: 8px; font-family: sans-serif;";
			tabs.innerHTML = `
  <div style="border-bottom: 3px solid #0b57d0; color: #0b57d0; font-weight: 600; padding: 15px 32px; font-size: 14px; display: flex; align-items: center; gap: 8px; cursor: pointer;">
    <i class="fa-solid fa-inbox"></i> Primärt
  </div>

  <div style="color: #000; opacity: 0.8; padding: 15px 32px; font-size: 14px; display: flex; align-items: center; gap: 8px; pointer-events: none; user-select: none; font-weight: 500;">
    <i class="fa-solid fa-tags" style="color:#188038"></i> Kampanjer
  </div>

  <div style="color: #000; opacity: 0.8; padding: 15px 32px; font-size: 14px; display: flex; align-items: center; gap: 8px; pointer-events: none; user-select: none; font-weight: 500;">
    <i class="fa-solid fa-user-group" style="color:#1A73E8"></i> Socialt
  </div>
`;
			contentBox.appendChild(tabs);

			const listContainer = document.createElement("div");
			listContainer.style.cssText =
				"background: #fff; padding: 0; flex: 1;";

			const emails = [
				{
					id: "mom",
					sender: "Elena Svalander",
					subject: "RE: je laatste bericht",
					preview: "Ingram, ik ben bezorgd...",
					unread: !state.readEmails.includes("mom"),
					check: "readMomEmail",
				},
				{
					id: "school",
					sender: "UIC Registrar",
					subject: "Academic Probation - Literature",
					preview: "Your major change...",
					unread: !state.readEmails.includes("school"),
				},
				{
					id: "remy",
					sender: "Rémy Lavergne",
					subject: "schedule / checklist",
					preview: "hey, just wrapped up...",
					unread: !state.readEmails.includes("remy"),
				},
				{
					id: "old1",
					sender: "Netflix",
					subject: "Your Subscription is Paused",
					preview: "Hi Ingram,...",
					unread: false,
				},
				{
					id: "old2",
					sender: "Dr. Chen",
					subject: "Appointment cancelled",
					preview: "Your appointment...",
					unread: false,
				},
			];

			const unreadCount = emails.filter((e) => e.unread).length;

			emails.forEach((email) => {
				const row = document.createElement("div");
				const isUnread = email.unread;

				row.style.cssText = `
        padding: 10px 16px;
        border-bottom: 1px solid #f1f3f4;
        cursor: pointer;
        background: ${isUnread ? "#fff" : "#f2f6fc"};
        font-weight: ${isUnread ? "700" : "400"};
        display: flex;
        align-items: center;
        gap: 16px;
        font-size: 14px;
        transition: box-shadow 0.1s ease;
      `;

				row.innerHTML = `
        <div style="width: 18px; height: 18px; border: 2px solid ${isUnread ? "#444746" : "#c4c7c5"}; border-radius: 2px; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #444746; flex-shrink: 0;">
          ${isUnread ? "" : "✓"}
        </div>
        <div style="width: 160px; color: #1f1f1f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex-shrink: 0;">
          ${email.sender}
        </div>
        <div style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #1f1f1f;">
          <span>${email.subject}</span>
          <span style="color: #444746; font-weight: 400;"> — ${email.preview}</span>
        </div>
      `;

				row.onmouseenter = () => {
					row.style.background = "#f7f9fc";
					row.style.boxShadow =
						"inset 1px 0 #0b57d0, inset -1px 0 #0b57d0, 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)";
				};
				row.onmouseleave = () => {
					row.style.background = isUnread ? "#fff" : "#f2f6fc";
					row.style.boxShadow = "none";
				};

				row.onclick = () => {
					console.log("Clicked email:", email.id);
					// Set event if check property exists
					if (email.check) {
						state.events[email.check] = true;
						console.log("Set event:", email.check, state.events);
					}

					// Or hardcode specific events:
					if (email.id === "mom") {
						state.events.readMomEmail = true;
					}
					if (email.id === "school") {
						state.events.readSchoolEmail = true;
					}
					if (email.id === "remy") {
						state.events.readRemyEmail = true;
					}
					showScene(`email_${email.id}`);
				};

				listContainer.appendChild(row);
			});

			contentBox.appendChild(listContainer);

			const footer = document.createElement("div");
			footer.style.cssText =
				"padding: 16px; text-align: center; background: #fff; border-top: 1px solid #f1f3f4;";

			if (unreadCount === 0) {
				footer.innerHTML = `<button id="close-email" style="background: #0b57d0; color: #fff; border: none; padding: 10px 24px; border-radius: 100px; cursor: pointer; font-weight: 500; font-family: 'Google Sans', sans-serif;">Close Laptop</button>`;
			} else {
				footer.innerHTML = `<span style="color: #444746; font-size: 12px;">${unreadCount} unread emails</span>`;
			}
			contentBox.appendChild(footer);

			mainApp.appendChild(contentBox);
			gmailDesktop.appendChild(mainApp);
			container.appendChild(gmailDesktop);

			if (unreadCount === 0) {
				document.getElementById("close-email").onclick = () => {
					showScene("ch2_remy");
				};
			}

			console.log("Email inbox rendered, unread:", unreadCount);
		},
		choices: [],
	},

	email_mom: {
		text: ``,
		onRender: (container) =>
			renderEmailContent(container, {
				id: "mom",
				from: "Elena Svalander <dekker.elena@hotmail.nl>",
				to: "ingram.svalander@gmail.com",
				subject: "RE: je laatste bericht",
				date: "lör 28 feb. 2026, 10:42",
				color: "#ea4335",
				content: `Ingram,

Ik ben bezorgd. Je hebt niet meer gebeld in drie weken. Je vader vraagt ook naar je - hij denkt dat je studeert maar ik weet dat je gestopt bent met de universiteit.

Die man waar je nu woont... ik heb een slecht gevoel. Je klinkt anders aan de telefoon. Je klinkt klein.

Alsjeblieft, bel me terug. Je kunt altijd naar huis komen. Je hoeft niets uit te leggen. Ik weet dat je niet "ziek" bent zoals hij zegt. Ik weet dat je gewoon... jezelf bent.

Ik hou van je,
Mama

---
Translation:

Ingram,

I'm worried. You haven't called in three weeks. Your father asks about you too - he thinks you're studying but I know you stopped university.

That man you live with now... I have a bad feeling. You sound different on the phone. You sound small.

Please, call me back. You can always come home. You don't have to explain anything. I know you're not "sick" like he says. I know you're just... yourself.

I love you,
Mama`,
				statChange: { awareness: 5 },
			}),
	},

	email_school: {
		text: ``,
		onRender: (container) =>
			renderEmailContent(container, {
				id: "school",
				from: "registrar@uic.edu",
				to: "isvala2@uic.edu",
				subject:
					"URGENT: SEVIS Status Review - Medical Reduced Course Load",
				date: "fre 27 feb. 2026 14:15",
				color: "#fbbc04",
				content: `Dear Mr. Svalander,

RE: Medical Reduced Course Load (RCL) Audit / Visa Status Review

Our records indicate that following your approved medical leave of absence during the 2022–2023 academic period, your transition to a Medical Reduced Course Load was processed for the subsequent 2023–2026 terms. 

Under federal regulations for international students, a Medical RCL permits part-time enrollment spread across the full 12-month annual cycle. However, this accommodation is strictly capped at a maximum cumulative total of 12 months per degree level. 

As of the current Spring 2026 term, your authorized medical extensions have been exhausted. 

To maintain valid F-1 visa status, you must either:
1. Resume a full-time credit load for the upcoming term.
2. Submit a formal request for a different immigration pathway.

Please contact International Student Services within 14 days to clarify your enrollment intentions, or your SEVIS record will be terminated for non-compliance.

Office of the Registrar
University of Illinois Chicago`,
				statChange: { awareness: 5 },
			}),
	},

	email_remy: {
		text: ``,
		onRender: (container) =>
			renderEmailContent(container, {
				id: "remy",
				from: "Rémy Lavergne <remy.lavergne@gmail.com>",
				to: "ingram.svalander@gmail.com",
				subject: "schedule / checklist",
				date: "tis 24 feb. 2026 18:54",
				color: "#34a853",
				content: `hey, just wrapped up a double shift. house was quiet when i left. you looked peaceful. you always look peaceful when you're unconscious.

remembered you forgot to update the shared calendar before i went in. let's not get sloppy with that again, okay? i don't like coming home to an empty house without knowing exactly where you are or who you're talking to. we talked about this after what happened last winter, after you tried to leave, after we established the rules.

i'm working late all through next week too, so i need you keeping the routine down. no deviations. no "forgetting." i know how your memory gets.

make sure the meal prep is sorted for when i get back on tuesday. clean sheets on the bed. and ingram—take your pills. i'll know if you haven't.

love you, be good.
-r`,
				statChange: { sanity: -5 },
			}),
	},

	ch2_remy: {
		text: `You've finished looking at your emails. The ones that matter, at least. The ones that don't require an immediate response, an immediate performance, an immediate act of gratitude for his attention.

You have a bad tendency to put it off for weeks. The inbox fills with unread notifications, with warnings and worries and the slow accumulation of a life you're not sure you're still living. But eventually, always, you answer him. You always answer him. You always will.

The cursor blinks. The apartment ticks. The collar waits, patient and leather and warm against your pulse.

You close the laptop.`,
		choices: [
			{
				text: ">> Think",
				next: "ch2_breakdown",
				stat: "sanity",
				val: -5,
				msg: "-5 Sanity",
			},
		],
	},
	ch2_breakdown: {
		text: `About what? About what a pathetic excuse for a person you are? About how you used to be so fucking intelligent and now you're nothing? About how your own mother refuses to acknowledge that you're sexually attracted to men? About how you used to be a person, and now you wait for him to come home and beg to be his.

    Your hands won't stop shaking. You press them flat against the kitchen counter—cold granite, imported, he chose it specifically because it "resisted stains"—and watch your fingertips blanch white.

    You used to design circuits. You used to speak three languages fluently. Now you stand in a $4,000 kitchen wearing a sweater he picked out, trying to remember if you chose this life or if he forced it on you. The distinction feels like it belongs to someone else, someone who had agency, someone who—

    Your reflection warbles in the chrome toaster. For a second, you don't recognize the face. Hollow cheeks. Softened jawline. Your body is his sculpture. Your mind is his—`,
		choices: [
			{
				text: ">> Did you forget something?",
				next: "ch2_meds",
				stat: "awareness",
				val: 5,
				msg: "+5 Awareness",
			},
		],
	},

	ch2_meds: {
		text: `Oh. 

Yeah.

…You forgot your meds, didn't you?

(—among other things.

Your neck feels bare.)
`,
		choices: [
			{
				text: ">> Think about the diagnosis",
				next: "ch2_diagnosis",
			},
		],
	},

	ch2_diagnosis: {
		text: `The schizoaffective diagnosis happened in 2020. You were 21, in your third year doing Engineering in America. Your parents were so happy. You, debatably less so. 

Everything had gone fine the first two years. Relatively. You already had your quirks. A sensitive child, your mama called you. Nobody was particularly surprised when you were diagnosed with Asperger's in 2010. The ADHD—you remember the doctor mentioning you showed it like a girl did. 

But it was fine. You were going to become an engineer like your dad and his dad before him and make them proud.

And then you started hearing the wires whisper to you. First, in the walls. Then circuits. Then under your skin. Your roommate at the time—what was his name again, Langdon?—found you in the shared bathroom with a knife slicing your arms up and had called 911.

It was there, hospitalised, that you met Remy Lavergne, a anaesthesiologist-in-training doing medical rotations.`,
		dynamicChoices: () => {
			return [
				{
					text: ">> Return to your room to find medication",
					next: "ch2_bedroom",
					check: "foundMeds",
					item: "seroquel_bottle",
					stat: "sanity",
					val: +5,
					msg: "+5 sanity",
				},
				{
					id: "refuse_diagnosis",
					text: state.refusedDiagnosis
						? ">> Be a good dog"
						: ">> Refuse",
					next: "ch2_diagnosis_refusal",
					check: "refusedDiagnosis", // Sets flag on first click
					disabled: state.refusedDiagnosis, // Faded on revisit
					stat: "sanity",
					val: -10, // Only applies first time
					msg: "-10 Sanity",
				},
			];
		},
	},

	ch2_diagnosis_refusal: {
		text: "",
		onRender: (container) => {
			const warningText = document.createElement("p");
			warningText.className = "shake-warning";
			warningText.style.cssText =
				"font-size: 16px; margin-bottom: 24px; line-height: 1.5;";
			warningText.innerText =
				"...Let's not do that. The last time you went into psychosis, Ingram, Remy was unhappy. And worried. But mostly unhappy. A good dog doesn't make its master worry. You don't want to hear the wires again, do you?";
			container.appendChild(warningText);
			const subtext = document.createElement("p");
			subtext.style.cssText =
				"font-size: 13px; color: #666; font-style: italic; margin-top: 0px;";
			subtext.innerText =
				"Be a good dog and stop thinking. Take your meds.";
			container.appendChild(subtext);
		},
		choices: [{ text: ">> Return", next: "ch2_diagnosis" }],
	},

	ch2_bedroom: {
		text: `The bottle is already open. Of course it is. He leaves them pre-opened now because your hands shake too much to push down and twist, because you cried once trying to get the child-lock off, because he likes you dependent and docile and chemically compliant.

You shake out one white pill. 400mg each. You used to be on 800mg. They taste like chalk and surrender on your tongue.`,

		onRender: (container) => {
			// Create bottle visual
			const bottleWrapper = document.createElement("div");
			bottleWrapper.style.cssText =
				"margin: 25px 0; display: flex; justify-content: center;";
			bottleWrapper.innerHTML = `
      <div style=" padding: 10px; max-width: 400px; display: flex; align-items: flex-end; gap: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
        
        <!-- Bottle -->
        <div style="position: relative; width: 120px; height: 180px; background: linear-gradient(90deg, #f5f5f5 0%, #ffffff 20%, #f0f0f0 50%, #e8e8e8 100%); border-radius: 8px 8px 20px 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.4), inset 0 -2px 5px rgba(0,0,0,0.1); display: flex; flex-direction: column; overflow: hidden;">
          <div style="height: 28px; background: linear-gradient(180deg, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%); border-bottom: 1px solid #ccc; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center;">
            <div style="width: 60%; height: 3px; background: #ddd; border-radius: 2px;"></div>
          </div>
          <div style="flex: 1; background: linear-gradient(180deg, #ffffff 0%, #f8f8f8 100%); margin: 8px 6px 12px 6px; border-radius: 4px; border: 1px solid #e0e0e0; padding: 8px; font-family: Arial, sans-serif; display: flex; flex-direction: column; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
            <div style="border-bottom: 2px solid #c41e3a; padding-bottom: 4px; margin-bottom: 6px;">
              <div style="font-size: 7px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Rx Only</div>
              <div style="font-size: 11px; font-weight: bold; color: #c41e3a; letter-spacing: -0.3px;">SEROQUEL®</div>
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; gap: 3px;">
              <div style="font-size: 8px; color: #333; font-weight: bold;">Quetiapine Fumarate</div>
              <div style="font-size: 9px; color: #000; font-weight: bold;">400 mg</div>
              <div style="font-size: 7px; color: #666; margin-top: 4px; line-height: 1.3;">
                60 Tablets<br>
                Take as directed<br>
                <span style="color: #999; font-size: 6px;">Ref: 2847-01</span>
              </div>
            </div>
            <div style="border-top: 1px solid #ddd; padding-top: 4px; margin-top: 4px;">
              <div style="font-size: 6px; color: #c41e3a; text-transform: uppercase; font-weight: bold;">May cause drowsiness</div>
            </div>
          </div>
          <div style="position: absolute; top: 30px; right: 8px; width: 8px; height: 60%; background: linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%); border-radius: 4px; pointer-events: none;"></div>
        </div>
        
        <!-- Pills -->
        <div style="display: flex; flex-direction: column; gap: 8px; align-items: center; padding-bottom: 10px;">
          <div id="seroquel-pill" style="width: 32px; height: 18px; background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e8e8e8 100%); border-radius: 50%; box-shadow: 0 3px 6px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.1); border: 1px solid #ddd; position: relative; cursor: pointer; transition: opacity 1.5s ease, transform 1.5s ease;">
  <div style="position: absolute; bottom: 2px; right: 8px; font-size: 5px; color: rgba(0,0,0,0.2); font-weight: bold;">500</div>
</div>  
      </div>

    `;

			container.appendChild(bottleWrapper);

			const pill = document.getElementById("seroquel-pill");
			if (pill) {
				pill.style.cursor = "pointer";

				const popOut = (p) => {
					// Quick pop then vanish
					p.style.transition =
						"transform 0.15s ease, opacity 0.15s ease";
					p.style.transform = "scale(1.4)"; // expand first
					p.style.opacity = "0.5";

					setTimeout(() => {
						p.style.transform = "scale(0) rotate(90deg)";
						p.style.opacity = "0";

						// Respawn after delay
						setTimeout(() => popIn(p), 100);
					}, 100);
				};

				const popIn = (p) => {
					// Reset for pop in
					p.style.transition = "none";
					p.style.transform = "scale(0)";
					p.style.opacity = "0";

					// Force reflow
					void p.offsetWidth;

					// Pop in with bounce
					p.style.transition =
						"transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease";
					p.style.transform = "scale(1)";
					p.style.opacity = "1";
				};

				pill.onclick = () => {
					// Pop out
					pill.style.animation = "popVanish 0.4s forwards";

					// Come back after 2 seconds
					setTimeout(() => {
						pill.style.animation = "none";
						void pill.offsetWidth; // CRITICAL: forces reflow to reset animation
						pill.style.animation =
							"popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards";
					}, 500);
				};

				if (!state.tookMeds) {
					state.tookMeds = true;
					state.energy = Math.max(0, state.energy - 10);
					updateStats();

					const energyAlert = document.createElement("div");
					energyAlert.className = "stat-alert";
					energyAlert.style.marginTop = "15px";
					energyAlert.innerHTML =
						"-10 Energy (pharmaceutical sedation)";
					container.appendChild(energyAlert);
					showToast(
						"-10 Energy (pharmaceutical sedation)",
						"warning",
					);
				}
			}

			// Continue narrative after the visual
			const continuation = document.createElement("p");
			continuation.style.marginTop = "25px";
			continuation.innerHTML = `You swallow it dry—he didn't leave water out today, or maybe you spilled it, or maybe you don't deserve it—and feel it scrape down your throat like penance.

It won't hit for an hour. The chemical straightjacket takes time to fasten. But you feel better already, don't you? Taking them means you're good. Taking them means you acknowledge the rules.

  There you go. You really are useless without Remy around, aren't you? How could you have ever survived by yourself?`;
			container.appendChild(continuation);

			// Actually give the item
			if (!state.inventory.includes("seroquel_bottle")) {
				giveItem("seroquel_bottle");
			}
		},
		dynamicChoices: () => {
			return [
				{
					text: ">> Aren't you forgetting something else?",
					next: "ch2_collar",
					check: "checkedCollar", // Sets to true after first click
					stat: "awareness",
					val: 10,
					msg: "+10 Awareness",
				},
			];
		},
	},

	ch2_collar: {
		text: `No. Of course not. You wouldn't forget. You're well-behaved.

Your hand flies to your throat. 

Bare.

The skin there feels wrong—exposed, vulnerable, obscene somehow. Like leaving the house without pants. You can feel your pulse hammering against open air, unmarked, unowned. The absence is a scream.

You remember the last time you forgot. He didn't hit you—he doesn't hit when you forget, he just gets <i>disappointed</i>, which is worse—but he made you sleep on the floor by the bed, leashed to the frame, "for your own safety." He cried while he did it. Said you were killing him with your carelessness.

Your neck hurts already, anticipating the relief of constriction.
`,
		dynamicChoices: () => {
			const base = [
				{
					id: "ch2_covers",
					text: ">> Search under the covers",
					check: "checkedCovers",
					stat: "awareness",
					val: 5,
					msg: "+5 Awareness",
				},
				{
					id: "ch2_wardrobe",
					text: ">> Search the wardrobe",
					check: "checkedWardrobe",
					stat: "awareness",
					val: 5,
					msg: "+5 Awareness",
				},
				{
					id: "ch2_dresser",
					text: ">> Search the dresser",
					check: "checkedDresser",
					stat: "awareness",
					val: 10,
					item: "collar",
					msg: "+10 Awareness",
				},
			];

			const canLeave = state.inventory.includes("collar");

			return [
				...base.map((c) => ({ ...c, disabled: state[c.check] })),
				canLeave
					? {
							id: "collar_found",
							text: ">> Put on the collar",
							next: "ch2_collar_result",
							disabled: false,
							check: "wearingCollar",
							stat: "sanity",
							val: 55,
							msg: "+55 Sanity",
						}
					: {
							text: "You want to be a good dog, don't you? Find it.",
							disabled: true,
							isInfo: true,
						},
			];
		},
	},

	ch2_covers_result: {
		text: `You check under the blanket. You find <b>a sex toy</b> (clean, by the looks of it), <b>your AirPod case</b>, <b>a shirt</b>, <b>chocolate wrappers</b>, but not what you need.`,
		choices: [
			{ id: "ch2_phone_back", text: ">> Return", next: "ch2_collar" },
		],
	},

	ch2_wardrobe_result: {
		text: `You open the wardrobe. You find __.`,
		choices: [
			{ id: "ch2_phone_back", text: ">> Return", next: "ch2_collar" },
		],
	},

	ch2_dresser_result: {
		text: `You open the top drawer of your bedside dresser.

And there it is.

Your collar. Black leather and silver metal, snug against your neck.

You don't know where Remy got it from, exactly. He says he likes to keep you on edge. You're not sure whether it being from a BDSM shop or a pet shop would be better. Either way, he got it engraved.
<div style="position: relative; margin-top:20px; margin-bottom: 0px; display: flex; align-items: center; justify-content: center;">
  <div style="width: 500px; height: 50px; background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #0d0d0d 100%); border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1); position: relative; border: 2px solid #333;">
    <div style="position: absolute; top: 6px; left: 14px; right: 14px; height: 2px; border-top: 2px dashed #444;"></div>
    <div style="position: absolute; bottom: 6px; left: 14px; right: 14px; height: 2px; border-bottom: 2px dashed #444;"></div>
    <div style="position: absolute; left: 54px; top: 50%; transform: translateY(-50%); width: 25px; height: 36px; border: 5px solid #666; border-radius: 50%; box-shadow: 0 4px 8px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3); background: linear-gradient(135deg, #888 0%, #555 100%);"></div>
    <div style="position: absolute; right: 72px; top: 50%; transform: translateY(-50%); width: 180px; height: 32px; background: linear-gradient(180deg, #c0c0c0 0%, #808080 50%, #606060 100%); border-radius: 6px; box-shadow: 0 4px 8px rgba(0,0,0,0.4), inset 0 2px 2px rgba(255,255,255,0.4); display: flex; align-items: center; justify-content: center; border: 2px solid #555;">
      <div style="font-family: 'Times New Roman', serif; font-size: 12px; color: #333; font-weight: bold; letter-spacing: 0.5px; text-shadow: 0 1px 0 rgba(255,255,255,0.3); font-variant: small-caps;">Property of Rémy Lavergne</div></div>
    <div style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%); width: 28px; height: 40px; background: linear-gradient(180deg, #888 0%, #555 100%); border-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.5);"></div>
  </div>
</div>`,

		choices: [
			{ id: "ch2_phone_back", text: ">> Return", next: "ch2_collar" },
		],
	},

	ch2_collar_result: {
		text: `<em>Click.</em>

    The sound is final. Familiar, even.

You look up and catch your reflection in the dresser mirror. For a moment—just a split second before the Seroquel blurs the edges—you see yourself clearly: a pale, wide-eyed thing in a too-big sweater, throat encircled by black leather, eyes flat and accepting as a cow led to slaughter.

You don't look like an engineering student. You don't look like a person who once had opinions about Kafka and modular synthesis. You look like property well-maintained. You look like what he made you.

The engraving catches the light. You touch it with one finger. It's warm from your body heat. You can't help but smile. It feels like coming home.

A deep exhale leaves your mouth. You finally feel at peace.
`,
		dynamicChoices: () => {
			return [
				{
					text: ">> Next",
					next: "chapter_3",
				},
			];
		},
	},
};
window.SCENES = SCENES;
