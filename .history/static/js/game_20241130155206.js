// Game state variables
let gameMode = 'explore';
let currentQuestion = null;
let currentCategory = null;
let score = 0;
let totalQuestions = 0;

// Show category selection popup
function showCategorySelection() {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category-selection';
    categoryDiv.innerHTML = `
        <div class="popup-content">
            <h3>Επιλέξτε Κατηγορία</h3>
            <button onclick="selectCategory('mountains')">Βουνά</button>
            <button onclick="selectCategory('lakes')">Λίμνες</button>
            <button onclick="selectCategory('rivers')">Ποτάμια</button>
        </div>
    `;
    document.body.appendChild(categoryDiv);
}

// Handle category selection
function selectCategory(category) {
    currentCategory = category;
    document.querySelector('.category-selection').remove();
    
    // Hide all markers first
    mountain_group.clearLayers();
    lake_group.clearLayers();
    river_group.clearLayers();
    
    // Show only markers for selected category
    let activeGroup;
    switch(category) {
        case 'mountains':
            activeGroup = mountain_group;
            break;
        case 'lakes':
            activeGroup = lake_group;
            break;
        case 'rivers':
            activeGroup = river_group;
            break;
    }
    
    if (activeGroup) {
        addMarkers(); // This will re-add all markers, but only the active group will be visible
    }
    
    startQuiz();
}

// Start quiz mode
function startQuiz() {
    gameMode = 'quiz';
    score = 0;
    totalQuestions = 0;
    generateQuestion();
}

// Generate a new question
function generateQuestion() {
    const categoryData = locations[currentCategory];
    const locationNames = Object.keys(categoryData);
    const randomLocation = locationNames[Math.floor(Math.random() * locationNames.length)];
    
    currentQuestion = {
        name: randomLocation,
        coords: categoryData[randomLocation].coords
    };
    
    totalQuestions++;
    
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-popup';
    questionDiv.innerHTML = `
        <div class="popup-content">
            <h3>Ερώτηση ${totalQuestions}</h3>
            <p>Πού βρίσκεται το ${randomLocation};</p>
            <p>Κάντε κλικ στο χάρτη</p>
        </div>
    `;
    document.body.appendChild(questionDiv);
}

// Show feedback after answer
function showFeedback(message, isCorrect) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackDiv.innerHTML = message;
    document.body.appendChild(feedbackDiv);
    
    setTimeout(() => {
        feedbackDiv.remove();
        generateQuestion();
    }, 2000);
}

// Update score display
function updateScore() {
    const scoreElement = document.querySelector('.score');
    if (scoreElement) {
        scoreElement.textContent = `Σκορ: ${score}/${totalQuestions}`;
    }
}

// Start explore mode
function startExploreMode() {
    gameMode = 'explore';
    const elements = document.querySelectorAll('.question-popup, .feedback, .score');
    elements.forEach(el => el.remove());
    
    // Show all markers
    addMarkers();
}

// Check answer
function checkAnswer(lat, lng) {
    if (gameMode !== 'quiz' || !currentQuestion) return;
    
    const distance = calculateDistance(lat, lng, 
        currentQuestion.coords[0], 
        currentQuestion.coords[1]
    );
    
    const maxDistance = 100; // kilometers
    const isCorrect = distance <= maxDistance;
    
    if (isCorrect) {
        score++;
        showFeedback('Σωστά! 🎉', true);
    } else {
        showFeedback(`Λάθος! Η σωστή τοποθεσία ήταν ${distance.toFixed(1)}km μακριά.`, false);
    }
    
    updateScore();
}

// Calculate distance between two points
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Add click handler to map
document.addEventListener('DOMContentLoaded', () => {
    map.on('click', (e) => {
        if (gameMode === 'quiz') {
            checkAnswer(e.latlng.lat, e.latlng.lng);
        }
    });
});