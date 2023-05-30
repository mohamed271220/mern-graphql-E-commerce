import React from "react";
import { Marker, Popup } from "react-leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

const Map = () => {
  return (
    <div className="map">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]} key={"zimart"}></Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
