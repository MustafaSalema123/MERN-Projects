import React, { useContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import "./layout.scss";
import { AuthContext } from '../../context/AuthContext';


 function Layout() {
  return (
    <div className="layout">
    <div className="navbar">
      <Navbar />
    </div>
    <div className="content">
      <Outlet />
    </div>
  </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;
  else {
    return (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }
}

export { Layout, RequireAuth };