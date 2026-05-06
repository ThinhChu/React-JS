import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../assets/scss/loginPage.scss";
import { useState } from "react";
import { postRegisterUser } from "../../services/apiServiceUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Register = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

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
        <h1>{t("register.t-register")}</h1>
      </div>
      <div className="description-login">{t("register.t-desc")}</div>
      <div className="form-login mt-3">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>{t("admin.user.t-user-table")}</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="abc..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>{t("login.t-account")}</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{t("admin.user.t-password")}</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="***"
              autoComplete="current-password"
            />
          </Form.Group>
          <Button variant="primary" onClick={handleRegister}>
            {t("register.t-register")}
          </Button>
        </Form>
      </div>
      <div className="forget-login mt-2">
        <span>{t("login.t-forget-password")}</span>
      </div>
    </div>
  );
};

export default Register;
