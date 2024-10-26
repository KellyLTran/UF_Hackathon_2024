import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import icon from "./constants";
import StateCodes from 'us-state-codes';

function App() {
    const position = [51.505, -0.09];

    return (
        <MapContainer center={position} zoom={13} style={{ height: "100vh" }}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            />
            <GeoLocate />
        </MapContainer>
    );
}

function GeoLocate() {
    const map = useMap();

    useEffect(() => {
        var geocoder = L.Control.Geocoder.nominatim();
        if (typeof URLSearchParams !== "undefined" && location.search) {
            // parse /?geocoder=nominatim from URL
            var params = new URLSearchParams(location.search);
            var geocoderString = params.get("geocoder");
            if (geocoderString && L.Control.Geocoder[geocoderString]) {
                geocoder = L.Control.Geocoder[geocoderString]();
            } else if (geocoderString) {
                console.warn("Unsupported geocoder", geocoderString);
            }
        }

        L.Control.geocoder({
            query: "",
            placeholder: "Search here...",
            defaultMarkGeocode: false,
            geocoder,
        })
            .on("markgeocode", function (e) {
                var latlng = e.geocode.center;

                // Extract city, state, and country from the geocoding result (with default values if it is missing)
                const properties = e.geocode.properties.address || {};
                let city = (properties.city || properties.town || properties.village || "gainesville").toLowerCase();
                let state = (properties.state || "fl").toLowerCase();
                let country = (properties.country_code || "us").toLowerCase();

                // Convert state to its abbreviation using us-state-codes to have correct formatting for the API
                state = StateCodes.sanitizeStateCode(state) || StateCodes.getStateCodeByStateName(state) || state;

                // Construct the API URL for Zippopotam.us then fetch the data
                const apiUrl = `http://api.zippopotam.us/${country}/${state}/${city}`;
                fetch(apiUrl)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Location data not found.");
                        }
                        return response.json();
                    })

                    // Process, extract, and display the data based on the searched location
                    .then((data) => {
                        const places = data.places[0];
                        const postalCode = data["post code"]; // TODO: ensure this is defined
                        const placeName = places["place name"];
                        const longitude = places["longitude"];
                        const latitude = places["latitude"];
                        L.marker(latlng, { icon })
                            .addTo(map)
                            .bindPopup(
                                `City: ${placeName}, ${state.toUpperCase()}, ${country.toUpperCase()}<br>
                                Postal Code: ${postalCode}<br>
                                Coordinates: ${latitude}, ${longitude}`
                            )
                            .openPopup();
                        map.fitBounds(e.geocode.bbox);
                    })

                    // For handling other countries outside US 
                    .catch(() => {
                        L.marker(latlng, { icon })
                            .addTo(map)
                            .bindPopup("Info to be added.") // TODO: display other countries' data
                            .openPopup();
                    });
            })
            .addTo(map);
    }, []);

    return null;
}

export default App;