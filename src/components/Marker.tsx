import React, { useContext } from "react";

import { Context } from "../App";
import { IContext } from "../interface/interface";

export const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const context: IContext = useContext(Context);
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker(options));
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
      marker.addListener("click", () => {
        context.setOpened(!context.opened);
      });
    }
  }, [marker, options]);

  return null;
};
