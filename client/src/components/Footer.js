import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black font-mono text-slate-400 py-2 px-4 w-full ">
      <h4>
        © 2024{" "}
        <Link to="https://github.com/SinghAstra" className="hover:underline">
          SinghAstra
        </Link>
      </h4>
    </div>
  );
};

export default Footer;
