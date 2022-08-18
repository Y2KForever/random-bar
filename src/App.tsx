/// <reference types="vite-plugin-svgr/client" />
import React, { useState, createContext } from "react";
import "./index.css";
import { Box, Loader, ColorSchemeProvider, ColorScheme, MantineProvider, } from "@mantine/core";

import { MapWrapper } from "./components/MapWrapper";
import { Drawer } from "./components/Drawer";
import { ThemeToggle } from "./components/ThemeToggle";
import { MyGlobalStyles } from "./main";

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
          {loading && (
            <Loader
              style={{ zIndex: 1, position: "absolute", top: "50%", left: "50%" }}
              color="violet"
            />
          )}
          <Drawer />
          {/* 
          <ThemeToggle /> 
            DISABLED FOR NOW.
          */}
          <MapWrapper />
        </Context.Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
