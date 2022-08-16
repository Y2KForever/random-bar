import { useContext } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import { Map } from "./Map";
import { Marker } from "./Marker";

import pinIcon from "../assets/icons/pin-2.svg";
import { Context } from "../App";
import { IContext } from "../interface/interface";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

export const MapWrapper = () => {
  const context: IContext = useContext(Context);

  if (!context) {
    return <></>;
  }

  const markerPos =
    window.google && context.lat && context.lng
      ? new window.google.maps.LatLng(context.lat, context.lng)
      : null;

  return (
    <Wrapper
      apiKey="AIzaSyCpX4I27e-tWIns8PRakXqkcPSqKuNPP1o"
      libraries={["places", "geometry", "localContext"]}
      render={render}
    >
      <Map
        lng={context.lng ?? context.startLat}
        lat={context.lat ?? context.startLng}
        map={context.map}
        setMap={context.setMap}
        center={{
          lat: context.lat ?? context.startLat,
          lng: context.lng ?? context.startLng,
        }}
        zoom={15}
      >
        <Marker clickable={true} icon={pinIcon} position={markerPos} />
      </Map>
    </Wrapper>
  );
};
