import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <footer
        style={{
          backgroundColor: "#87dbf7",
        }}
        className="footer"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 h-100 text-center text-lg-end text-white my-auto">
              <ul className="list-inline mb-2">
                <li className="list-inline-item">
                  <a
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    href="#!"
                  >
                    About
                  </a>
                </li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item">
                  <a
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    href="#!"
                  >
                    Contact
                  </a>
                </li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item">
                  <a
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    href="#!"
                  >
                    Terms of Use
                  </a>
                </li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item">
                  <a
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    href="#!"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
              <p className="text-white small mb-4 mb-lg-0">
                &copy; Med Id 2022. All Rights Reserved.
              </p>
            </div>
            {/* <div className="col-lg-6 h-100 text-center text-lg-end my-auto">
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-4">
                  <a href="#!">
                    <i className="bi-facebook fs-3"></i>
                  </a>
                </li>
                <li className="list-inline-item me-4">
                  <a href="#!">
                    <i className="bi-twitter fs-3"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#!">
                    <i className="bi-instagram fs-3"></i>
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
