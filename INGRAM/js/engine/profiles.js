import { state, saveGame } from './state.js';
import { CHARACTER_DATABASE } from '../content/characters.js';
import { showToast } from './ui.js';
import { getSanityLabel, getAwarenessLabel, getEnergyLabel } from './stats.js';
import { updateDebugStateMonitor } from './debug.js';
import { showProfileUnlock } from './ui.js';  
import { DISPLAY_NAMES } from '../content/characters.js';  

export function toggleProfilesOverlay() {
  console.log('toggleProfilesOverlay START');
  const overlay = document.getElementById('profiles-screen');
  console.log('Overlay:', overlay);
  console.log('Current display:', overlay?.style?.display);
  
  const isOpen = overlay.style.display === 'flex';
  console.log('isOpen:', isOpen);
  
  overlay.style.display = isOpen ? 'none' : 'flex';
  console.log('New display:', overlay.style.display);
  
  if (!isOpen) {
    const badge = document.getElementById('profile-badge');
    if (badge) badge.style.display = 'none';
    currentProfileView = null;
    buildProfilesUI();
  }
}

let currentProfileView = null;

export function buildProfilesUI() {
  const wrapper = document.getElementById('profiles-wrapper');
  wrapper.innerHTML = '';
  
  if (state.profiles.length === 0) {
    wrapper.innerHTML = `<div style="font-size: 11px; color: #444; padding: 40px 20px; text-align: center; text-transform: uppercase;">No profiles discovered yet...</div>`;
    return;
  }
  
  if (currentProfileView) {
    buildSingleProfile(wrapper, currentProfileView);
    return;
  }
  
  const header = document.createElement('div');
  header.style.cssText = 'font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 1px solid #333;';
  header.textContent = `Known People (${state.profiles.length})`;
  wrapper.appendChild(header);
  
  state.profiles.forEach(personId => {
    const person = CHARACTER_DATABASE[personId];
    if (!person) return;
    
    const displayName = person.getDisplayName ? person.getDisplayName(state) : person.name;
    const title = person.getTitle ? person.getTitle(state) : 'Unknown';
    
    const btn = document.createElement('button');
    btn.style.cssText = `
      width: 100%;
      padding: 15px 20px;
      margin-bottom: 8px;
      background: #161616;
      border: 1px solid #2a2a2a;
      border-radius: 6px;
      color: #fff;
      font-size: 14px;
      text-align: left;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: "Lora", serif;
    `;
    btn.innerHTML = `
      <span style="font-weight: 500;">${displayName}</span>
      <span style="font-size: 10px; color: #666; text-transform: uppercase;">${title}</span>
    `;
    
    btn.onmouseenter = () => {
      btn.style.background = '#1f1f1f';
      btn.style.borderColor = '#444';
    };
    btn.onmouseleave = () => {
      btn.style.background = '#161616';
      btn.style.borderColor = '#2a2a2a';
    };
    
    btn.onclick = () => {
      currentProfileView = personId;
      buildProfilesUI();
    };
    
    wrapper.appendChild(btn);
  });
}

