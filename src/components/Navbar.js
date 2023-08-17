import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white border-gray-200 mx-2 px-2 py-2.5 rounded dark:bg-gray-800">
      <div className="container flex justify-between mx-auto pt-3">
        <div className="text-2xl font-extrabold">Welcome</div>
        <button
          className="text-sm px-4 uppercase font-bold rounded-md bg-red-300"
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
