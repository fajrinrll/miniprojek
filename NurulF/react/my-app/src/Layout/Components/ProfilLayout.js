import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import { faFileEdit } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import { Breadcrumb } from "react-bootstrap";
import UploadP from "./UploadP";
//  import 'jquery/dist/jquery.min.js';
//  import $ from 'jquery';

const ProfilLayout = () => {
  const [post, setPost] = useState([]);
  const [post2, setPost2] = useState([]);

  const [nama, setNama] = useState("");
  const [ttl, setTtl] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/api/v1/getprofil/" + 4)
      .then((res) => {
        setPost(res.data);
        setNama(res.data.NAMA);
        setTtl(res.data.TTL);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost/api/v1/getprofil2/" + 4)
      .then((res) => {
        setPost2(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <>
      <Breadcrumb
        style={{ backgroundColor: "#C7EEFB" }}
        className="pt-3 pb-2 ps-5"
      >
        <Breadcrumb.Item href="/dashboard">Beranda</Breadcrumb.Item>
        <Breadcrumb.Item active>Profil</Breadcrumb.Item>
      </Breadcrumb>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-Items-center text-center p-3 py-5">
              <div className="row">
                <div className="row">
                  <div className="profile-img d-flex flex-column align-content-center">
                    <button
                      className="btn btn-link"
                      style={{ padding: 0 }}
                      onClick=""
                    >
                     
                      <div className="text-secondary mb-0 " width="10px">
                      <UploadP/>
                     
                      </div>

                      <img
                        key={post2.ID}
                        className="avatar rounded-circle"
                        width="150px"
                        src={"/assets/img/"+post2.FOTO}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <span className="font-weight-bold ">Platinum Member</span>
                <img
                  className="mx-auto d-block"
                  style={{ height: 20 }}
                  src="assets/img/star.png"
                  alt=""
                />
                <span className="text-black-50 text-center" key={post2.ID}>
                  Since {post2.SINCE}{" "}
                </span>
              </div>
            </div>
            <a className="nav-link" href="/">
              <span>Pasien</span>
            </a>
            <a className="nav-link" href="/">
              <span>Pembelian Obat</span>
            </a>
            <a className="nav-link" href="/">
              <span>Rencana Kedatangan</span>
            </a>
            <a className="nav-link" href="/">
              <span>Riwayat Chat Dokter</span>
            </a>
          </div>

          <div className="col-md-7 offset-md-2">
            <div className="p-3 py-5">
              {/* <Card className="weight 100%" style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body> */}

              <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3 text-center nav-Item"
              >
                <Tab id="content" eventKey="home" title="Profil">
                  <div className="tabs">
                    <div className="row">
                      <div className="col-sm-8 nav-side">
                        <h5>Data Pribadi</h5>
                      </div>
                      <div className="col-sm-4 nav-link">
                        <a className="nav-link" href="/">
                          <faFileEdit /> <p className="mb-1">Ubah</p>
                        </a>
                      </div>
                    </div>

                    <br />

                    <>
                      <div className="row" key={post.ID}>
                        <div className="col-sm-8">
                          <p className="mb-0">Nama Lengkap</p>
                        </div>
                        <br />
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{nama}</p>
                        </div>
                      </div>

                      <br />
                      <hr />
                      <br />
                      <div className="row" key={post.ID}>
                        <div className="col-sm-8">
                          <p className="mb-0">Tanggal Lahir</p>
                        </div>
                        <br />
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{ttl}</p>
                        </div>
                      </div>
                      <hr />
                      <br />
                      <div className="row" key={post.ID}>
                        <div className="col-sm-8">
                          <p className="mb-0">Nomor Handphone</p>
                        </div>
                        <br />
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{post.PHONE}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="col-sm-9">
                        <h5>Data Akun</h5>
                      </div>
                      <br />
                      <div className="row" key={post.ID}>
                        <div className="col-sm-8">
                          <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-4 nav-link">
                          <a className="nav-link" href="/">
                            <faedit /> <span className="mb-0">Ubah</span>
                          </a>
                        </div>

                        <br />
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{post.EMAIL}</p>
                        </div>
                      </div>
                      <hr />
                      <br />

                      <div className="row" key={post.ID}>
                        <div className="col-sm-8">
                          <p className="mb-0">Password</p>
                        </div>
                        <div className="col-sm-4 nav-link">
                          <a className="nav-link" href="/">
                            <p className="mb-0">Ubah</p>
                          </a>
                        </div>
                        <br />
                        <div className="col-sm-9" type="password">
                          <p className="text-muted mb-0">{post.PASSWORD}</p>
                        </div>
                      </div>
                      <hr />
                      <br />
                    </>
                  </div>
                </Tab>

                <Tab eventKey="profile" title="Alamat">
                  <div className="row" key={post.ID}>
                    <div className="col-sm-8">
                      <Dropdown>
                        <Dropdown.Toggle variant="primary" id="Dropdown-basic">
                          Label Alamat
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">Rumah</Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                            Kantor
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                      <p className="mb-0">JL...</p>
                    </div>
                    <br />
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{post.NAMA}</p>
                    </div>
                  </div>
                  <hr />
                  <br />
                </Tab>
                <Tab eventKey="contact" title="Pembayaran"></Tab>
              </Tabs>
              {/* </Card.Body>
    </Card> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilLayout;
