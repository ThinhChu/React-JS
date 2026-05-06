import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getQuizByUser } from "../../services/apiQuiz";
import "../../assets/scss/listQuiz.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ListQuiz = (props) => {
  const [arrQuiz, setArrQuiz] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  // Khởi tạo useEffect khi sử dụng API (này là chạy 1 lần khi load trang)
  useEffect(() => {
    getQuiz();
  }, []);

  // Khi làm với API lun để async await
  const getQuiz = async () => {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };

  return (
    <div className="list-quiz-container container mt-5">
      <Row>
        {arrQuiz &&
          arrQuiz.map((item, i) => {
            return (
              <Col key={`${i}-quiz`}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={`data:image/jpeg;base64, ${item.image}`}
                  />
                  <Card.Body>
                    <Card.Title>{t("quiz.t-quiz") + " - " + i + 1}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        navigate(`/quiz/${item.id}`, {
                          state: {
                            image: item.image,
                            description: item.description,
                          },
                        });
                      }}
                    >
                      {t("quiz.t-btn-s")}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default ListQuiz;
