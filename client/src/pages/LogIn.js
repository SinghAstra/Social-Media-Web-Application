import React, { useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex h-screen font-mono">
      <div className="flex-1 flex items-center justify-center">
        <div className="image-container w-2/3 h-2/3">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logIn.svg`}
            alt="log-in"
          />
        </div>
      </div>
      <div className="flex-1 justify-center items-center flex flex-col gap-4">
        <h1 className="text-2xl text-blue-400">Log In</h1>
        <form className="flex flex-col gap-4 w-1/2 h-2/3">
          <div className="relative w-full">
            <div
              className="absolute top-0 bottom-0 left-0 pl-3  
                    flex items-center  
                    pointer-events-none"
            >
              <EmailOutlinedIcon />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent pl-10 pr-4 py-2 border rounded-lg w-full"
            />
          </div>
          <div className="relative w-full">
            <div
              className="absolute top-0 bottom-0 right-0 pr-3  
                    flex items-center  
                    cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <VisibilityOffOutlined />
              ) : (
                <VisibilityOutlined />
              )}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-transparent pr-10 pl-4 py-2 border rounded-lg w-full"
            />
          </div>
          <button className="bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded w-full">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
