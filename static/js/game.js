// Game state variables
let gameMode = 'explore';
let currentQuestion = null;
let currentCategory = null;
let score = 0;
let totalQuestions = 0;
let tries = 3;
let answeredQuestions = new Set(); // Track correctly answered questions
let correctAnswersNeeded = {}; // Track how many times each location needs to be answered correctly

// Initialize sound effects
const correctSound = new Audio('/static/sounds/correct.wav');
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
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('close-quiz').style.display = 'block';
    
    gameMode = 'quiz';
    score = 0;
    totalQuestions = 0;
    tries = 3;
    answeredQuestions.clear();
    
    // Initialize correctAnswersNeeded for each location
    let data;
    switch(category) {
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
    correctAnswersNeeded = {};
    Object.keys(data).forEach(name => {
        correctAnswersNeeded[name] = 2; // Each location needs to be answered correctly twice
    });
    
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
    // Filter locations that still need correct answers
    const availableLocations = locationNames.filter(name => correctAnswersNeeded[name] > 0);
    
    // If all locations have been answered correctly twice, end the quiz
    if (availableLocations.length === 0) {
        showFeedback('🎉 Συγχαρητήρια! Απάντησες σωστά σε όλες τις ερωτήσεις δύο φορές!', true);
        setTimeout(() => {
            startExploreMode();
            document.getElementById('quiz-info').style.display = 'none';
            document.getElementById('category-selection').style.display = 'block';
        }, 3000);
        return;
    }
    
    const randomLocation = availableLocations[Math.floor(Math.random() * availableLocations.length)];
    const locationData = data[randomLocation];
    
    currentQuestion = {
        name: randomLocation,
        article: locationData.article,
        coords: currentCategory === 'rivers' ? locationData.coordinates[0] : 
                { latitude: locationData.latitude, longitude: locationData.longitude },
        description: locationData.description
    };
    
    totalQuestions++;
    updateQuestionDisplay();
    addMarkers(); // Update markers to show current progress
}

// Update question display
function updateQuestionDisplay() {
    document.getElementById('question').textContent = `Πού βρίσκεται ${currentQuestion.article} ${currentQuestion.name};`;
    document.getElementById('hint').textContent = currentQuestion.description;
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
    document.getElementById('quiz-info').style.display = 'none';
    document.getElementById('category-selection').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('close-quiz').style.display = 'none';
    
    gameMode = 'explore';
    currentCategory = null;
    map.closePopup();
    addMarkers();
}

// Handle map click in quiz mode
function handleMapClick(lat, lng) {
    if (gameMode !== 'quiz' || !currentQuestion) return;
    
    const distance = calculateDistance(
        lat, 
        lng, 
        currentQuestion.coords.latitude, 
        currentQuestion.coords.longitude
    );
    
    if (distance <= 50) { // Within 50km radius
        showFeedback(getRandomMessage(correctMessages), true);
        score++;
        correctAnswersNeeded[currentQuestion.name]--; // Decrease needed correct answers
        answeredQuestions.add(currentQuestion.name);
        setTimeout(() => {
            generateQuestion();
            addMarkers(); // Update markers after correct answer
        }, 2000);
    } else {
        showFeedback(getRandomMessage(incorrectMessages), false);
        tries--;
        
        if (tries <= 0) {
            let locationData;
            switch(currentCategory) {
                case 'mountains':
                    locationData = mountains[currentQuestion.name];
                    break;
                case 'lakes':
                    locationData = lakes[currentQuestion.name];
                    break;
                case 'rivers':
                    locationData = rivers[currentQuestion.name];
                    break;
            }
            
            locationData = {
                ...locationData,
                name: currentQuestion.name
            };

            showLocationOnMap(locationData, currentCategory);
            showFeedback('Δυστυχώς δεν βρήκες τη σωστή τοποθεσία 😢', false);
            
            setTimeout(() => {
                map.setView([39.0742, 21.8243], 7, {
                    animate: true,
                    duration: 1
                });
                map.closePopup();
            }, 5000);
            
            setTimeout(() => {
                generateQuestion();
                tries = 3;
            }, 5500);
        }
    }
    updateQuestionDisplay();
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