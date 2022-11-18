import React from "react";
import PropTypes from "prop-types";
import Sidebar from "./components/Sidebar";
import TopbarUser from "./components/TopbarUser";
import Footer from "./components/Footer";
import Logout from "./components/Logout";

const LayoutUser = (props) => {
  const { children } = props;
  return (
    <div id="wrapper">
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopbarUser />
          <div className="d-flex flex-row">
            <div className="flex">
              <Sidebar />
            </div>
            <div className="col align-self-center">{children}</div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

LayoutUser.propTypes = { children: PropTypes.node };

export default LayoutUser;
