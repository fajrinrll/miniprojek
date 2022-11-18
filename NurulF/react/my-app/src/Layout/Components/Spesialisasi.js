import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Toast, ToastContainer } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

import { faFileEdit } from "@fortawesome/free-solid-svg-icons";

const GETSPEC_URL = "http://localhost/api/v1/getspesialisasi";
const EDITSPEC_URL = "http://localhost/api/v1/editspesialisasi";
const Edit = (props) => {

  const id_dokter = 1;
  var data = props.value;
  const [show, setShow] = useState(false);
  const [toast, setToast] = useState(false);
  const [errors, setErrors] = useState({});
  const [spesialisasi, setSps] = useState([]);
  const [spesialisasid, setSpsD] = useState([]);
  const [Id_spesialisasi, setIdSps] = useState([]);

  const [showSukses, setShowSukses] = useState(false);
  const handleShowSukses = () => setShowSukses(true);
  const handleCloseSukses = () => {
    window.location.reload()
    setShowSukses(false)
    
  };


  const handleClose = () => {
    setShow(false);
    setErrors({});
    
  };
  const handleShow = () => setShow(true);

  const [IDS, setIds] = useState();
  const [msg, setMsg] = useState();

  const handleIds = (event) => {
    const val = setIds(event.target.value);
    if (val !== "") {
      setErrors({});
    }
  };

  // console.log(IDS)
  var modifiedby = 1;
  const obj = JSON.stringify({
    ids: parseInt(IDS),
    idt: parseInt(id_dokter),
    mspec: modifiedby,
  });

  const refresh = () => {
    axios
      .get(GETSPEC_URL + data)
      .then((result) => {
        setSps(result.data.Id_spesialisasi);
        setSps(result.data.spesialisasi);
        console.log(result.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
      axios
      .get("http://localhost/api/v1/getspesialisasi" )
      .then((res) => {
        setSps(res.data); 
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
      axios
      .get("http://localhost/api/v1/getspesialisasid" )
      .then((res) => {
        setSpsD(res.data); 
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Ubah = async (e) => {
    e.preventDefault();
    try {
      if (IDS === null) {
        setErrors({ ...errors, nama: "Field Spesialisasi Wajib Dipilih" });
      } else {
        axios
          .put(EDITSPEC_URL, obj)
          .then((res) => {
            console.log(res.data);
            console.log(obj)
            if (!res.data.Error) {
              handleClose();
              handleShowSukses(); 
              setMsg(res.data.Success);
              setToast(true);
              // reload()
            } else {
              handleClose()
             
                setMsg(res.data.Text);
             setToast(true);
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

  return (
    <>
       
      {spesialisasid !== null ? 
       <Button  type="button"
       className="btn btn-primary rounded-circle float-end"
       onClick={handleShow}>
      
      <i className="fa fa-pencil" onClick={handleShow} ></i>             

        
     </Button>
                : 
                <Button  type="button"
                   className="btn btn-primary rounded-circle float-end"
                   onClick={handleShow}>
                  
                       <i className="fa fa-plus plus-circle"></i>
                    
                 </Button> 
                }
      
      {/* <ToastContainer className="p-3" position="top-center">
        <Toast
          onClose={() => setToast(false)}
          show={toast}
          delay={3000}
          autohide
        >
          <Toast.Body>
            <h5>{msg}</h5>
          </Toast.Body>
        </Toast>
      </ToastContainer> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pilih Spesialisasi Anda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTindakan">
              <Form.Label>Spesialisasi*</Form.Label>

              <Form.Select
                type="text"
                size="md"
              
                onChange={handleIds}
                isInvalid={!!errors.ids}
              >
                <option>--Pilih--</option>
                {spesialisasi.map((option) => {
                  return (
                    <option
                      key={option.Id_spesialisasi }
                      value={option.Id_spesialisasi }
                    >
                      {option.spesialisasi}
                    </option>
                  );
                })}
              </Form.Select>
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
            Batal
          </Button>
          {spesialisasid !== null ? 
          <Button
            variant="primary"
            size="md"
            type="submit"
            className="mb-4"
            onClick={Ubah}
          >
            Ubah
          </Button> :  <Button
            variant="primary"
            size="md"
            type="submit"
            className="mb-4"
            onClick={Ubah}
          >
            Tambah
          </Button> }
        </Modal.Footer>
      </Modal>

      <Modal show={showSukses} onHide={handleCloseSukses}>
        <Modal.Header closeButton>
          <Modal.Title>Sukses</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div class="modal-body text-center simpan">
            <img src="assets/img/success.png" alt="" width="50" height="50" />
            <p> </p>
            <p>Spesialisasi berhasil diubah</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Edit;
