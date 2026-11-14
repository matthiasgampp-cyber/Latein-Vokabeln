// Start-Vokabeln automatisch aus der vocabulary.js (DICTIONARY) aufbauen
function buildInitialVocabList() {
    if (typeof DICTIONARY === 'undefined') return [];
    return Object.entries(DICTIONARY).map(([lat, gerList], index) => ({
        id: index + 1,
        lat: lat,
        ger: Array.isArray(gerList) ? gerList.join(', ') : gerList,
        phase: 1,
        streak: 0,
        lastReviewed: null
    }));
}

let appData = JSON.parse(localStorage.getItem('latinitas_kids_v29')) || {
    vocabList: buildInitialVocabList(),
    history: {},
    rewards: {
        10: "Überraschung!",
        20: "Wunsch-Eis!",
        50: "Kinoabend!",
        100: "Großer Ausflug!"
    },
    theme: 'panda',
    lastLoginDate: new Date().toDateString(),
    streakOffset: 0
};

// Falls der Speicher leer angelegt wurde, sicherstellen, dass Start-Vokabeln geladen sind
if (!appData.vocabList || appData.vocabList.length === 0) {
    appData.vocabList = buildInitialVocabList();
}

const todayKey = new Date().toISOString().split('T')[0];
if (!appData.history[todayKey]) appData.history[todayKey] = 0;
if (appData.streakOffset === undefined) appData.streakOffset = 0;

function saveData() {
    localStorage.setItem('latinitas_kids_v29', JSON.stringify(appData));
    updateUI();
}

function toggleTheme() {
    appData.theme = appData.theme === 'panda' ? 'minecraft' : 'panda';
    saveData();
    applyTheme();
    loadNextCard();
}

function applyTheme() {
    const body = document.getElementById('app-body');
    const stylesheet = document.getElementById('theme-stylesheet');
    const themeName = document.getElementById('theme-name');
    const mainHeader = document.getElementById('main-header');
    const pandaToggle = document.getElementById('panda-theme-toggle-container');
    const mcNav = document.getElementById('minecraft-nav');

    if (appData.theme === 'minecraft') {
        stylesheet.href = 'minecraft-style.css';
        body.className = "minecraft-theme min-h-screen flex flex-col";
        if (themeName) themeName.innerText = "Minecraft";
        if (mainHeader) mainHeader.classList.remove('hidden');
        if (pandaToggle) pandaToggle.classList.add('hidden');
        if (mcNav) {
            mcNav.classList.remove('hidden');
            mcNav.classList.add('grid');
        }
    } else {
        stylesheet.href = 'panda-style.css';
        body.className = "panda-theme min-h-screen flex flex-col";
        if (themeName) themeName.innerText = "Panda";
        if (mainHeader) mainHeader.classList.add('hidden');
        if (pandaToggle) pandaToggle.classList.remove('hidden');
        if (mcNav) {
            mcNav.classList.remove('grid');
            mcNav.classList.add('hidden');
        }
    }
}

function updateUI() {
    const todayCount = appData.history[todayKey] || 0;
    const target = 10;
    const progressEl = document.getElementById('daily-progress');
    const progressPandaEl = document.getElementById('daily-progress-panda');
    if (progressEl) progressEl.innerText = `${Math.min(todayCount, target)}/${target}`;
    if (progressPandaEl) progressPandaEl.innerText = `${Math.min(todayCount, target)}/${target}`;
}

function switchTab(tab) {
    ['train', 'add', 'stats', 'list'].forEach(t => {
        const el = document.getElementById(`view-${t}`);
        if (el) {
            el.classList.add('hidden');
            el.classList.remove('flex');
        }
    });

    const activeView = document.getElementById(`view-${tab}`);
    if (activeView) {
        activeView.classList.remove('hidden');
        activeView.classList.add('flex');
    }

    if (tab === 'train') loadNextCard();
    if (tab === 'stats') renderStats();
    if (tab === 'list') renderList();
}

let pendingVocab = null;

