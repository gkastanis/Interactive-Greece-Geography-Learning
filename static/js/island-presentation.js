'use strict';

// Rich data for the 10 largest Greek islands presentation
const islandPresentationData = [
  {
    name: 'Κρήτη',
    rank: 1,
    area: '8.336',
    article: 'η',
    region: 'Περιφέρεια Κρήτης',
    gradientStart: '#0d1b2a',
    gradientMid: '#1b4f72',
    gradientEnd: '#2e86ab',
    accentColor: '#e63946',
    highlights: ['🏛️ Κνωσός', '🏔️ Φαράγγι Σαμαριάς', '🌊 Ελαφονήσι'],
    description: 'Το μεγαλύτερο νησί της Ελλάδας! Εδώ άκμασε ο Μινωικός πολιτισμός — η πρώτη μεγάλη πολιτισμένη κοινωνία στην Ευρώπη, πριν από περισσότερα από 4.000 χρόνια.',
    fact: 'Σύμφωνα με τη μυθολογία, ο Δίας γεννήθηκε σε μία σπηλιά στην Κρήτη!',
    emoji: '🏛️',
    latitude: 35.22, longitude: 24.80,
  },
  {
    name: 'Εύβοια',
    rank: 2,
    area: '3.655',
    article: 'η',
    region: 'Στερεά Ελλάδα',
    gradientStart: '#0d2b1f',
    gradientMid: '#1a5c3b',
    gradientEnd: '#27935f',
    accentColor: '#52b788',
    highlights: ['♨️ Λουτρά Αιδηψού', '🌊 Εύριπος', '🌿 Δάση Σκούρτων'],
    description: 'Το δεύτερο μεγαλύτερο νησί! Συνδέεται με τη Στερεά Ελλάδα με γέφυρες. Το στενό του Ευρίπου αλλάζει ρεύμα πολλές φορές την ημέρα — ένα φαινόμενο που απασχόλησε τους αρχαίους.',
    fact: 'Λέγεται ότι ο Αριστοτέλης ήταν τόσο αγχωμένος με το μυστήριο του Ευρίπου που εγκαταστάθηκε εκεί!',
    emoji: '🌊',
    latitude: 38.50, longitude: 23.85,
  },
  {
    name: 'Λέσβος',
    rank: 3,
    area: '1.633',
    article: 'η',
    region: 'Βόρειο Αιγαίο',
    gradientStart: '#1a0533',
    gradientMid: '#3d1a7d',
    gradientEnd: '#6b21a8',
    accentColor: '#c084fc',
    highlights: ['🫒 Ελαιόλαδος', '🦢 Κόλπος Γέρας', '🎭 Μυτιλήνη'],
    description: 'Το τρίτο μεγαλύτερο νησί! Γνωστή για τα εκατομμύρια ελαιόδεντρά της. Παράγει μερικά από τα καλύτερα ελαιόλαδα στον κόσμο και φιλοξένησε σπουδαίους ποιητές και φιλοσόφους.',
    fact: 'Εδώ γεννήθηκε η Σαπφώ, η μεγαλύτερη γυναίκα ποιήτρια της αρχαιότητας!',
    emoji: '🫒',
    latitude: 39.22, longitude: 26.35,
  },
  {
    name: 'Ρόδος',
    rank: 4,
    area: '1.401',
    article: 'η',
    region: 'Δωδεκάνησα',
    gradientStart: '#1a0a00',
    gradientMid: '#7c2d12',
    gradientEnd: '#c2410c',
    accentColor: '#fb923c',
    highlights: ['🗿 Κολοσσός', '🏰 UNESCO Παλιά Πόλη', '☀️ 300 ηλιόλουστες μέρες'],
    description: 'Το τέταρτο μεγαλύτερο νησί, γνωστό ως «νησί του ήλιου»! Με πάνω από 300 ηλιόλουστες μέρες τον χρόνο, η Παλιά Πόλη της Ρόδου είναι Μνημείο Παγκόσμιας Κληρονομιάς UNESCO.',
    fact: 'Ο Κολοσσός της Ρόδου — χάλκινο άγαλμα 33 μέτρων — ήταν ένα από τα 7 Θαύματα του Αρχαίου Κόσμου!',
    emoji: '☀️',
    latitude: 36.43, longitude: 28.22,
  },
  {
    name: 'Χίος',
    rank: 5,
    area: '842',
    article: 'η',
    region: 'Βόρειο Αιγαίο',
    gradientStart: '#0d1f00',
    gradientMid: '#254d00',
    gradientEnd: '#3a6600',
    accentColor: '#a3e635',
    highlights: ['🌿 Μαστίχα', '🏘️ Μεστά', '🏺 Πυργοτυπία'],
    description: 'Το πέμπτο μεγαλύτερο νησί! Παράγει τη διάσημη μαστίχα — ένα μοναδικό ρητίνωμα που βγαίνει μόνο εδώ, σε κανένα άλλο μέρος του κόσμου.',
    fact: 'Η μαστίχα Χίου αποκαλείται «Άσπρο Χρυσάφι» — αρωματίζει τρόφιμα, ποτά και φάρμακα παγκοσμίως!',
    emoji: '🌿',
    latitude: 38.37, longitude: 26.13,
  },
  {
    name: 'Κεφαλονιά',
    rank: 6,
    area: '781',
    article: 'η',
    region: 'Ιόνια Νησιά',
    gradientStart: '#001a2c',
    gradientMid: '#00426b',
    gradientEnd: '#005f99',
    accentColor: '#38bdf8',
    highlights: ['🔵 Σπήλαιο Μελισσάνη', '🐢 Caretta-caretta', '🏖️ Παραλία Μύρτος'],
    description: 'Το έκτο μεγαλύτερο νησί και το μεγαλύτερο των Ιονίων! Με εντυπωσιακά σπήλαια και κρυστάλλινα νερά. Η παραλία Μύρτος θεωρείται μία από τις ομορφότερες στον κόσμο.',
    fact: 'Η λίμνη Μελισσάνη βρίσκεται μέσα σε σπήλαιο — η οροφή κατέρρευσε πριν από 3.000 χρόνια!',
    emoji: '🔵',
    latitude: 38.22, longitude: 20.57,
  },
  {
    name: 'Κέρκυρα',
    rank: 7,
    area: '592',
    article: 'η',
    region: 'Ιόνια Νησιά',
    gradientStart: '#1a0800',
    gradientMid: '#6b3000',
    gradientEnd: '#a24800',
    accentColor: '#f97316',
    highlights: ['🏛️ Αχίλλειο', '🏰 UNESCO Παλιά Πόλη', '🌳 4 εκ. ελαιόδεντρα'],
    description: 'Το έβδομο μεγαλύτερο νησί! Γνωστή για τη βενετσιάνικη αρχιτεκτονική της. Η Παλιά Πόλη της Κέρκυρας είναι Μνημείο Παγκόσμιας Κληρονομιάς UNESCO.',
    fact: 'Η Κέρκυρα ήταν η πρώτη ελληνική πόλη με ηλεκτρικό φωτισμό — ήδη από το 1889!',
    emoji: '🏰',
    latitude: 39.62, longitude: 19.92,
  },
  {
    name: 'Σάμος',
    rank: 8,
    area: '477',
    article: 'η',
    region: 'Βόρειο Αιγαίο',
    gradientStart: '#020617',
    gradientMid: '#1e3a8a',
    gradientEnd: '#1d4ed8',
    accentColor: '#60a5fa',
    highlights: ['📐 Πυθαγόρειο UNESCO', '🏛️ Ηραίο UNESCO', '🍷 Σαμιώτικο κρασί'],
    description: 'Το όγδοο μεγαλύτερο νησί! Γενέτειρα του Πυθαγόρα. Το Πυθαγόρειο και το Ηραίο είναι Μνημεία Παγκόσμιας Κληρονομιάς UNESCO.',
    fact: 'Ο Πυθαγόρας ανακάλυψε ότι α² + β² = γ² — ζώντας εδώ! Σε χρησιμοποιείς ακόμα στα μαθηματικά!',
    emoji: '📐',
    latitude: 37.78, longitude: 26.83,
  },
  {
    name: 'Λήμνος',
    rank: 9,
    area: '476',
    article: 'η',
    region: 'Βόρειο Αιγαίο',
    gradientStart: '#1c0000',
    gradientMid: '#7f1d1d',
    gradientEnd: '#b91c1c',
    accentColor: '#f87171',
    highlights: ['🌾 Εύφορο έδαφος', '🦩 Φλαμίνγκο', '🏖️ Μακαρωνάς'],
    description: 'Το ένατο μεγαλύτερο νησί, ηφαιστειογενούς προέλευσης, με εξαιρετικά εύφορο έδαφος. Κατά τη μυθολογία, ο Ήφαιστος — θεός της φωτιάς — ζούσε εδώ.',
    fact: 'Φλαμίνγκο σταματούν στη Λήμνο κάθε χρόνο στη μεταναστευτική τους πορεία!',
    emoji: '🌋',
    latitude: 39.90, longitude: 25.22,
  },
  {
    name: 'Νάξος',
    rank: 10,
    area: '429',
    article: 'η',
    region: 'Κυκλάδες',
    gradientStart: '#120027',
    gradientMid: '#2d0b6e',
    gradientEnd: '#4c1d95',
    accentColor: '#a78bfa',
    highlights: ['⛩️ Πορτάρα', '🏔️ Όρος Ζευς', '🧀 Κεφαλοτύρι'],
    description: 'Το δέκατο μεγαλύτερο νησί και το μεγαλύτερο των Κυκλάδων! Γνωστή για το λευκό μάρμαρό της, τα εύφορα εδάφη και την εντυπωσιακή Πορτάρα — αρχαία πύλη κοντά στη θάλασσα.',
    fact: 'Λέγεται ότι ο θεός Διόνυσος ερωτεύτηκε την Αριάδνη εδώ στη Νάξο — μετά την βοήθησε να ξεφύγει από τον Θησέα!',
    emoji: '⛩️',
    latitude: 37.10, longitude: 25.38,
  },
];

