// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
  return (
    <MapContainer style={{ height: "25rem" }} center={[28.837, 78.769]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[28.837, 78.769]}>
        <Popup>Moradabad</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
