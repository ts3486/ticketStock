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
    lat: 35.6762,
    lng: 139.6503,
  },
  zoom: 18,
};

const Map = () => {
  const [mapProps, setMapProps] = useState<MapProps>(initialMapProps);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <GoogleMapReact bootstrapURLKeys={{ key: googleMapsApiKey }} center={mapProps.center} zoom={mapProps.zoom} />
    </div>
  );
};

export default Map;
