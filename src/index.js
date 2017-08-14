// Import styles
import './style.scss';

// Images
import LineMap from './img/maps/line.png';
import AerialMap from './img/maps/aerial.jpg';

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

// Create #map for Leaflet
let appElement = document.createElement('div');
appElement.id = 'map';
document.body.appendChild(appElement);

// Create Leaflet map
let mapBounds = [[0, 0], [1000, 1000]];

// Map types
let lineLayer = L.imageOverlay(LineMap, mapBounds, {
    attribution: 'Map Imagery (c) <a href="http://www.rockstargames.com/">Rockstar Games</a>, ' +
    'Icon Imagery (c) <a href="https://mapicons.mapsmarker.com/">Map Icons Collection</a>, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>'
});
let aerialLayer = L.imageOverlay(AerialMap, mapBounds, {
    attribution: 'Map Imagery (c) <a href="http://ian-albert.com/">Ian Albert</a>, ' +
    'Icon Imagery (c) <a href="https://mapicons.mapsmarker.com/">Map Icons Collection</a>, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>'
});

// Icons
let BaseIcon = L.Icon.extend({
    options: {
        iconSize:    [32, 37],
        iconAnchor:  [16, 37],
        popupAnchor: [0, -34]
    }
});

let homeIcon = new BaseIcon({
    iconUrl: HomeIcon
});
let buildingIcon = new BaseIcon({
    iconUrl: BuildingIcon
});
let airportIcon = new BaseIcon({
    iconUrl: AirportIcon
});
let schoolIcon = new BaseIcon({
    iconUrl: SchoolIcon
});
let girlfriendIcon = new BaseIcon({
    iconUrl: GirlfriendIcon
});

// GeoJsons
let homes = L.geoJSON(Homes, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: homeIcon
        }).bindPopup(feature.properties.name);
    }
});
let buildings = L.geoJSON(Buildings, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: buildingIcon
        }).bindPopup(feature.properties.name);
    }
});
let airports = L.geoJSON(Airports, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: airportIcon
        }).bindPopup(feature.properties.name);
    },
    style: {
        color: '#9d7050'
    }
});
let schools = L.geoJSON(Schools, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: schoolIcon
        }).bindPopup(feature.properties.name);
    }
});
let girlfriends = L.geoJSON(Girlfriends, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: girlfriendIcon
        }).bindPopup(feature.properties.name);
    }
});

let map = L.map('map', {
    crs: L.CRS.Simple,
    // The default layers that will be enabled when SanMap is launched
    layers: [aerialLayer, homes]
});
map.fitBounds(mapBounds);

let layers = {
    Line: lineLayer,
    Aerial: aerialLayer
};
let overlays = {
    Homes: homes,
    Buildings: buildings,
    Airports: airports,
    Schools: schools,
    Girlfriends: girlfriends
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
//map.on('click', onMapClick);
