import folium
from folium import plugins

# Create a map centered on Greece
m = folium.Map(location=[39.0742, 21.8243], zoom_start=7)

# Create feature groups for different categories
mountain_group = folium.FeatureGroup(name='Βουνά')
lake_group = folium.FeatureGroup(name='Λίμνες')
river_group = folium.FeatureGroup(name='Ποτάμια')

# Dictionary of major mountains in Greece with more details
mountains = {
    'Όλυμπος': [40.0859, 22.3583, 2917, 'Το ψηλότερο βουνό της Ελλάδας, κατοικία των αρχαίων θεών'],
    'Παρνασσός': [38.5333, 22.6167, 2457, 'Ιερό βουνό του Απόλλωνα και των Μουσών'],
    'Σμόλικας': [40.0875, 20.9167, 2637, 'Το δεύτερο ψηλότερο βουνό της Ελλάδας'],
    'Ψηλορείτης': [35.2167, 24.7667, 2456, 'Το ψηλότερο βουνό της Κρήτης, τόπος γέννησης του Δία'],
    'Πήλιο': [39.3967, 23.0419, 1624, 'Μυθικό σπίτι των Κενταύρων'],
    'Ταΰγετος': [37.0500, 22.3500, 2407, 'Το ψηλότερο βουνό της Πελοποννήσου'],
    'Άθως': [40.1564, 24.3284, 2033, 'Ιερό όρος και μοναστική πολιτεία'],
    'Δίρφυς': [38.6167, 23.8500, 1743, 'Η ψηλότερη κορυφή της Εύβοιας'],
    'Χελμός': [38.0167, 22.2000, 2355, 'Έδρα του τηλεσκοπίου Αρίσταρχος'],
    'Γκιώνα': [38.6667, 22.2833, 2510, 'Το ψηλότερο βουνό της Στερεάς Ελλάδας'],
    'Τύμφη': [39.9833, 20.8167, 2497, 'Γνωστή για το φαράγγι του Βίκου'],
    'Βαρδούσια': [38.7167, 22.1167, 2495, 'Μέρος της οροσειράς της Πίνδου'],
    'Γράμμος': [40.3667, 20.8833, 2520, 'Στα σύνορα με την Αλβανία'],
    'Παναχαϊκό': [38.2167, 21.8833, 1926, 'Με θέα στον Πατραϊκό κόλπο'],
    'Οίτη': [38.8167, 22.2833, 2152, 'Τόπος θανάτου του Ηρακλή κατά τη μυθολογία'],
    'Μαίναλο': [37.6000, 22.2833, 1981, 'Το μυθικό βουνό του θεού Πάνα'],
    'Λευκά Όρη': [35.2833, 24.0000, 2454, 'Γνωστά και ως Μαδάρες στην Κρήτη'],
    'Παγγαίο': [40.9167, 24.0833, 1956, 'Αρχαίο όρος με πλούσια κοιτάσματα χρυσού'],
    'Βέρμιο': [40.4667, 22.0167, 2052, 'Βουνό της Μακεδονίας με χιονοδρομικά κέντρα'],
    'Φαλακρό': [41.2833, 24.0833, 2232, 'Εντυπωσιακό βουνό της Δράμας'],
    'Καϊμακτσαλάν': [40.9333, 21.7833, 2524, 'Το τρίτο ψηλότερο βουνό της Ελλάδας'],
    'Δίκτη': [35.1167, 25.4833, 2148, 'Ιερό βουνό της Κρήτης, σπήλαιο του Δία'],
    'Πάρνηθα': [38.1667, 23.7167, 1413, 'Το ψηλότερο βουνό της Αττικής'],
    'Υμηττός': [37.9667, 23.8167, 1026, 'Γνωστό για το μέλι του από την αρχαιότητα'],
    'Μπέλες': [41.3333, 22.9333, 2031, 'Οροσειρά στα σύνορα με τη Βόρεια Μακεδονία'],
    'Ροδόπη': [41.5167, 24.6000, 1827, 'Εκτεταμένη οροσειρά στα σύνορα με τη Βουλγαρία'],
    'Όρβηλος': [41.3667, 23.6000, 2212, 'Βουνό στα σύνορα Ελλάδας-Βουλγαρίας'],
    'Άσκιο': [40.5000, 21.7000, 2111, 'Γνωστό και ως Σινιάτσικο'],
    'Βόρας': [40.9333, 21.7833, 2524, 'Οροσειρά που φιλοξενεί το χιονοδρομικό του Καϊμακτσαλάν'],
    'Πιέρια': [40.2500, 22.2167, 2190, 'Μυθικό βουνό των Μουσών'],
    'Βασιλίτσα': [40.0833, 21.0833, 2249, 'Γνωστή για το χιονοδρομικό της κέντρο'],
    'Σμόλικας': [40.0833, 20.9167, 2637, 'Το δεύτερο ψηλότερο βουνό της Ελλάδας'],
    'Χελμός': [38.0000, 22.2000, 2355, 'Φιλοξενεί το αστεροσκοπείο Αριστάρχου'],
    'Ταΰγετος': [36.9500, 22.3500, 2407, 'Το ψηλότερο βουνό της Πελοποννήσου'],
    'Κίσσαβος': [39.9333, 22.6833, 1978, 'Το αρχαίο όρος Όσσα'],
    'Παρνασσός': [38.5333, 22.6000, 2457, 'Μυθικό βουνό και σύγχρονο χιονοδρομικό κέντρο']
}