function handleVocabSubmit(e) {
    e.preventDefault();
    const lat = document.getElementById('input-lat').value.trim().toLowerCase();
    const ger = document.getElementById('input-ger').value.trim();
    const box = document.getElementById('validation-box');

    pendingVocab = { lat, ger };
    box.classList.remove('hidden');

    const cleanLat = lat.replace(/[!?]/g, '').trim();
    const dict = typeof DICTIONARY !== 'undefined' ? DICTIONARY : {};
    const validAnswers = dict[lat] || dict[cleanLat];
    let isExactMatch = validAnswers && validAnswers.some(a => ger.toLowerCase().includes(a.toLowerCase()));

    if (isExactMatch || !validAnswers) {
        savePendingVocab();
    } else {
        box.className = "mt-2 p-2 rounded bg-amber-100 border border-amber-300 text-amber-900 text-[10px] space-y-1";
        box.innerHTML = `
            <p>⚠️ Für <em>"${lat}"</em> ist gewöhnlich <strong>"${validAnswers.join(', ')}"</strong> hinterlegt.</p>
            <div class="flex gap-2 pt-1">
                <button onclick="savePendingVocab()" class="flex-1 bg-amber-600 text-white font-bold py-1 px-2 rounded">Trotzdem speichern</button>
                <button onclick="document.getElementById('validation-box').classList.add('hidden')" class="bg-stone-400 text-white font-bold py-1 px-2 rounded">Korrigieren</button>
            </div>
        `;
    }
}

function savePendingVocab() {
    if (!pendingVocab) return;
    appData.vocabList.push({
        id: Date.now(),
        lat: pendingVocab.lat,
        ger: pendingVocab.ger,
        phase: 1,
        streak: 0,
        lastReviewed: null
    });
    saveData();

    const box = document.getElementById('validation-box');
    box.className = "mt-2 p-2 rounded bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px]";
    box.innerHTML = `✅ Vokabel <strong>"${pendingVocab.lat}"</strong> gespeichert!`;
    document.getElementById('add-form').reset();
    pendingVocab = null;
}

let currentCard = null;

function loadNextCard() {
    const container = document.getElementById('train-container');
    if (!container) return;

    const now = Date.now();
    const THREE_WEEKS = 21 * 24 * 60 * 60 * 1000;

    const due = appData.vocabList.filter(v => {
        if (v.phase === 1) return true;
        if (v.phase === 2) return !v.lastReviewed || (now - v.lastReviewed) >= THREE_WEEKS;
        return false;
    });

    if (due.length === 0) {
        container.innerHTML = `
            <div class="absolute inset-x-8 top-1/3 text-center p-4 bg-white/90 backdrop-blur rounded-2xl shadow-lg space-y-2 z-25">
                <div class="text-3xl">🎉</div>
                <h3 class="text-xs font-bold text-stone-800">Alles erledigt für heute!</h3>
                <p class="text-[10px] text-stone-600">Keine fälligen Vokabeln mehr. Super gemacht!</p>
            </div>
        `;
        return;
    }

    currentCard = due[Math.floor(Math.random() * due.length)];
    
    if (appData.theme === 'minecraft') {
        container.innerHTML = `
            <div class="w-full flex justify-end pr-6 mt-4 z-20">
                <div class="minecraft-stone-bubble">
                    <span>${currentCard.lat}</span>
                </div>
            </div>

            <div class="w-full max-w-xs px-2 absolute bottom-4 left-1/2 -translate-x-1/2 space-y-1.5 z-20">
                <div id="answer-feedback" class="hidden text-[8px] font-bold p-1 text-center shadow-md"></div>
                <form onsubmit="checkTypedAnswer(event)" id="train-form" class="space-y-1">
                    <input type="text" id="user-answer" required autocapitalize="none" autocomplete="off" autocorrect="off" spellcheck="false" class="minecraft-input-box w-full px-2 py-1.5 text-center font-bold focus:outline-none" placeholder="Übersetzung...">
                    <div class="text-center">
                        <button type="submit" id="submit-btn" class="font-bold transition uppercase cursor-pointer">PRÜFEN</button>
                    </div>
                </form>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="panda-speech-text">
                <span>${currentCard.lat}</span>
            </div>

            <div id="answer-feedback" class="hidden text-[9px] font-bold p-1 text-center rounded text-white shadow panda-feedback"></div>

            <form onsubmit="checkTypedAnswer(event)" id="train-form">
                <div class="panda-input-area">
                    <input type="text" id="user-answer" required autocapitalize="none" autocomplete="off" autocorrect="off" spellcheck="false" class="panda-text-input" placeholder="Übersetzung...">
                </div>
                <button type="submit" class="panda-submit-btn">Veritas</button>
            </form>
        `;
    }
}

