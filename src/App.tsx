/// <reference types="vite-plugin-svgr/client" />
import React, { CSSProperties, useState } from "react";
import "./index.css";
import { Button, Box, Styles, ActionIcon } from "@mantine/core";

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

function App() {
  const [opened, setOpened] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(59.33665973999843);
  const [lng, setLng] = useState<number>(18.072035178187637);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  return (
    <>
      <Drawer
        map={map}
        setLat={setLat}
        setLng={setLng}
        lng={lng}
        lat={lat}
        opened={opened}
        setOpened={setOpened}
      />
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
      <MapWrapper map={map} setMap={setMap} lat={lat} lng={lng} />
    </>
  );
}

export default App;
