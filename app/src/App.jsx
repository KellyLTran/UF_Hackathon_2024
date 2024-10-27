import { MapContainer, TileLayer, Marker, Popup, useMap, WMSTileLayer, LayersControl, LayerGroup} from "react-leaflet";
import { useEffect, useState, React } from "react";
import ReactDOM from "react-dom/client";
import "leaflet/dist/leaflet.css";

  
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import icon from "./constants";

import Stats from "./Stats";
import StateCodes from 'us-state-codes';

function App() {
    const [showStats, setShowStats] = useState(false);
    const [geoStats, setGeoStats] = useState("");
    const position = [28.6, -82.32];
    

    const requestPrediction = async () => {
        const res = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
        });

        const data = await res.json();
        console.log(data);
    };

    const requestRecommendations = async () => {
        const res = await fetch("http://127.0.0.1:8000/recommend", {
            method: "POST",
        });

        const data = await res.json();
        console.log(data);
    };

    return (
        <div>
            <button onClick={() => setShowStats((prev) => !prev)}>
                show stats
            </button>


            <button onClick={requestPrediction}>predict</button>
            <MapContainer
                center={position}
                zoom={7.4}
                style={{ height: "100vh" }}
            >  
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"    
                />
                <LayersControl position="topright">
                <LayersControl.Overlay name="Counties">
                    <WMSTileLayer 
                    url="https://tigerweb.geo.census.gov/arcgis/services/Census2020/tigerWMS_Census2020/MapServer/WMSServer?request?"
                    params={{format: 'image/png', layers:"9", transparent: true}}
                    />
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Current Hazard Warning">
                    <WMSTileLayer 
                    url="https://mapservices.weather.noaa.gov/eventdriven/services/WWA/watch_warn_adv/MapServer/WMSServer?request?"
                    params={{format: 'image/png', layers:"0", transparent: true}}
                    />
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Current Hazard Watches">
                    <WMSTileLayer 
                    url="https://mapservices.weather.noaa.gov/eventdriven/services/WWA/watch_warn_adv/MapServer/WMSServer?request?"
                    params={{format: 'image/png', layers:"1", transparent: true}}
                    />
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Peak Storm Surge">
                    <WMSTileLayer 
                    url="https://mapservices.weather.noaa.gov/tropical/services/tropical/NHC_PeakStormSurge/MapServer/WMSServer?request?"
                    params={{format: 'image/png', layers:"0,1,2", transparent: true}}
                    />
                </LayersControl.Overlay>
                <LayersControl.Overlay name="CPC Monthly Precipitation Outlook">
                    <WMSTileLayer 
                    url="https://mapservices.weather.noaa.gov/vector/services/outlooks/cpc_mthly_precip_outlk/MapServer/WMSServer?request?"
                    params={{format: 'image/png', layers:"0", transparent: true}}
                    />
                </LayersControl.Overlay>
                <LayersControl.Overlay name="The NHC & CPC Tropical Weather Summary ">
                    <WMSTileLayer 
                    url="https://mapservices.weather.noaa.gov/tropical/services/tropical/NHC_tropical_weather_summary/MapServer/WMSServer?request?"
                    params={{format: 'image/png', layers:"0,4,9,14,17,20,29", transparent: true}}
                    />
                </LayersControl.Overlay>
                </LayersControl>
                <GeoLocate setGeoStats={setGeoStats} />
                <Stats
                    isOpen={showStats}
                    toggleDrawer={() => setShowStats((prev) => !prev)}
                    content={geoStats}
                    requestRecommendations={requestRecommendations}
                />
            </MapContainer>
        </div>
    );
}

function GeoLocate({ setGeoStats }) {
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