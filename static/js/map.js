// Global map and feature group variables
let map;
let mountain_group;
let lake_group;
let river_group;
let peninsula_group;
let gulf_group;
let cape_group;
let strait_group;
let isthmus_group;
let cyclades_group;
let dodecanese_group;
let eastern_aegean_group;
let sporades_group;
let ionian_group;
let top_islands_group;

// Initialize map
function initMap() {
  // Create the map centered on Greece
  map = L.map("map", {
    center: [39.0742, 21.8243],
    zoom: 7,
    zoomControl: true,
    preferCanvas: false,
    fullscreenControl: true,
  });

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Data by &copy; <a target="_blank" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_blank" href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    detectRetina: false,
    maxNativeZoom: 18,
    maxZoom: 18,
    minZoom: 0,
    noWrap: false,
    opacity: 1,
    subdomains: "abc",
    tms: false,
  }).addTo(map);

  // Initialize feature groups
  mountain_group = L.featureGroup().addTo(map);
  lake_group = L.featureGroup().addTo(map);
  river_group = L.featureGroup().addTo(map);
  peninsula_group = L.featureGroup().addTo(map);
  gulf_group = L.featureGroup().addTo(map);
  cape_group = L.featureGroup().addTo(map);
  strait_group = L.featureGroup().addTo(map);
  isthmus_group = L.featureGroup().addTo(map);
  cyclades_group = L.featureGroup().addTo(map);
  dodecanese_group = L.featureGroup().addTo(map);
  eastern_aegean_group = L.featureGroup().addTo(map);
  sporades_group = L.featureGroup().addTo(map);
  ionian_group = L.featureGroup().addTo(map);
  top_islands_group = L.featureGroup().addTo(map);

  // Initial markers
  addMarkers();
}

