import { state } from "./state.js";
import {
  CHARACTER_DATABASE,
  PROFILE_COLORS,
  DISPLAY_NAMES,
} from "../content/characters.js";
import { toggleProfilesOverlay } from "./profiles.js";

// Toast queue system
const toastQueue = [];
let toastProcessing = false;

export function showToast(message, type = "info", duration = 3000) {
  toastQueue.push({ message, type, duration });
  if (!toastProcessing) processToastQueue();
}

export function processToastQueue() {
  if (toastQueue.length === 0) {
    toastProcessing = false;
    return;
  }
  toastProcessing = true;

  while (toastQueue.length > 0) {
    const { message, type, duration } = toastQueue.shift();

    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    toast.offsetHeight;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
  toastProcessing = false;
}

export function showIdentityShiftModal(newTitle) {
  const container = document.getElementById("toast-left-container");
  const toast = document.createElement("div");

  // Determine severity text and color
  let headerText, accent, bgColor;
  if (state.sanity < 10) {
    // Critical - violent red
    headerText = "Perception distortion critical";
    accent = "#ff5555";
    bgColor = "#2a0a0a"; // Deep red
  } else if (state.sanity < 30) {
    // Warning - sickly orange/amber
    headerText = "Coherence degrading";
    accent = "#ffaa00";
    bgColor = "#2a1a0a"; // Brown/amber
  } else {
    // Normal - Ingram's green theme
    headerText = "Self-perception altered";
    accent = "#86a66d"; // Light green
    bgColor = "#0d1f0d"; // Dark green
  }

  const shakeAnim =
    state.sanity < 10
      ? "animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;"
      : "";
  const glowStyle =
    state.sanity < 20
      ? `text-shadow: 0 0 10px ${accent}, 0 0 20px ${accent};`
      : "";

  toast.style.cssText = `
  background: ${bgColor};
  border-left: 4px solid ${accent};
  color: #fff;
  padding: 12px 16px;
  border-radius: 0 4px 4px 0;
  font-size: 13px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
  transform: translateX(-120%);
  transition: transform 0.3s ease;
  font-family: "Lora", serif;
  ${shakeAnim}
`;

  toast.innerHTML = `
    <div style="font-size: 11px; color: ${accent}; text-transform: uppercase; margin-bottom: 4px; font-weight: bold; ${glowStyle}">
      <i class="fa-solid fa-bolt"></i> ${headerText}
    </div>
    <div style="font-size: 12px; color: #ccc;">
      Identity status: <span style="color: ${accent}; font-weight: bold; ${glowStyle}">${newTitle}</span>
    </div>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => (toast.style.transform = "translateX(0)"));

  setTimeout(
    () => {
      toast.style.transform = "translateX(-120%)";
      setTimeout(() => toast.remove(), 300);
    },
    state.sanity < 10 ? 8000 : 5000,
  );
}

export function showProfileUnlock(personId, sectionName) {
  const person = CHARACTER_DATABASE[personId];
  const displayName = person?.getDisplayName
    ? person.getDisplayName(state)
    : person?.name || personId;
  const baseName = DISPLAY_NAMES[personId] || personId;
  const colors = PROFILE_COLORS[personId] || {
    accent: "#9fa8da",
    bg: "#1a1a2e",
  };
  if (!person) return;
  const container = document.getElementById("toast-left-container");
  const toast = document.createElement("div");

  // Profile unlock styling
  toast.style.cssText = `
    background: ${colors.bg};
    border-left: 4px solid ${colors.accent};
    color: #fff;
    padding: 12px 16px;
    border-radius: 0 4px 4px 0;
    font-size: 13px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    transform: translateX(-120%);
    transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
    cursor: pointer;
    font-family: "Lora", serif;
  `;

  toast.innerHTML = `
  <div style="font-weight: 600; margin-bottom: 4px; color: ${colors.accent}; font-size: 11px; text-transform: uppercase;">
    <i class="fa-solid fa-unlock-keyhole"></i> ${sectionName}: ${baseName}
  </div>
  <div style="font-size: 11px; color: #888;">Click to view profile</div>
`;

  toast.onclick = () => {
  void toast.offsetWidth; // Force reflow
  toast.style.transform = 'translateX(-120%)'; // Add slide
  toast.style.opacity = '0';
  setTimeout(() => toast.remove(), 300); // Match transition
  toggleProfilesOverlay();
};

container.appendChild(toast);
void toast.offsetWidth;
toast.style.transform = 'translateX(0)';

setTimeout(() => {
  void toast.offsetWidth; // FORCE REFLOW - this is the fix
  toast.style.transform = 'translateX(-120%)';
  toast.style.opacity = '0';
  setTimeout(() => toast.remove(), 300);
}, 4000);

  document.getElementById("profile-badge").style.display = "inline";
}