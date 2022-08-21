import { showNotification } from "@mantine/notifications";
import React, { createContext, useContext } from "react";

import { Context } from "../App";
import { IContext } from "../interface/interface";

import { Button } from "./Button";

import { ReactComponent as ErrorIcon } from "../assets/icons/cross-circle.svg";

export const Dice = () => {
  const context: IContext = useContext(Context);

  if (!context) {
    return <></>;
  }

  const getLocations = async () => {
    return new Promise<any[]>((resolve, reject) => {
      if (context.locationList.length === 0) {
        const locations: any[] = [];
        if (context.map && context.lat && context.lng && context.distance) {
          const service = new google.maps.places.PlacesService(context.map);
          const req = {
            location: new google.maps.LatLng(context.lat, context.lng),
            radius: context.distance * 1000,
            type: "bar",
            open_now: "true",
            rankby: "distance",
          };
          service.nearbySearch(req, async (res, status, pagination) => {
            if (status === "OK" && res && res.length > 0) {
              for await (const location of res) {
                locations.push(location);
              }
              if (pagination && pagination.hasNextPage) {
                pagination.nextPage();
              } else {
                context.setLocationList(locations);
                resolve(locations);
              }
            } else if (status === "ZERO_RESULTS") {
              reject("ZERO_RESULTS");
            } else {
              reject("UNKOWN_ERROR");
            }
          });
        }
      } else {
        resolve(context.locationList);
      }
    });
  };

  const searchLocation = async () => {
    try {
      if (context.map) {
        context.setLoading(true);
        const service = new google.maps.places.PlacesService(context.map);
        const locations = await getLocations();
        const random = Math.floor(0 + Math.random() * (locations.length - +1));
        context.setName(locations[random].name ?? "This place has no name, wtf");
        context.setUrl(locations[random].website);
        context.setPlaceId(locations[random].place_id);
        context.setRating(locations[random].rating);
        context.setPriceLevel(locations[random].price_level);
        const image = locations[random].photos?.[0].getUrl();
        if (image) {
          context.setImage(image);
        } else {
          context.setImage("");
        }
        const placeId = locations[random].place_id;
        if (placeId) {
          service.getDetails(
            {
              placeId: placeId,
            },
            (res, status) => {
              if (status === "OK" && res) {
                context.setUrl(res.website);
              }
            },
          );
        }
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          {
            placeId: locations[random].place_id,
          },
          (res, status) => {
            if (status === "OK" && res && res.length > 0) {
              context.setBarLat(res[0].geometry.location.lat());
              context.setBarLng(res[0].geometry.location.lng());
              if (context.map) {
                context.map.setCenter({
                  lat: res[0].geometry.location.lat(),
                  lng: res[0].geometry.location.lng(),
                });
              }
            }
          },
        );
        context.setOpened(true);
        context.setLoading(false);
      }
    } catch (e) {
      if (e === "ZERO_RESULTS") {
        showNotification({
          title: "WTF",
          message: "No bar found nearby, do you live in the woods? 😐",
          color: "pink",
          icon: <ErrorIcon style={{ transform: "scale(1.4)" }} />,
          radius: "lg",
        });
      } else {
        showNotification({
          title: "Error",
          message: "Something went wrong",
          color: "pink",
          icon: <ErrorIcon style={{ transform: "scale(1.4)" }} />,
          radius: "lg",
        });
      }
      context.setLoading(false);
    }
  };

  const reset = () => {
    context.setLoading(true);
    context.setOpened(false);
    context.setLat(context.startLat);
    context.setLng(context.startLng);
    context.setBarLat(undefined);
    context.setBarLng(undefined);
    if (context.map) {
      context.map.setCenter({
        lat: context.startLat,
        lng: context.startLng,
      });
    }
    context.setShowing("location");
    context.setLoading(false);
    context.setShowRollAgain(false);
    context.setDistance(0.5);
    context.setLocationList([]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", marginTop: context.showRollAgain ? 0 : 10 }}>
      {context.showRollAgain && (
        <Button disabled={context.loading} onClick={reset} style={{ marginTop: 0, marginLeft: "none" }}>
          Reset
        </Button>
      )}
      {context.showRollAgain ? (
        <Button disabled={context.loading} onClick={searchLocation} style={{ marginTop: 0 }}>
          Roll again
        </Button>
      ) : (
        <Button
          disabled={context.loading}
          onClick={() => {
            context.setShowRollAgain(true);
            searchLocation();
          }}
          style={{ marginTop: 0 }}
        >
          Roll the dice
        </Button>
      )}
    </div>
  );
};
