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
}

// Create a marker with custom popup
function createMarker(name, data, category) {
    const marker = L.marker(data.coords, {
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
            <div class="popup-title">${category === 'mountains' ? '🗻' : 
                                     category === 'lakes' ? '💧' : '🌊'} ${name}</div>
            <div class="popup-content">
                <b>Υψόμετρο:</b> ${data.height}μ<br>
                <div class="popup-fact">${data.fact}</div>
            </div>
        </div>
    `;
    marker.bindPopup(L.popup({ maxWidth: 300 }).setContent(popupContent));

    return marker;
}

// Add markers to feature groups
function addMarkers() {
    // Add mountain markers
    for (const [name, data] of Object.entries(locations.mountains)) {
        const marker = createMarker(name, data, 'mountains');
        marker.addTo(mountain_group);
    }

    // Add lake markers when available
    for (const [name, data] of Object.entries(locations.lakes)) {
        const marker = createMarker(name, data, 'lakes');
        marker.addTo(lake_group);
    }

    // Add river markers when available
    for (const [name, data] of Object.entries(locations.rivers)) {
        const marker = createMarker(name, data, 'rivers');
        marker.addTo(river_group);
    }
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    addMarkers();
});