# Dictionary of major lakes in Greece with details
lakes = {
    'Λίμνη Τριχωνίδα': [38.5667, 21.5500, 'Η μεγαλύτερη φυσική λίμνη της Ελλάδας'],
    'Λίμνη Βόλβη': [40.6833, 23.5833, 'Η δεύτερη μεγαλύτερη φυσική λίμνη'],
    'Λίμνη Πρέσπα': [40.7500, 21.0833, 'Αρχαία λίμνη που μοιράζεται με την Αλβανία και τη Βόρεια Μακεδονία'],
    'Λίμνη Πλαστήρα': [39.2333, 21.7333, 'Τεχνητή λίμνη γνωστή για τη φυσική της ομορφιά'],
    'Λίμνη Κερκίνη': [41.2000, 23.1333, 'Σημαντικός υγρότοπος και καταφύγιο πουλιών'],
    'Λίμνη Παμβώτιδα': [39.6500, 20.8500, 'Ιστορική λίμνη των Ιωαννίνων'],
    'Λίμνη Βεγορίτιδα': [40.7500, 21.7833, 'Η τέταρτη μεγαλύτερη λίμνη της Ελλάδας'],
    'Λίμνη Δόξα': [37.9333, 22.2833, 'Τεχνητή λίμνη στην Πελοπόννησο'],
    'Λίμνη Κρεμαστών': [38.9167, 21.5000, 'Η μεγαλύτερη τεχνητή λίμνη της Ελλάδας'],
    'Λίμνη Υλίκη': [38.4000, 23.2833, 'Κύρια πηγή νερού για την Αθήνα'],
    'Λίμνη Καστοριάς': [40.5167, 21.2833, 'Σε σχήμα οβάλ, σπίτι σπάνιων ειδών πουλιών'],
    'Λίμνη Μαραθώνα': [38.1500, 23.9000, 'Ιστορική τεχνητή λίμνη κοντά στην Αθήνα'],
    'Λίμνη Μικρή Πρέσπα': [40.7500, 21.0833, 'Μοναδικό οικοσύστημα με σπάνια πτηνά'],
    'Λίμνη Πετρών': [40.7167, 21.6833, 'Φυσική λίμνη στη Μακεδονία'],
    'Λίμνη Δοϊράνη': [41.1833, 22.7500, 'Λίμνη στα σύνορα με τη Βόρεια Μακεδονία'],
    'Λίμνη Λυσιμαχεία': [38.5667, 21.3667, 'Φυσική λίμνη δίπλα στην Τριχωνίδα'],
    'Λίμνη Στυμφαλία': [37.8500, 22.4667, 'Αρχαία λίμνη, τόπος του άθλου του Ηρακλή'],
    'Λίμνη Κουρνά': [35.3333, 24.2833, 'Η μοναδική φυσική λίμνη της Κρήτης'],
    'Λίμνη Ζηρού': [39.2333, 20.9500, 'Καρστική λίμνη στην Ήπειρο'],
    'Λίμνη Τζαραβίνας': [39.8667, 20.6000, 'Ορεινή λίμνη στην Ήπειρο'],
    'Λίμνη Χειμαδίτιδα': [40.6167, 21.5833, 'Ρηχή λίμνη με πλούσια βιοποικιλότητα'],
    'Λίμνη Ζάζαρη': [40.6333, 21.5500, 'Μικρή λίμνη δίπλα στη Χειμαδίτιδα'],
    'Λίμνη Βιστωνίδα': [41.0333, 25.1667, 'Λιμνοθάλασσα της Θράκης'],
    'Λίμνη Κορώνεια': [40.6833, 23.1500, 'Γνωστή και ως λίμνη Αγίου Βασιλείου'],
    'Λίμνη Ισμαρίδα': [40.9500, 25.3333, 'Η μοναδική φυσική λίμνη γλυκού νερού στη Θράκη']
}

