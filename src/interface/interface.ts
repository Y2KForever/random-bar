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
}
