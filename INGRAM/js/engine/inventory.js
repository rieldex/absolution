import { state, saveGame } from './state.js';
import { ITEM_DATABASE } from '../content/items.js';
import { showToast } from './ui.js'; 

export function giveItem(itemId) {
  if (ITEM_DATABASE[itemId] && !state.inventory.includes(itemId)) {
    state.inventory.push(itemId);
    showToast(`Acquired: ${ITEM_DATABASE[itemId].name}`, 'info');
    
    const badge = document.getElementById('inventory-badge');
    if (badge) badge.style.display = 'inline';
    
    saveGame();
    return true;
  }
  return false;
}

export function toggleInventoryOverlay() {
  const overlay = document.getElementById('inventory-screen');
  
  const isOpen = overlay.style.display === 'flex';
  overlay.style.display = isOpen ? 'none' : 'flex';
  
  console.log('New display:', overlay.style.display);
  
  if (!isOpen) {
    const badge = document.getElementById('inventory-badge');
    if (badge) badge.style.display = 'none';
    buildInventoryUI();
  }
}

export function buildInventoryUI() {
  const wrapper = document.getElementById('inventory-items-wrapper');
  if (state.inventory.length === 0) {
    wrapper.innerHTML = `<div style="font-size: 11px; color: #444; padding: 10px;">No items secured...</div>`;
    return;
  }
  
  wrapper.innerHTML = state.inventory.map(itemId => {
    const item = ITEM_DATABASE[itemId];
    return `<div onclick="openItemPopupModal('${itemId}')" style="width: 76px; height: 76px; background: #161616; border: 1px solid #2a2a2a; border-radius: 6px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; padding: 4px;"><div style="font-size: 22px; margin-bottom: 4px;">${item.icon}</div><div style="font-size: 12px; color: #666; text-align: center;">${item.name}</div></div>`;
  }).join('');
}

export function openItemPopupModal(itemId) {
  const item = ITEM_DATABASE[itemId];
  if (!item) return;
  document.getElementById('item-popup-content-node').innerHTML = item.detailedHtml;
  document.getElementById('item-popup-modal').style.display = 'flex';
}

export function closeItemPopupModal() {
  document.getElementById('item-popup-modal').style.display = 'none';
}