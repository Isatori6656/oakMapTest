"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useThirdpartyStore from "@/zustandStore/thirdpartyStore";

export default function GoogleLoginCallback() {
  const accessToken = useThirdpartyStore((state) => state.accessToken);
  const thirdPartyStore = useThirdpartyStore();
  const router = useRouter();

  useEffect(() => {
    if (window && window.location.hash && accessToken === "") {
      const hash = window.location.hash.substring(1).split("&");
      const accessToken = hash[0].split("=")[1];
      thirdPartyStore.init(accessToken, "google");
    }
  });

  useEffect(() => {
    if (thirdPartyStore.accessToken !== "" && router) {
      router.push("/mapleaflet");
    }
  }, [thirdPartyStore.accessToken, router]);

  return (
    <div className="flex h-full items-start justify-center min-h-screen py-2"></div>
  );
}
