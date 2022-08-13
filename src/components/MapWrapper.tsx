import { Wrapper } from "@googlemaps/react-wrapper";
import { useState } from "react";
import { Map } from "./Map";

interface MapWrapper {
  lat: number;
  lng: number;
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map | null) => void;
}

export const MapWrapper = ({ lat, lng, map, setMap }: MapWrapper) => {
  return (
    <Wrapper
      apiKey="AIzaSyCpX4I27e-tWIns8PRakXqkcPSqKuNPP1o"
      libraries={["places"]}
    >
      <Map
        map={map}
        setMap={setMap}
        center={{ lat: lat, lng: lng }}
        zoom={15}
      />
    </Wrapper>
  );
};
