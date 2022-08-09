import { useEffect, useRef, useState } from "react";
import { Button, Container, Drawer } from "@mantine/core";
import { renderToStaticMarkup } from "react-dom/server";
import { ReactComponent as Menu } from "../assets/icons/log-out-3-rec.svg";

interface IMap {
  center: google.maps.LatLngLiteral;
  zoom: number;
  setOpened: (open: boolean) => void;
}

export const Map = ({ center, zoom, setOpened }: IMap) => {
  const ref: any = useRef();

  useEffect(() => {
    const output = document.createElement("div");
    const staticElement = renderToStaticMarkup(
      <ControlContainer setOpened={setOpened} />
    );
    output.innerHTML = `${staticElement}`;
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      disableDefaultUI: true,
      zoomControl: true,
      keyboardShortcuts: false,
    });

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(output);
  });

  return <div ref={ref} id="map" style={{ height: "100vh" }} />;
};

interface IControlContainer {
  setOpened: (open: boolean) => void;
}

const ControlContainer = ({ setOpened }: IControlContainer) => {
  return (
    <Container
      id="ControlContainer"
      style={{
        width: 45,
        background: "white",
        height: "100vh",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Button onClick={() => {
        console.log("test");
      }}></Button>
      {/* <Menu
        fill="purple"
        onClick={(event) => {
          console.log(event);
          console.log("click");
        }}
      /> */}
    </Container>
  );
};
