import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <nav
      style={{ backgroundColor: "#dbf4fb" }}
      className="flex navbar navbar-dark"
    >
      <div className="container">
        <div
          style={{
            display: "flex",

            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#2c9cdb"
            className="bi bi-plus-square-fill d-inline"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
          </svg>
          <Link to="/" style={{ textDecoration: "none" }}>
            <a
              style={{
                marginLeft: 10,
                color: "#2c9cdb",
              }}
              className="navbar-brand"
            >
              <h1>Med.Id</h1>
            </a>
          </Link>
        </div>
        <div>
          <form class="form-inline">
            <input
              class="form-control border-end-0 border rounded-pill"
              type="search"
              placeholder="Cari Dokter atau Faskes"
              id="example-search-input"
              size="80"
            />
            <span class="input-group-append">
              <button
                class="btn btn-primary border-bottom-0 border rounded-pill ms-n5"
                type="button"
              >
                <i class="fa fa-search"></i>
              </button>
            </span>
          </form>
        </div>
        <div className="justify-content-end">
          <div
            className="rounded-pill px-3"
            style={{
              backgroundColor: "#0d6efd ",
              border: "solid 1px #333",
              float: "left",
              textAlign: "center",
              padding: "5px",
            }}
          >
            <i class="fa fa-user"></i>
            <span>Halo, user!</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
