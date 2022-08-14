import React, { useEffect, useRef, useState } from "react";
import { showNotification } from "@mantine/notifications";
import {
  Button,
  Container,
  Divider,
  Drawer as MantineDrawer,
  Input,
  Slider,
} from "@mantine/core";

import { ReactComponent as MapPinIcon } from "../assets/icons/pin-3.svg";
import { ReactComponent as ErrorIcon } from "../assets/icons/cross-circle.svg";

interface IDrawer {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  setLat: (lat: number) => void;
  lat: number;
  lng: number;
  setLng: (lng: number) => void;
  map: google.maps.Map | null;
}

export const Drawer = ({
  opened,
  setOpened,
  setLat,
  setLng,
  map,
  lat,
  lng,
}: IDrawer) => {
  const [distance, setDistance] = useState<number>(1);

  useEffect(() => {
    const circle =
      window.google &&
      new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: {
          lat: lat,
          lng: lng,
        },
        radius: distance * 1000,
      });

    return () => {
      if (circle) {
        circle.setMap(null);
      }
    };
  }, [distance]);

  const GetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(pos.coords.latitude);
          setLng(pos.coords.longitude);
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
                if (map) {
                  map.setCenter({
                    lat: res[0].geometry.location.lat(),
                    lng: res[0].geometry.location.lng(),
                  });
                }
              } else {
                showNotification({
                  title: "Error",
                  message: "Something went wrong. Please try again",
                });
              }
            }
          );
        },
        (err) => {
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

  const marks = [
    {
      value: 1,
      label: "1km",
    },
    {
      value: 2,
      label: "2km",
    },
    {
      value: 3,
      label: "3km",
    },
    {
      value: 4,
      label: "4km",
    },
    {
      value: 5,
      label: "5km",
    },
    {
      value: 6,
      label: "6km",
    },
    {
      value: 7,
      label: "7km",
    },
    {
      value: 8,
      label: "8km",
    },
    {
      value: 9,
      label: "9km",
    },
    {
      value: 10,
      label: "10km",
    },
  ];

  const searchLocation = () => {
    if (map) {
      var service = new google.maps.places.PlacesService(map);
      var req = {
        location: new google.maps.LatLng(lat, lng),
        radius: 1000,
        type: "bar",
      };
      service.nearbySearch(req, (res, status) => {
        // HANDLE RESULT, AND RANDOMIZE A BAR, THEN MARK IT ON MAP.
        // SHOULD ALSO REMAKE UI LUL
      });
    }
  };

  return (
    <MantineDrawer
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      size="xl"
      onClose={() => setOpened(!opened)}
    >
      <Container>
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
