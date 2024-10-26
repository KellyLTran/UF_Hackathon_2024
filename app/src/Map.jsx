// dont use this
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const MapboxExample = () => {
    const mapContainerRef = useRef();
    const mapRef = useRef();

    useEffect(() => {
        mapboxgl.accessToken = "";

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 9, // starting zoom
        });
    }, []);

    return (
        <div
            style={{ height: "100%" }}
            ref={mapContainerRef}
            className="map-container"
        />
    );
};

export default MapboxExample;
