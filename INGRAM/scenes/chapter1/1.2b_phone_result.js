import { state } from "../../js/engine/state.js";
import { renderIphoneLockscreen } from "../../js/engine/renderUtils.js";

export const phone_result = {
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
	}