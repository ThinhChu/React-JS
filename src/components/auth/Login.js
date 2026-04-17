import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../assets/scss/loginPage.scss";

const Login = (props) => {
  return (
    <div className="login-container container d-flex flex-column justify-content-center">
      <div className="title-login">
        <h1>Login</h1>
      </div>
      <div className="description-login">
        Continue building forms, gathering responses, and automating your
        workflows.
      </div>
      <div className="form-login mt-3">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="***" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div className="forget-login mt-2">
        <span>Forget password</span>
      </div>
    </div>
  );
};

export default Login;
