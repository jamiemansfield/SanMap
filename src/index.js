// Import styles
import './style.scss';

// Images
import HomeIcon from './img/icons/home.png';
import BuildingIcon from './img/icons/building.png';
import AirportIcon from './img/icons/airport.png';
import SchoolIcon from './img/icons/school.png';
import GirlfriendIcon from './img/icons/girlfriend.png';

// GeoJSON
import Homes from './geo/homes.json';
import Buildings from './geo/buildings.json';
import Airports from './geo/airports.json';
import Schools from './geo/schools.json';
import Girlfriends from './geo/girlfriends.json';

// JS Dependencies
import L from 'leaflet';

// ---

let lineLayer = L.tileLayer('/img/maps/line/{z}/{y}/{x}.jpg', {
    attribution: 'Map Imagery (c) <a href="http://www.rockstargames.com/">Rockstar Games</a>, ' +
    'Icon Imagery (c) <a href="https://mapicons.mapsmarker.com/">Map Icons Collection</a>, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>'
});

let aerialLayer = L.tileLayer('/img/maps/aerial/{z}/{y}/{x}.jpg', {
    attribution: 'Map Imagery (c) <a href="http://ian-albert.com/">Ian Albert</a>, ' +
    'Icon Imagery (c) <a href="https://mapicons.mapsmarker.com/">Map Icons Collection</a>, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>'
});

// Create Leaflet map
let map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: 1,
    maxZoom: 5,
    zoomSnap: 0.5,
    // The default layers that will be enabled when SanMap is launched
    layers: [aerialLayer]
});
map.setView([-128, 128], 1);
map.setMaxBounds([[0, 256], [-256, 0]]);

let layers = {
    Line: lineLayer,
    Aerial: aerialLayer
};
let overlays = {
};

L.control.layers(layers, overlays).addTo(map);

// Show coordinate information on a left click
// Helpful in development
let popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

// Remember to comment this when committing!
map.on('click', onMapClick);