function checkTypedAnswer(e) {
    e.preventDefault();
    const input = document.getElementById('user-answer').value.trim().toLowerCase();
    const feedback = document.getElementById('answer-feedback');
    if (feedback) feedback.classList.remove('hidden');

    const validOptions = currentCard.ger.toLowerCase().split(',').map(s => s.trim());
    const isCorrect = validOptions.includes(input);

    currentCard.lastReviewed = Date.now();
    if (isCorrect) {
        currentCard.streak++;
        appData.history[todayKey] = (appData.history[todayKey] || 0) + 1;
        
        if (currentCard.phase === 1 && currentCard.streak >= 5) {
            currentCard.phase = 2;
            currentCard.streak = 0;
        } else if (currentCard.phase === 2 && currentCard.streak >= 5) {
            currentCard.phase = 3;
        }

        if (feedback) {
            feedback.className = "text-[9px] font-bold p-1 text-white shadow rounded panda-feedback " + (appData.theme === 'minecraft' ? 'bg-emerald-700' : 'bg-emerald-600');
            feedback.innerHTML = `Richtig! 🎉 (${currentCard.lat} = ${currentCard.ger})`;
        }
        if (typeof confetti === 'function') confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    } else {
        currentCard.streak = 0;
        if (feedback) {
            feedback.className = "text-[9px] font-bold p-1 text-white shadow rounded panda-feedback " + (appData.theme === 'minecraft' ? 'bg-rose-700' : 'bg-rose-600');
            feedback.innerHTML = `Falsch ❌ Richtig: <strong>${currentCard.ger}</strong>`;
        }
    }

    saveData();
    setTimeout(loadNextCard, 1800);
}

function calculateRawStreak() {
    let streak = 0;
    for (let i = 0; i < 365; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const k = d.toISOString().split('T')[0];
        const count = appData.history[k] || 0;
        
        // Heute gilt das neue Ziel (10), für vergangene Tage das alte Ziel (5)
        const required = (i === 0) ? 10 : 5;
        
        if (count >= required) {
            streak++;
        } else if (i === 0) {
            continue;
        } else {
            break;
        }
    }
    return streak;
}

function calculateStreak() {
    const raw = calculateRawStreak();
    const offset = appData.streakOffset || 0;
    return Math.max(raw, raw + offset);
}

function renderStats() {
    const container = document.getElementById('history-bars');
    if (!container) return;
    const dates = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split('T')[0]);
    }

    container.innerHTML = dates.map(d => {
        const count = appData.history[d] || 0;
        const heightPct = Math.min((count / 10) * 100, 100);
        const dayName = new Date(d).toLocaleDateString('de-DE', { weekday: 'short' });
        return `
            <div class="flex flex-col items-center flex-1">
                <span class="text-[8px] font-bold mb-1 text-stone-700">${count}</span>
                <div class="w-3 bg-stone-200 h-12 rounded-t-sm overflow-hidden flex items-end">
                    <div class="w-full bg-amber-600 rounded-t-sm transition-all" style="height: ${heightPct}%"></div>
                </div>
                <span class="text-[7px] text-stone-600 font-bold mt-1">${dayName}</span>
            </div>
        `;
    }).join('');

    const streak = calculateStreak();
    const streakEl = document.getElementById('streak-days');
    if (streakEl) streakEl.innerText = `${streak} Tage`;

    renderRewards(streak);
}

function requestParentAccess() {
    const pin = prompt("Bitte Eltern-Code eingeben:");
    if (pin === "0604") {
        const panel = document.getElementById('parent-settings');
        if (panel) {
            panel.classList.toggle('hidden');
            if (!panel.classList.contains('hidden')) {
                renderParentSettingsContent();
            }
        }
    } else if (pin !== null) {
        alert("Falscher Code!");
    }
}

