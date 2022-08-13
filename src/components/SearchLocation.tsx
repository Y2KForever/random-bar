import React, { useState, useEffect, useRef } from "react";
import { Input } from "@mantine/core";

import { ReactComponent as MapPinIcon } from "../assets/icons/pin-3.svg";

let autoComplete: any;

const loadScript = (url: any, callback: any) => {
  let script: any = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery: any, autoCompleteRef: any) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"], componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery: any) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
}

function SearchLocationInput() {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyCpX4I27e-tWIns8PRakXqkcPSqKuNPP1o&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  console.log("query", query);

  return (
    <Input.Wrapper
      label="Location"
      description="Enter starting location"
      style={{
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
      }}
    >
      <Input
        ref={autoCompleteRef}
        icon={<MapPinIcon />}
        onChange={event => setQuery(event.target.value)}
        value={query}
        variant="filled"
        radius="md"
      />
    </Input.Wrapper>
  );
}

export default SearchLocationInput;
