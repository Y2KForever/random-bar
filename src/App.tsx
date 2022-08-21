/// <reference types="vite-plugin-svgr/client" />
import React, { useState, createContext } from "react";
import "./index.css";
import { Box, Loader, ColorSchemeProvider, ColorScheme, MantineProvider, Overlay } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";

import { MyGlobalStyles } from "./main";
import { MapWrapper } from "./components/MapWrapper";
import { Location } from "./components/Location";
import { ThemeToggle } from "./components/ThemeToggle";
import { Distance } from "./components/Distance";
import { Dice } from "./components/Dice";
import { Info } from "./components/Info";

export const Context: any = createContext(null);

function App(props: any) {
  const { width } = useViewportSize();
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [placeId, setPlaceId] = useState<string | undefined>(undefined);
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [priceLevel, setPriceLevel] = useState<number | undefined>(undefined);
  const [rollAgain, setRollAgain] = useState<boolean>(false);
  const [barLat, setBarLat] = useState<number | undefined>(undefined);
  const [barLng, setBarLng] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const [distance, setDistance] = useState<number>(0.5);
  const [startLat] = useState<number>(59.33665973999843);
  const [startLng] = useState<number>(18.072035178187637);
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);
  const [locationList, setLocationList] = useState<any[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [showing, setShowing] = useState<"location" | "distance" | "roll">("location");
  const [zoom, setZoom] = useState<number>(15);
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme: colorScheme }}>
        <NotificationsProvider position="bottom-center">
          <MyGlobalStyles />
          <Context.Provider
            value={{
              name: name,
              setName: setName,
              url: url,
              setUrl: setUrl,
              rating: rating,
              setRating: setRating,
              priceLevel: priceLevel,
              setPriceLevel: setPriceLevel,
              placeId: placeId,
              setPlaceId: setPlaceId,
              barLat: barLat,
              barLng: barLng,
              setBarLat: setBarLat,
              setBarLng: setBarLng,
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
              distance: distance,
              setDistance: setDistance,
              zoom: zoom,
              setZoom: setZoom,
              theme: colorScheme,
              showing: showing,
              setShowing: setShowing,
              image: image,
              setImage: setImage,
              showRollAgain: rollAgain,
              setShowRollAgain: setRollAgain,
              locationList: locationList,
              setLocationList: setLocationList,
            }}
          >
            {loading && (
              <Loader
                style={{ zIndex: 2, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                color="violet"
              />
            )}
            <Box
              sx={{
                position: "fixed",
                zIndex: 5,
                background: "#1A1B1E",
                width: "100%",
                padding: 10,
                maxWidth: 810,
                left: width > 810 ? "50%" : undefined,
                transform: width > 810 ? "translate(-50%, 0)" : undefined,
                borderBottomLeftRadius: width > 810 ? 8 : 0,
                borderBottomRightRadius: width > 810 ? 8 : 0,
              }}
            >
              {showing === "location" && <Location />}
              {showing === "distance" && <Distance />}
              {showing === "roll" && <Dice />}
            </Box>
            {loading && <Overlay opacity={0.3} color="#000" blur={2} zIndex={1} />}
            {barLat && barLng && opened && <Info />}
            {/* 
          <ThemeToggle /> 
            DISABLED FOR NOW.
          */}
            <MapWrapper />
          </Context.Provider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
