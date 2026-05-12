import { useParams } from "react-router";
import { getDetailQuestionByQuizId } from "../../services/apiQuestion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../../assets/scss/detailQuiz.scss";
import Question from "./Question";
import { postSubmitQuiz } from "../../services/apiQuiz";
import ModalQuiz from "./ModalQuiz";
import RightContentQuiz from "./RightContentQuiz";
import { useTranslation } from "react-i18next";

const DetailQuiz = () => {
  let params = useParams();
  const quizId = params.id;
  const location = useLocation();
  // const image = location.state.image;
  const description = location.state.description;
  const [showResult, setShowResult] = useState(false);
  const [show, setShow] = useState(false);
  const [dataQuiz, setDataQuiz] = useState([]);
  const [dataSubmitQuiz, setDataSubmitQuiz] = useState([]);
  const [numberQuestion, setNumberQuestion] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    getDetailQuestionQuiz(quizId);
  }, [quizId]);

  const handleNextQuestion = () => {
    const nextNumberQuestion = +numberQuestion + 1;
    if (nextNumberQuestion >= dataQuiz.length) {
      alert("Đã hết question next");
    } else {
      setNumberQuestion(nextNumberQuestion);
    }
  };

  const handlePrevQuestion = () => {
    const prevNumberQuestion = +numberQuestion - 1;
    if (prevNumberQuestion < 0) {
      alert("Đã hết question prev");
    } else {
      setNumberQuestion(prevNumberQuestion);
    }
  };

  const handleChangeQuestion = (number) => {
    setNumberQuestion(number);
  };

  const getDetailQuestionQuiz = async (quizId) => {
    const res = await getDetailQuestionByQuizId(quizId);
    if (res && res.EC === 0) {
      let data = res.DT;
      let dataNew = _.chain(data)
        .groupBy("id")
        .map((value, key) => {
          let questionId = key;
          let questionDescription,
            questionImage = null;
          let answers = [];
          value.forEach((item, i) => {
            if (i === 0) {
              questionDescription = item.description;
              questionImage = item.image;
            }
            item.answers["isSelect"] = false;
            item.answers["isCorrect"] = false;
            answers.push(item.answers);
          });
          return { questionId, questionDescription, questionImage, answers };
        })
        .value();
      setDataQuiz(dataNew);
    }
  };

  const handleCheckBox = (aId, qId) => {
    // console.log(aId, qId);
    let dataQuizClone = _.cloneDeep(dataQuiz);

    let dataQuestion = dataQuizClone.find((item) => +item.questionId === +qId);

    dataQuestion.answers = dataQuestion.answers.map((val, i) => {
      if (val.id === aId) {
        return { ...val, isSelect: !val.isSelect };
      }
      return val;
    });
    setDataQuiz(dataQuizClone);
  };

  const handleFinishQuiz = async () => {
    const data = {
      quizId: quizId,
      answers: [],
    };
    let a = [];
    dataQuiz.forEach((item) => {
      let questionId = +item.questionId;
      let b = [];
      item.answers.forEach((item) => {
        if (item.isSelect === true) {
          b.push(item.id);
        }
      });
      a.push({ questionId: questionId, userAnswerId: b });
    });
    data.answers = a;
    let res = await postSubmitQuiz(data);
    if (res && res.EC === 0) {
      setShow(true);
      setDataSubmitQuiz(res.DT);
      setDataQuiz(handleSubmitDataQuiz(dataQuiz, res.DT.quizData));
    }
  };

  const handleSubmitDataQuiz = (dataQuizzes, dataSubmit) => {
    let dataQuizClone = _.cloneDeep(dataQuizzes);
    let dataCorrect = dataSubmit;
    let dataClone = dataQuizClone.map((item) => {
      let dataC = dataCorrect.find(
        (val) => +val.questionId === +item.questionId,
      )?.systemAnswers?.[0];

      item.answers = item.answers.map((v) => {
        if (+v.id === +dataC.id) {
          return { ...v, isCorrect: dataC.correct_answer };
        }
        return v;
      });
      return item;
    });
    return dataClone;
  };

  return (
    <>
      <div className="detail-quiz-container container mt-5">
        <Row>
          <Col sm={9}>
            <div className="q-container">
              <div className="q-title">
                {t("quiz.t-quiz") + " 1: " + description}
              </div>
              <hr />

              <div className="q-content">
                <Question
                  dataQuestion={
                    dataQuiz && dataQuiz[numberQuestion]
                      ? dataQuiz[numberQuestion]
                      : []
                  }
                  handleCheckBox={handleCheckBox}
                  showResult={showResult}
                />
              </div>
              <div className="q-footer">
                <Button
                  variant="outline-secondary"
                  onClick={handlePrevQuestion}
                >
                  {t("quiz.t-prev")}
                </Button>
                <Button className="mx-2" onClick={handleNextQuestion}>
                  {t("quiz.t-next")}
                </Button>

                <Button
                  variant="warning"
                  disabled={showResult ? "disabled" : ""}
                  onClick={handleFinishQuiz}
                >
                  {t("quiz.t-finish")}
                </Button>
              </div>
            </div>
          </Col>
          <Col sm={3}>
            <RightContentQuiz
              dataQuiz={dataQuiz}
              handleFinishQuiz={handleFinishQuiz}
              numberQuestion={numberQuestion}
              handleChangeQuestion={handleChangeQuestion}
            />
          </Col>
        </Row>
        <ModalQuiz
          show={show}
          dataSubmitQuiz={dataSubmitQuiz}
          data
          size="xl"
          setShow={setShow}
          setShowResult={setShowResult}
        />
      </div>
    </>
  );
};

export default DetailQuiz;
