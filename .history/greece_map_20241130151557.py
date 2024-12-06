import folium
from folium import plugins
import json

# Geographical features data
locations = {
    'mountains': [
        {
            'name': 'Όλυμπος',
            'location': [40.0859, 22.3583],
            'height': 2917,
            'fact': 'Το ψηλότερο βουνό της Ελλάδας, κατοικία των αρχαίων θεών'
        },
        {
            'name': 'Παρνασσός',
            'location': [38.5333, 22.6],
            'height': 2457,
            'fact': 'Μυθικό βουνό και σύγχρονο χιονοδρομικό κέντρο'
        },
        {
            'name': 'Σμόλικας',
            'location': [40.0833, 20.9167],
            'height': 2637,
            'fact': 'Το δεύτερο ψηλότερο βουνό της Ελλάδας'
        },
        {
            'name': 'Ψηλορείτης',
            'location': [35.2167, 24.7667],
            'height': 2456,
            'fact': 'Το ψηλότερο βουνό της Κρήτης'
        }
    ],
    'lakes': [
        {
            'name': 'Τριχωνίδα',
            'location': [38.5667, 21.5667],
            'area': 98.6,
            'fact': 'Η μεγαλύτερη φυσική λίμνη της Ελλάδας'
        },
        {
            'name': 'Βόλβη',
            'location': [40.6758, 23.3317],
            'area': 68,
            'fact': 'Η δεύτερη μεγαλύτερη φυσική λίμνη της Ελλάδας'
        },
        {
            'name': 'Πρέσπες',
            'location': [40.7833, 21.1],
            'area': 259.4,
            'fact': 'Διασυνοριακό σύμπλεγμα λιμνών με μοναδική βιοποικιλότητα'
        }
    ],
    'rivers': [
        {
            'name': 'Αλιάκμονας',
            'location': [40.4667, 22.2],
            'length': 297,
            'fact': 'Ο μεγαλύτερος ποταμός της Ελλάδας σε μήκος'
        },
        {
            'name': 'Αχελώος',
            'location': [38.3333, 21.1],
            'length': 220,
            'fact': 'Ένας από τους σημαντικότερους ποταμούς της Δυτικής Ελλάδας'
        },
        {
            'name': 'Έβρος',
            'location': [41.6833, 26.5667],
            'length': 530,
            'fact': 'Ο μεγαλύτερος ποταμός των Βαλκανίων'
        }
    ]
}