# Dictionary of major rivers in Greece with coordinates for their main course
rivers = {
    'Αλιάκμονας': [
        [40.4667, 22.2000],
        [40.5333, 21.7000],
        [40.4500, 21.4167],
        [40.2833, 21.1833],
        'Το μεγαλύτερο ποτάμι της Ελλάδας'
    ],
    'Αχελώος': [
        [39.0167, 21.5500],
        [39.2500, 21.4167],
        [39.3167, 21.2500],
        'Ιερό ποτάμι της αρχαίας Ελλάδας'
    ],
    'Πηνειός': [
        [39.8667, 22.7500],
        [39.7500, 22.2833],
        [39.6333, 22.0833],
        'Το κύριο ποτάμι της Θεσσαλίας'
    ],
    'Αξιός': [
        [40.7000, 22.7167],
        [40.8333, 22.6333],
        [41.0000, 22.5167],
        'Σημαντικό ποτάμι της Μακεδονίας'
    ],
    'Νέστος': [
        [41.1000, 24.7167],
        [41.1333, 24.8833],
        [41.0500, 25.1833],
        'Γνωστό για το εντυπωσιακό του δέλτα'
    ],
    'Έβρος': [
        [41.6833, 26.5667],
        [41.3500, 26.5000],
        [40.8500, 26.0333],
        'Φυσικό σύνορο με την Τουρκία'
    ],
    'Στρυμόνας': [
        [41.2833, 23.3500],
        [41.1167, 23.5833],
        [40.7833, 23.8500],
        'Σημαντικό ποτάμι της Μακεδονίας'
    ],
    'Νέστος': [
        [40.8500, 24.7833], # Εκβολές
        [41.0833, 24.7167],
        [41.2167, 24.6333],
        [41.3500, 24.5167],
        [41.4833, 24.4000], # Σύνορα
        'Γνωστό για το εντυπωσιακό του δέλτα'
    ],
    'Αλφειός': [
        [37.4833, 21.7000],
        [37.5833, 21.8833],
        [37.6333, 22.0000],
        'Κύριο ποτάμι της Πελοποννήσου'
    ],
    'Άραχθος': [
        [39.0333, 21.0667], # Εκβολές
        [39.1500, 21.0833],
        [39.3167, 21.1167],
        [39.5000, 21.1833],
        [39.6333, 21.2000], # Πηγή
        'Κύριο ποτάμι της Ηπείρου'
    ],
    'Θύαμις': [
        [39.6167, 20.1833],
        [39.5500, 20.2500],
        [39.3833, 20.1833],
        'Ποτάμι της Ηπείρου'
    ],
    'Σπερχειός': [
        [38.8667, 22.5333], # Εκβολές
        [38.9000, 22.3167],
        [38.9167, 22.1667],
        [38.9000, 22.0167],
        [38.8833, 21.8833], # Πηγή
        'Ρέει μέσα από την κοιλάδα της Λαμίας'
    ]
}

