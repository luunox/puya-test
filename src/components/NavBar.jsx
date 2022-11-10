/** @format */

import { NavLink } from "react-router-dom";

const NavBar = () => {
  const routes = [
    { path: "/", name: "Home" },
    { path: "/upload", name: "Upload" },
    { path: "/employees", name: "Employees" },
  ];

  return (
    <div id="nav-bar">
      {routes.map((val) => (
        <NavLink key={val.path} to={val.path} className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")}>
          {val.name}
        </NavLink>
      ))}
    </div>
  );
};

export default NavBar;
