import React from "react";
import { Marker } from "react-native-maps";
import { Image } from "react-native";
import { SelectMarkerContext } from "../../Context/SelectMarkerContext";
import { useContext } from "react";
export default function Markers({ index, place }) {
  // Ensure geometry.location exists
  if (!place || !place.geometry || !place.geometry.location) return null;

  const { lat: latitude, lng: longitude } = place.geometry.location;

  // Check if latitude or longitude are invalid
  if (isNaN(latitude) || isNaN(longitude)) {
    console.warn(`Invalid coordinates for place: ${JSON.stringify(place)}`);
    return null;
  }
  const {selectedMarker, setSelectedMarker} = useContext(SelectMarkerContext)
  return (
    <Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      onPress={()=>{
          setSelectedMarker(index); 
      }}
    >
      <Image
        source={require("./../../../assets/images/marker.png")}
        style={{ width: 20, height: 20 }}
      />
    </Marker>
  );
}
