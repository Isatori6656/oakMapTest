"use client";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { LatLngTuple, Map, LeafletMouseEvent } from "leaflet";
import { useEffect, useState, useRef } from "react";
import { postXinbeiDistance, getXinbeiPolygon } from "@/api/oakServer";
import {
  distancePayload,
  distancebody,
  polygonFeatures,
  renewPlace,
} from "@/interface/city";
import PlaceColumn from "@/components/PlaceRows";
import SearchBar from "@/components/SearchBar";
import useThirdpartyStore from "@/zustandStore/thirdpartyStore";
import { getGoogleProfile } from "@/api/google";
import { getFacebookProfile } from "@/api/facebook";
import { useRouter } from "next/navigation";

interface thirdPartyUser {
  name: string;
  picture: string;
}

const Mapleaflet = () => {
  const router = useRouter();

  const accessToken = useThirdpartyStore((state) => state.accessToken);
  const thirdPartyType = useThirdpartyStore((state) => state.type);

  const [rows, setColumns] = useState<renewPlace[]>([]);
  const [polys, setPolys] = useState<polygonFeatures[]>([]);
  const [latlng, setLatlng] = useState<LatLngTuple>([24.993955, 121.504603]);
  const [popupUser, setPopupUser] = useState<thirdPartyUser>({
    name: "",
    picture: "",
  });
  const mapRef = useRef<Map>(null);
  const markRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (typeof window !== undefined && !mapRef.current) {
      //  initial map
      const map = L.map("map").setView([24.993955, 121.504603], 13);
      mapRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      function handleMapClick(e: LeafletMouseEvent) {
        const evtlatlng = e.latlng;
        setLatlng([evtlatlng.lat, evtlatlng.lng]);
      }
      map.on("click", (e) => handleMapClick(e));

      // get data from api

      const defaultPayload: distancePayload = {
        start: "25.0019,121.2982",
        end: "24.993955,121.504603",
      };
      const defaultBody: distancebody = {
        lat: 24.993955,
        lng: 121.504603,
      };

      const postDis = async () => {
        const data = await postXinbeiDistance(defaultPayload, defaultBody);
        setColumns(data);
      };

      postDis();

      async function getPolygon() {
        const payload = { directory: "tucheng.json" };
        const data: polygonFeatures[] = await getXinbeiPolygon(payload);
        setPolys(data);
      }
      getPolygon();
    }
  }, []);

  useEffect(() => {
    if (polys.length > 0) {
      polys.forEach((poly) => {
        const coordinates: LatLngTuple[] = poly.geometry.coordinates[0].map(
          (coor: LatLngTuple) => {
            const latlng: LatLngTuple = [coor[1], coor[0]];
            return latlng;
          }
        );
        if (!mapRef.current) return;
        L.polygon(coordinates).addTo(mapRef.current);
      });
    }
  }, [polys]);

  useEffect(() => {
    const defaultPayload: distancePayload = {
      start: "25.0019,121.2982",
      end: "24.993955,121.504603",
    };
    const body: distancebody = {
      lat: latlng[0],
      lng: latlng[1],
    };

    const postDis = async () => {
      const data = await postXinbeiDistance(defaultPayload, body);
      setColumns(data);
    };

    postDis();

    async function getPolygon() {
      const payload = { directory: "tucheng.json" };
      const data: polygonFeatures[] = await getXinbeiPolygon(payload);
      setPolys(data);
    }
    getPolygon();

    // mapRef.current?.setView(latlng);
  }, [latlng]);

  useEffect(() => {
    if (accessToken === "" || thirdPartyType === "") {
      router.push("/");
    }
    async function getProfile(thirdPartyType: string) {
      if (thirdPartyType === "facebook") {
        const data = await getFacebookProfile(accessToken);
        const popupUser = {
          name: data.name,
          picture: data.picture.data.url,
        };
        setPopupUser(popupUser);
      } else {
        const data = await getGoogleProfile(accessToken);
        const popupUser = {
          name: data.name,
          picture: data.picture,
        };
        setPopupUser(popupUser);
      }
    }

    getProfile(thirdPartyType);
  }, [accessToken, router, thirdPartyType]);

  useEffect(() => {
    if (popupUser.name && popupUser.picture && mapRef.current) {
      if (markRef.current) mapRef.current.removeLayer(markRef.current);

      const newMarker = L.marker(latlng)
        .addTo(mapRef.current)
        .bindPopup(
          `<div><img src=${popupUser.picture} alt=${popupUser.name} class="w-12 h-12 rounded-full"><p>${popupUser.name}</p></div>`
        )
        .openPopup();
      markRef.current = newMarker;
    }
  }, [popupUser, latlng]);

  return (
    <div className="w-full h-full">
      <div className="h-[50vh] w-full flex items-center justify-center">
        <div id="map" className="w-full h-full"></div>
      </div>
      <div className="w-full flex flex-col items-center justify-center pt-2">
        <SearchBar />
        <PlaceColumn rows={rows} />
      </div>
    </div>
  );
};

export default Mapleaflet;
