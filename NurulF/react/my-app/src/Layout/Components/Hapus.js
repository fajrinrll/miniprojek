import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Toast, ToastContainer } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const DELETETINDAKAN_URL = "http://localhost/api/v1/deletetindakan";
const GETALLTINDAKAN_URL = "http://localhost/api/v1/getdoktertindakan/";
const Hapus = (props) => {
  var data = props.value;
  var name = props.name;

  // console.log(data)
  const [show, setShow] = useState(false);
  const [nametindakan, setNameTindakan] = useState("");
  const [msg, setMsg] = useState("");

  const [toast, setToast] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showSukses, setShowSukses] = useState(false);
  const handleShowSukses = () => setShowSukses(true);
  const handleCloseSukses = () => setShowSukses(false);

 

  // const reload = () => {
  //   const interval = setInterval(() => {
  //     /*
  //         Run a function or set any state here
  //     */
  //     window.location.reload();
  //   }, 1600);
  //   return () => clearInterval(interval);
  // };
  var deleteTindakan = 3;

  const obj = JSON.stringify({
    idt: parseInt(data),
    del: deleteTindakan,
  });

  useEffect(() => {
    axios
      .get(GETALLTINDAKAN_URL + data)
      .then((result) => {
        // console.log(result.data)
        setNameTindakan(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const Delete = (e) => {
    e.preventDefault();
    try {
      axios
        .put(DELETETINDAKAN_URL, obj)
        .then((response) => {
          // console.log(response.data)
          if (response.data === "false") {
          
              handleShowSukses();
              handleClose();
            console.log(obj);
            console.log(response.data);
            setShow(false);
            setMsg("Data Berhasil Dihapus");
            setToast(true);
          }else{
            handleClose();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <i className="fa fa-close float-right ml-2 pt-1" onClick={handleShow}></i>
      {/* <ToastContainer className="p-3" position="top-center">
        <Toast onClose={() => setToast(false)} show={toast}>
        <Toast.Header>
       <strong >Sukses </strong>
     </Toast.Header>
          <Toast.Body>{msg}</Toast.Body>
        </Toast>
      </ToastContainer> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header   style={{ backgroundColor: "#DBF3FC" }}>
          <Modal.Title>Hapus Tindakan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>
              <p>
                Anda Setuju Untuk Menghapus Tindakan  <b>{name}?</b>
              </p>

            </Form.Label>
          </Form.Group>

          <div className="d-flex flex-row justify-content-center">
            <Button
              onClick={handleClose}
              className="btn btn-lg btn-outline-primary btn-light mr-4 px-4"
            >
              Tidak
            </Button>
            <Button
              className="btn btn-lg"
              variant="primary"
              type="submit"
              onClick={Delete}
            >
              Hapus
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showSukses} onHide={handleCloseSukses}>
        <Modal.Header closeButton>
          <Modal.Title>Sukses</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div class="modal-body text-center simpan">
            <img src="assets/img/success.png" alt="" width="50" height="50" />
            <p> </p>
            <p>Tindakan Berhasil Dihapus</p>
          </div>
        </Modal.Body>
      </Modal>
      
    </>
  );
};

export default Hapus;
