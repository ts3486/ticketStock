import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
const { googleMapsApiKey } = require("../../../secret.json");

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const initialMapProps: MapProps = {
  center: {
    lat: 35.39,
    lng: 139.44,
  },
  zoom: 18,
};

const Map = () => {
  const [mapProps, setMapProps] = useState<MapProps>(initialMapProps);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <GoogleMapReact bootstrapURLKeys={{ key: googleMapsApiKey }} center={mapProps.center} zoom={mapProps.zoom} />
    </div>
  );
};

export default Map;
