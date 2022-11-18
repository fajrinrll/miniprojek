import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

const Topbar = () => {
  const [show, setShow] = useState(false);
  const [showDaftar, setShowDaftar] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleShowDaftar = () => setShowDaftar(true);
  const handleCloseDaftar = () => setShowDaftar(false);
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
        <div className="justify-content-start">
          <form class="form-inline search">
            <input
              class="form-control border-end-0 border rounded-pill"
              type="search"
              placeholder="Cari Dokter atau Faskes"
              id="example-search-input"
              size="30"
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
          <Button
            className="click"
            style={{ marginRight: 20 }}
            variant="outline-primary"
            value="Daftar"
            as="input"
            type="button"
            onClick={handleShowDaftar}
          ></Button>
          <Button variant="primary" onClick={handleShow}>
            Masuk
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Masuk</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control type="email" placeholder="E-mail" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group> */}
                <Button
                  style={{ marginLeft: "60%" }}
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  style={{ marginLeft: "5%" }}
                  variant="danger"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
          <Modal show={showDaftar} onHide={handleCloseDaftar}>
            <Modal.Header closeButton>
              <Modal.Title>Daftar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control type="email" placeholder="E-mail" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group> */}
                <Button
                  style={{ marginLeft: "60%" }}
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  style={{ marginLeft: "5%" }}
                  variant="danger"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
