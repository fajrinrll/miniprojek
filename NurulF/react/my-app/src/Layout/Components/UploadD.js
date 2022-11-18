import axios from "axios";
import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


function ModalUpload() {
  const [show, setShow] = useState(false);
  let id = 1;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [file, setFile] = useState();
  const [pesan, setPesan] = useState("");
  const [alert, setAlert] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const isValidFileUploaded = (file) => {
    const validExtensions = ["png", "jpeg", "jpg"];
    const fileExtension = file.type.split("/")[1];
    return validExtensions.includes(fileExtension);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidFileUploaded(file)) {
      setPesan("File Bukan Images");
      setAlert(true);
    } else {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user", id);
      axios.post("http://localhost/api/v1/uploaddokter", formData, id).then((res) => {
        console.log(res.data);
      });
      handleClose();
    }
    
  };

  return (
    <div>
      
     
     <i
                          className="fa fa-pencil"
                          style={{ marginLeft: "170px" }}
                          onClick={handleShow}
                        ></i>             



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Pilih Berkas Foto</Form.Label>
              <Form.Control type="file" onChange={handleChange} multiple />
              <Alert
                onClose={() => setAlert(false)}
                show={alert}
                variant="danger"
              >
                {pesan}
              </Alert>
            </Form.Group>
            <Button size="md" type="submit">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalUpload;
