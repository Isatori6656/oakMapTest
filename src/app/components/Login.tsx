"use client";

import GoogleLogin from "@/components/GoogleLogin";
import FacebookLogin from "@/components/FacebookLogin";
const Login = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <h1>Please Login before using Mapleaf</h1>
      <div className="flex  w-full md:w-[80vw] min-h-[40vh]">
        <div className="flex border rounded border-cyan-300 w-full md:w-[80vw] min-h-[40vh] my-4 mx-4"></div>
      </div>
      <div className="flex justify-between w-full md:w-[50vw] p-4">
        <GoogleLogin />
        <FacebookLogin />
      </div>
    </div>
  );
};

export default Login;
