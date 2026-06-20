import { state } from "../../js/engine/state.js";

export const apartment = {
		text: `The bedroom door clicks shut behind you, sealing away the relative safety of the mattress, the only space in the apartment that feels even temporarily yours.

Outside, the apartment stretches into a long, narrow corridor of dark hardwood and beige paint. Everything is exactly where it belongs. The silver keys rest in the porcelain dish by the entryway, aligned at perfect right angles. The copper pots hang in a perfect, descending line above the stove, a museum exhibit of domesticity. It feels less like a home and more like a gallery where the curator is constantly monitoring your footprints, your fingerprints, the angle at which you leave a spoon in the sink.

The air smells faintly of Rémy's cologne—cedar wood and expensive soap, something he buys at the medical supply store that makes him smell like antiseptic and money. It lingers even though he left for the hospital hours ago, a ghost of his presence, a reminder that the walls themselves have been colonized by him, that even in his absence he occupies every cubic inch of breathable space.

The silence here is heavier. It fills the gaps between the ticking of the wall clock, presses against your eardrums, makes you aware of your own breathing, the rise and fall of your chest under the sweater he picked out for you.`,
		dynamicChoices: () => {
			const base = [
				{
					id: "doomscroll",
					text: ">> Go on your phone",
					check: "checkedDoomscroll",
					next: "doomscroll",
					stat: "sanity",
					val: -5,
					msg: "-5 Sanity",
				},
				{
					id: "door",
					text: ">> Leave the house",
					check: "checkedDoor",
					next: "door",
					stat: "sanity",
					val: -10,
					msg: "-10 Sanity",
				},
				{
					id: "kitchen",
					text: ">> Go to the kitchen",
					check: "checkedKitchen",
					next: "kitchen_prep",
					stat: "awareness",
					val: 5,
					msg: "+5 Awareness",
				},
			];
			const canProgress =
				state.checkedKitchen;
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
	}