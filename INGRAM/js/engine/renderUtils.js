import { state, saveGame } from './state.js';
import { updateStats, checkThresholds } from './stats.js';
import { showToast } from './ui.js';
import { showScene } from './renderer.js'; 

export function renderIphoneLockscreen(config) {
  const div = document.createElement('div');
  div.className = 'iphone-lockscreen';
  div.innerHTML = `
    <div class="phone-top-status-bar"><div>AT&T</div><div style="display: flex; gap: 4px;"><span><i class="fa-solid fa-signal"></i></span>
<span><i class="fa-solid fa-wifi"></i></span>
<span><i class="fa-solid fa-battery-three-quarters"></i></span> ${config.battery || '84'}%</span></div></div>
    <div class="lock-status-glyph"><i class="fa-solid fa-lock-open"></i></div>
    <div class="lock-date-line">${config.date || 'Onsdag 1 <i class="fa-solid fa-cloud-showers-heavy"></i> Chicago'}</div>
    <div class="lock-time-display">${config.time || '13:17'}</div>
    <div class="lock-widgets-container">
  
  <!-- Left Widget: Weather ( -->
  <div class="lock-widget weather-widget">
    <div class="weather-top">
      <span class="weather-icon"><i class="fa-solid fa-cloud" style="font-size:10px"></i></span>
      <span class="weather-temp">6°</span>
    </div>
    <div class="weather-condition">Mulet</div>
    <div class="weather-range">H:8° L:-1°</div>
  </div>

  <!-- Right Widget: Calendar Event  -->
  <div class="lock-widget calendar-widget">
    <div class="calendar-accent"></div>
    <div class="calendar-details">
      <div class="calendar-time">17:00-19:00</div>
      <div class="calendar-title">online seminar</div>
    </div>
  </div>

</div>
    <div class="phone-notif-container"><div class="phone-notif-bubble"><div class="notif-header"><span style="display: flex; align-items: center; gap: 5px;"><span style="width: 11px; height: 11px; background: #22c55e; border-radius: 3px; display: inline-block;"></span>${config.appName || 'Meddelanden'}</span><span>${config.timeAgo || '6 t sedan'}</span></div><div class="notif-sender">${config.sender || 'rémy'}</div><div class="notif-message">${config.message}</div></div></div>
    <div class="phone-bottom-utilities-grid">
  <div class="swipe-to-unlock-text">${config.footerPrompt || 'Svep uppåt för att öppna'}</div>
  <div class="quick-action-row">
    <div class="quick-action-circle"><i class="fa-solid fa-lightbulb"></i></div>
    <div class="quick-action-circle"><i class="fa-solid fa-camera"></i></div>
  </div>
</div>
  `;
  return div;
}

export function renderEmailContent(container, emailData) {
  if (!state.readEmails.includes(emailData.id)) {
    state.readEmails.push(emailData.id);
    
    if (emailData.statChange) {
      Object.entries(emailData.statChange).forEach(([stat, val]) => {
        state[stat] = Math.max(0, Math.min(100, state[stat] + val));
        const sign = val > 0 ? '+' : '';
        showToast(`${sign}${val} ${stat.charAt(0).toUpperCase() + stat.slice(1)}`, val > 0 ? 'info' : 'warning');
      });
      updateStats();
      checkThresholds();
      saveGame();
    }
  }
  
  const emailView = document.createElement('div');
  emailView.style.cssText = `
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    font-family: 'Google Sans', Roboto, Arial, sans-serif;
    width: 95vw;
    max-width: 950px;
    margin-left: 50%;
    transform: translateX(-50%);
    position: relative;
    min-height: 500px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  `;
  
  const topBar = `
    <div style="background: #ffffff; border-bottom: 1px solid #f1f3f4; padding: 12px 16px; display: flex; align-items: center;">
      <button id="back-btn" style="background: transparent; border: none; color: #444746; cursor: pointer; font-size: 14px; display: flex; align-items: center; gap: 12px; padding: 6px 12px; border-radius: 100px; font-weight: 500;">
        ← Tillbaka till Inkorgen
      </button>
    </div>
  `;
  
  const hasTranslation = emailData.content.includes('---');
  
  const content = `
    <div style="background: #fff; padding: 20px 24px;">
      <div style="font-size: 22px; color: #1f1f1f; margin-bottom: 24px; font-family: 'Google Sans', sans-serif; font-weight: 400; padding-left: 56px;">
        ${emailData.subject}
      </div>
      
      <div style="display: flex; align-items: flex-start; gap: 16px; margin-bottom: 24px;">
        <div style="width: 40px; height: 40px; background: ${emailData.color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 16px; font-weight: 500; flex-shrink: 0;">
          ${emailData.from.charAt(0).toUpperCase()}
        </div>
        <div style="flex: 1; display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div style="font-size: 14px; color: #1f1f1f; margin-bottom: 2px;">
              <span style="font-weight: 700;">${emailData.from.split('<')[0].trim()}</span>
              <span style="font-size: 12px; color: #444746; font-weight: 400; margin-left: 4px;">&lt;${emailData.from.match(/<(.+)>/)?.[1] || emailData.from}&gt;</span>
            </div>
            <div style="font-size: 12px; color: #444746;">
              till mig
            </div>
          </div>
          <div style="font-size: 12px; color: #444746; text-align: right;">
            ${emailData.date}
          </div>
        </div>
      </div>
      
      <div id="email-body-wrapper" style="padding-left: 56px; font-size: 14px; line-height: 1.6; color: #1f1f1f; font-family: Roboto, Arial, sans-serif;">
  
      ${hasTranslation ? `
        <style>
          .email-text-en { display: none; color: #5f6368; font-style: italic; }
          #email-body-wrapper:hover .email-text-nl { display: none; }
          #email-body-wrapper:hover .email-text-en { display: block; }
        </style>

        <div class="email-text-nl" style="white-space: pre-wrap;">
          ${emailData.content.split('---')[0].trim()}
        </div>

        <div class="email-text-en" style="white-space: pre-wrap;">
          ${emailData.content.split('---')[1].replace('Translation:', '').trim()}
        </div>
      ` : `
        <div style="white-space: pre-wrap;">
          ${emailData.content.trim()}
        </div>
      `}

      </div>
    </div>
  `;
  
  emailView.innerHTML = topBar + content;
  container.appendChild(emailView);
  
  const backBtn = document.getElementById('back-btn');
  backBtn.onmouseenter = () => backBtn.style.background = '#f2f2f2';
  backBtn.onmouseleave = () => backBtn.style.background = 'transparent';
  
  backBtn.onclick = () => showScene('ch2_emails');
}