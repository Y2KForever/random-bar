import { showNotification } from "@mantine/notifications";
import React, { createContext, useContext, useEffect, useState } from "react";

import { Context } from "../App";
import { IContext } from "../interface/interface";

import { Button } from "./Button";

import { ReactComponent as ErrorIcon } from "../assets/icons/cross-circle.svg";

export const BarContext: any = createContext(null);

export const Dice = () => {
  const context: IContext = useContext(Context);

  if (!context) {
    return <></>;
  }

  const searchLocation = async () => {
    if (context.map && context.lat && context.lng && context.distance) {
      var service = new google.maps.places.PlacesService(context.map);
      var req = {
        location: new google.maps.LatLng(context.lat, context.lng),
        radius: context.distance * 1000,
        type: "bar",
        opennow: true,
        rankby: "distance",
      };
      service.nearbySearch(req, async (res, status, pagination) => {
        context.setLoading(true);
        if (status === "OK" && res && res.length > 0) {
          const random = Math.floor(0 + Math.random() * (res.length - +1));
          context.setName(res[random].name ?? "This place has no name, wtf");
          context.setUrl(res[random].website);
          context.setPlaceId(res[random].place_id);
          context.setRating(res[random].rating);
          context.setPriceLevel(res[random].price_level);
          const image = res[random].photos?.[0].getUrl();
          if (image) {
            context.setImage(image);
          } else {
            context.setImage("");
          }
          const placeId = res[random].place_id;
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
          var geocoder = new google.maps.Geocoder();
          geocoder.geocode(
            {
              placeId: res[random].place_id,
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
        } else if (status === "ZERO_RESULTS") {
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
      });
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
    // Clear previous markers?
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", marginTop: context.showRollAgain ? 0 : 10 }}>
      {context.showRollAgain && (
        <Button onClick={reset} style={{ marginTop: 0, marginLeft: "none" }}>
          Reset
        </Button>
      )}
      {context.showRollAgain ? (
        <Button onClick={searchLocation} style={{ marginTop: 0 }}>
          Roll again
        </Button>
      ) : (
        <Button
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
