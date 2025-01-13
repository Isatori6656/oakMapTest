import type { LatLngTuple } from "leaflet";

export interface distancePayload {
  start: string;
  end: string;
}

export interface distancebody {
  lat: number;
  lng: number;
}

export interface polygonPayload {
  directory: string;
}

export interface polygonProperties {
  TxtMemo: string;
  SHAPE_Area: number;
  分區: string;
}

export interface polygonGeometry {
  type: string;
  coordinates: LatLngTuple[][];
}

export interface polygonFeatures {
  type: string;
  properties: polygonProperties;
  geometry: polygonGeometry;
}

export interface renewPlace {
  id: number;
  stop_name: string;
  name: string;
  longitude: number;
  latitude: number;
  radius: number;
  is_tod: number;
  distance: number;
}
