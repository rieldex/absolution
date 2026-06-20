import {
  state,
  prevStats,
  loadGame,
  updatePrevStats,
  clearSave,
} from "./engine/state.js";
import {
  toggleDebug,
  setStatDirect,
  populateDebugScenes,
  updateDebugStateMonitor,
} from "./engine/debug.js";
import {
  toggleInventoryOverlay,
  closeItemPopupModal,
  openItemPopupModal,
  buildInventoryUI,
} from "./engine/inventory.js";
import { updateStats, modStat } from "./engine/stats.js";
import { showScene } from "./engine/renderer.js";
import {
  toggleProfilesOverlay,
  discoverPerson,
  buildProfilesUI,
} from "./engine/profiles.js";
import { showProfileUnlock } from "./engine/ui.js";
import { updateTabTitle } from './engine/tabTitle.js';

console.log("main.js loaded!");

window.toggleInventoryOverlay = toggleInventoryOverlay;
window.openItemPopupModal = openItemPopupModal;
window.closeItemPopupModal = closeItemPopupModal;
window.buildInventoryUI = buildInventoryUI;
window.toggleProfilesOverlay = toggleProfilesOverlay;
window.discoverPerson = discoverPerson;
window.showProfileUnlock = showProfileUnlock;
window.setStatDirect = setStatDirect;
window.modStat = modStat;
window.toggleDebug = toggleDebug;

// ==========================================
// TITLE SCREEN LOGIC
// ==========================================

function initTitleScreen() {
  const titleScreen = document.getElementById("title-screen");
  const story = document.getElementById("story");
  const stats = document.getElementById("stats");
  const startBtn = document.getElementById("start-btn");

  if (!titleScreen || !startBtn) {
    console.error("Title screen elements not found!");
    return;
  }

  startBtn.addEventListener("click", () => {
    // Fade out title screen
    titleScreen.style.transition = "opacity 0.5s ease";
    titleScreen.style.opacity = "0";

    setTimeout(() => {
      titleScreen.style.display = "none";
      story.style.display = "block";
      story.classList.remove('hidden');
      stats.style.display = "flex";

      // Now initialize the actual game
      initGame();
    }, 500);
  });
}

// ==========================================
// GAME INITIALIZATION
// ==========================================

function initGame() {
  const savedScene = loadGame();
  updateStats();
  showScene(savedScene || "opening");
  populateDebugScenes();
  updateDebugStateMonitor();
}

// ==========================================
// SETUP
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  updateTabTitle();
  const titleScreen = document.getElementById("title-screen");
  const story = document.getElementById("story");
  const stats = document.getElementById("stats");

  // Check for existing save
  const hasSave = localStorage.getItem("ingramStorySave") !== null;

  if (hasSave) {
    // Skip title screen - resume game immediately
    titleScreen.style.display = "none";
    story.style.display = "block";
    stats.style.display = "flex";
    initGame();
  } else {
    // No save - show title screen
    initTitleScreen();
  }

  // Setup other listeners
  document
    .getElementById("debug-toggle-btn")
    ?.addEventListener("click", toggleDebug);
  document
    .getElementById("inventory-toggle-btn")
    ?.addEventListener("click", toggleInventoryOverlay);
  setupInventoryOverlay();
  setupItemPopup();
  setupProfilesOverlay();

  document.addEventListener("keydown", (e) => {
    if (e.key === "i") toggleInventoryOverlay();
    if (e.key === "p") toggleProfilesOverlay();
  });

  document
    .getElementById("clear-save-btn")
    ?.addEventListener("click", clearSave);
  document
    .getElementById("profiles-toggle-btn")
    ?.addEventListener("click", toggleProfilesOverlay);
});

function setupItemPopup() {
  const modal = document.getElementById("item-popup-modal");

  if (!modal) {
    console.error("Item popup modal not found!");
    return;
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      e.stopPropagation();
      console.log("Item popup background clicked, closing item");
      closeItemPopupModal();
    }
  });

  console.log("Item popup setup complete");
}

function setupInventoryOverlay() {
  const overlay = document.getElementById("inventory-screen");
  const content = document.getElementById("inventory-content");
  const closeBtn = document.getElementById("inventory-close-btn");

  console.log("Elements:", overlay, content, closeBtn);

  if (!overlay || !content || !closeBtn) {
    console.error("MISSING ELEMENTS!");
    return;
  }

  console.log("Attaching listeners...");

  overlay.addEventListener("click", () => {
    const itemPopup = document.getElementById("item-popup-modal");
    if (itemPopup.style.display === "flex") {
      console.log("Inventory click blocked - item popup is open");
      return;
    }
    toggleInventoryOverlay();
  });

  console.log(">>> setup complete");
}

function setupProfilesOverlay() {
  const overlay = document.getElementById("profiles-screen");
  const closeBtn = document.getElementById("profiles-close-btn");

  console.log("Setting up profiles...");
  console.log("Overlay:", overlay);
  console.log("Close button:", closeBtn);

  if (!closeBtn) {
    console.error("Close button NOT FOUND!");
    return;
  }

  console.log("Attaching click listener to close button");

  closeBtn.addEventListener("click", (e) => {
    console.log("CLOSE BUTTON CLICKED!");
    e.stopPropagation();
    toggleProfilesOverlay();
  });

  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) {
      console.log("Background clicked, closing");
      toggleProfilesOverlay();
    }
  });
}