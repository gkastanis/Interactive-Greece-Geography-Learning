// Game state variables
let gameMode = 'explore';
let currentQuestion = null;
let currentCategory = null;
let score = 0;
let totalQuestions = 0;
let tries = 3;
let answeredQuestions = new Set(); // Track correctly answered questions

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
    
    gameMode = 'quiz';
    score = 0;
    totalQuestions = 0;
    tries = 3;
    answeredQuestions.clear(); // Reset answered questions when starting new quiz
    
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
    const availableLocations = locationNames.filter(name => !answeredQuestions.has(name));
    
    // If all questions have been answered correctly, end the quiz or restart
    if (availableLocations.length === 0) {
        showFeedback('🎉 Συγχαρητήρια! Απάντησες σωστά σε όλες τις ερωτήσεις!', true);
        setTimeout(() => {
            startExploreMode();
            document.getElementById('quiz-info').style.display = 'none';
            document.getElementById('category-selection').style.display = 'block';
        }, 2000);
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
    gameMode = 'explore';
    document.getElementById('quiz-info').style.display = 'none';
    document.getElementById('category-selection').style.display = 'none';
    
    // Show all markers
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
        answeredQuestions.add(currentQuestion.name); // Add to correctly answered questions
        setTimeout(generateQuestion, 2000);
    } else {
        showFeedback(getRandomMessage(incorrectMessages), false);
        tries--;
        
        if (tries <= 0) {
            // Get location data for popup
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

            // Add the name to the location data
            locationData = {
                ...locationData,
                name: currentQuestion.name
            };

            showLocationOnMap(locationData, currentCategory);
            showFeedback('Δυστυχώς δεν βρήκες τη σωστή τοποθεσία 😢', false);
            
            // Zoom out after 5 seconds
            setTimeout(() => {
                map.setView([39.0742, 21.8243], 7, {
                    animate: true,
                    duration: 1
                });
                map.closePopup();
            }, 5000);
            
            // Generate new question after zooming out
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