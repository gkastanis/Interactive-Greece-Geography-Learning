// Global map and feature group variables
let map;
let mountain_group;
let lake_group;
let river_group;

// Initialize map
function initMap() {
    // Create the map centered on Greece
    map = L.map('map', {
        center: [39.0742, 21.8243],
        zoom: 7,
        zoomControl: true,
        preferCanvas: false,
        fullscreenControl: true
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Data by &copy; <a target="_blank" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_blank" href="http://www.openstreetmap.org/copyright">ODbL</a>.',
        detectRetina: false,
        maxNativeZoom: 18,
        maxZoom: 18,
        minZoom: 0,
        noWrap: false,
        opacity: 1,
        subdomains: 'abc',
        tms: false
    }).addTo(map);

    // Initialize feature groups
    mountain_group = L.featureGroup().addTo(map);
    lake_group = L.featureGroup().addTo(map);
    river_group = L.featureGroup().addTo(map);

    // Initial markers
    addMarkers();
}

// Create a marker with custom popup
function createMarker(name, coords, locationData, category, isAnswered = false) {
    const marker = L.marker(coords, {
        category: category
    });

    // Set icon based on category and answered status
    let markerColor;
    if (correctAnswersNeeded[name] === 0) {
        markerColor = 'green'; // Fully completed (answered correctly twice)
    } else if (correctAnswersNeeded[name] === 1) {
        markerColor = 'orange'; // Answered once correctly
    } else {
        markerColor = category === 'mountains' ? 'darkred' : 
                      category === 'lakes' ? 'blue' : 'cadetblue';
    }

    let icon = L.AwesomeMarkers.icon({
        icon: category === 'mountains' ? 'mountain' : 
              category === 'lakes' ? 'water' : 'tint',
        markerColor: markerColor,
        prefix: 'fa',
        iconColor: 'white'
    });
    marker.setIcon(icon);

    // Get emoji and category name based on type
    const categoryInfo = {
        mountains: { emoji: '🏔️', name: 'Βουνό', color: '#e74c3c' },
        lakes: { emoji: '💧', name: 'Λίμνη', color: '#3498db' },
        rivers: { emoji: '🌊', name: 'Ποταμός', color: '#2980b9' }
    };

    const { emoji, name: categoryName, color } = categoryInfo[category];

    // Create popup content
    const popupContent = `
        <div class="custom-popup">
            <div class="popup-header" style="background-color: ${color}">
                <div class="popup-category">${categoryName}</div>
                <div class="popup-title">${emoji} ${name}</div>
            </div>
            <div class="popup-content">
                ${category === 'mountains' && locationData.elevation ? `
                <div class="popup-stat">
                    <div class="stat-label">Υψόμετρο</div>
                    <div class="stat-value">${locationData.elevation}μ</div>
                </div>
                ` : ''}
                <div class="popup-fact">
                    <div class="fact-icon">💡</div>
                    <div class="fact-text">${locationData.description}</div>
                </div>
                ${category === 'mountains' ? `
                <div class="popup-stat">
                    <div class="stat-label">Συντεταγμένες</div>
                    <div class="stat-value">${coords[0].toFixed(4)}°, ${coords[1].toFixed(4)}°</div>
                </div>
                ` : ''}
            </div>
        </div>
    `;

    // In quiz mode, clicking marker triggers answer check
    marker.on('click', function(e) {
        if (gameMode === 'quiz' && typeof handleMapClick === 'function') {
            handleMapClick(coords[0], coords[1]);
            return;
        }
        // Only show popup in explore mode
        if (gameMode === 'explore') {
            marker.bindPopup(popupContent).openPopup();
        }
    });

    return marker;
}

