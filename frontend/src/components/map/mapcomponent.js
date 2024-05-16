import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import "./styles.css";

const Map = (props) => {
  const [userMarker, setUserMarker] = useState(null);
    const {userAddr,setUserAddr}=props
  const customIcon = new L.Icon({
    iconUrl: "https://icons.iconarchive.com/icons/paomedia/small-n-flat/128/map-marker-icon.png",
    iconSize: [38, 38],
  });

  const addUserMarker = (e) => {
    const { lat, lng } = e.latlng;
    setUserMarker({ lat, lng });
    fetchAddress(lat, lng);

  };

  const fetchAddress = async (lat, lng) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    // console.log("Address:",data);
    // const {city,city_district,quarter,road}=data.address
   
    // let address=`${road}, ${quarter}, ${city}, `
    const {
        country_code,
        "ISO3166-2-lvl4": isoCode,
        house_number,
        postcode,
        country,
        shop,
        ...rest
      } = data.address;
      const result = Object.values(rest).join(', ');
    // const jsonStringComplex = JSON.stringify(rest);
    setUserAddr(result)
  };

  const LocationMarker = () => {
    useMapEvents({
      click: addUserMarker,
    });

    return userMarker === null ? null : (
      <Marker position={[userMarker.lat, userMarker.lng]} icon={customIcon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  return (
    <div className="Map">
      <MapContainer
        center={[21.0288,105.8522]}
        zoom={16}
        style={{ height: "300px", width: "300px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
