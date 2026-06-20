import { state, prevStats, updatePrevStats, saveGame } from './state.js';
import { CHARACTER_DATABASE, DISPLAY_NAMES, PROFILE_COLORS } from '../content/characters.js';
import { showToast, showIdentityShiftModal } from './ui.js';  
import { updateDebugStateMonitor } from './debug.js';

window.checkThresholds = checkThresholds;
window.modStat = modStat;

export function getSanityLabel(val) {
  if (val >= 80) return "calm";
  if (val >= 60) return "troubled";
  if (val >= 40) return "despondent";
  if (val >= 20) return "deranged";
  return "unhinged from reality";
}

export function getAwarenessLabel(val) {
  if (val < 25) return "ignorance is bliss";
  if (val < 60) return "the veil thins"; // middle
  return "awakened";
}

export function getEnergyLabel(val) {
  if (val >= 70) return "high spirits";
  if (val >= 40) return "tired";
  return "exhausted";
}

export function updateStats() {
  ['awareness', 'energy', 'sanity'].forEach(stat => {
    // Update numbers and width
    document.getElementById(`num-${stat}`).textContent = `${state[stat]}/100`;
    const fillEl = document.getElementById(`fill-${stat}`);
    fillEl.style.width = `${state[stat]}%`;
    
    // Remove existing tier classes
    fillEl.classList.remove('low', 'mid', 'high');
    
    // Add appropriate tier class based on stat value
    const value = state[stat];
    if (value <= 33) {
      fillEl.classList.add('low');
    } else if (value <= 66) {
      fillEl.classList.add('mid');
    } else {
      fillEl.classList.add('high');
    }

    
    const sanityFill = document.getElementById("fill-sanity");
    sanityFill.className = "stat-fill-fluid";
    if (state.sanity < 30) sanityFill.classList.add("low");
    else if (state.sanity < 70) sanityFill.classList.add("mid");
    else sanityFill.classList.add("high");

    const awareFill = document.getElementById("fill-awareness");
    awareFill.className = "stat-fill-fluid";
    if (state.awareness < 25) awareFill.classList.add("low");
    else if (state.awareness < 60) awareFill.classList.add("mid");
    else awareFill.classList.add("high");

    const energyFill = document.getElementById("fill-energy");
    energyFill.className = "stat-fill-fluid";
    if (state.energy < 40) energyFill.classList.add("low");
    else if (state.energy < 70) energyFill.classList.add("mid");
    else energyFill.classList.add("high");

  });
  
  // Update tooltips
  document.getElementById('sanity-row').setAttribute('data-tooltip', getSanityLabel(state.sanity));
  document.getElementById('awareness-row').setAttribute('data-tooltip', getAwarenessLabel(state.awareness));
  document.getElementById('energy-row').setAttribute('data-tooltip', getEnergyLabel(state.energy));
  
  updateDebugStateMonitor();
}


export function modStat(stat, amount) {
  const oldVal = state[stat];
  state[stat] = Math.max(0, Math.min(100, state[stat] + amount));
  
  checkThresholds();
  updateStats();
  saveGame();
  
  showToast(`${stat}: ${amount > 0 ? '+' : ''}${amount} (${state[stat]})`, 'info', 1500);
}

