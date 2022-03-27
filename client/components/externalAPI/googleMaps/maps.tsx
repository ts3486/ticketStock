import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
const { googleMapsApiKey } = require("../../../secret.json");

interface Props {
  mapProps: MapProps;
}

interface MapProps {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
}

interface Props {
  mapProps: MapProps;
}

const initialMapProps: MapProps = {
  center: {
    lat: 35.6762,
    lng: 139.6503,
  },
  zoom: 18,
};

const Map: React.FC<Props> = (props) => {
  console.log(props);

  const mapProps = props.mapProps ?? initialMapProps;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <GoogleMapReact bootstrapURLKeys={{ key: googleMapsApiKey }} center={mapProps.center} zoom={mapProps.zoom} />
    </div>
  );
};

export default Map;
