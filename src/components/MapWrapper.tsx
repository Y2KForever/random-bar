import { useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import { Map } from "./Map";
import { Marker } from "./Marker";

import { ReactComponent as PinIcon } from "../assets/icons/pin-3.svg";

interface MapWrapper {
  lat: number;
  lng: number;
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map | null) => void;
}

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

export const MapWrapper = ({ lat, lng, map, setMap }: MapWrapper) => {
  //const MarkerPos = new window.google.maps.LatLng(lat, lng);

  return (
    <Wrapper
      apiKey="AIzaSyCpX4I27e-tWIns8PRakXqkcPSqKuNPP1o"
      libraries={["places"]}
      render={render}
    >
      <Map
        lng={lng}
        lat={lat}
        map={map}
        setMap={setMap}
        center={{ lat: lat, lng: lng }}
        zoom={15}
      >
        <Marker position={{ lat: lat, lng: lng }} />
      </Map>
    </Wrapper>
  );
};