let currentIslandIndex = 0;
let presentationAutoTimer = null;

function showIslandPresentation() {
  currentIslandIndex = 0;
  const overlay = document.getElementById('island-presentation');
  overlay.style.display = 'flex';
  buildIslandDots();
  renderIslandCard(0, 'fade');
  document.addEventListener('keydown', handlePresentationKey);
  document.getElementById('map').style.pointerEvents = 'none';
}

function closeIslandPresentation() {
  document.getElementById('island-presentation').style.display = 'none';
  stopIslandAutoplay();
  document.removeEventListener('keydown', handlePresentationKey);
  document.getElementById('map').style.pointerEvents = '';
}

function handlePresentationKey(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextIsland();
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevIsland();
  else if (e.key === 'Escape') closeIslandPresentation();
}

function buildIslandDots() {
  const dotsEl = document.getElementById('isl-dots');
  while (dotsEl.firstChild) dotsEl.removeChild(dotsEl.firstChild);
  islandPresentationData.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'isl-dot';
    btn.setAttribute('aria-label', `Νησί ${i + 1}`);
    btn.addEventListener('click', (function(idx) {
      return function() { goToIsland(idx); };
    })(i));
    dotsEl.appendChild(btn);
  });
}

function goToIsland(index) {
  const dir = index > currentIslandIndex ? 'right' : 'left';
  currentIslandIndex = index;
  renderIslandCard(index, dir);
}