# Custom popup style
popup_style = """
<style>
    .custom-popup {
        font-family: 'Arial', sans-serif;
        padding: 10px;
        background: linear-gradient(to bottom, #e6f3ff, #ffffff);
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .popup-title {
        color: #2c3e50;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 8px;
        text-align: center;
        border-bottom: 2px solid #3498db;
        padding-bottom: 5px;
    }
    .popup-content {
        color: #34495e;
        font-size: 14px;
        line-height: 1.4;
    }
    .popup-fact {
        background-color: #f0f7ff;
        padding: 5px;
        margin-top: 8px;
        border-left: 3px solid #3498db;
        font-style: italic;
    }
</style>
"""

# Add mountains to the map
for name, data in mountains.items():
    popup_content = f"""
    {popup_style}
    <div class='custom-popup'>
        <div class='popup-title'>🗻 {name}</div>
        <div class='popup-content'>
            <b>Υψόμετρο:</b> {data[2]}μ<br>
            <div class='popup-fact'>{data[3]}</div>
        </div>
    </div>
    """
    folium.Marker(
        location=[data[0], data[1]],
        popup=folium.Popup(popup_content, max_width=300),
        icon=folium.Icon(icon='mountain', prefix='fa', color='darkred')
    ).add_to(mountain_group)

# Add lakes to the map
for name, data in lakes.items():
    popup_content = f"""
    {popup_style}
    <div class='custom-popup'>
        <div class='popup-title'>💧 {name}</div>
        <div class='popup-content'>
            <div class='popup-fact'>{data[2]}</div>
        </div>
    </div>
    """
    folium.Marker(
        location=[data[0], data[1]],
        popup=folium.Popup(popup_content, max_width=300),
        icon=folium.Icon(icon='water', prefix='fa', color='blue')
    ).add_to(lake_group)

# Add rivers to the map
for name, data in rivers.items():
    coords = data[:-1]  # Exclude the description
    description = data[-1]
    
    # River line popup
    line_popup_content = f"""
    {popup_style}
    <div class='custom-popup'>
        <div class='popup-title'>🌊 {name}</div>
        <div class='popup-content'>
            <div class='popup-fact'>{description}</div>
        </div>
    </div>
    """
    
    # Add the river line
    folium.PolyLine(
        coords,
        popup=folium.Popup(line_popup_content, max_width=300),
        color='blue',
        weight=2,
        opacity=0.8
    ).add_to(river_group)
    
    # Source point popup
    source_popup_content = f"""
    {popup_style}
    <div class='custom-popup'>
        <div class='popup-title'>⛰️ Πηγή {name}</div>
        <div class='popup-content'>
            <b>Συντεταγμένες:</b> {coords[-1][0]:.2f}°N, {coords[-1][1]:.2f}°E<br>
            <div class='popup-fact'>{description}</div>
        </div>
    </div>
    """
    
    # Mouth point popup
    mouth_popup_content = f"""
    {popup_style}
    <div class='custom-popup'>
        <div class='popup-title'>🌊 Εκβολές {name}</div>
        <div class='popup-content'>
            <b>Συντεταγμένες:</b> {coords[0][0]:.2f}°N, {coords[0][1]:.2f}°E<br>
            <div class='popup-fact'>{description}</div>
        </div>
    </div>
    """
    
    # Add marker at river source
    source_point = coords[-1]
    folium.Marker(
        location=source_point,
        popup=folium.Popup(source_popup_content, max_width=300),
        icon=folium.Icon(icon='tint', prefix='fa', color='lightblue')
    ).add_to(river_group)
    
    # Add marker at river mouth
    mouth_point = coords[0]
    folium.Marker(
        location=mouth_point,
        popup=folium.Popup(mouth_popup_content, max_width=300),
        icon=folium.Icon(icon='water', prefix='fa', color='blue')
    ).add_to(river_group)

