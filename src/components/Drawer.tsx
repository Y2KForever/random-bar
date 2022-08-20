import React, { useEffect, useState, useContext, useRef } from "react";
import { showNotification } from "@mantine/notifications";
import {
  Button,
  Container,
  Divider,
  Drawer as MantineDrawer,
  Input,
  Slider,
  Popover,
  Text,
  ActionIcon
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import { Context } from "../App";
import { IContext } from "../interface/interface";
import { marks } from "../consts/mark";

import { ReactComponent as MapPinIcon } from "../assets/icons/pin-3.svg";
import { ReactComponent as ErrorIcon } from "../assets/icons/cross-circle.svg";
import { ReactComponent as GpsIcon } from "../assets/icons/gps.svg";

export const Drawer = () => {
  const inputRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [distance, setDistance] = useState<number>(0.5);
  const [locations, setLocations] = useState<any[] | null>(null);
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
        }
      );
    }
  }, [debouncedLocation]);

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
                  color: "pink",
                  icon: <ErrorIcon style={{ transform: "scale(1.4)" }} />,
                  radius: "lg",
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
            color: "pink",
            icon: <ErrorIcon style={{ transform: "scale(1.4)" }} />,
            radius: "lg",
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
      opened={true}
      size="xl"
      onClose={() => context.setOpened(!context.opened)}
    >
      <Container>
        <Input.Wrapper
          labelProps={{
            style: {
              width: "100%"
            }
          }}
          label={
            <div style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
              <Text style={{ marginRight: "auto" }}>Location</Text>
              <ActionIcon loading={context.loading} onClick={GetLocation}>
                <GpsIcon />
              </ActionIcon>
            </div>
          }
          description="Press button or set manual location"
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}
        >
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
            <Popover.Dropdown>
              {locations &&
                locations.map((d) => (
                  <div
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
                    <Text>{d.description}</Text>
                    <Divider sx={{ width: "100%" }} my="sm" />
                  </div>
                ))}
            </Popover.Dropdown>
          </Popover>
        </Input.Wrapper>
        <Divider />
        <Input.Wrapper label="Distance" description="Specify how close the bars should be">
          <Slider
            disabled={!context.lat || !context.lng}
            value={distance}
            onChange={(val) => {
              setDistance(val);
            }}
            thumbSize={20}
            color="violet"
            defaultValue={0.5}
            step={distance > 0.5 ? 1 : 0.5}

            min={0.5}
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
    </MantineDrawer >
  );
};