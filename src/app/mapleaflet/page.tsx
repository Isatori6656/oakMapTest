"use client";

import dynamic from "next/dynamic";

export default function MapleafletPage() {
  const Mapleaflet = dynamic(() => import("@/components/Mapleaflet"), {
    ssr: false,
  });
  return (
    <div className="flex h-full items-start justify-center min-h-screen py-2">
      <Mapleaflet />
    </div>
  );
}
