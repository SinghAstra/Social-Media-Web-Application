import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import {
  PeopleAltOutlined,
  PersonOutline,
  SettingsOutlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-container h-screen">
      <ul className="flex flex-col gap-1 p-1">
        <li>
          <NavLink
            to={"/app/welcome"}
            className={({ isActive }) =>
              isActive
                ? "bg-blue-400 flex items-center gap-2 p-2 hover:bg-blue-300 cursor-pointer"
                : "flex items-center gap-2 p-2 hover:bg-blue-300 cursor-pointer"
            }
          >
            <HomeOutlinedIcon style={{ fontSize: 30 }} />
            <h2 className="text-xl ">Home</h2>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-blue-400 flex items-center gap-2 p-2 hover:bg-blue-300 cursor-pointer"
                : "flex items-center gap-2 p-2 hover:bg-blue-300 cursor-pointer"
            }
            to={"/app/add-post"}
          >
            <AddCircleOutlinedIcon style={{ fontSize: 30 }} />
            <h2 className="text-xl ">Add Post</h2>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/profile"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-400 flex items-center gap-2 p-2 hover:bg-blue-300 cursor-pointer"
                : "flex items-center gap-2 p-2 hover:bg-blue-300 cursor-pointer"
            }
          >
            <PersonOutline style={{ fontSize: 30 }} />
            <h2 className="text-xl ">Profile</h2>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-blue-400 flex items-center gap-2 p-2 hover:bg-blue-300 cursor-pointer"
                : "flex items-center gap-2 p-2 hover:bg-blue-300 cursor-pointer"
            }
            to="/app/friends"
          >
            <PeopleAltOutlined style={{ fontSize: 30 }} />
            <h2 className="text-xl ">Friends</h2>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-blue-400 flex items-center gap-2 p-2 hover:bg-blue-300 cursor-pointer"
                : "flex items-center gap-2 p-2 hover:bg-blue-300 cursor-pointer"
            }
            to="/app/settings"
          >
            <SettingsOutlined style={{ fontSize: 30 }} />
            <h2 className="text-xl ">Settings</h2>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
