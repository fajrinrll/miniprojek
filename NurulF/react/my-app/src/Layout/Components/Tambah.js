import axios from "axios";
import React, { useState } from "react";
import { Form, Toast, ToastContainer } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";




const TAMBAH_URL = "http://localhost/api/v1/addtindakan";
const Tambah = () => {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [showSukses, setShowSukses] = useState(false);
  const [showSudahAda, setShowSudahAda] = useState(false);
  const [toast, setToast] = useState(false);
  const [errors,setErrors]=useState({})
  
  
  const [tindakan, setTindakan] = useState("");
  const handleShowSukses = () => setShowSukses(true);
  const handleCloseSukses = () => setShowSukses(false);

  const handleShowSudahAda = () => setShowSudahAda(true);
  const handleCloseSudahAda= () => setShowSudahAda(false);

 
  const handleTindakan=(event)=>{
    setTindakan(event.target.value)
  }
  const id_dokter = 1;


  const data = JSON.stringify({
    dokter_id: parseInt(id_dokter),
    tindakan: tindakan,
  });

  let Tambah = async (e) => {
    e.preventDefault();
    try {
       if (tindakan === "") {
        setErrors({...errors,tindakan:"Field Nama Tindakan Wajib Diisi"})
      } else {
        axios
          .post(TAMBAH_URL, data)
          .then((result) => {
            console.log(result.data)
            if (!result.data.Status){ 
              handleClose();
              handleShowSudahAda();
              handleClose();
              setMsg(result.data.Tindakan.Text)
              setToast(true)
              // reload()
            }else{
              handleClose()
              handleShowSukses();
              handleClose();
                setMsg(result.data.Tindakan.Text)
              setToast(true)
            }
           
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setShow(false)
   // setDokterId("")
    setTindakan("")
    setErrors({})};
  const handleShow = () => setShow(true);
  return (
    <>
      <Button  type="button"
        className="btn btn-primary rounded-circle float-end"
        onClick={handleShow}>
       
            <i className="fa fa-plus plus-circle"></i>
         
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">TAMBAH TINDAKAN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* <Form.Group className="mb-3" controlId="formDokterId">
              <Form.Label>ID Dokter*</Form.Label>
              <Form.Control
                type="text"
                size="md"
                value={dokter_id}
                onChange={handleId}
                isInvalid={!!errors.dokter_id}
              />
               <Form.Control.Feedback type="invalid">{errors.dokter_id}</Form.Control.Feedback>
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formTindakan">
              <Form.Label>Tindakan*</Form.Label>
              <Form.Control
                type="text"
                size="md"
                value={tindakan}
                onChange={handleTindakan}
                isInvalid={!!errors.tindakan}
              />
              <Form.Control.Feedback type="invalid">{errors.tindakan}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            size="md"
            className="mb-4"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            type="submit"
            className="mb-4"
            onClick={Tambah}
          >
            Tambah
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <ToastContainer className="p-10" position="top-center">
      <Toast onClose={() => setToast(false)} show={toast} >
      <Toast.Header>
       
        <strong className="me-auto">Sukses
       
        </strong>
       
      </Toast.Header>
      <Toast.Body className="text-primary">{msg}</Toast.Body>
      </Toast>
      </ToastContainer> */}
      <Modal show={showSukses} onHide={handleCloseSukses}>
        <Modal.Header closeButton>
          <Modal.Title>Sukses</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div class="modal-body text-center simpan">
            <img src="assets/img/success.png" alt="" width="50" height="50" />
            <p> </p>
            <p>Tindakan Berhasil Ditambahkan</p>
          </div>
        </Modal.Body>
      </Modal>
      


      <Modal show={showSudahAda} onHide={handleCloseSudahAda}>
     <Modal.Body>
          <div class="modal-body text-center simpan">
            <img src="assets/img/sent.png" alt="" width="50" height="50" />
            <p> </p>
            <p>Nama tindakan sudah ada</p>
          </div>
        </Modal.Body>
      </Modal>

      
      
    </>
  );
};

export default Tambah;
