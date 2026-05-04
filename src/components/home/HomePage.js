import videoHomePage from "../../assets/video/video-thumb.mp4";
import "../../assets/scss/homePage.scss";
import { useTranslation } from "react-i18next";

const HomePage = (props) => {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <div className="container d-flex">
        <div className="content-container col-6 d-flex flex-column justify-content-center">
          <h1 className="heading-1 mb-4">{t("homepage.title")}</h1>
          <span className="description-container mb-3">
            {t("homepage.description")}
          </span>
          <button className="btn btn-dark w-fit">{t("homepage.button")}</button>
        </div>
        <div className="thumb-container col-6">
          <video autoPlay muted loop>
            <source src={videoHomePage} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
