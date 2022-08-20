import React, { useContext, useEffect, useState } from "react";
import { Input, Slider } from "@mantine/core";

import { IContext } from "../interface/interface";
import { Context } from "../App";
import { marks } from "../consts/mark";

import { Button } from "./Button";
import { Dice } from "./Dice";

interface IDistance {
  styles?: React.CSSProperties;
}

export const Distance = ({ styles }: IDistance) => {
  const context: IContext = useContext(Context);

  if (!context) {
    return <></>;
  }

  useEffect(() => {
    const circle =
      window.google &&
      new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.3,
        strokeWeight: 1,
        fillColor: "#FF0000",
        fillOpacity: 0.2,
        map: context.map,
        center: {
          lat: context.lat ?? context.startLat,
          lng: context.lng ?? context.startLng,
        },
        radius: context.distance * 1000,
      });

    return () => {
      if (circle) {
        circle.setMap(null);
      }
    };
  }, [context.distance, context.lat, context.lng]);

  return (
    <>
      <Input.Wrapper label="Distance" description="Specify how close the bars should be" style={styles ?? undefined}>
        <Slider
          disabled={!context.lat || !context.lng}
          value={context.distance}
          onChange={(val) => {
            context.setDistance(val);
          }}
          thumbSize={20}
          color="violet"
          defaultValue={0.5}
          step={0.5}
          min={0.5}
          max={10}
          marks={marks}
          style={{ marginTop: 10 }}
          styles={{ markLabel: { display: "none" } }}
        />
      </Input.Wrapper>
      <Dice />
    </>
  );
};