export function checkThresholds() {
  // FIX: Pass state to getTitle
  if (CHARACTER_DATABASE && CHARACTER_DATABASE.ingram && typeof CHARACTER_DATABASE.ingram.getTitle === 'function') {
    const currentTitle = CHARACTER_DATABASE.ingram.getTitle(state);
    if (typeof state.lastKnownSelfTitle === 'undefined') {
      state.lastKnownSelfTitle = currentTitle;
    }
    
    if (currentTitle !== state.lastKnownSelfTitle) {
      state.lastKnownSelfTitle = currentTitle;
      showIdentityShiftModal(currentTitle);
    }
  }

  const awarenessTiers = [
    { threshold: 10, profile: 'remy', name: 'Your View' },
    { threshold: 15, profile: 'remy', name: 'Their View' },
    { threshold: 20, profile: 'remy', name: 'Status' },
    { threshold: 25, profile: 'remy', name: 'Background' },
    { threshold: 30, profile: 'remy', name: 'Details' },
    { threshold: 35, profile: 'remy', name: 'Origin' },
    { threshold: 40, profile: 'remy', name: 'Their View' },
    { threshold: 45, profile: 'remy', name: 'Status' },
    { threshold: 55, profile: 'remy', name: 'Diagnoses' },
    { threshold: 60, profile: 'remy', name: 'Truth' },
    { threshold: 65, profile: 'remy', name: 'Status' },
    { threshold: 70, profile: 'remy', name: 'Truth' },
    
    { threshold: 20, profile: 'ingram', name: 'Background' },
    { threshold: 25, profile: 'ingram', name: 'Origin' },
    { threshold: 30, profile: 'ingram', name: 'Diagnoses' },
    { threshold: 35, profile: 'ingram', name: 'Origin' },
    { threshold: 40, profile: 'ingram', name: 'Details' },
    { threshold: 45, profile: 'ingram', name: 'Truth' },
    { threshold: 50, profile: 'ingram', name: 'Diagnoses' },
    { threshold: 55, profile: 'ingram', name: 'Truth' },
    { threshold: 65, profile: 'ingram', name: 'Truth' },
    { threshold: 70, profile: 'ingram', name: 'Truth' }
  ];
  if (typeof prevStats === 'undefined') {
    window.prevStats = { awareness: state.awareness, sanity: state.sanity };
  }
  const crossedTiers = awarenessTiers.filter(t => 
    prevStats.awareness < t.threshold && 
    state.awareness >= t.threshold &&
    state.profiles.includes(t.profile)
  );
  
  const byThreshold = {};
  crossedTiers.forEach(t => {
    if (!byThreshold[t.threshold]) byThreshold[t.threshold] = [];
    byThreshold[t.threshold].push(t);
  });
  
  Object.keys(byThreshold).sort((a,b) => a-b).forEach(threshold => {
    const tiers = byThreshold[threshold];
    
    if (tiers.length === 1) {
      showProfileUnlock(tiers[0].profile, tiers[0].name);
    } else {
      const names = tiers.map(t => {
  const p = CHARACTER_DATABASE[t.profile];
  // Match the logic from showProfileUnlock
  return p?.getDisplayName 
    ? p.getDisplayName(state) 
    : (p?.name || DISPLAY_NAMES[t.profile] || t.profile);
}).join(' & ');
      
      const sectionNames = tiers.map(t => t.name).join(', ');
      
      // MULTI-TIER COLOR LOGIC HERE
      const uniqueProfiles = [...new Set(tiers.map(t => t.profile))];
      let accent, bg;
      
      if (uniqueProfiles.length === 1) {
        // Single person
        const colors = PROFILE_COLORS[uniqueProfiles[0]] || { accent: '#9fa8da', bg: '#1a1a2e' };
        accent = colors.accent;
        bg = colors.bg;
      } else {
        // Multiple people - grey
        accent = '#888';
        bg = '#1a1a1a';
      }
      
      // Create the toast
      const container = document.getElementById('toast-left-container');
      const toast = document.createElement('div');
      toast.style.cssText = `
        background: ${bg};
        border-left: 4px solid ${accent};
        color: #fff;
        padding: 12px 16px;
        border-radius: 0 4px 4px 0;
        font-size: 13px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        transform: translateX(-120%);
        transition: transform 0.3s ease;
        cursor: pointer;
        font-family: "Lora", serif;
      `;
      toast.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 4px; color: ${accent}; font-size: 11px; text-transform: uppercase;">
          <i class="fa-solid fa-unlock-keyhole"></i> Profiles Updated
        </div>
        <div style="font-weight: 500;">${names}</div>
        <div style="font-size: 11px; color: #888; margin-top: 2px;">${sectionNames}</div>
      `;
      toast.onclick = () => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 200);
        toggleProfilesOverlay();
      };
      container.appendChild(toast);
void toast.offsetHeight; // Change this line
toast.style.transform = 'translateX(0)';
      setTimeout(() => {
        toast.style.transform = 'translateX(-120%)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
      }, 6000);
      
      document.getElementById('profile-badge').style.display = 'inline';
    }
  });
  
  const ingramSanityTiers = [
    { threshold: 50, name: 'Your View' },
    { threshold: 35, name: 'Your View' }
  ];
  
  for (const tier of ingramSanityTiers) {
    if (prevStats.sanity > tier.threshold && state.sanity <= tier.threshold) {
      if (state.profiles.includes('ingram')) {
        showProfileUnlock('ingram', tier.name);
      }
    }
  }
  
  if (prevStats.sanity >= 40 && state.sanity < 40) {
    showToast('Sanity critical: Below 40', 'warning');
  }
  
  updatePrevStats();
  updateDebugStateMonitor(); 
}
