import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useTranslation } from "react-i18next";
import "../../assets/scss/profile.scss";
import { useState } from "react";
import {
  postChangePassword,
  postLogoutUser,
  postUpdateProfile,
} from "../../services/apiServiceUser";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogout, doUpdate } from "../../redux/action/userAction";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, setShow, size, account } = props;
  const [previewThumbnail, setPreviewThumbnail] = useState(
    `data:image/jpeg;base64, ${account.image}`,
  );
  const [thumbnail, setThumbnail] = useState();
  const [username, setUsername] = useState(account.username);
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const { t } = useTranslation();

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const result = reader.result;

        // 👉 bỏ prefix
        const base64 = result.split(",")[1];

        resolve(base64);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChangeImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setThumbnail(event.target.files[0]);
      setPreviewThumbnail(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmitUploadProfile = async () => {
    let res = await postUpdateProfile(username, thumbnail);

    if (res && res.EC === 0) {
      let image = thumbnail ? await fileToBase64(thumbnail) : "";
      let data = {
        DT: {
          username: username,
        },
      };
      if (image) {
        data.DT.image = image;
      }

      dispatch(doUpdate(data));
      toast.success(res.EM);
    }
  };

  const handleLogoutUser = async () => {
    const res = await postLogoutUser(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      dispatch(doLogout());
      navigate("/login");
    }
  };

  const handleSubmitChangePassword = async () => {
    let res = await postChangePassword(currentPassword, newPassword);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleLogoutUser();
      setShow(false);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Modal show={show} size={size} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("header.t-profile")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="box-tab-profile">
            <Tabs
              defaultActiveKey="profile"
              transition={false}
              id="noanim-tab-example"
              className="mb-3"
            >
              <Tab eventKey="profile" title={t("header.t-profile")}>
                <div className="box-profile">
                  <div className="image-thumbnail">
                    <label className="upload-image" htmlFor="upload-img">
                      <img src={previewThumbnail} alt="demo" />
                      <span className="hover-up-img">
                        + {t("admin.question.t-up-file")}
                      </span>
                      <Form.Control
                        type="file"
                        id="upload-img"
                        hidden
                        onChange={(event) => handleChangeImage(event)}
                      />
                    </label>
                  </div>
                  <div className="name-user">
                    <Form.Control
                      type="text"
                      defaultValue={account.username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleSubmitUploadProfile}>
                    {t("admin.user.t-save")}
                  </Button>
                </div>
              </Tab>
              <Tab eventKey="password" title={t("admin.user.t-password")}>
                <div className="box-change-password">
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>{t("header.t-current-ps")}</Form.Label>

                    <Form.Control
                      type="text"
                      defaultValue={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>{t("header.t-new-ps")}</Form.Label>

                    <Form.Control
                      type="text"
                      defaultValue={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button onClick={handleSubmitChangePassword}>
                    {t("admin.user.t-save")}
                  </Button>
                </div>
              </Tab>
              <Tab eventKey="history" title={t("header.t-history")}>
                Tab content for Contact
              </Tab>
            </Tabs>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("admin.user.t-close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Profile;
