import folium
from folium import plugins

# Create a map centered on Greece
m = folium.Map(location=[39.0742, 21.8243], zoom_start=7)

# Create feature groups for different categories
mountain_group = folium.FeatureGroup(name='Mountains')
lake_group = folium.FeatureGroup(name='Lakes')
river_group = folium.FeatureGroup(name='Rivers')
ancient_sites_group = folium.FeatureGroup(name='Ancient Sites')
beaches_group = folium.FeatureGroup(name='Famous Beaches')

# Dictionary of major mountains in Greece with more details
mountains = {
    'Mount Olympus': [40.0859, 22.3583, 2917, 'Highest mountain in Greece, home of the ancient Greek gods'],
    'Mount Parnassus': [38.5333, 22.6167, 2457, 'Sacred to Apollo and home of the Muses'],
    'Mount Smolikas': [40.0875, 20.9167, 2637, 'Second-highest mountain in Greece'],
    'Mount Ida (Psiloritis)': [35.2167, 24.7667, 2456, 'Highest mountain in Crete, birthplace of Zeus'],
    'Mount Pelion': [39.3967, 23.0419, 1624, 'Mythical home of the Centaurs'],
    'Mount Taygetus': [37.0500, 22.3500, 2407, 'Highest mountain in the Peloponnese'],
    'Mount Athos': [40.1564, 24.3284, 2033, 'Sacred mountain and monastic state']
}

# Dictionary of major lakes in Greece with details
lakes = {
    'Lake Trichonida': [38.5667, 21.5500, 'Largest natural lake in Greece'],
    'Lake Volvi': [40.6833, 23.5833, 'Second largest natural lake'],
    'Lake Prespa': [40.7500, 21.0833, 'Ancient lake shared with Albania and North Macedonia'],
    'Lake Plastiras': [39.2333, 21.7333, 'Artificial lake known for its scenic beauty'],
    'Lake Kerkini': [41.2000, 23.1333, 'Important wetland and bird sanctuary'],
    'Lake Pamvotida': [39.6500, 20.8500, 'Historic lake of Ioannina']
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
    ]
}

# Dictionary of ancient sites and archaeological places
ancient_sites = {
    'Delphi': [38.4824, 22.5010, 'Home of the famous Oracle, sanctuary of Apollo'],
    'Olympia': [37.6441, 21.6300, 'Birthplace of the Olympic Games'],
    'Acropolis': [37.9715, 23.7269, 'Sacred rock of Athens with Parthenon'],
    'Mycenae': [37.7306, 22.7556, 'Bronze Age fortress city of Agamemnon'],
    'Knossos': [35.2980, 25.1631, 'Largest Bronze Age archaeological site on Crete'],
    'Epidaurus': [37.5963, 23.0794, 'Famous for its ancient theater and healing center'],
    'Vergina': [40.4859, 22.3147, 'Ancient Macedonian royal burial site']
}

# Famous Greek beaches
beaches = {
    'Navagio Beach': [37.8594, 20.6250, 'Famous shipwreck beach in Zakynthos'],
    'Balos Lagoon': [35.5814, 23.5883, 'Exotic lagoon in Crete'],
    'Myrtos Beach': [38.3422, 20.5300, 'Iconic beach of Kefalonia'],
    'Red Beach': [36.3477, 25.3888, 'Unique red sand beach in Santorini'],
    'Porto Katsiki': [38.6022, 20.5477, 'Dramatic cliff beach in Lefkada']
}

# Add mountains to the map
for name, data in mountains.items():
    popup_content = f"""
    <b>{name}</b><br>
    Elevation: {data[2]}m<br>
    {data[3]}
    """
    folium.CircleMarker(
        location=[data[0], data[1]],
        radius=8,
        popup=folium.Popup(popup_content, max_width=300),
        color='brown',
        fill=True,
        fill_opacity=0.7
    ).add_to(mountain_group)

# Add lakes to the map
for name, data in lakes.items():
    popup_content = f"""
    <b>{name}</b><br>
    {data[2]}
    """
    folium.CircleMarker(
        location=[data[0], data[1]],
        radius=8,
        popup=folium.Popup(popup_content, max_width=300),
        color='blue',
        fill=True,
        fill_opacity=0.7
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

# Add ancient sites to the map
for name, data in ancient_sites.items():
    popup_content = f"""
    <b>{name}</b><br>
    {data[2]}
    """
    folium.CircleMarker(
        location=[data[0], data[1]],
        radius=8,
        popup=folium.Popup(popup_content, max_width=300),
        color='red',
        fill=True,
        fill_opacity=0.7
    ).add_to(ancient_sites_group)

# Add beaches to the map
for name, data in beaches.items():
    popup_content = f"""
    <b>{name}</b><br>
    {data[2]}
    """
    folium.CircleMarker(
        location=[data[0], data[1]],
        radius=8,
        popup=folium.Popup(popup_content, max_width=300),
        color='yellow',
        fill=True,
        fill_opacity=0.7
    ).add_to(beaches_group)

# Add all feature groups to the map
mountain_group.add_to(m)
lake_group.add_to(m)
river_group.add_to(m)
ancient_sites_group.add_to(m)
beaches_group.add_to(m)

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
    <p>Featuring mountains, lakes, rivers, ancient sites, and beaches</p>
</div>
'''
m.get_root().html.add_child(folium.Element(title_html))

# Save the map
m.save('greece_map.html')