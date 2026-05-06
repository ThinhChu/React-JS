import Alert from "react-bootstrap/Alert";
import { useTranslation } from "react-i18next";

const NotFound = (props) => {
  const { t } = useTranslation();

  return (
    <Alert variant="success" className="mt-5 container">
      <Alert.Heading>{t("404.title")}</Alert.Heading>
      <p>{t("404.desc")}</p>
      <hr />
      <p className="mb-0">{t("404.desc-2")}</p>
    </Alert>
  );
};

export default NotFound;
