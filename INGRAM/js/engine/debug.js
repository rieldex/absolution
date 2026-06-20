import { state, saveGame, resetGameState } from './state.js';
import { updateStats } from './stats.js';
import { ITEM_DATABASE } from '../content/items.js';  
import { showScene } from './renderer.js';  
import { checkThresholds } from './stats.js';
import { SCENES } from '../../scenes/_index.js';
import { giveItem } from './inventory.js';
import { showToast } from './ui.js';

export function toggleDebug() {
  const panel = document.getElementById('debug-panel');
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

export 
function setStatDirect(stat, targetValue) {
  if (typeof state[stat] === 'undefined') {
    console.error(`Stat key "${stat}" not found in game state.`);
    return;
  }

  state[stat] = Math.max(0, Math.min(100, targetValue));
  
  checkThresholds();
  updateStats();
  saveGame();
  
  showToast(`${stat} set to ${state[stat]}`, 'info', 1500);
}

export function populateDebugScenes() {
  const selectNode = document.getElementById('debug-scene-select');
  if (!selectNode) return;
  
  selectNode.innerHTML = '';
  
  if (Object.keys(SCENES).length === 0) {
    selectNode.innerHTML = '<option>-- No scenes --</option>';
    return;
  }
  
  Object.keys(SCENES).forEach(key => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = key;
    selectNode.appendChild(opt);
  });
}

export function debugJumpToScene() {
  const selectNode = document.getElementById('debug-scene-select');
  if (!selectNode) return;
  
  const targetSceneKey = selectNode.value;
  state.currentScene = targetSceneKey;
  showScene(targetSceneKey);
  showToast(`Jumped to scene: ${targetSceneKey}`, 'info');
  saveGame();
}

export function debugGiveAllItems() {
  if (typeof ITEM_DATABASE === 'undefined') return;
  
  let grantedCount = 0;
  for (const itemKey in ITEM_DATABASE) {
    if (ITEM_DATABASE.hasOwnProperty(itemKey)) {
      if (!state.inventory.includes(itemKey)) {
        giveItem(itemKey);
        grantedCount++;
      }
    }
  }
  
  if (grantedCount > 0) {
    showToast(`Added ${grantedCount} database items to inventory`, 'info');
  } else {
    showToast(`Inventory already contains all valid items`, 'warning');
  }
}





// Completely clear all boolean progress flags, checked values, and reset base metrics
function debugResetAllStates() {
  // Clear state
  for (const key in state) {
    if (state.hasOwnProperty(key)) delete state[key];
  }
  
  // Reset to defaults
  Object.assign(state, {
    awareness: 0,
    energy: 100, 
    sanity: 100,
    inventory: [],
    profiles: [],
    history: [],
    readEmails: ['old_email1', 'old_email2'],
    currentScene: 'opening',
    checkedWallet: false,
    checkedPhone: false,
    checkedCh2Phone: false,
    checkedCh2Leave: false,
    checkedCh2Kitchen: false,
    hasRefusedToCook: false,
    dinnerChoice: ""
  });
  
  updateStats();
  updateDebugStateMonitor(); // Refresh the debug view
  populateDebugScenes(); // Reset scene selector
  showScene('opening');
  showToast("Game state reset to opening", 'warning');
}

// Print the running tracking variables into a console log for rapid verification
export function debugLogCurrentState() {
  console.log("=== ACTIVE ENGINE TRACKING VARIABLES ===");
  console.dir(state);
}

export function updateDebugStateMonitor() {
  const monitor = document.getElementById('debug-state-monitor');
  if (!monitor) return;
  
  // Build a clean view of relevant flags/state
  const debugState = {
    currentScene: state.currentScene,
    awareness: state.awareness,
    sanity: state.sanity,
    energy: state.energy,
    dinnerChoice: state.dinnerChoice || null,
    flags: {},
    events: state.events,
  };
  
  // Capture boolean flags and checked states
  Object.keys(state).forEach(key => {
    if (typeof state[key] === 'boolean') {
      debugState.flags[key] = state[key];
    }
    if (key.startsWith('checked') || key.startsWith('has') || key.startsWith('read')) {
      debugState.flags[key] = state[key];
    }
  });
  
  // Capture inventory and profiles
  debugState.inventory = state.inventory;
  debugState.profiles = state.profiles;
  
  monitor.textContent = JSON.stringify(debugState, null, 2);
}

// Add ~ key to toggle debug
document.addEventListener('keydown', (e) => {
  if (e.key === '`' || e.key === '~' || e.key === 'Backquote') toggleDebug();
});

// Expose debug functions globally for HTML onclick handlers
window.toggleDebug = toggleDebug;
window.setStatDirect = setStatDirect;
window.debugJumpToScene = debugJumpToScene;
window.debugGiveAllItems = debugGiveAllItems;