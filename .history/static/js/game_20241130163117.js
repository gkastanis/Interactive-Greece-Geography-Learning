// Game state variables
let gameMode = 'explore';
let currentQuestion = null;
let currentCategory = null;
let score = 0;
let totalQuestions = 0;
let tries = 3;

// Initialize sound effects
const correctSound = new Audio('/static/sounds/correct.mp3');
const incorrectSound = new Audio('/static/sounds/incorrect.mp3');

// Preload sounds
correctSound.load();
incorrectSound.load();

// Fun feedback messages
const correctMessages = [
    '🌟 Μπράβο! Είσαι σούπερ!',
    '✨ Φανταστικά! Συνέχισε έτσι!',
    '🎉 Τέλεια! Είσαι αστέρι!',
    '🏆 Υπέροχα! Είσαι πρωταθλητής!',
    '🎯 Σωστά! Είσαι εξαιρετικός!'
];

const incorrectMessages = [
    '🤔 Σχεδόν! Προσπάθησε ξανά!',
    '💫 Πλησίασες! Άλλη μια προσπάθεια!',
    '🌈 Μην το βάζεις κάτω!',
    '🎨 Δοκίμασε λίγο πιο κοντά!',
    '🌺 Συνέχισε την προσπάθεια!'
];

// Get random message
function getRandomMessage(messages) {
    return messages[Math.floor(Math.random() * messages.length)];
}

// Show category selection popup
function showCategorySelection() {
    document.getElementById('category-selection').style.display = 'block';
}

// Handle category selection
function startQuiz(category) {
    currentCategory = category;
    document.getElementById('category-selection').style.display = 'none';
    document.getElementById('quiz-info').style.display = 'block';
    
    gameMode = 'quiz';
    score = 0;
    totalQuestions = 0;
    tries = 3;
    
    // Update markers to show only current category
    addMarkers();
    generateQuestion();
}

// Generate a new question
function generateQuestion() {
    let data;
    switch(currentCategory) {
        case 'mountains':
            data = mountains;
            break;
        case 'lakes':
            data = lakes;
            break;
        case 'rivers':
            data = rivers;
            break;
    }
    
    const locationNames = Object.keys(data);
    const randomLocation = locationNames[Math.floor(Math.random() * locationNames.length)];
    const locationData = data[randomLocation];
    
    currentQuestion = {
        name: randomLocation,
        coords: currentCategory === 'rivers' ? locationData[0] : [locationData[0], locationData[1]]
    };
    
    totalQuestions++;
    updateQuestionDisplay();
}

// Update question display
function updateQuestionDisplay() {
    document.getElementById('question').textContent = `Πού βρίσκεται το ${currentQuestion.name};`;
    document.getElementById('score').textContent = `Σκορ: ${score}/${totalQuestions}`;
    document.getElementById('tries').textContent = `Προσπάθειες: ${tries}`;
}

// Show feedback after answer
function showFeedback(message, isCorrect) {
    // Play appropriate sound
    if (isCorrect) {
        correctSound.currentTime = 0;
        correctSound.play().catch(e => console.log('Error playing sound:', e));
    } else {
        incorrectSound.currentTime = 0;
        incorrectSound.play().catch(e => console.log('Error playing sound:', e));
    }

    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    
    // Use fun messages
    if (isCorrect) {
        feedbackDiv.textContent = getRandomMessage(correctMessages);
    } else if (tries <= 0) {
        feedbackDiv.textContent = `Μην ανησυχείς! Το ${currentQuestion.name} βρίσκεται εδώ! 🗺️`;
    } else {
        feedbackDiv.textContent = `${getRandomMessage(incorrectMessages)} (${tries} προσπάθειες ακόμα)`;
    }
    
    document.body.appendChild(feedbackDiv);
    
    setTimeout(() => {
        feedbackDiv.remove();
        if (isCorrect || tries <= 0) {
            generateQuestion();
            tries = 3;
        }
        updateQuestionDisplay();
    }, 2000);
}

// Start explore mode
function startExploreMode() {
    gameMode = 'explore';
    document.getElementById('quiz-info').style.display = 'none';
    document.getElementById('category-selection').style.display = 'none';
    
    // Show all markers
    addMarkers();
}

// Handle map click in quiz mode
function handleMapClick(lat, lng) {
    if (gameMode === 'quiz' && currentQuestion) {
        const distance = calculateDistance(lat, lng, 
            currentQuestion.coords[0], 
            currentQuestion.coords[1]
        );
        
        tries--;
        
        if (distance < 50) { // Within 50km
            score++;
            showFeedback('Σωστά! 🎉', true);
        } else {
            if (tries <= 0) {
                showFeedback(`Λάθος! Το ${currentQuestion.name} βρίσκεται αλλού.`, false);
            } else {
                showFeedback(`Προσπάθησε ξανά! Απομένουν ${tries} προσπάθειες.`, false);
            }
        }
    }
}

// Calculate distance between two points in kilometers
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}