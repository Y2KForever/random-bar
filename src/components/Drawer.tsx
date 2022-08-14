import React, { useEffect, useState, useContext } from "react";
import { showNotification } from "@mantine/notifications";
import {
  Button,
  Container,
  Divider,
  Drawer as MantineDrawer,
  Input,
  Slider,
} from "@mantine/core";

import { Context } from "../App";
import { IContext } from "../interface/interface";
import { marks } from "../consts/mark";

import { ReactComponent as MapPinIcon } from "../assets/icons/pin-3.svg";
import { ReactComponent as ErrorIcon } from "../assets/icons/cross-circle.svg";

export const Drawer = () => {
  const [distance, setDistance] = useState<number>(1);
  const context: IContext = useContext(Context);

  if (!context) {
    return <></>;
  }

  useEffect(() => {
    const circle =
      window.google &&
      new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: context.map,
        center: {
          lat: context.lat ?? context.startLat,
          lng: context.lng ?? context.startLng,
        },
        radius: distance * 1000,
      });

    return () => {
      if (circle) {
        circle.setMap(null);
      }
    };
  }, [distance, context.lat, context.lng]);

  const GetLocation = () => {
    if (navigator.geolocation) {
      context.setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          context.setLat(pos.coords.latitude);
          context.setLng(pos.coords.longitude);
          var geocoder = new google.maps.Geocoder();
          geocoder.geocode(
            {
              location: new google.maps.LatLng(
                pos.coords.latitude,
                pos.coords.longitude
              ),
            },
            (res, status) => {
              if (status === "OK" && res && res.length > 0) {
                if (context.map) {
                  context.map.setCenter({
                    lat: res[0].geometry.location.lat(),
                    lng: res[0].geometry.location.lng(),
                  });
                  context.setLoading(false);
                }
              } else {
                context.setLoading(false);
                showNotification({
                  title: "Error",
                  message: "Something went wrong. Please try again",
                });
              }
            }
          );
        },
        (err) => {
          context.setLoading(false);
          showNotification({
            title: "Error",
            message: err.message,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      showNotification({
        title: "Error",
        message: "Geolocation is not available in this browser",
        color: "pink",
        icon: <ErrorIcon style={{ transform: "scale(1.4)" }} />,
        radius: "lg",
      });
    }
  };

  const searchLocation = () => {
    if (context.map && context.lat && context.lng) {
      var service = new google.maps.places.PlacesService(context.map);
      var req = {
        location: new google.maps.LatLng(context.lat, context.lng),
        radius: distance,
        type: "bar",
      };
      service.nearbySearch(req, (res, status) => {
        // HANDLE RESULT, AND RANDOMIZE A BAR, THEN MARK IT ON MAP.
        // TODO
      });
    }
  };

  return (
    <MantineDrawer
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={context.opened}
      size="xl"
      onClose={() => context.setOpened(!context.opened)}
    >
      <Container>
        {/* ADD SEARCH CAPABILITY */}
        <Input.Wrapper
          label="Location"
          description="Press button or set manual location"
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Input icon={<MapPinIcon />} variant="filled" radius="md" />
        </Input.Wrapper>
        <Button
          loading={context.loading}
          color="violet"
          onClick={GetLocation}
          style={{ fontWeight: 400, marginBottom: 10 }}
        >
          Press to set location
        </Button>
        <Divider />
        <Input.Wrapper
          label="Distance"
          description="Specify how close the bars should be"
        >
          <Slider
            disabled={!context.lat || !context.lng}
            value={distance}
            onChange={(val) => {
              setDistance(val);
            }}
            thumbSize={20}
            color="violet"
            label={(val) => marks.find((mark) => mark.value === val)!.label}
            defaultValue={1}
            step={1}
            min={1}
            max={10}
            marks={marks}
            style={{ marginTop: 10 }}
            styles={{ markLabel: { display: "none" } }}
          />
        </Input.Wrapper>
        <Button
          onClick={searchLocation}
          color="violet"
          style={{
            marginTop: "50%",
            marginLeft: "auto",
            justifySelf: "center",
            fontWeight: 400,
          }}
        >
          Roll the dice
        </Button>
      </Container>
    </MantineDrawer>
  );
};