# Add all feature groups to the map
mountain_group.add_to(m)
lake_group.add_to(m)
river_group.add_to(m)

# Add fullscreen option
plugins.Fullscreen().add_to(m)

# Add layer control
folium.LayerControl().add_to(m)

# Add a title and game controls
title_html = '''
<div style="position: fixed; 
    top: 10px; left: 50px; width: 300px; height: 90px; 
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px; padding: 10px; z-index: 9999;">
    <h4>Διαδραστικός Χάρτης της Ελλάδας</h4>
    <p>Βουνά, Λίμνες και Ποτάμια</p>
</div>

<div id="game-controls" style="position: fixed; 
    top: 10px; right: 50px; 
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px; padding: 10px; z-index: 9999;">
    <button onclick="startExploreMode()" class="game-button explore">🗺️ Εξερεύνηση</button>
    <button onclick="startQuizMode()" class="game-button quiz">🎮 Κουίζ</button>
    <div id="quiz-info" style="display: none;">
        <p>Σκορ: <span id="score">0</span> / <span id="total-questions">0</span></p>
        <p id="current-question"></p>
    </div>
</div>

<style>
    .game-button {
        padding: 8px 15px;
        margin: 5px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        transition: all 0.3s ease;
    }
    
    .explore {
        background-color: #3498db;
        color: white;
    }
    
    .quiz {
        background-color: #e74c3c;
        color: white;
    }
    
    .game-button:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    
    #quiz-info {
        margin-top: 10px;
        padding: 10px;
        background-color: #f8f9fa;
        border-radius: 5px;
    }
    
    .correct-answer {
        animation: correct-pulse 1s;
    }
    
    @keyframes correct-pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }

    #feedback-message {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        border-radius: 10px;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        z-index: 10000;
        display: none;
    }

    .feedback-correct {
        background-color: rgba(46, 204, 113, 0.9);
        color: white;
        animation: celebration 1s ease-in-out;
    }

    .feedback-wrong {
        background-color: rgba(231, 76, 60, 0.9);
        color: white;
        animation: shake 0.5s ease-in-out;
    }

    .tries-left {
        font-size: 16px;
        color: #e74c3c;
        margin-top: 5px;
    }

    @keyframes celebration {
        0% { transform: translate(-50%, -50%) scale(0); }
        50% { transform: translate(-50%, -50%) scale(1.2); }
        100% { transform: translate(-50%, -50%) scale(1); }
    }

    @keyframes shake {
        0%, 100% { transform: translate(-50%, -50%); }
        25% { transform: translate(-55%, -50%); }
        75% { transform: translate(-45%, -50%); }
    }

    .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        background-color: #f1c40f;
        position: absolute;
        animation: confetti-fall 3s ease-in-out;
        z-index: 9999;
    }

    @keyframes confetti-fall {
        0% { transform: translateY(-100vh) rotate(0deg); }
        100% { transform: translateY(100vh) rotate(360deg); }
    }
</style>

<div id="feedback-message"></div>

<script>
    let gameMode = 'explore';
    let score = 0;
    let currentQuestion = null;
    let totalQuestions = 0;
    let triesLeft = 3;
    let landmarks = {
        mountains: ''' + str({name: [data[0], data[1]] for name, data in mountains.items()}) + ''',
        lakes: ''' + str({name: [data[0], data[1]] for name, data in lakes.items()}) + ''',
        rivers: ''' + str({name: data[0] for name, data in rivers.items()}) + '''
    };

    function showFeedback(message, isCorrect) {
        const feedback = document.getElementById('feedback-message');
        feedback.textContent = message;
        feedback.className = isCorrect ? 'feedback-correct' : 'feedback-wrong';
        feedback.style.display = 'block';
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 2000);
    }

    function createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71'][Math.floor(Math.random() * 4)];
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }
    }
    
    function startExploreMode() {
        gameMode = 'explore';
        document.getElementById('quiz-info').style.display = 'none';
        document.querySelectorAll('.leaflet-marker-icon').forEach(marker => {
            marker.style.display = 'block';
        });
    }
    
    function startQuizMode() {
        gameMode = 'quiz';
        score = 0;
        totalQuestions = 0;
        triesLeft = 3;
        document.getElementById('quiz-info').style.display = 'block';
        document.getElementById('score').textContent = score;
        document.querySelectorAll('.leaflet-marker-icon').forEach(marker => {
            marker.style.display = 'none';
        });
        askQuestion();
    }
    
    function askQuestion() {
        triesLeft = 3;
        const types = ['mountains', 'lakes', 'rivers'];
        const type = types[Math.floor(Math.random() * types.length)];
        const landmarkNames = Object.keys(landmarks[type]);
        const targetName = landmarkNames[Math.floor(Math.random() * landmarkNames.length)];
        
        currentQuestion = {
            type: type,
            name: targetName,
            location: landmarks[type][targetName]
        };
        
        totalQuestions++;
        document.getElementById('total-questions').textContent = totalQuestions;
        
        const typeNames = {
            mountains: 'το βουνό',
            lakes: 'τη λίμνη',
            rivers: 'το ποτάμι'
        };
        
        const questionText = `Βρες ${typeNames[type]} ${targetName} στο χάρτη!`;
        document.getElementById('current-question').innerHTML = 
            `${questionText}<br><span class="tries-left">Προσπάθειες που απομένουν: ${triesLeft}</span>`;
    }
    
    function checkAnswer(clickedLat, clickedLng) {
        if (gameMode !== 'quiz' || !currentQuestion) return;
        
        const targetLat = currentQuestion.location[0];
        const targetLng = currentQuestion.location[1];
        const distance = calculateDistance(clickedLat, clickedLng, targetLat, targetLng);
        
        if (distance < 50) { // Within 50km radius
            score++;
            document.getElementById('score').textContent = score;
            
            // Celebration effects
            showFeedback('🎉 Μπράβο! Το βρήκες! 🎉', true);
            createConfetti();
            
            // Show correct answer with animation
            const marker = document.querySelector(`[title="${currentQuestion.name}"]`);
            if (marker) {
                marker.style.display = 'block';
                marker.classList.add('correct-answer');
                setTimeout(() => {
                    marker.classList.remove('correct-answer');
                    marker.style.display = 'none';
                }, 2000);
            }
            
            setTimeout(askQuestion, 2000);
        } else {
            triesLeft--;
            if (triesLeft > 0) {
                showFeedback(`Προσπάθησε ξανά! Απομένουν ${triesLeft} προσπάθειες`, false);
                document.getElementById('current-question').innerHTML = 
                    `${document.getElementById('current-question').textContent.split('<br>')[0]}<br>` +
                    `<span class="tries-left">Προσπάθειες που απομένουν: ${triesLeft}</span>`;
            } else {
                showFeedback('Δεν πειράζει! Πάμε στο επόμενο!', false);
                setTimeout(askQuestion, 2000);
            }
        }
    }
    
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                 Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                 Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        const map = document.querySelector('#map');
        if (map) {
            map._leaflet_map.on('click', function(e) {
                if (gameMode === 'quiz') {
                    checkAnswer(e.latlng.lat, e.latlng.lng);
                }
            });
        }
    });
</script>
'''
m.get_root().html.add_child(folium.Element(title_html))

# Save the map
m.save('greece_map.html')