# Interactive Greece Geography Learning

An interactive web application designed to help children learn about the geography of Greece through an engaging map interface and quiz game. The application features various geographical elements including mountains, rivers, and lakes across Greece.

## Features

- Interactive map interface using Folium
- Display of locations across Greece
- Display of key geographical features:
  - Mountains
  - Rivers
  - Lakes
- Gamified quiz system to test knowledge
- Kid-friendly, intuitive interface
- Interactive learning experience

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd greece-geography
```

2. Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install the required packages:
```bash
pip install -r requirements.txt
```

## Usage

1. Start the Flask development server:
```bash
python greece_map.py
```

2. Open your web browser and navigate to:
```
http://localhost:5000
```

## Educational Features

- Interactive exploration of Greek geography
- Quiz mode to test knowledge of locations
- Visual learning through map interaction
- Immediate feedback on answers
- Progressive difficulty levels

## Dependencies

- Flask==2.3.3
- Folium==0.14.0
- Pandas==2.0.1
- GeoPandas==0.13.0
- Requests==2.31.0
- Werkzeug==2.3.7

## Project Structure

```
project/
├── greece_map.py          # Main application file
├── requirements.txt       # Project dependencies
├── templates/            # HTML templates
├── static/              # Static files (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── images/
└── venv/                # Virtual environment
```

## Contributing

Contributions to improve the educational content or add new features are welcome! Feel free to open issues and pull requests.

## License

MIT License

Copyright (c) 2023

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.