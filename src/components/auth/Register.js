import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../assets/scss/loginPage.scss";
import { useState } from "react";
import { postRegisterUser } from "../../services/apiServiceUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await postRegisterUser(email, username, password);
    if (res.EC !== 0) {
      toast.info(res.EM);
    }
    if (res.EC === 0) {
      toast.success(res.EM);
      navigate("/login");
    }
  };

  return (
    <div className="login-container container d-flex flex-column justify-content-center">
      <div className="title-login">
        <h1>Register</h1>
      </div>
      <div className="description-login">
        Continue building forms, gathering responses, and automating your
        workflows.
      </div>
      <div className="form-login mt-3">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>User name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="abc..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="***"
              autoComplete="current-password"
            />
          </Form.Group>
          <Button variant="primary" onClick={handleRegister}>
            Register
          </Button>
        </Form>
      </div>
      <div className="forget-login mt-2">
        <span>Forget password</span>
      </div>
    </div>
  );
};

export default Register;
