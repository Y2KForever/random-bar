/// <reference types="vite-plugin-svgr/client" />
import React, { CSSProperties, useState, createContext } from "react";
import "./index.css";
import { Box, ActionIcon, Loader } from "@mantine/core";

import { ReactComponent as Menu } from "./assets/icons/align-justify-2.svg";

import { MapWrapper } from "./components/MapWrapper";
import { Drawer } from "./components/Drawer";

const BoxStyle: CSSProperties = {
  zIndex: 1,
  position: "absolute",
  background: "transparent",
  width: 50,
  height: 50,
};

export const Context: any = createContext(null);

function App(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const [startLat] = useState<number>(59.33665973999843);
  const [startLng] = useState<number>(18.072035178187637);
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  return (
    <Context.Provider
      value={{
        lat: lat,
        setLat: setLat,
        startLat: startLat,
        lng: lng,
        startLng: startLng,
        setLng: setLng,
        map: map,
        setMap: setMap,
        opened: opened,
        setOpened: setOpened,
        loading: loading,
        setLoading: setLoading,
        distance: 0,
        setDistnace: () => {},
      }}
    >
      {loading && (
        <Loader
          style={{ zIndex: 1, position: "absolute", top: "50%", left: "50%" }}
          color="violet"
        />
      )}
      <Drawer />

      <Box style={BoxStyle}>
        <ActionIcon
          variant="subtle"
          onClick={() => setOpened(!opened)}
          style={{
            height: 50,
            width: 50,
            borderRadius: 0,
            borderBottomRightRadius: 8,
          }}
        >
          <Menu />
        </ActionIcon>
      </Box>

      <MapWrapper />
    </Context.Provider>
  );
}

export default App;
