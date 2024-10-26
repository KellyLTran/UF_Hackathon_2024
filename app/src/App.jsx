import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import icon from "./constants";

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
                const city = properties.city || properties.town || properties.village || "Gainesville";
                const state = properties.state || "Florida";
                const country = properties.country || "United States";

                // Displaying extracted information in the popup for testing purposes
                L.marker(latlng, { icon })
                    .addTo(map)
                    .bindPopup(`${city}, ${state}, ${country}`)
                    .openPopup();
                map.fitBounds(e.geocode.bbox);
            })
            .addTo(map);
    }, []);

    return null;
}

export default App;