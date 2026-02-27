# Drone Attack Statistics Map

An interactive 3D globe visualization of worldwide drone attacks with statistics and historical data.

## Features

- **3D Interactive Globe**: Rotate and explore a 3D world map with mouse controls
- **Attack Visualization**: Each attack is represented as a vertical line on the globe
- **Color Coding**: Lines transition from brown (older attacks) to red (newer attacks)
- **Height Scaling**: The height of each line represents the maximum number of deaths in that attack
- **Real-time Data**: Fetches latest drone attack data from https://api.dronestre.am/data
- **Statistics Dashboard**: Shows total attacks, total deaths, and countries affected

## Technology Stack

- **React 18**: UI framework
- **Three.js**: 3D graphics library
- **React Three Fiber**: React renderer for Three.js
- **Drei**: Useful helpers for React Three Fiber (including OrbitControls)
- **Vite**: Fast build tool and dev server
- **Axios**: HTTP client for data fetching

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd us-drone-attack-map
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173/`

## Usage

- **Rotate Globe**: Click and drag with your mouse to rotate the globe
- **Zoom**: Use mouse wheel to zoom in and out
- **Pan**: Right-click and drag (or Ctrl+Click on Mac) to pan
- **Auto Rotate**: The globe automatically rotates slowly. Click to interact

## Data Visualization

- **Brown Lines**: Older drone attacks
- **Red Lines**: Recent drone attacks
- **Line Height**: Taller lines represent attacks with more deaths
- **Statistics Panel**: Top-left corner shows total attacks, deaths, and affected countries

## Building for Production

To create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Data Source

Data is sourced from [The Bureau of Investigative Journalism's Drone Strike Database](https://dronestre.am/)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
