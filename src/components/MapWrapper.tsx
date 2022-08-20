import { useContext, useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import { IContext, IBarContext } from "../interface/interface";
import { Context } from "../App";
import { BarContext } from "./Dice";

import { Map } from "./Map";
import { Marker } from "./Marker";

import pinIcon from "../assets/icons/pin.svg";
import { Box, Popover, Tooltip } from "@mantine/core";
import { Info } from "./Info";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

export const MapWrapper = () => {
  const context: IContext = useContext(Context);

  if (!context) {
    return <></>;
  }

  const markerPos =
    window.google && context.barLat && context.barLng
      ? new window.google.maps.LatLng(context.barLat, context.barLng)
      : null;

  return (
    <Wrapper
      apiKey="AIzaSyCpX4I27e-tWIns8PRakXqkcPSqKuNPP1o"
      libraries={["places", "geometry", "localContext"]}
      render={render}
    >
      <Map
        lng={context.barLng ?? context.lng ?? context.startLng}
        lat={context.barLat ?? context.lat ?? context.startLat}
        map={context.map}
        setMap={context.setMap}
        center={{
          lat: context.barLat ?? context.lat ?? context.startLat,
          lng: context.barLng ?? context.lng ?? context.startLng,
        }}
        zoom={context.zoom}
      >
        <Marker clickable={true} icon={pinIcon} position={markerPos} />
      </Map>
    </Wrapper>
  );
};