export function buildSingleProfile(wrapper, personId) {
  const person = CHARACTER_DATABASE[personId];
  const displayName = person.getDisplayName ? person.getDisplayName(state) : person.name;
  
  // Back button (full width)
  const backBtn = document.createElement('button');
  backBtn.style.cssText = `
    background: transparent;
    border: 1px solid #333;
    color: #666;
    padding: 8px 15px;
    font-size: 11px;
    cursor: pointer;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-radius: 4px;
    width: 100%;
    text-align: left;
    font-family:"Lora", serif;
  `;
  backBtn.textContent = '← Back to Known People';
  backBtn.onclick = () => {
    currentProfileView = null;
    buildProfilesUI();
  };
  backBtn.onmouseenter = () => { backBtn.style.borderColor = '#666'; backBtn.style.color = '#999'; };
  backBtn.onmouseleave = () => { backBtn.style.borderColor = '#333'; backBtn.style.color = '#666'; };
  wrapper.appendChild(backBtn);
  
  // Header card (full width)
const title = person.getTitle ? person.getTitle(state) : 'Unknown';
const isRemy = personId === 'remy';
const headerCard = document.createElement('div');
headerCard.style.cssText = `
  background: ${isRemy ? 'linear-gradient(90deg, #111 0%, #111117 100%)' : 'linear-gradient(90deg, #111 0%, #101412 100%)'};
  border: 1px solid ${isRemy ? '#9fa8da' : '#86a66d'};
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 15px;
  text-align: center;
`;

// Both Ingram and Rémy shake on low sanity
const shouldShakeHeader = state.sanity <= 20;
const blackGlow = shouldShakeHeader 
  ? 'text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 0 8px #000, 0 0 16px #000, 0 0 24px #000000CC;' 
  : '';

headerCard.innerHTML = `
  <div style="font-size: 24px; font-weight: bold; color: #fff; margin-bottom: 6px; letter-spacing: 0.5px;">
    <span class="${shouldShakeHeader ? 'shake-text' : ''}" 
          style="display: inline-block; ${blackGlow} ${shouldShakeHeader ? `animation-delay: ${Math.random()}s; animation-duration: ${0.2 + Math.random() * 0.2}s;` : ''}">
      ${displayName}
    </span>
  </div>
  <div style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 2px;">
    <span class="${shouldShakeHeader ? 'shake-text' : ''}" 
          style="display: inline-block; ${blackGlow} ${shouldShakeHeader ? `animation-delay: ${Math.random()}s; animation-duration: ${0.2 + Math.random() * 0.2}s;` : ''}">
      ${title}
    </span>
  </div>
`;
wrapper.appendChild(headerCard);

// Grid container for info cards
const grid = document.createElement('div');
grid.style.cssText = `
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const sections = [
  { key: 'getYourView', label: 'Your View', icon: 'fa-eye' },
  { key: 'getTheirView', label: personId === 'ingram' ? "Rémy's View" : 'Their View', icon: 'fa-magnifying-glass' },
  { key: 'getStatus', label: 'Status', icon: 'fa-circle-info' },
  { key: 'getBackground', label: 'Background', icon: 'fa-clock-rotate-left' },
  { key: 'getOrigin', label: 'Origin', icon: 'fa-map-location-dot' },
  { key: 'getDetails', label: 'Details', icon: 'fa-fingerprint' },
  { key: 'getTruth', label: 'Truth', icon: 'fa-triangle-exclamation' },
  { key: 'getDiagnoses', label: 'Diagnoses', icon: 'fa-user-doctor' }
];

const accentColor = personId === 'remy' ? '#9fa8da' : '#86a66d';

sections.forEach(sec => {
  if (!person[sec.key]) return;
  
  const content = person[sec.key](state);
  const isLocked = !content || content === "?????";
  
  const card = document.createElement('div');
  card.style.cssText = `
    background: ${isLocked ? '#111' : '#161616'};
    border: 1px solid ${isLocked ? '#1a1a1a' : '#2a2a2a'};
    border-radius: 8px;
    padding: 16px;
    transition: all 0.2s;
    cursor: ${isLocked ? 'not-allowed' : 'default'};
    opacity: ${isLocked ? '0.5' : '1'};
  `;

  // Hover effect only for unlocked
  if (!isLocked) {
    card.onmouseenter = () => {
      card.style.borderColor = accentColor;
      card.style.transform = 'translateY(-2px)';
      card.style.boxShadow = `0 4px 12px rgba(0,0,0,0.3)`;
    };
    card.onmouseleave = () => {
      card.style.borderColor = '#2a2a2a';
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'none';
    };
  }
  
  const shouldShakeText = state.sanity <= 20 && !isLocked;
  const displayContent = isLocked ? '?????' : content;
  const displayLabel = isLocked ? '?????' : sec.label;
  const iconColor = isLocked ? '#444' : accentColor;

  card.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
      <i class="fa-solid ${isLocked ? 'fa-lock' : sec.icon}" style="color: ${iconColor}; font-size: 12px;"></i>
      <div style="font-size: 10px; color: ${iconColor}; text-transform: uppercase; letter-spacing: 0.5px; font-weight: bold;">${displayLabel}</div>
    </div>
    <span class="${shouldShakeText ? 'shake-text' : ''}" 
          style="display: inline-block; font-size: 12px; line-height: 1.5; color: ${isLocked ? '#444' : '#ccc'}; ${shouldShakeText ? `animation-delay: ${Math.random()}s; animation-duration: ${0.2 + Math.random() * 0.2}s;` : ''}">
      ${displayContent}
    </span>
  `;
  
  grid.appendChild(card);
});
  
  // If no unlocked sections
  if (grid.children.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1 / -1; color: #555; font-style: italic; padding: 40px; text-align: center;">More will be revealed as awareness grows...</div>`;
  }
  
  wrapper.appendChild(grid);
}

export function discoverPerson(personId) {
  if (CHARACTER_DATABASE[personId] && !state.profiles.includes(personId)) {
    state.profiles.push(personId);
    showProfileUnlock(personId, 'Unlocked');
    const person = CHARACTER_DATABASE[personId];
    const displayName = person?.getDisplayName ? person.getDisplayName(state) : person?.name || personId;
    const baseName = DISPLAY_NAMES[personId] || personId;
    const badge = document.getElementById('profile-badge');
if (badge) badge.style.display = 'inline';
    
    
    saveGame();
    return true;
  }
  return false;
}
