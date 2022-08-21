import { ColorScheme } from "@mantine/core";

export interface IContext {
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map) => void;
  lat: number | undefined;
  setLat: (lat: number) => void;
  lng: number | undefined;
  startLat: number;
  startLng: number;
  setLng: (lng: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  opened: boolean;
  setOpened: (open: boolean) => void;
  distance: number;
  setDistance: (distnace: number) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  theme: ColorScheme;
  showing: "location" | "distance" | "roll";
  setShowing: (showing: "location" | "distance" | "roll") => void;
  name: string;
  setName: (name: string) => void;
  url?: string | null;
  setUrl: (url: string | undefined) => void;
  image?: string | null;
  setImage: (image: string) => void;
  placeId?: string;
  setPlaceId: (placeId: string | undefined) => void;
  rating?: number | null;
  setRating: (rating: number | undefined) => void;
  priceLevel?: number | null;
  setPriceLevel: (priceLevel: number | undefined) => void;
  barLat: number;
  setBarLat: (lat: number | undefined) => void;
  barLng: number;
  setBarLng: (lng: number | undefined) => void;
  showRollAgain: boolean;
  setShowRollAgain: (rollAgain: boolean) => void;
}

export interface IBarContext {}
