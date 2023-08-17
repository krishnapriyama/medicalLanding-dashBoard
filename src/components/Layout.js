import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);


  return (
    <div className="flex flex-auto h-screen">
      <Sidebar />
      <div className="grow">
        <Navbar />
        <div className="m-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
