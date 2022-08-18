/// <reference types="vite-plugin-svgr/client" />
import React, { CSSProperties, useState, createContext } from "react";
import "./index.css";
import { Box, ActionIcon, Loader, SegmentedControl, ColorSchemeProvider, ColorScheme, MantineProvider } from "@mantine/core";

import { ReactComponent as Menu } from "./assets/icons/align-justify-2.svg";

import { MapWrapper } from "./components/MapWrapper";
import { Drawer } from "./components/Drawer";
import { ThemeToggle } from "./components/ThemeToggle";
import { MyGlobalStyles } from "./main";

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
  const [zoom, setZoom] = useState<number>(15);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme: colorScheme }}>
        <MyGlobalStyles />
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
            setDistnace: () => { },
            zoom: zoom,
            setZoom: setZoom,
            theme: colorScheme
          }}
        >
          <ThemeToggle />
          {loading && (
            <Loader
              style={{ zIndex: 1, position: "absolute", top: "50%", left: "50%" }}
              color="violet"
            />
          )}
          <Drawer />
          <MapWrapper />
        </Context.Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
