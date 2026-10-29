// Vollständiges Vokabel-Wörterbuch zur Validierung
const DICTIONARY = {
    "ecce": ["schau"],
    "ibi": ["dort", "da"],
    "etiam": ["auch", "sogar"],
    "et": ["und"],
    "servus": ["sklave"],
    "serva": ["sklavin"],
    "dominus": ["hausherr"],
    "domina": ["hausfrau"],
    "esse": ["sein"],
    "est": ["ist"],
    "sunt": ["sind"],
    "stare": ["stehen"],
    "stat": ["steht"],
    "stant": ["stehen"],
    "cogitare": ["nachdenken"],
    "cogitat": ["denkt nach"],
    "cogitant": ["denken nach"],
    "clamare": ["rufen"],
    "clamat": ["ruft"],
    "clamant": ["rufen"],
    "iam": ["schon"],
    "tum": ["da", "dann", "damals"],
    "postremo": ["schließlich"],
    "sed": ["aber", "sondern"],
    "nondum": ["noch nicht"],
    "cur": ["warum"],
    "non": ["nicht", "nein"],
    "tandem": ["endlich", "schließlich"],
    "itaque": ["deshalb"],
    "huc": ["hierher"],
    "solum": ["nur"],
    "equus": ["pferd"],
    "equi": ["pferde"],
    "populus": ["volk"],
    "populi": ["völker"],
    "victoria": ["sieg"],
    "victoriae": ["siege"],
    "medicus": ["arzt"],
    "medici": ["ärzte"],
    "debere": ["müssen", "sollen", "schulden"],
    "debet": ["muss", "soll", "schuldet"],
    "debent": ["müssen", "sollen", "schulden"],
    "dubitare": ["zögern", "zweifeln"],
    "dubitat": ["zögert", "zweifelt"],
    "dubitant": ["zögern", "zweifeln"],
    "gaudere": ["sich freuen"],
    "gaudet": ["freut sich"],
    "gaudent": ["freuen sich"],
    "spectare": ["betrachten", "anschauen"],
    "spectat": ["betrachtet"],
    "spectant": ["betrachten"],
    "audere": ["wagen", "sich trauen"],
    "audet": ["wagt sich"],
    "audent": ["wagen sich"],
    "orare": ["bitten", "beten", "anbeten"],
    "orat": ["bittet", "betet"],
    "orant": ["bitten", "beten"],
    "videre": ["sehen"],
    "videt": ["sieht"],
    "vident": ["sehen"],
    "venire": ["kommen"],
    "venit": ["kommt"],
    "veniunt": ["kommen"],
    "ridere": ["lachen"],
    "ridet": ["lacht"],
    "rident": ["lachen"],
    "adesse": ["da sein", "helfen"],
    "adest": ["ist da"],
    "adsunt": ["sind da"],
    "diu": ["lange", "lange zeit"],
    "expectare": ["warten auf", "erwarten"],
    "expectat": ["wartet auf"],
    "expectant": ["warten auf"],
    "per": ["durch"],
    "via": ["weg", "straße"],
    "properare": ["eilen", "sich beeilen"],
    "properat": ["eilt"],
    "properant": ["eilen"],
    "semper": ["immer"],
    "post": ["hinter", "nach"],
    "subito": ["plötzlich"],
    "non iam": ["nicht mehr"],
    "nam": ["denn", "nämlich"],
    "undique": ["von allen seiten", "überall"],
    "turba": ["menschenmenge"],
    "reperire": ["finden", "wiederfinden"],
    "reperit": ["findet"],
    "reperiunt": ["finden"],
    "ante": ["vor"],
    "taberna": ["gasthaus", "laden"],
    "tabernae": ["gasthäuser", "läden"]
};

