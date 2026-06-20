// ==========================================
// GAME STATE - Single source of truth
// ==========================================

export const state = {
  // Core stats
  awareness: 0,
  energy: 100,
  sanity: 70,

  // Identity tracking
  lastKnownSelfTitle: "Self",

  // Chapter 1 flags
  checkedWallet: false,
  checkedPhone: false,
  checkedCh2Kitchen: false,
  dinnerChoice: "",
  hasRefusedToCook: false,

  // Email system
  readEmails: ["old_email1", "old_email2"],
  currentEmailView: null,
  emailContents: {
    mom: false,
    school: false,
    spam: false,
    remy: false,
  },
  hasClosedLaptop: false,

  // Medication tracking
  refusedMeds: false,
  foundMeds: false,
  tookMeds: false,

  // Collar/wardrobe tracking
  checkedCollar: false,
  checkedCovers: false,
  checkedWardrobe: false,
  checkedDresser: false,
  wearingCollar: false,

  // Optional events
  checkedDoomscroll: false,
  checkedDoor: false,

  // Story events
  events: {
    readSchoolEmail: false,
    readMomEmail: false,
    readRemyEmail: false,
    discoveredRemyPast: false,
    unlockedBreakHistory: false,
    foundMedicalRecords: false,
    witnessedArgument: false,
  },

  // Collections
  inventory: [],
  profiles: [],
  history: [],

  // Navigation
  currentScene: "opening",
  isGoingBack: false,
};

// Previous stats for threshold detection (don't export this directly, use getter/setter)
let _prevStats = { awareness: 0, sanity: 70, energy: 100 };

export const prevStats = {
  get awareness() {
    return _prevStats.awareness;
  },
  set awareness(val) {
    _prevStats.awareness = val;
  },
  get sanity() {
    return _prevStats.sanity;
  },
  set sanity(val) {
    _prevStats.sanity = val;
  },
  get energy() {
    return _prevStats.energy;
  },
  set energy(val) {
    _prevStats.energy = val;
  },
};

// Sync prevStats with current state (call after loading or modifying stats directly)
export function updatePrevStats() {
  _prevStats = {
    awareness: state.awareness,
    sanity: state.sanity,
    energy: state.energy,
  };
}

// ==========================================
// SAVE / LOAD
// ==========================================

const KEYS = {
  RUN: "ingramRun", // wiped on new game
  PERSISTENT: "ingramMeta", // achievements + archives 
  SETTINGS: "ingramSettings" // prefs
}

const SAVE_KEY = "ingramStorySave";

export function saveGame() {
  console.log('Saving scene:', state.currentScene);
  localStorage.setItem(
    SAVE_KEY,
    JSON.stringify({
      state,
      currentScene: state.currentScene,
      isGoingBack: state.isGoingBack || false,
      history: state.history || [],
    }),
  );
}

export function loadGame() {
  const saved = localStorage.getItem("ingramStorySave");
  if (saved) {
    const data = JSON.parse(saved);
    Object.assign(state, data.state);
    state.isGoingBack = data.isGoingBack || false;
    state.history = data.history || [];
    updatePrevStats();
    return data.currentScene;
  }
  return null;
}

export function clearSave() {
  localStorage.removeItem("ingramStorySave");
  location.reload();
}

// ==========================================
// DEBUG: Reset everything
// ==========================================

export function resetGameState() {
  // Reset to defaults
  Object.assign(state, {
    awareness: 0,
    energy: 100,
    sanity: 70,
    lastKnownSelfTitle: "Self",
    checkedWallet: false,
    checkedPhone: false,
    checkedCh2Phone: false,
    checkedCh2Leave: false,
    checkedCh2Kitchen: false,
    dinnerChoice: "",
    hasRefusedToCook: false,
    readEmails: ["old_email1", "old_email2"],
    currentEmailView: null,
    emailContents: { mom: false, school: false, spam: false, remy: false },
    hasClosedLaptop: false,
    refusedMeds: false,
    foundMeds: false,
    tookMeds: false,
    checkedCollar: false,
    checkedCovers: false,
    checkedWardrobe: false,
    checkedDresser: false,
    wearingCollar: false,
    events: {
      readSchoolEmail: false,
      readMomEmail: false,
      readRemyEmail: false,
      discoveredRemyPast: false,
      unlockedBreakHistory: false,
      foundMedicalRecords: false,
      witnessedArgument: false,
    },
    inventory: [],
    profiles: [],
    history: [],
    currentScene: "opening",
    isGoingBack: false,
  });

  updatePrevStats();
}