// Create a marker with custom popup
function createMarker(
  name,
  coords,
  locationData,
  category,
  isAnswered = false,
) {
  const marker = L.marker(coords, {
    category: category,
  });

  // Set icon based on category and answered status
  let markerColor;
  if (correctAnswersNeeded[name] === 0) {
    markerColor = "green"; // Fully completed (answered correctly twice)
  } else if (correctAnswersNeeded[name] === 1) {
    markerColor = "orange"; // Answered once correctly
  } else {
    markerColor =
      category === "mountains"
        ? "darkred"
        : category === "lakes"
          ? "blue"
          : category === "rivers"
            ? "cadetblue"
            : category === "peninsulas"
              ? "purple"
              : category === "gulfs"
                ? "darkblue"
                : category === "capes"
                  ? "red"
                  : category === "straits"
                    ? "lightblue"
                    : category === "cyclades"
                      ? "cadetblue"
                      : category === "dodecanese"
                        ? "cadetblue"
                        : category === "easternAegean"
                          ? "darkblue"
                          : category === "sporades"
                            ? "blue"
                            : category === "ionian"
                              ? "purple"
                              : category === "topIslands"
                                ? "gold"
                                : "gray";
  }

  let icon = L.AwesomeMarkers.icon({
    icon:
      category === "mountains"
        ? "mountain"
        : category === "lakes"
          ? "water"
          : category === "rivers"
            ? "tint"
            : category === "peninsulas"
              ? "map-marked-alt"
              : category === "gulfs"
                ? "water"
                : category === "capes"
                  ? "location-arrow"
                  : category === "straits"
                    ? "arrows-alt-h"
                    : category === "cyclades" ||
                        category === "dodecanese" ||
                        category === "easternAegean" ||
                        category === "sporades" ||
                        category === "ionian" ||
                        category === "topIslands"
                      ? "anchor"
                      : "link",
    markerColor: markerColor,
    prefix: "fa",
    iconColor: "white",
  });
  marker.setIcon(icon);

  // Get emoji and category name based on type
  const categoryInfo = {
    mountains: { emoji: "🏔️", name: "Βουνό", color: "#e74c3c" },
    lakes: { emoji: "💧", name: "Λίμνη", color: "#3498db" },
    rivers: { emoji: "🌊", name: "Ποταμός", color: "#2980b9" },
    peninsulas: { emoji: "🗺️", name: "Χερσόνησος", color: "#9b59b6" },
    gulfs: { emoji: "🌊", name: "Κόλπος", color: "#1a5276" },
    capes: { emoji: "📍", name: "Ακρωτήριο", color: "#c0392b" },
    straits: { emoji: "↔️", name: "Πορθμός", color: "#5dade2" },
    isthmus: { emoji: "🔗", name: "Ισθμός", color: "#7f8c8d" },
    cyclades: { emoji: "🏝️", name: "Κυκλάδες", color: "#17a2b8" },
    dodecanese: { emoji: "🏝️", name: "Δωδεκάνησα", color: "#138496" },
    easternAegean: {
      emoji: "🏝️",
      name: "Νησιά Ανατολικού Αιγαίου",
      color: "#0056b3",
    },
    sporades: { emoji: "🏝️", name: "Σποράδες", color: "#004085" },
    ionian: { emoji: "🏝️", name: "Επτάνησα", color: "#6f42c1" },
    topIslands: { emoji: "🏆", name: "Top 10 Νησιά", color: "#b8860b" },
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
                ${
                  category === "mountains" && locationData.elevation
                    ? `
                <div class="popup-stat">
                    <div class="stat-label">Υψόμετρο</div>
                    <div class="stat-value">${locationData.elevation}μ</div>
                </div>
                `
                    : ""
                }
                <div class="popup-fact">
                    <div class="fact-icon">💡</div>
                    <div class="fact-text">${locationData.description}</div>
                </div>
                ${
                  category === "mountains"
                    ? `
                <div class="popup-stat">
                    <div class="stat-label">Συντεταγμένες</div>
                    <div class="stat-value">${coords[0].toFixed(4)}°, ${coords[1].toFixed(4)}°</div>
                </div>
                `
                    : ""
                }
            </div>
        </div>
    `;

  // In quiz mode, clicking marker triggers answer check
  marker.on("click", function (e) {
    if (gameMode === "quiz" && typeof handleMapClick === "function") {
      handleMapClick(coords[0], coords[1]);
      return;
    }
    // Only show popup in explore mode
    if (gameMode === "explore") {
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
  peninsula_group.clearLayers();
  gulf_group.clearLayers();
  cape_group.clearLayers();
  strait_group.clearLayers();
  isthmus_group.clearLayers();
  cyclades_group.clearLayers();
  dodecanese_group.clearLayers();
  eastern_aegean_group.clearLayers();
  sporades_group.clearLayers();
  ionian_group.clearLayers();
  top_islands_group.clearLayers();

  // Only show markers for current category in quiz mode
  if (gameMode === "quiz" && currentCategory) {
    let data;
    let group;

    switch (currentCategory) {
      case "mountains":
        data = mountains;
        group = mountain_group;
        break;
      case "lakes":
        data = lakes;
        group = lake_group;
        break;
      case "rivers":
        data = rivers;
        group = river_group;
        break;
      case "peninsulas":
        data = peninsulas;
        group = peninsula_group;
        break;
      case "gulfs":
        data = gulfs;
        group = gulf_group;
        break;
      case "capes":
        data = capes;
        group = cape_group;
        break;
      case "straits":
        data = straits;
        group = strait_group;
        break;
      case "isthmus":
        data = isthmus;
        group = isthmus_group;
        break;
      case "cyclades":
        data = cyclades;
        group = cyclades_group;
        break;
      case "dodecanese":
        data = dodecanese;
        group = dodecanese_group;
        break;
      case "easternAegean":
        data = easternAegean;
        group = eastern_aegean_group;
        break;
      case "sporades":
        data = sporades;
        group = sporades_group;
        break;
      case "ionian":
        data = ionian;
        group = ionian_group;
        break;
      case "topIslands":
        data = topIslands;
        group = top_islands_group;
        break;
    }

    Object.entries(data).forEach(([name, locationData]) => {
      const coords =
        currentCategory === "rivers"
          ? [
              locationData.coordinates[0].latitude,
              locationData.coordinates[0].longitude,
            ]
          : [locationData.latitude, locationData.longitude];

      const isAnswered = answeredQuestions.has(name);
      const marker = createMarker(
        name,
        coords,
        locationData,
        currentCategory,
        isAnswered,
      );
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
      "mountains",
    );
    marker.addTo(mountain_group);
  });

  // Add lake markers in explore mode
  Object.entries(lakes).forEach(([name, lake]) => {
    const marker = createMarker(
      name,
      [lake.latitude, lake.longitude],
      lake,
      "lakes",
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
      "rivers",
    );
    marker.addTo(river_group);

    // Draw river path in explore mode
    const path = L.polyline(
      river.coordinates.map((coord) => [coord.latitude, coord.longitude]),
      { color: "#2980b9", weight: 3, opacity: 0.8 },
    ).addTo(river_group);
  });

  // Add peninsula markers in explore mode
  Object.entries(peninsulas).forEach(([name, peninsula]) => {
    const marker = createMarker(
      name,
      [peninsula.latitude, peninsula.longitude],
      peninsula,
      "peninsulas",
    );
    marker.addTo(peninsula_group);
  });

  // Add gulf markers in explore mode
  Object.entries(gulfs).forEach(([name, gulf]) => {
    const marker = createMarker(
      name,
      [gulf.latitude, gulf.longitude],
      gulf,
      "gulfs",
    );
    marker.addTo(gulf_group);
  });

  // Add cape markers in explore mode
  Object.entries(capes).forEach(([name, cape]) => {
    const marker = createMarker(
      name,
      [cape.latitude, cape.longitude],
      cape,
      "capes",
    );
    marker.addTo(cape_group);
  });

  // Add strait markers in explore mode
  Object.entries(straits).forEach(([name, strait]) => {
    const marker = createMarker(
      name,
      [strait.latitude, strait.longitude],
      strait,
      "straits",
    );
    marker.addTo(strait_group);
  });

  // Add isthmus markers in explore mode
  Object.entries(isthmus).forEach(([name, isth]) => {
    const marker = createMarker(
      name,
      [isth.latitude, isth.longitude],
      isth,
      "isthmus",
    );
    marker.addTo(isthmus_group);
  });

  // Add island markers in explore mode
  Object.entries(cyclades).forEach(([name, island]) => {
    const marker = createMarker(
      name,
      [island.latitude, island.longitude],
      island,
      "cyclades",
    );
    marker.addTo(cyclades_group);
  });

  Object.entries(dodecanese).forEach(([name, island]) => {
    const marker = createMarker(
      name,
      [island.latitude, island.longitude],
      island,
      "dodecanese",
    );
    marker.addTo(dodecanese_group);
  });

  Object.entries(easternAegean).forEach(([name, island]) => {
    const marker = createMarker(
      name,
      [island.latitude, island.longitude],
      island,
      "easternAegean",
    );
    marker.addTo(eastern_aegean_group);
  });

  Object.entries(sporades).forEach(([name, island]) => {
    const marker = createMarker(
      name,
      [island.latitude, island.longitude],
      island,
      "sporades",
    );
    marker.addTo(sporades_group);
  });

  Object.entries(ionian).forEach(([name, island]) => {
    const marker = createMarker(
      name,
      [island.latitude, island.longitude],
      island,
      "ionian",
    );
    marker.addTo(ionian_group);
  });

  Object.entries(topIslands).forEach(([name, island]) => {
    const marker = createMarker(
      name,
      [island.latitude, island.longitude],
      island,
      "topIslands",
    );
    marker.addTo(top_islands_group);
  });
}

// Show location on map with animation
function showLocationOnMap(location, category) {
  let coords;
  let zoomLevel = 10;

  if (category === "rivers") {
    // For rivers, use the first coordinate
    coords = [
      location.coordinates[0].latitude,
      location.coordinates[0].longitude,
    ];
  } else {
    coords = [location.latitude, location.longitude];
  }

  // Pan and zoom to location
  map.setView(coords, zoomLevel, {
    animate: true,
    duration: 1,
  });

  // Get emoji and category name based on type
  const categoryInfo = {
    mountains: { emoji: "🏔️", name: "Βουνό", color: "#e74c3c" },
    lakes: { emoji: "💧", name: "Λίμνη", color: "#3498db" },
    rivers: { emoji: "🌊", name: "Ποταμός", color: "#2980b9" },
    peninsulas: { emoji: "🗺️", name: "Χερσόνησος", color: "#9b59b6" },
    gulfs: { emoji: "🌊", name: "Κόλπος", color: "#1a5276" },
    capes: { emoji: "📍", name: "Ακρωτήριο", color: "#c0392b" },
    straits: { emoji: "↔️", name: "Πορθμός", color: "#5dade2" },
    isthmus: { emoji: "🔗", name: "Ισθμός", color: "#7f8c8d" },
    cyclades: { emoji: "🏝️", name: "Κυκλάδες", color: "#17a2b8" },
    dodecanese: { emoji: "🏝️", name: "Δωδεκάνησα", color: "#138496" },
    easternAegean: {
      emoji: "🏝️",
      name: "Νησιά Ανατολικού Αιγαίου",
      color: "#0056b3",
    },
    sporades: { emoji: "🏝️", name: "Σποράδες", color: "#004085" },
    ionian: { emoji: "🏝️", name: "Επτάνησα", color: "#6f42c1" },
    topIslands: { emoji: "🏆", name: "Top 10 Νησιά", color: "#b8860b" },
  };

  const { emoji, name: categoryName, color } = categoryInfo[category];

  // Show popup with location info
  const popupContent = `
        <div class="custom-popup">
            <div class="popup-header" style="background-color: ${color}">
                <div class="popup-category">${categoryName}</div>
                <div class="popup-title">${emoji} ${location.name || ""}</div>
            </div>
            <div class="popup-content">
                ${
                  category === "mountains" && location.elevation
                    ? `
                <div class="popup-stat">
                    <div class="stat-label">Υψόμετρο</div>
                    <div class="stat-value">${location.elevation}μ</div>
                </div>
                `
                    : ""
                }
                <div class="popup-fact">
                    <div class="fact-icon">💡</div>
                    <div class="fact-text">${location.description}</div>
                </div>
                ${
                  category === "mountains"
                    ? `
                <div class="popup-stat">
                    <div class="stat-label">Συντεταγμένες</div>
                    <div class="stat-value">${coords[0].toFixed(4)}°, ${coords[1].toFixed(4)}°</div>
                </div>
                `
                    : ""
                }
            </div>
        </div>
    `;

  // Create and open popup
  L.popup({
    closeButton: true,
    closeOnClick: false,
    autoClose: false,
    className: "custom-popup-wrapper",
  })
    .setLatLng(coords)
    .setContent(popupContent)
    .openOn(map);
}

// Wait for DOM and required scripts to load
window.addEventListener("load", () => {
  // Make sure Leaflet is loaded
  if (typeof L !== "undefined") {
    initMap();
  } else {
    console.error("Leaflet not loaded");
  }
});
