"use client";

import { googlePayload } from "@/interface/google";
import qs from "qs";

const profileScope: string = "https://www.googleapis.com/auth/userinfo.profile";

const GoogleLogin = () => {
  const handleLogin = () => {
    const payload: googlePayload = {
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
      response_type: "token",
      scope: `${profileScope}`,
    };
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${qs.stringify(
      payload
    )}`;
  };

  return (
    <div className="flex bg-cyan-400">
      <button
        className="bg-cyan-400 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded w-full"
        onClick={() => handleLogin()}
      >
        Google Login
      </button>
    </div>
  );
};

export default GoogleLogin;
