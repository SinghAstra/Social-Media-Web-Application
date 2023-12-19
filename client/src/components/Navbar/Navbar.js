import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {logOutUser} from '../../actions/auth'

const Navbar = () => {
  const location = useLocation()
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const dispatch = useDispatch();

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('user')))
  },[location])
  return (
    <div>
      {/* lg:bg-gray-800  sm:bg-green-500 md:bg-orange-500 xl:bg-red-500 */}
      <nav className="flex p-4 justify-between">
        <h2 className="text-2xl tracking-wide font-medium text-white">
          Social Media Application
        </h2>
        {user?
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>dispatch(logOutUser(setUser))}>Log Out</button>
        :<Link to="/auth"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In</button></Link>}
      </nav>
    </div>
  );
};

export default Navbar;
