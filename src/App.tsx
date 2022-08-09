/// <reference types="vite-plugin-svgr/client" />
import { Wrapper } from "@googlemaps/react-wrapper";
import "./index.css";

import { Map } from "./components/Map";
import { Button, Drawer } from "@mantine/core";
import { useState } from "react";

function App() {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <>
      <Drawer opened={opened} onClose={() => setOpened(false)}></Drawer>
      <Wrapper apiKey="AIzaSyCpX4I27e-tWIns8PRakXqkcPSqKuNPP1o">
        <Map
          center={{ lat: 59.3366156, lng: 18.0698471 }}
          zoom={15}
          setOpened={setOpened}
        />
      </Wrapper>
    </>
  );
}

export default App;