// Add markers to feature groups
function addMarkers() {
    // Clear existing markers
    mountain_group.clearLayers();
    lake_group.clearLayers();
    river_group.clearLayers();

    // Only show markers for current category in quiz mode
    if (gameMode === 'quiz' && currentCategory) {
        let data;
        let group;
        
        switch(currentCategory) {
            case 'mountains':
                data = mountains;
                group = mountain_group;
                break;
            case 'lakes':
                data = lakes;
                group = lake_group;
                break;
            case 'rivers':
                data = rivers;
                group = river_group;
                break;
        }

        Object.entries(data).forEach(([name, locationData]) => {
            const coords = currentCategory === 'rivers' ? 
                [locationData.coordinates[0].latitude, locationData.coordinates[0].longitude] : 
                [locationData.latitude, locationData.longitude];
            
            const isAnswered = answeredQuestions.has(name);
            const marker = createMarker(name, coords, locationData, currentCategory, isAnswered);
            marker.addTo(group);
        });
        return;
    }

    // Add mountain markers in explore mode
    Object.entries(mountains).forEach(([name, mountain]) => {
        const marker = createMarker(
            name, 
            [mountain.latitude, mountain.longitude],
            mountain,
            'mountains'
        );
        marker.addTo(mountain_group);
    });

    // Add lake markers in explore mode
    Object.entries(lakes).forEach(([name, lake]) => {
        const marker = createMarker(
            name,
            [lake.latitude, lake.longitude],
            lake,
            'lakes'
        );
        marker.addTo(lake_group);
    });

    // Add river markers and paths in explore mode
    Object.entries(rivers).forEach(([name, river]) => {
        // Add marker at the start of the river
        const marker = createMarker(
            name,
            [river.coordinates[0].latitude, river.coordinates[0].longitude],
            river,
            'rivers'
        );
        marker.addTo(river_group);

        // Draw river path in explore mode
        const path = L.polyline(
            river.coordinates.map(coord => [coord.latitude, coord.longitude]),
            { color: '#2980b9', weight: 3, opacity: 0.8 }
        ).addTo(river_group);
    });
}

// Show location on map with animation
function showLocationOnMap(location, category) {
    let coords;
    let zoomLevel = 10;
    
    if (category === 'rivers') {
        // For rivers, use the first coordinate
        coords = [location.coordinates[0].latitude, location.coordinates[0].longitude];
    } else {
        coords = [location.latitude, location.longitude];
    }

    // Pan and zoom to location
    map.setView(coords, zoomLevel, {
        animate: true,
        duration: 1
    });

    // Get emoji and category name based on type
    const categoryInfo = {
        mountains: { emoji: '🏔️', name: 'Βουνό', color: '#e74c3c' },
        lakes: { emoji: '💧', name: 'Λίμνη', color: '#3498db' },
        rivers: { emoji: '🌊', name: 'Ποταμός', color: '#2980b9' }
    };

    const { emoji, name: categoryName, color } = categoryInfo[category];

    // Show popup with location info
    const popupContent = `
        <div class="custom-popup">
            <div class="popup-header" style="background-color: ${color}">
                <div class="popup-category">${categoryName}</div>
                <div class="popup-title">${emoji} ${location.name || ''}</div>
            </div>
            <div class="popup-content">
                ${category === 'mountains' && location.elevation ? `
                <div class="popup-stat">
                    <div class="stat-label">Υψόμετρο</div>
                    <div class="stat-value">${location.elevation}μ</div>
                </div>
                ` : ''}
                <div class="popup-fact">
                    <div class="fact-icon">💡</div>
                    <div class="fact-text">${location.description}</div>
                </div>
                ${category === 'mountains' ? `
                <div class="popup-stat">
                    <div class="stat-label">Συντεταγμένες</div>
                    <div class="stat-value">${coords[0].toFixed(4)}°, ${coords[1].toFixed(4)}°</div>
                </div>
                ` : ''}
            </div>
        </div>
    `;

    // Create and open popup
    L.popup({
        closeButton: true,
        closeOnClick: false,
        autoClose: false,
        className: 'custom-popup-wrapper'
    })
    .setLatLng(coords)
    .setContent(popupContent)
    .openOn(map);
}

// Wait for DOM and required scripts to load
window.addEventListener('load', () => {
    // Make sure Leaflet is loaded
    if (typeof L !== 'undefined') {
        initMap();
    } else {
        console.error('Leaflet not loaded');
    }
});