import videoHomePage from "../../assets/video/video-thumb.mp4";
import "../../assets/scss/homePage.scss";

const HomePage = (props) => {
  return (
    <div className="home-container">
      <div className="container d-flex">
        <div className="content-container col-6 d-flex flex-column justify-content-center">
          <h1 className="heading-1 mb-4">Home page trên Mac</h1>
          <span className="description-container mb-3">
            Backed by over a decade of experience, Typeform AI helps you build
            expertly-designed, best-practice forms proven to get more responses.
          </span>
          <button className="btn btn-dark w-fit">See plans</button>
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
