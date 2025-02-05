import React, { useEffect, useState } from 'react';
import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../assets/images/users/user4.jpg";
import probg from "../assets/images/bg/download.jpg";

const navigation = [
  {
    title: "Employees",
    href: "/Employee/table",
    icon: "bi bi-layout-split",
  },
  {
    title: "New Employee",
    href: "/Employee/forms",
    icon: "bi bi-textarea-resize",
  },
];

const Sidebar = () => {
  const [user, setUser] = useState({});
  const location = useLocation();

  useEffect(() => {
    // Retrieve and parse the user object from local storage
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []); // Empty dependency array ensures this runs only on mount

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  return (
    <div>
      <div className="d-flex align-items-center"></div>
      <div
        className="profilebg"
        style={{ background: `url(${probg}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <img src={'http://localhost:3500/api/employee/file_render?url='+user.profileUrl} alt="user" width="50" className="rounded-circle" />
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark text-white p-2 opacity-75">{user?.firstname || 'Admin'}</div>
      </div>
      <div className="p-3 mt-2">
        {user.firstname!=null ?'': (
          <Nav vertical className="sidebarNav">
            {navigation.map((navi, index) => (
              <NavItem key={index} className="sidenav-bg">
                <Link
                  to={navi.href}
                  className={
                    location.pathname === navi.href
                      ? "active nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </Link>
              </NavItem>
            ))}
          </Nav>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