function nextIsland() {
  goToIsland((currentIslandIndex + 1) % islandPresentationData.length);
}

function prevIsland() {
  goToIsland((currentIslandIndex - 1 + islandPresentationData.length) % islandPresentationData.length);
}

function startIslandAutoplay() {
  stopIslandAutoplay();
  const btn = document.getElementById('isl-autoplay-btn');
  if (btn) btn.textContent = '⏸';
  presentationAutoTimer = setInterval(function() {
    const next = (currentIslandIndex + 1) % islandPresentationData.length;
    goToIsland(next);
    if (next === 0) stopIslandAutoplay();
  }, 5000);
}

function stopIslandAutoplay() {
  clearInterval(presentationAutoTimer);
  presentationAutoTimer = null;
  const btn = document.getElementById('isl-autoplay-btn');
  if (btn) btn.textContent = '▶';
}

function toggleIslandAutoplay() {
  if (presentationAutoTimer) stopIslandAutoplay();
  else startIslandAutoplay();
}

function renderIslandCard(index, direction) {
  const d = islandPresentationData[index];
  const overlay = document.getElementById('island-presentation');

  overlay.style.background =
    'linear-gradient(160deg, ' + d.gradientStart + ' 0%, ' + d.gradientMid + ' 55%, ' + d.gradientEnd + ' 100%)';

  document.getElementById('isl-rank-bg').textContent = String(d.rank).padStart(2, '0');

  // Animate the card
  const card = document.getElementById('isl-card');
  card.classList.remove('anim-fade', 'anim-left', 'anim-right');
  // eslint-disable-next-line no-unused-expressions
  card.offsetWidth; // force reflow for animation restart
  if (direction === 'fade') card.classList.add('anim-fade');
  else if (direction === 'right') card.classList.add('anim-right');
  else card.classList.add('anim-left');

  // Rank and name
  const rankEl = document.getElementById('isl-number');
  rankEl.textContent = '# ' + d.rank;
  rankEl.style.color = d.accentColor;

  document.getElementById('isl-emoji').textContent = d.emoji;
  document.getElementById('isl-name').textContent = d.name;
  document.getElementById('isl-area').textContent = d.area + ' km\u00B2';
  document.getElementById('isl-region').textContent = d.region;
  document.getElementById('isl-description').textContent = d.description;
  document.getElementById('isl-fact-text').textContent = d.fact;

  // Rebuild highlights with DOM methods (avoids innerHTML with untrusted data)
  const highlightsEl = document.getElementById('isl-highlights');
  while (highlightsEl.firstChild) highlightsEl.removeChild(highlightsEl.firstChild);
  d.highlights.forEach(function(h) {
    const pill = document.createElement('span');
    pill.className = 'isl-pill';
    pill.textContent = h;
    pill.style.borderColor = d.accentColor + '66';
    highlightsEl.appendChild(pill);
  });

  // Progress bar
  const bar = document.getElementById('isl-progress-bar');
  bar.style.width = ((index + 1) / islandPresentationData.length * 100) + '%';
  bar.style.backgroundColor = d.accentColor;

  // Counter
  document.getElementById('isl-counter').textContent = (index + 1) + ' / ' + islandPresentationData.length;

  // Update dots
  document.querySelectorAll('.isl-dot').forEach(function(dot, i) {
    const isActive = i === index;
    dot.classList.toggle('active', isActive);
    dot.style.backgroundColor = isActive ? d.accentColor : '';
    dot.style.width = isActive ? '28px' : '';
  });
}
