// Global map and feature group variables
let map;
let mountain_group;
let lake_group;
let river_group;

// Initialize map
function initMap() {
    // Create the map centered on Greece
    window.map = L.map('map', {
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

    // Add click handler for quiz mode
    map.on('click', function(e) {
        if (typeof handleMapClick === 'function') {
            handleMapClick(e.latlng.lat, e.latlng.lng);
        }
    });

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
    marker.bindPopup(popupContent);

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

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMap();
});