let appData = JSON.parse(localStorage.getItem('latinitas_kids_v29')) || {
    vocabList: [
        { id: 1, lat: "ecce!", ger: "schau!", phase: 1, streak: 0, lastReviewed: null },
        { id: 2, lat: "ibi", ger: "dort", phase: 1, streak: 0, lastReviewed: null },
        { id: 3, lat: "etiam", ger: "auch, sogar", phase: 1, streak: 0, lastReviewed: null },
        { id: 4, lat: "et", ger: "und", phase: 1, streak: 0, lastReviewed: null },
        { id: 5, lat: "servus", ger: "Sklave", phase: 1, streak: 0, lastReviewed: null },
        { id: 6, lat: "serva", ger: "Sklavin", phase: 1, streak: 0, lastReviewed: null },
        { id: 7, lat: "dominus", ger: "Hausherr", phase: 1, streak: 0, lastReviewed: null },
        { id: 8, lat: "domina", ger: "Hausfrau", phase: 1, streak: 0, lastReviewed: null },
        { id: 9, lat: "esse", ger: "sein", phase: 1, streak: 0, lastReviewed: null },
        { id: 10, lat: "est", ger: "ist", phase: 1, streak: 0, lastReviewed: null },
        { id: 11, lat: "sunt", ger: "sind", phase: 1, streak: 0, lastReviewed: null },
        { id: 12, lat: "stare", ger: "stehen", phase: 1, streak: 0, lastReviewed: null },
        { id: 13, lat: "stat", ger: "steht", phase: 1, streak: 0, lastReviewed: null },
        { id: 14, lat: "stant", ger: "stehen", phase: 1, streak: 0, lastReviewed: null },
        { id: 15, lat: "cogitare", ger: "nachdenken", phase: 1, streak: 0, lastReviewed: null },
        { id: 16, lat: "cogitat", ger: "denkt nach", phase: 1, streak: 0, lastReviewed: null },
        { id: 17, lat: "cogitant", ger: "denken nach", phase: 1, streak: 0, lastReviewed: null },
        { id: 18, lat: "clamare", ger: "rufen", phase: 1, streak: 0, lastReviewed: null },
        { id: 19, lat: "clamat", ger: "ruft", phase: 1, streak: 0, lastReviewed: null },
        { id: 20, lat: "clamant", ger: "rufen", phase: 1, streak: 0, lastReviewed: null },
        { id: 21, lat: "iam", ger: "schon", phase: 1, streak: 0, lastReviewed: null },
        { id: 22, lat: "tum", ger: "da, dann, damals", phase: 1, streak: 0, lastReviewed: null },
        { id: 23, lat: "postremo", ger: "schließlich", phase: 1, streak: 0, lastReviewed: null },
        { id: 24, lat: "sed", ger: "aber, sondern", phase: 1, streak: 0, lastReviewed: null },
        { id: 25, lat: "nondum", ger: "noch nicht", phase: 1, streak: 0, lastReviewed: null },
        { id: 26, lat: "cur?", ger: "warum?", phase: 1, streak: 0, lastReviewed: null },
        { id: 27, lat: "non", ger: "nicht, nein", phase: 1, streak: 0, lastReviewed: null },
        { id: 28, lat: "tandem", ger: "endlich, schließlich", phase: 1, streak: 0, lastReviewed: null },
        { id: 29, lat: "itaque", ger: "deshalb", phase: 1, streak: 0, lastReviewed: null },
        { id: 30, lat: "huc", ger: "hierher", phase: 1, streak: 0, lastReviewed: null },
        { id: 31, lat: "solum", ger: "nur", phase: 1, streak: 0, lastReviewed: null },
        { id: 32, lat: "equus", ger: "Pferd", phase: 1, streak: 0, lastReviewed: null },
        { id: 33, lat: "equi", ger: "Pferde", phase: 1, streak: 0, lastReviewed: null },
        { id: 34, lat: "populus", ger: "Volk", phase: 1, streak: 0, lastReviewed: null },
        { id: 35, lat: "populi", ger: "Völker", phase: 1, streak: 0, lastReviewed: null },
        { id: 36, lat: "victoria", ger: "Sieg", phase: 1, streak: 0, lastReviewed: null },
        { id: 37, lat: "victoriae", ger: "Siege", phase: 1, streak: 0, lastReviewed: null },
        { id: 38, lat: "medicus", ger: "Arzt", phase: 1, streak: 0, lastReviewed: null },
        { id: 39, lat: "medici", ger: "Ärzte", phase: 1, streak: 0, lastReviewed: null },
        { id: 40, lat: "debere", ger: "müssen, sollen, schulden", phase: 1, streak: 0, lastReviewed: null },
        { id: 41, lat: "debet", ger: "muss, soll, schuldet", phase: 1, streak: 0, lastReviewed: null },
        { id: 42, lat: "debent", ger: "müssen, sollen, schulden", phase: 1, streak: 0, lastReviewed: null },
        { id: 43, lat: "dubitare", ger: "zögern, zweifeln", phase: 1, streak: 0, lastReviewed: null },
        { id: 44, lat: "dubitat", ger: "zögert, zweifelt", phase: 1, streak: 0, lastReviewed: null },
        { id: 45, lat: "dubitant", ger: "zögern, zweifeln", phase: 1, streak: 0, lastReviewed: null },
        { id: 46, lat: "gaudere", ger: "sich freuen", phase: 1, streak: 0, lastReviewed: null },
        { id: 47, lat: "gaudet", ger: "freut sich", phase: 1, streak: 0, lastReviewed: null },
        { id: 48, lat: "gaudent", ger: "freuen sich", phase: 1, streak: 0, lastReviewed: null },
        { id: 49, lat: "spectare", ger: "betrachten, anschauen", phase: 1, streak: 0, lastReviewed: null },
        { id: 50, lat: "spectat", ger: "betrachtet", phase: 1, streak: 0, lastReviewed: null },
        { id: 51, lat: "spectant", ger: "betrachten", phase: 1, streak: 0, lastReviewed: null },
        { id: 52, lat: "audere", ger: "wagen, sich trauen", phase: 1, streak: 0, lastReviewed: null },
        { id: 53, lat: "audet", ger: "wagt sich", phase: 1, streak: 0, lastReviewed: null },
        { id: 54, lat: "audent", ger: "wagen sich", phase: 1, streak: 0, lastReviewed: null },
        { id: 55, lat: "orare", ger: "bitten, beten, anbeten", phase: 1, streak: 0, lastReviewed: null },
        { id: 56, lat: "orat", ger: "bittet, betet", phase: 1, streak: 0, lastReviewed: null },
        { id: 57, lat: "orant", ger: "bitten, beten", phase: 1, streak: 0, lastReviewed: null },
        { id: 58, lat: "videre", ger: "sehen", phase: 1, streak: 0, lastReviewed: null },
        { id: 59, lat: "videt", ger: "sieht", phase: 1, streak: 0, lastReviewed: null },
        { id: 60, lat: "vident", ger: "sehen", phase: 1, streak: 0, lastReviewed: null },
        { id: 61, lat: "venire", ger: "kommen", phase: 1, streak: 0, lastReviewed: null },
        { id: 62, lat: "venit", ger: "kommt", phase: 1, streak: 0, lastReviewed: null },
        { id: 63, lat: "veniunt", ger: "kommen", phase: 1, streak: 0, lastReviewed: null },
        { id: 64, lat: "ridere", ger: "lachen", phase: 1, streak: 0, lastReviewed: null },
        { id: 65, lat: "ridet", ger: "lacht", phase: 1, streak: 0, lastReviewed: null },
        { id: 66, lat: "rident", ger: "lachen", phase: 1, streak: 0, lastReviewed: null },
        { id: 67, lat: "adesse", ger: "da sein, helfen", phase: 1, streak: 0, lastReviewed: null },
        { id: 68, lat: "adest", ger: "ist da", phase: 1, streak: 0, lastReviewed: null },
        { id: 69, lat: "adsunt", ger: "sind da", phase: 1, streak: 0, lastReviewed: null },
        { id: 70, lat: "diu", ger: "lange, lange Zeit", phase: 1, streak: 0, lastReviewed: null },
        { id: 71, lat: "expectare", ger: "warten auf, erwarten", phase: 1, streak: 0, lastReviewed: null },
        { id: 72, lat: "expectat", ger: "wartet auf", phase: 1, streak: 0, lastReviewed: null },
        { id: 73, lat: "expectant", ger: "warten auf", phase: 1, streak: 0, lastReviewed: null },
        { id: 74, lat: "per", ger: "durch", phase: 1, streak: 0, lastReviewed: null },
        { id: 75, lat: "via", ger: "Weg, Straße", phase: 1, streak: 0, lastReviewed: null },
        { id: 76, lat: "properare", ger: "eilen, sich beeilen", phase: 1, streak: 0, lastReviewed: null },
        { id: 77, lat: "properat", ger: "eilt", phase: 1, streak: 0, lastReviewed: null },
        { id: 78, lat: "properant", ger: "eilen", phase: 1, streak: 0, lastReviewed: null },
        { id: 79, lat: "semper", ger: "immer", phase: 1, streak: 0, lastReviewed: null },
        { id: 80, lat: "post", ger: "hinter, nach", phase: 1, streak: 0, lastReviewed: null },
        { id: 81, lat: "subito", ger: "plötzlich", phase: 1, streak: 0, lastReviewed: null },
        { id: 82, lat: "non iam", ger: "nicht mehr", phase: 1, streak: 0, lastReviewed: null },
        { id: 83, lat: "nam", ger: "denn, nämlich", phase: 1, streak: 0, lastReviewed: null },
        { id: 84, lat: "undique", ger: "von allen Seiten, überall", phase: 1, streak: 0, lastReviewed: null },
        { id: 85, lat: "turba", ger: "Menschenmenge", phase: 1, streak: 0, lastReviewed: null },
        { id: 86, lat: "reperire", ger: "finden, wiederfinden", phase: 1, streak: 0, lastReviewed: null },
        { id: 87, lat: "reperit", ger: "findet", phase: 1, streak: 0, lastReviewed: null },
        { id: 88, lat: "reperiunt", ger: "finden", phase: 1, streak: 0, lastReviewed: null },
        { id: 89, lat: "ante", ger: "vor", phase: 1, streak: 0, lastReviewed: null },
        { id: 90, lat: "taberna", ger: "Gasthaus, Laden", phase: 1, streak: 0, lastReviewed: null },
        { id: 91, lat: "tabernae", ger: "Gasthäuser, Läden", phase: 1, streak: 0, lastReviewed: null }
    ],
    history: {},
    rewards: {
        10: "Überraschung!",
        20: "Wunsch-Eis!",
        50: "Kinoabend!",
        100: "Großer Ausflug!"
    },
    theme: 'panda',
    lastLoginDate: new Date().toDateString()
};