def create_map():
    center = [39.0742, 21.8243]
    m = folium.Map(location=center, zoom_start=7)
    
    # Create feature groups for each category
    feature_groups = {
        'mountains': folium.FeatureGroup(name='Mountains'),
        'lakes': folium.FeatureGroup(name='Lakes'),
        'rivers': folium.FeatureGroup(name='Rivers')
    }
    
    # Icons for each category
    icons = {
        'mountains': {'icon': 'mountain', 'color': 'darkred'},
        'lakes': {'icon': 'water', 'color': 'blue'},
        'rivers': {'icon': 'water', 'color': 'cadetblue'}
    }
    
    for category, features in locations.items():
        for feature in features:
            popup_html = f"""
            <style>
                .custom-popup {{
                    font-family: 'Arial', sans-serif;
                    padding: 10px;
                    background: linear-gradient(to bottom, #e6f3ff, #ffffff);
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }}
                .popup-title {{
                    color: #2c3e50;
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 8px;
                    text-align: center;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 5px;
                }}
                .popup-content {{
                    color: #34495e;
                    font-size: 14px;
                    line-height: 1.4;
                }}
                .popup-fact {{
                    background-color: #f0f7ff;
                    padding: 5px;
                    margin-top: 8px;
                    border-left: 3px solid #3498db;
                    font-style: italic;
                }}
            </style>
            
            <div class='custom-popup'>
                <div class='popup-title'>
                    {icons[category]['icon'] == 'mountain' and '🗻' or '💧'} {feature['name']}
                </div>
                <div class='popup-content'>
                    <b>{
                        'Υψόμετρο: ' + str(feature.get('height', '')) + 'μ' if category == 'mountains' else
                        'Έκταση: ' + str(feature.get('area', '')) + ' τ.χλμ.' if category == 'lakes' else
                        'Μήκος: ' + str(feature.get('length', '')) + ' χλμ.'
                    }</b><br>
                    <div class='popup-fact'>{feature['fact']}</div>
                </div>
            </div>
            """
            
            marker = folium.Marker(
                location=feature['location'],
                popup=folium.Popup(popup_html, max_width=300),
                icon=folium.plugins.BeautifyIcon(
                    icon=icons[category]['icon'],
                    icon_shape='marker',
                    prefix='fa',
                    border_color=icons[category]['color'],
                    text_color='white',
                    background_color=icons[category]['color']
                ),
                title=feature['name']
            )
            marker.add_to(feature_groups[category])
    
    # Add all feature groups to map
    for group in feature_groups.values():
        group.add_to(m)
    
    # Add custom JavaScript for quiz functionality
    javascript = """
    <script>
    var gameMode = 'explore';
    var score = 0;
    var triesLeft = 3;
    var currentQuestion = null;
    var selectedCategory = null;
    var locations = """ + json.dumps(locations) + """;
    
    function updateScore() {
        document.getElementById('score').textContent = score;
    }
    
    function showFeedback(message) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
        feedback.style.display = 'block';
        setTimeout(() => feedback.style.display = 'none', 3000);
    }
    
    function startQuiz(category) {
        gameMode = 'quiz';
        score = 0;
        selectedCategory = category;
        updateScore();
        document.getElementById('quiz-container').style.display = 'block';
        document.getElementById('category-selection').style.display = 'none';
        
        // Show only markers from selected category
        const markers = document.querySelectorAll('.leaflet-marker-icon');
        markers.forEach(marker => {
            const isInCategory = locations[category].some(loc => loc.name === marker.title);
            marker.style.display = isInCategory ? 'block' : 'none';
        });
        
        generateQuestion();
    }
    
    function generateQuestion() {
        triesLeft = 3;
        const features = locations[selectedCategory];
        
        if (!features || features.length === 0) {
            showFeedback('No locations available in this category');
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * features.length);
        currentQuestion = features[randomIndex];
        
        const categoryNames = {
            'mountains': 'το βουνό',
            'lakes': 'η λίμνη',
            'rivers': 'ο ποταμός'
        };
        
        document.getElementById('question').textContent = 
            `Πού βρίσκεται ${categoryNames[selectedCategory]} ${currentQuestion.name};`;
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        // Add category selection buttons
        const categoryContainer = document.createElement('div');
        categoryContainer.id = 'category-selection';
        categoryContainer.innerHTML = `
            <h3>Επίλεξε κατηγορία:</h3>
            <button onclick="startQuiz('mountains')">Βουνά</button>
            <button onclick="startQuiz('lakes')">Λίμνες</button>
            <button onclick="startQuiz('rivers')">Ποταμοί</button>
        `;
        document.body.appendChild(categoryContainer);
        
        // Update quiz container style
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.style.display = 'none';
        
        // Add return button
        const returnButton = document.createElement('button');
        returnButton.textContent = 'Επιστροφή στις κατηγορίες';
        returnButton.onclick = function() {
            gameMode = 'explore';
            document.getElementById('quiz-container').style.display = 'none';
            document.getElementById('category-selection').style.display = 'block';
            // Show all markers
            const markers = document.querySelectorAll('.leaflet-marker-icon');
            markers.forEach(marker => marker.style.display = 'block');
        };
        quizContainer.appendChild(returnButton);
    });
    </script>
    
    <style>
    #category-selection {
        position: fixed;
        top: 20px;
        left: 20px;
        background: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        z-index: 1000;
    }
    
    #category-selection button {
        display: block;
        width: 100%;
        margin: 5px 0;
        padding: 8px;
        border: none;
        border-radius: 4px;
        background: #3498db;
        color: white;
        cursor: pointer;
    }
    
    #category-selection button:hover {
        background: #2980b9;
    }
    
    #quiz-container button {
        margin-top: 10px;
        padding: 8px;
        border: none;
        border-radius: 4px;
        background: #3498db;
        color: white;
        cursor: pointer;
    }
    </style>
    """
    
    m.get_root().html.add_child(folium.Element(javascript))
    return m

m = create_map()
m.save('greece_map.html')