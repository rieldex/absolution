import { state, saveGame } from './state.js';
import { updateStats, checkThresholds } from './stats.js';
import { giveItem } from './inventory.js';
import { SCENES } from '../../scenes/index.js';
import { renderIphoneLockscreen, renderEmailContent } from './renderUtils.js';
import { discoverPerson } from './profiles.js';
import { updateDebugStateMonitor } from './debug.js';
import { showToast } from "./ui.js";
import { updateTabTitle } from "./tabTitle.js"; 

export { renderIphoneLockscreen, renderEmailContent };

export function handleChoice(choice) {
  const isFirstVisit = choice.check ? !state[choice.check] : true;
  const targetScene = choice.next || (choice.id + '_result');
  let statMessage = null;
  
  if (isFirstVisit) {
    if (choice.stat && choice.val) {
      state[choice.stat] = Math.max(0, Math.min(100, state[choice.stat] + choice.val));
      const sign = choice.val > 0 ? '+' : '';
      statMessage = `${sign}${choice.val} ${choice.stat}`;
      showToast(statMessage, choice.val > 0 ? 'info' : 'warning');
    }
    
    if (choice.check) state[choice.check] = true;
    if (choice.item) giveItem(choice.item);
    if (choice.person) discoverPerson(choice.person);
    if (choice.cook) state.dinnerChoice = choice.cook;

    state.currentScene = targetScene;
    
    updateStats();
    checkThresholds();
    updateDebugStateMonitor();
    saveGame();
  }
  
  showScene(targetScene, statMessage);
}

// THEN showScene
export function showScene(sceneId, statMessage = null) {
  const storyContainer = document.getElementById('story');
  const textDiv = document.getElementById('story-text');
  const choicesDiv = document.getElementById('choices');
  const scene = SCENES[sceneId];
  
  // Skip fade on first load
  if (storyContainer.style.display === 'none' || storyContainer.classList.contains('hidden')) {
    storyContainer.style.display = 'block';
    storyContainer.classList.remove('hidden');
    renderScene(scene, textDiv, choicesDiv, sceneId, statMessage);
    return;
  }
  
  // Fade out
  storyContainer.classList.add('fade-out');
  
  setTimeout(() => {
    renderScene(scene, textDiv, choicesDiv, sceneId, statMessage);
    storyContainer.classList.remove('fade-out');
    
    // Reveal text lines
    setTimeout(() => {
      textDiv.querySelectorAll('.story-narrative').forEach(line => line.classList.add('visible'));
    }, 50);
    
  }, 500);
}

// Helper function (after showScene)
function renderScene(scene, textDiv, choicesDiv, sceneId, statMessage) {
  // Update history
  if (state.currentScene && state.currentScene !== sceneId) {
    if (!state.isGoingBack) {
      if (!state.history) state.history = [];
      state.history.push(state.currentScene);
    }
  }
  state.isGoingBack = false;
  state.currentScene = sceneId;

  // Clear content
  textDiv.innerHTML = '';
  choicesDiv.innerHTML = '';

  // Render text paragraphs
  const paragraphs = (scene.text || '').split(/\n\n+/);
  paragraphs.forEach((para, index) => {
  if (!para.trim()) return;
  
  /// In renderer.js, in the paragraph loop:
if (para.trim().startsWith('<')) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = para.trim();
  textDiv.appendChild(wrapper);
  return; // Don't apply story-narrative to HTML blocks
}
  
  const p = document.createElement('p');
  p.className = 'story-narrative';
  p.style.transitionDelay = `${index * 0.15}s`;
  p.innerHTML = para.trim().replace(/\n/g, '<br>');
  textDiv.appendChild(p);
});

  // Render stat message if exists (at bottom of text)
  if (statMessage) {
    const div = document.createElement('div');
    div.className = 'stat-alert';
    div.innerHTML = statMessage;
    textDiv.appendChild(div);
  }

  if (scene.onRender) scene.onRender(textDiv);
  
  // Render choices
  const choices = scene.dynamicChoices ? scene.dynamicChoices() : (scene.choices || []);
  choices.forEach(choice => {
    if (choice.isInfo) {
      const div = document.createElement('div');
      div.className = 'info-box';
      div.textContent = choice.text;
      choicesDiv.appendChild(div);
    } else {
      const btn = document.createElement('button');
      btn.className = `choice ${choice.disabled ? 'already-visited' : ''}`;
      btn.textContent = choice.text;
      btn.onclick = () => handleChoice(choice);
      choicesDiv.appendChild(btn);
    }
  });

  // Back button
  if (state.history?.length > 0 && sceneId !== 'opening') {
    const backLink = document.createElement('span');
    backLink.style.cssText = 'font-size: 12px; font-style: italic; color: #70757a; cursor: pointer; display: block; margin-top: 20px;';
    backLink.textContent = "go back";
    backLink.onclick = () => {
      const previousSceneId = state.history.pop();
      state.isGoingBack = true;
      showScene(previousSceneId);
    };
    choicesDiv.appendChild(backLink);
  }

  updateStats();
  checkThresholds();
  updateTabTitle();
  updateDebugStateMonitor();
}
