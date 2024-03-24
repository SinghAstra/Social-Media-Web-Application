import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-black text-white flex justify-start items-center p-4 shadow-xl">
      <div>
        <Link to={"/"}>
          <h1 className="text-blue-400 text-2xl">
            Social Media Web Application
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
