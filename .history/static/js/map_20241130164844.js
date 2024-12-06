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
function createMarker(name, coords, height, fact, category) {
    const marker = L.marker(coords, {
        category: category
    });

    // Set icon based on category
    let icon = L.AwesomeMarkers.icon({
        icon: category === 'mountains' ? 'mountain' : 
              category === 'lakes' ? 'water' : 'tint',
        markerColor: category === 'mountains' ? 'darkred' : 
                     category === 'lakes' ? 'blue' : 'cadetblue',
        prefix: 'fa',
        iconColor: 'white'
    });
    marker.setIcon(icon);

    // Create popup content
    const popupContent = `
        <div class="custom-popup">
            <div class="popup-title">${name}</div>
            <div class="popup-content">
                ${height ? `<p>Ύψος: ${height}μ</p>` : ''}
                <div class="popup-fact">${fact}</div>
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

    if (gameMode === 'explore' || currentCategory === 'mountains') {
        // Add mountain markers
        for (const [name, data] of Object.entries(mountains)) {
            const marker = createMarker(name, [data[0], data[1]], data[2], data[3], 'mountains');
            marker.addTo(mountain_group);
        }
    }

    if (gameMode === 'explore' || currentCategory === 'lakes') {
        // Add lake markers
        if (typeof lakes !== 'undefined') {
            for (const [name, data] of Object.entries(lakes)) {
                const marker = createMarker(name, [data[0], data[1]], null, data[2], 'lakes');
                marker.addTo(lake_group);
            }
        }
    }

    if (gameMode === 'explore' || currentCategory === 'rivers') {
        // Add river markers
        if (typeof rivers !== 'undefined') {
            for (const [name, coords] of Object.entries(rivers)) {
                // For rivers, we use the first coordinate pair as the marker location
                const marker = createMarker(name, coords[0], null, 'Ποταμός της Ελλάδας', 'rivers');
                marker.addTo(river_group);
            }
        }
    }
}

// Show location on map with animation
function showLocationOnMap(coords, popupContent) {
    // Create a temporary marker with star icon
    const marker = L.marker(coords, {
        icon: L.divIcon({
            className: 'star-marker',
            html: '⭐',  
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        })
    }).addTo(map);

    // Pan to location with animation
    map.flyTo(coords, 9, {
        duration: 1.5
    });

    // Show popup after pan
    setTimeout(() => {
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'educational-popup'
        }).openPopup();
    }, 1500);

    // Remove marker after delay
    setTimeout(() => {
        marker.remove();
        
        // Add regular marker back
        const regularMarker = createMarker(
            currentQuestion.name,
            coords,
            currentCategory === 'mountains' ? locationData[2] : null,
            currentCategory === 'rivers' ? 'Ποταμός της Ελλάδας' : locationData[currentCategory === 'mountains' ? 3 : 2],
            currentCategory
        ).addTo(map);
        
        // Remove regular marker after a short delay
        setTimeout(() => {
            regularMarker.remove();
        }, 2000);
    }, 5000);
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