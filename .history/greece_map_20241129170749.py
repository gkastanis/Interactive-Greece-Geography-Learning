import folium
from folium import plugins

# Create a map centered on Greece
m = folium.Map(location=[39.0742, 21.8243], zoom_start=7)

# Create feature groups for different categories
mountain_group = folium.FeatureGroup(name='Mountains')
lake_group = folium.FeatureGroup(name='Lakes')
river_group = folium.FeatureGroup(name='Rivers')

# Dictionary of major mountains in Greece with more details
mountains = {
    'Mount Olympus': [40.0859, 22.3583, 2917, 'Highest mountain in Greece, home of the ancient Greek gods'],
    'Mount Parnassus': [38.5333, 22.6167, 2457, 'Sacred to Apollo and home of the Muses'],
    'Mount Smolikas': [40.0875, 20.9167, 2637, 'Second-highest mountain in Greece'],
    'Mount Ida (Psiloritis)': [35.2167, 24.7667, 2456, 'Highest mountain in Crete, birthplace of Zeus'],
    'Mount Pelion': [39.3967, 23.0419, 1624, 'Mythical home of the Centaurs'],
    'Mount Taygetus': [37.0500, 22.3500, 2407, 'Highest mountain in the Peloponnese'],
    'Mount Athos': [40.1564, 24.3284, 2033, 'Sacred mountain and monastic state'],
    'Mount Dirfys': [38.6167, 23.8500, 1743, 'Highest peak in Euboea'],
    'Mount Helmos': [38.0167, 22.2000, 2355, 'Home to the Aristarchos telescope'],
    'Mount Giona': [38.6667, 22.2833, 2510, 'Highest mountain in Central Greece'],
    'Mount Tymfi': [39.9833, 20.8167, 2497, 'Known for the Vikos Gorge'],
    'Mount Vardousia': [38.7167, 22.1167, 2495, 'Part of the Pindus Mountains'],
    'Mount Grammos': [40.3667, 20.8833, 2520, 'On the border with Albania'],
    'Mount Panachaiko': [38.2167, 21.8833, 1926, 'Overlooking the Gulf of Patras']
}

# Dictionary of major lakes in Greece with details
lakes = {
    'Lake Trichonida': [38.5667, 21.5500, 'Largest natural lake in Greece'],
    'Lake Volvi': [40.6833, 23.5833, 'Second largest natural lake'],
    'Lake Prespa': [40.7500, 21.0833, 'Ancient lake shared with Albania and North Macedonia'],
    'Lake Plastiras': [39.2333, 21.7333, 'Artificial lake known for its scenic beauty'],
    'Lake Kerkini': [41.2000, 23.1333, 'Important wetland and bird sanctuary'],
    'Lake Pamvotida': [39.6500, 20.8500, 'Historic lake of Ioannina'],
    'Lake Vegoritida': [40.7500, 21.7833, 'Fourth largest lake in Greece'],
    'Lake Doxa': [37.9333, 22.2833, 'Artificial lake in the Peloponnese'],
    'Lake Kremasta': [38.9167, 21.5000, 'Largest artificial lake in Greece'],
    'Lake Yliki': [38.4000, 23.2833, 'Major water source for Athens'],
    'Lake Kastoria': [40.5167, 21.2833, 'Shaped like an oval, home to rare bird species'],
    'Lake Marathon': [38.1500, 23.9000, 'Historic artificial lake near Athens']
}

# Dictionary of major rivers in Greece with coordinates for their main course
rivers = {
    'Aliakmonas': [
        [40.4500, 22.6000], # River mouth
        [40.4833, 22.4500],
        [40.5100, 22.2000],
        [40.5333, 21.7000],
        [40.4833, 21.5000],
        [40.3833, 21.3000],
        [40.2833, 21.1833], # Source
        'Longest river entirely in Greece'
    ],
    'Achelous': [
        [38.3333, 21.1000], # River mouth
        [38.4833, 21.2500],
        [38.7000, 21.3000],
        [39.1500, 21.3833],
        [39.3500, 21.2833],
        [39.5000, 21.2000],
        [39.8167, 21.1833], # Source
        'Sacred river in ancient Greece'
    ],
    'Pinios': [
        [39.8667, 22.7000], # River mouth
        [39.8500, 22.5500],
        [39.7500, 22.2000],
        [39.7000, 22.0000],
        [39.6500, 21.8000],
        [39.6333, 21.6333], # Source
        'Main river of Thessaly'
    ],
    'Evros': [
        [40.7833, 26.0333], # River mouth
        [40.9500, 26.2000],
        [41.1500, 26.3000],
        [41.2833, 26.3333],
        [41.5000, 26.3500],
        [41.7167, 26.3333], # Border point
        'Forms natural border with Turkey'
    ],
    'Strymonas': [
        [40.7833, 23.8500], # River mouth
        [40.9000, 23.7500],
        [41.0833, 23.5500],
        [41.2833, 23.3333],
        [41.2000, 23.2500],
        [41.0833, 23.1333], # Entry point to Greece
        'Important river in Macedonia'
    ],
    'Nestos': [
        [40.8500, 24.7833], # River mouth
        [41.0833, 24.7167],
        [41.2167, 24.6333],
        [41.3500, 24.5167],
        [41.4833, 24.4000], # Border point
        'Known for its stunning delta'
    ],
    'Arachtos': [
        [39.0333, 21.0667], # River mouth
        [39.1500, 21.0833],
        [39.3167, 21.1167],
        [39.5000, 21.1833],
        [39.6333, 21.2000], # Source
        'Major river of Epirus'
    ],
    'Spercheios': [
        [38.8667, 22.5333], # River mouth
        [38.9000, 22.3167],
        [38.9167, 22.1667],
        [38.9000, 22.0167],
        [38.8833, 21.8833], # Source
        'Flows through Lamia Valley'
    ]
}

# Add mountains to the map
for name, data in mountains.items():
    popup_content = f"""
    <b>{name}</b><br>
    Elevation: {data[2]}m<br>
    {data[3]}
    """
    folium.Marker(
        location=[data[0], data[1]],
        popup=folium.Popup(popup_content, max_width=300),
        icon=folium.Icon(icon='mountain', prefix='fa', color='darkred'),
    ).add_to(mountain_group)

# Add lakes to the map
for name, data in lakes.items():
    popup_content = f"""
    <b>{name}</b><br>
    {data[2]}
    """
    folium.Marker(
        location=[data[0], data[1]],
        popup=folium.Popup(popup_content, max_width=300),
        icon=folium.Icon(icon='water', prefix='fa', color='blue'),
    ).add_to(lake_group)

# Add rivers to the map
for name, data in rivers.items():
    coords = data[:-1]  # Exclude the description
    folium.PolyLine(
        coords,
        popup=f"{name}<br>{data[-1]}",
        color='blue',
        weight=2,
        opacity=0.8
    ).add_to(river_group)

# Add all feature groups to the map
mountain_group.add_to(m)
lake_group.add_to(m)
river_group.add_to(m)

# Add fullscreen option
plugins.Fullscreen().add_to(m)

# Add layer control
folium.LayerControl().add_to(m)

# Add a title
title_html = '''
<div style="position: fixed; 
    top: 10px; left: 50px; width: 300px; height: 90px; 
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px; padding: 10px; z-index: 9999;">
    <h4>Interactive Map of Greece</h4>
    <p>Featuring mountains, lakes, and rivers</p>
</div>
'''
m.get_root().html.add_child(folium.Element(title_html))

# Save the map
m.save('greece_map.html')