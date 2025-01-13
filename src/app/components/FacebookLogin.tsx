"use client";
import { facebookPayload } from "@/interface/facebook";
import qs from "qs";

const FacebookLogin = () => {
  const handleLogin = () => {
    const payload: facebookPayload = {
      client_id: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI,
      response_type: "token",
      state: "123456789",
    };

    window.location.href = `https://www.facebook.com/v21.0/dialog/oauth?${qs.stringify(
      payload
    )}`;
  };

  return (
    <div className="flex bg-blue">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleLogin()}
      >
        Facebook Login
      </button>
    </div>
  );
};

export default FacebookLogin;
