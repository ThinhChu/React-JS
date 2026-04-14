import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../../../assets/scss/modalUser.scss";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalUser = (props) => {
  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false);
    setUserName("");
    setRole("");
    setEmail("");
    setPassword("");
    setSelectedImage("");
    setPreviewUrl("");
  };

  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileImage = (event) => {
    // console.log(event.target.files[0]);
    if (event.target && event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
    } else {
      setPreviewUrl("");
      setSelectedImage("");
    }
  };

  const handleInputUserName = (event) => {
    // console.log(userName);
    setUserName(event.target.value);
  };

  const handleInputRole = (event) => {
    // console.log(event.target.value);
    setRole(event.target.value);
  };

  const handleInputEmail = (event) => {
    // console.log(event.target.value);
    setEmail(event.target.value);
  };

  const handleInputPassword = (event) => {
    // console.log(event.target.value);
    setPassword(event.target.value);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleCreateUser = async (event) => {
    // Validation
    const checkEmail = validateEmail(email);
    if (!checkEmail) {
      toast.error("Vui lòng kiểm tra lại mục email");
      return;
    }
    // Data
    const data = new FormData();
    data.append("username", userName);
    data.append("role", role);
    data.append("email", email);
    data.append("password", password);
    data.append("userImage", selectedImage);
    try {
      let res = await axios.post(
        "http://localhost:8081/api/v1/participant",
        data,
      );
      if (res.data.EC === 1) {
        toast.info(res.data.EM);
      } else {
        toast.success(res.data.EM);
        handleClose();
      }
    } catch (error) {
      console.log("check responsive >>", error);
    }
  };

  return (
    <>
      <Modal show={show} size={props.size} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  autoComplete="Username"
                  defaultValue={userName}
                  onChange={handleInputUserName}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Role</Form.Label>
                <Form.Select defaultValue={role} onChange={handleInputRole}>
                  <option>Choose...</option>
                  <option>Member</option>
                  <option>Admin</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={email}
                  placeholder="Enter email"
                  onChange={handleInputEmail}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  defaultValue={password}
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={handleInputPassword}
                />
              </Form.Group>
            </Row>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image thumbnail</Form.Label>
              <div className="mb-3 text-center preview-image">
                <Form.Control
                  type="file"
                  accept="image/*"
                  className="file-hidden"
                  onChange={handleFileImage}
                />
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    className="img-thumbnail"
                    alt="preview"
                    style={{ maxHeight: "200px" }}
                  />
                ) : (
                  <span>Upload image</span>
                )}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleCreateUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ModalUser;
