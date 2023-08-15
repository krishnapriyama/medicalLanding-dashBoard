import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {

  const token = localStorage.getItem("accessToken")

  return (
    <div className="flex flex-auto h-screen">
      <Sidebar />
      <div className="grow">
        <Navbar />
        <div className="m-5">
          {token && <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
