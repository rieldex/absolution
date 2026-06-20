import { state } from "./state.js";

export function updateTabTitle() {
  // 1. LOOK UP THE ELEMENT LIVE: Now the function can safely check the title screen visibility
  const titleScreen = document.getElementById("title-screen");

  // 2. CHECK VISIBILITY: If the title screen exists and is NOT hidden, lock the emoji title
  if (titleScreen && titleScreen.style.display !== "none") {
    document.title = "F.S.S.S // 🐕";
    return;
  }

  const currentScene = state.currentScene || "opening";

  // Clean up underscores if your scene IDs use them (e.g., "living_room" -> "Living Room")
  const cleanScene = currentScene
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  document.title = `F.S.S.S | ${cleanScene}`;
}
