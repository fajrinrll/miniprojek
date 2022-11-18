import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import { faFileEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Tambah from "./Tambah";
import Hapus from "./Hapus";
import UploadD from "./UploadD";
import Spesialisasi from "./Spesialisasi";
import { FaPlus } from "react-icons/fa";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { Breadcrumb } from "react-bootstrap";

//  import 'jquery/dist/jquery.min.js';
//  import $ from 'jquery';
const id_dokter = 1;
const t_doc_of = 1;
const TINDAKAN_URL = "http://localhost/api/v1/getdoktertindakan/" + id_dokter;
const DokSharedLayout = () => {
  const [tindakan, setTindakan] = useState([]);
  const [spesialisasi, setSps] = useState([]);
  const [spesialisasid, setSpsD] = useState([]);
  const [editspec, setEditS] = useState([]);
  const [post, setPost] = useState([]);
  const [post2, setPost2] = useState([]);
  const [post3, setPost3] = useState([]);
  const [post4, setPost4] = useState([]);
  const [show, setShow] = useState(false);

  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setShow(false);
    setErrors({});
  };
  const handleShow = () => setShow(true);

  const [rows, setRows] = useState([]);
  const rowsHandling = (event) => {
    setRows(event.target.value);
  };

  const getDataAxios = async (e) => {
    await axios.get(TINDAKAN_URL + e).then((res) => {
      setPost2(res.data);
    });
    return setPost2;
  };

  useEffect(() => {
    if (rows !== "") {
      getDataAxios(rows);
    } else {
      axios
        .get()
        .then((res) => {
          setTindakan(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  useEffect(() => {
    axios
      .get("http://localhost/api/v1/getdokterfoto/" + id_dokter)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost/api/v1/getdoktertindakan/" + id_dokter)
      .then((res) => {
        setPost2(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost/api/v1/getspesialisasi")
      .then((res) => {
        setSps(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost/api/v1/getspesialisasid")
      .then((res) => {
        setSpsD(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost/api/v1/editspesialisasi")
      .then((res) => {
        setEditS(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost/api/v1/getdokterRS/" + t_doc_of)
      .then((res) => {
        setPost3(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost/api/v1/getdokterpend/" + t_doc_of)
      .then((res) => {
        setPost4(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section>
      <Breadcrumb
        style={{ backgroundColor: "#C7EEFB" }}
        className="pt-3 pb-2 ps-5"
      >
        <Breadcrumb.Item href="/dashboard">Beranda</Breadcrumb.Item>
        <Breadcrumb.Item active>Profil</Breadcrumb.Item>
      </Breadcrumb>
      <Container className="py-5  bg-white mh-100 mw-100">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4   border border-5">
              <MDBCardBody className="text-center">
                <button
                  className="btn btn-link"
                  style={{ padding: 0 }}
                  onClick=""
                >
                  <div className="text-secondary mb-0 " width="10px">
                    <UploadD />
                  </div>

                  <img
                    key={post.ID}
                    src={"/assets/img/" + post.FOTO}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px", height: "150px" }}
                    fluid
                  />
                </button>
                <p className="text-muted mb-1" key={post.ID}>
                  {post.NAMA}
                </p>
                <p className="text-muted mb-4" key={post.ID}>
                  {post.SPESIALISASI}
                </p>
                <img
                  className="mx-auto d-block"
                  style={{ height: 20 }}
                  src="assets/img/star.png"
                  alt=""
                />
                <div className="d-flex justify-content-center mb-2"></div>
                <hr className="mb-0" />

                <div className="d-flex justify-content-between text-primary mt-3 ml-3">
                  Janji
                  <Badge className="justify-content-between" bg="secondary">
                    9
                  </Badge>
                </div>

                <hr className="mb-0 mt-0" />
                <Nav variant="pills" defaultactivekey="#first">
                  <Nav.Item>
                    <Nav.Link href="#first">Obrolan/Konsultasi</Nav.Link>
                  </Nav.Item>
                </Nav>
                <hr className="mt-0" />
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <Card.Header style={{ backgroundColor: "#DBF4FC" }}>
                  <Nav variant="pills" defaultactivekey="#first">
                    <h5 className="ml-4" style={{ color: "#47A6DF" }}>
                      Tentang Saya
                    </h5>
                  </Nav>
                </Card.Header>

                <h4 className="ml-4  mt-4" style={{ color: "#47A6DF" }}>
                  Tindakan Medis
                </h4>
                <p style={{ padding: 10 }}>
                  <div className="text">
                    <tbody>
                      <tr className="text-secondary">
                        <td className="col-md-6">
                          {post2.map((post2, index) => {
                            return (
                              <p className="ml-4 " key={index}>
                                {" "}
                                -{post2.tindakan}
                              </p>
                            );
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </div>
                </p>
                <h4 className="ml-4" style={{ color: "#47A6DF" }}>
                  Riwayat Praktek
                </h4>
                <p style={{ padding: 10 }}>
                  <div className="text">
                    <tbody>
                      <tr>
                        <td className="col-md-12">
                          <h5 className="ml-4 ">
                            {post3.rs}, {post3.lokasi}
                          </h5>
                        </td>
                      </tr>
                      <tr className="text-secondary">
                        <td className="col-md-6">
                          <p className="ml-4 ">{post3.spesialisasi_rs}</p>
                        </td>
                        <td className="col-md-6">
                          <p className="mr-4 ">
                            {post3.the_start}-{post3.the_last}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </div>
                </p>

                <h4 className="ml-4 " style={{ color: "#47A6DF" }}>
                  Pendidikan
                </h4>
                <p style={{ padding: 10 }}>
                  <div className="text">
                    {post4.map((post4, index) => {
                      return (
                        <tbody>
                          <tr>
                            <td className="col-md-12">
                              <h5 className="ml-4 " key={index}>
                                {" "}
                                {post4.institusi}{" "}
                              </h5>
                            </td>
                          </tr>
                          <tr className="text-secondary">
                            <td className="col-md-6">
                              <p className="ml-4 " key={index}>
                                {" "}
                                {post4.major}
                              </p>
                            </td>
                            <td className="col-md-6">
                              <p className="mr-4 " key={index}>
                                {post4.tahun}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </div>
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4 w-100 h-100 ">
              <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3 text-center nav-Item bg-white" 
                style={{ color: "#47A6DF" }} 
              >
                <Tab eventKey="Spesialisasi" className="" title="Spesialisasi"  >
                  <div className="tabs">
                    <div className="row ">
                      <div className="col-sm-8 nav-side ">
                       
                        <button
                          key={post.ID}
                          type="button"
                          className="btn button-xs mr-3 rounded-5 text-sm mt-3 text-primary bg-white" 
                        >
                          {spesialisasid !== null
                            ? spesialisasid.map((spesialisasid) => {
                                return (
                                  <tr className="text-center">
                                     <h5 className="ml-2" style={{ color: "#47A6DF" }}>
                                     {spesialisasid.spesialisasi}   </h5>
                                  </tr>
                                );
                              })
                            : "Anda belum menambahkan spesialisasi"}
                        </button>
                        <Spesialisasi value={editspec.ids} />
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="Tindakan" title="Tindakan">
                  <div className="tabs ">
                    <div className="row">
                      <div className="col-sm-8 nav-side ">
                        <Tambah className=" text-end" />
                        <div className="btn-toolbar pull-left ml-2">
                          {post2.map((post2, index) => {
                            return (
                              <button
                                key={index}
                                type="button"
                                className="btn button-xs mr-3 rounded-5 text-sm mt-3 text-primary"
                                style={{ backgroundColor: "#DBF3FC" }}
                              >
                                <Hapus
                                  value={post2.Id_tindakan}
                                  name={post2.tindakan}
                                />
                                {post2.tindakan}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="Aktivitas" title="Aktivitas">
                  <div className="tabs">
                    <div className="row">
                      <div className="col-sm-8 nav-side">
                        <h5>Aktivitas</h5>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="Konsultasi" title="Konsultasi">
                  <div className="tabs">
                    <div className="row">
                      <div className="col-sm-8 nav-side">
                        <h5>Konsultasi</h5>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="Pengaturan" title="Pengaturan">
                  <div className="tabs">
                    <div className="row">
                      <div className="col-sm-8 nav-side">
                        <h5>Pengaturan</h5>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </Container>
    </section>
  );
};

export default DokSharedLayout;
