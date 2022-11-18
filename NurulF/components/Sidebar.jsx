import { faGolang } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(219,244,251,1) 50%, rgba(135,219,247,1) 100%)",
      }}
      className="sidebar"
    >
      <div className="navbar justify-content-end mr-3">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className={`nav-menu-items sidebar sidebar-dark`}>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon} <span>{item.title}</span>
                </Link>
              </li>
            );
          })}

          {/* <div className="text-center d-none d-md-inline">
        <button
          className="rounded-circle border-0"
          id="sidebarToggle"
          type="button"
          onClick={this.toggleSidebar}
        />
      </div> */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
