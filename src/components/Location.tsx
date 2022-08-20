import React, { useContext, useEffect, useRef, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { Divider, Input, Popover, Text, ActionIcon, Box } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import { Context } from "../App";
import { IContext } from "../interface/interface";

import { ReactComponent as MapPinIcon } from "../assets/icons/pin-3.svg";
import { ReactComponent as ErrorIcon } from "../assets/icons/cross-circle.svg";
import { ReactComponent as GpsIcon } from "../assets/icons/gps.svg";

export const Location = () => {
  const inputRef = useRef<any>(null);
  const [locations, setLocations] = useState<any[] | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [manualLocation, setManualLocation] = useState<string>("");
  const [debouncedLocation] = useDebouncedValue(manualLocation, 600);
  const context: IContext = useContext(Context);

  if (!context) {
    return <></>;
  }

  useEffect(() => {
    if (window.google && context.map && debouncedLocation !== "") {
      const x = new google.maps.places.AutocompleteService();
      x.getPlacePredictions(
        {
          input: debouncedLocation,
        },
        (res, status) => {
          if (status === "OK" && res && res.length > 0) {
            setLocations(res);
            setIsOpen(true);
          } else {
            if (res === null) {
              showNotification({
                title: "Error",
                message: "Could not find address",
                color: "pink",
                icon: <ErrorIcon style={{ transform: "scale(1.4)" }} />,
                radius: "lg",
              });
            }
          }
        },
      );
    }
  }, [debouncedLocation]);

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
              location: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            },
            (res, status) => {
              if (status === "OK" && res && res.length > 0) {
                if (context.map) {
                  context.map.setCenter({
                    lat: res[0].geometry.location.lat(),
                    lng: res[0].geometry.location.lng(),
                  });
                  context.setLoading(false);
                  context.setShowing("distance");
                }
              } else {
                context.setLoading(false);
                showNotification({
                  title: "Error",
                  message: "Something went wrong. Please try again",
                  color: "pink",
                  icon: <ErrorIcon style={{ transform: "scale(1.4)" }} />,
                  radius: "lg",
                });
              }
            },
          );
        },
        (err) => {
          context.setLoading(false);
          showNotification({
            title: "Error",
            message: err.message,
            color: "pink",
            icon: <ErrorIcon style={{ transform: "scale(1.4)" }} />,
            radius: "lg",
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
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

  return (
    <Input.Wrapper
      style={{
        marginTop: 20,
        marginBottom: 10,
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Input.Label sx={{ marginRight: "auto" }}>
          <Text>Location</Text>
        </Input.Label>
        <ActionIcon loading={context.loading} onClick={GetLocation}>
          <GpsIcon />
        </ActionIcon>
      </div>
      <Input.Description>
        <Text style={{ marginRight: "auto" }}>Press button or set manual location</Text>
      </Input.Description>
      <Popover width="target" opened={isOpen} onChange={setIsOpen}>
        <Popover.Target>
          <Input
            ref={inputRef}
            value={manualLocation}
            onChange={(event: any) => setManualLocation(event.currentTarget.value)}
            icon={<MapPinIcon />}
            variant="filled"
            radius="md"
            onClick={() => {
              if (locations && locations.length > 0 && !isOpen) {
                setIsOpen(!isOpen);
              }
            }}
          />
        </Popover.Target>
        <Popover.Dropdown
          sx={{
            ":hover": {
              cursor: "pointer",
            },
          }}
        >
          {locations &&
            locations.map((d) => (
              <Box
                sx={{
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
                key={d.place_id}
                onClick={() => {
                  setIsOpen(!isOpen);
                  var geocoder = new google.maps.Geocoder();
                  geocoder.geocode(
                    {
                      placeId: d.place_id,
                    },
                    (res, status) => {
                      if (status === "OK" && res && res.length > 0) {
                        context.setLat(res[0].geometry.location.lat());
                        context.setLng(res[0].geometry.location.lng());
                        if (context.map) {
                          context.map.setCenter({
                            lat: res[0].geometry.location.lat(),
                            lng: res[0].geometry.location.lng(),
                          });
                          context.setLoading(false);
                          context.setShowing("distance");
                        }
                      } else {
                        context.setLoading(false);
                        showNotification({
                          title: "Error",
                          message: "Something went wrong. Please try again",
                          color: "pink",
                          icon: <ErrorIcon style={{ transform: "scale(1.4)" }} />,
                          radius: "lg",
                        });
                      }
                    },
                  );
                }}
              >
                <Text style={{ color: "white" }}>{d.description}</Text>
                <Divider sx={{ width: "100%" }} my="sm" />
              </Box>
            ))}
        </Popover.Dropdown>
      </Popover>
    </Input.Wrapper>
  );
};