function renderParentSettingsContent() {
    const panel = document.getElementById('parent-settings');
    if (!panel) return;
    
    const currentStreak = calculateStreak();
    
    panel.innerHTML = `
        <div class="p-3 bg-amber-50 border border-amber-300 rounded-lg text-stone-800 space-y-3 text-[10px]">
            <h4 class="font-bold text-amber-900 text-xs">👨‍👩‍👧 Eltern-Bereich</h4>
            
            <div class="space-y-1">
                <label class="block font-bold">Aktuelle Serie (Streak) anpassen:</label>
                <div class="flex gap-2">
                    <input type="number" id="parent-streak-input" value="${currentStreak}" class="w-20 px-2 py-1 border rounded bg-white font-bold text-center" min="0" max="365">
                    <button onclick="saveManualStreak()" class="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1 rounded">Serie setzen</button>
                </div>
                <p class="text-[8px] text-stone-600">Setzt die Serie manuell auf den gewünschten Wert (z.B. 15 Tage).</p>
            </div>

            <div class="border-t border-amber-200 pt-2">
                <p class="font-bold mb-1">Belohnungen anpassen:</p>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <span class="text-[8px]">10 Tage:</span>
                        <input type="text" id="reward-10" value="${appData.rewards[10] || ''}" onchange="saveReward(10, this.value)" class="w-full px-1 py-0.5 border rounded bg-white text-[9px]">
                    </div>
                    <div>
                        <span class="text-[8px]">20 Tage:</span>
                        <input type="text" id="reward-20" value="${appData.rewards[20] || ''}" onchange="saveReward(20, this.value)" class="w-full px-1 py-0.5 border rounded bg-white text-[9px]">
                    </div>
                    <div>
                        <span class="text-[8px]">50 Tage:</span>
                        <input type="text" id="reward-50" value="${appData.rewards[50] || ''}" onchange="saveReward(50, this.value)" class="w-full px-1 py-0.5 border rounded bg-white text-[9px]">
                    </div>
                    <div>
                        <span class="text-[8px]">100 Tage:</span>
                        <input type="text" id="reward-100" value="${appData.rewards[100] || ''}" onchange="saveReward(100, this.value)" class="w-full px-1 py-0.5 border rounded bg-white text-[9px]">
                    </div>
                </div>
            </div>
        </div>
    `;
}

function saveManualStreak() {
    const input = document.getElementById('parent-streak-input');
    if (!input) return;
    const desired = parseInt(input.value, 10);
    if (isNaN(desired) || desired < 0) {
        alert("Bitte eine gültige Zahl eingeben.");
        return;
    }
    const raw = calculateRawStreak();
    appData.streakOffset = desired - raw;
    saveData();
    renderStats();
    renderParentSettingsContent();
    alert(`Serie erfolgreich auf ${desired} Tage gesetzt!`);
}

function saveReward(days, val) {
    appData.rewards[days] = val;
    saveData();
}

function renderRewards(streak) {
    const container = document.getElementById('rewards-container');
    if (!container) return;
    const milestones = [10, 20, 50, 100];

    container.innerHTML = milestones.map(days => {
        const unlocked = streak >= days;
        const rewardText = appData.rewards[days] || "Überraschung!";
        return `
            <div class="p-1 rounded bg-stone-100 border ${unlocked ? 'border-emerald-500 bg-emerald-50' : 'border-stone-300'} flex flex-col items-center justify-between">
                <span class="text-[8px] font-bold text-stone-600">${days}T</span>
                <div class="text-base my-0.5">${unlocked ? '🎁' : '🔒'}</div>
                <span class="text-[7px] font-bold ${unlocked ? 'text-emerald-800' : 'text-stone-400'} truncate w-full" title="${rewardText}">
                    ${unlocked ? rewardText : 'Gesperrt'}
                </span>
            </div>
        `;
    }).join('');
}

function renderList() {
    const container = document.getElementById('vocab-list-container');
    const totalEl = document.getElementById('total-count');
    if (totalEl) totalEl.innerText = `${appData.vocabList.length}`;
    if (!container) return;

    container.innerHTML = appData.vocabList.map(v => `
        <div class="vocab-item flex justify-between items-center text-xs">
            <div>
                <strong>${v.lat}</strong> ➔ <span class="text-amber-700">${v.ger}</span>
            </div>
            <button onclick="deleteVocab(${v.id})" class="text-rose-500 hover:text-rose-700 p-1">🗑️</button>
        </div>
    `).join('');
}

function deleteVocab(id) {
    appData.vocabList = appData.vocabList.filter(v => v.id !== id);
    saveData();
    renderList();
}

// Initialisierung bei Aufruf
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    updateUI();
    loadNextCard();
});

// Fallback falls DOMContentLoaded bereits vorbei ist
applyTheme();
updateUI();
loadNextCard();