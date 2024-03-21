import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon: Icon, text, to }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "bg-blue-400 flex items-center gap-2 p-2 transition-colors duration-300 ease-in-out text-black cursor-pointer"
            : "flex items-center gap-2 p-2 transition-colors duration-300 ease-in-out hover:bg-blue-300 cursor-pointer"
        }
      >
        <Icon style={{ fontSize: 30 }} />
        <h2 className="text-xl ">{text}</h2>
      </NavLink>
    </li>
  );
};
export default SidebarItem;