const todayKey = new Date().toISOString().split('T')[0];
if (!appData.history[todayKey]) appData.history[todayKey] = 0;

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
    const target = 5;
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
    const validAnswers = DICTIONARY[lat] || DICTIONARY[cleanLat];
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
                    <input type="text" id="user-answer" required autocomplete="off" class="minecraft-input-box w-full px-2 py-1.5 text-center font-bold focus:outline-none" placeholder="Übersetzung...">
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
                    <input type="text" id="user-answer" required autocomplete="off" class="panda-text-input" placeholder="Übersetzung...">
                </div>
                <button type="submit" class="panda-submit-btn">Veritas</button>
            </form>
        `;
    }
}

function checkTypedAnswer(e) {
    e.preventDefault();
    const input = document.getElementById('user-answer').value.trim().toLowerCase();
    const target = currentCard.ger.trim().toLowerCase();
    const feedback = document.getElementById('answer-feedback');
    if (feedback) feedback.classList.remove('hidden');

    const isCorrect = input === target || target.includes(input);

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

function calculateStreak() {
    let streak = 0;
    for (let i = 0; i < 365; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const k = d.toISOString().split('T')[0];
        if ((appData.history[k] || 0) >= 5) streak++;
        else if (i > 0) break;
    }
    return streak;
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

    [10, 20, 50, 100].forEach(days => {
        const input = document.getElementById(`reward-${days}`);
        if (input) input.value = appData.rewards[days] || "";
    });

    renderRewards(streak);
}

function requestParentAccess() {
    const pin = prompt("Bitte Eltern-Code eingeben:");
    if (pin === "0604") {
        const panel = document.getElementById('parent-settings');
        if (panel) panel.classList.toggle('hidden');
    } else if (pin !== null) {
        alert("Falscher Code!");
    }
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
// Service Worker für WLAN- und Offline-Nutzung registrieren
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registriert: ', reg.scope))
            .catch(err => console.log('Service Worker Fehler: ', err));
    });
}