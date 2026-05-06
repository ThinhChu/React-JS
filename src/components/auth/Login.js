import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../assets/scss/loginPage.scss";
import { useState } from "react";
import { postLoginUser } from "../../services/apiServiceUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { useTranslation } from "react-i18next";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const handleLogin = async () => {
    const res = await postLoginUser(email, password);
    if (res.EC !== 0) {
      toast.info(res.EM);
    }
    if (res.EC === 0) {
      dispatch(doLogin(res));
      toast.success(res.EM);
      navigate("/");
    }
  };

  return (
    <div className="login-container container d-flex flex-column justify-content-center">
      <div className="title-login">
        <h1>{t("header.t-login")}</h1>
      </div>
      <div className="description-login">{t("login.t-desc")}</div>
      <div className="form-login mt-3">
        <Form>
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
          <Button variant="primary" onClick={handleLogin}>
            {t("header.t-login")}
          </Button>
        </Form>
      </div>
      <div className="forget-login mt-2">
        <span>{t("login.t-forget-password")}</span>
      </div>
    </div>
  );
};

export default Login;
