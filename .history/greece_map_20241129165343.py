import folium
import pandas as pd

# Create a map centered on Greece
m = folium.Map(location=[39.0742, 21.8243], zoom_start=7)

# Dictionary of major mountains in Greece
mountains = {
    'Mount Olympus': [40.0859, 22.3583, 2917],
    'Mount Parnassus': [38.5333, 22.6167, 2457],
    'Mount Smolikas': [40.0875, 20.9167, 2637],
    'Mount Ida': [35.2167, 24.7667, 2456],
}

# Dictionary of major lakes in Greece
lakes = {
    'Lake Trichonida': [38.5667, 21.5500],
    'Lake Volvi': [40.6833, 23.5833],
    'Lake Prespa': [40.7500, 21.0833],
    'Lake Plastiras': [39.2333, 21.7333],
}

# Dictionary of major rivers in Greece
rivers = {
    'Aliakmonas': [[40.4500, 22.6000], [40.5333, 21.7000], [40.2833, 21.1833]],
    'Achelous': [[38.3333, 21.1000], [39.1500, 21.3833], [39.8167, 21.1833]],
    'Pinios': [[39.8667, 22.7000], [39.7500, 22.2000], [39.6333, 21.6333]],
}

# Add mountains to the map
for name, data in mountains.items():
    folium.CircleMarker(
        location=[data[0], data[1]],
        radius=8,
        popup=f'{name} ({data[2]}m)',
        color='brown',
        fill=True,
    ).add_to(m)

# Add lakes to the map
for name, coords in lakes.items():
    folium.CircleMarker(
        location=coords,
        radius=8,
        popup=name,
        color='blue',
        fill=True,
    ).add_to(m)

# Add rivers to the map
for name, coords in rivers.items():
    folium.PolyLine(
        coords,
        popup=name,
        color='blue',
        weight=2,
    ).add_to(m)

# Add layer control
folium.LayerControl().add_to(m)

# Save the map
m.save('greece_map.html')