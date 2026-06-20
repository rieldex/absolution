import { state } from "../../js/engine/state.js";

export const wakeup = {
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
	}