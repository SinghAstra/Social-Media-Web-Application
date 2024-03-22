import React, { useState } from "react";
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  EmailOutlined,
  PersonOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex h-screen font-mono items-center justify-center ">
      <div className="flex justify-center items-center w-1/2 h-4/5 flex-col p-4 gap-2">
        <div className="image-container w-4/5 p-4">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/signUp.svg`}
            alt="log-in"
          />
        </div>
        <form className="flex flex-col gap-4 w-2/3 items-center">
          <div className="relative w-full">
            <div
              className="absolute top-0 bottom-0 left-0 pl-3  
                  flex items-center  
                  pointer-events-none"
            >
              <PersonOutline />
            </div>
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent pl-10 pr-4 py-2 border rounded-lg w-full"
            />
          </div>
          <div className="relative w-full">
            <div
              className="absolute top-0 bottom-0 left-0 pl-3  
                  flex items-center  
                  pointer-events-none"
            >
              <EmailOutlined />
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
        <Link to={"/auth/log-in"} className=" flex justify-end w-2/3">
          <p className="hover:underline hover:to-blue-400 text-white cursor-pointer">
            Already a User ? Log In
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
