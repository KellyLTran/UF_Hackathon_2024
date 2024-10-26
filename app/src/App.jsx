import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import icon from "./constants";

function App() {
    const position = [51.505, -0.09];

    const requestPrediction = async () => {
        const res = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
        });

        const data = await res.json();
        console.log(data);
    };

    return (
        <div>
            <button onClick={requestPrediction}>predict</button>
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: "100vh" }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                />
                <GeoLocate />
            </MapContainer>
        </div>
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
                L.marker(latlng, { icon })
                    .addTo(map)
                    .bindPopup(e.geocode.name)
                    .openPopup();
                map.fitBounds(e.geocode.bbox);
            })
            .addTo(map);
    }, []);

    return null;
}

export default App;
