import _ from "lodash";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import { TiTick } from "react-icons/ti";
import { IoIosClose } from "react-icons/io";
import "../../assets/scss/questions.scss";

const Question = (props) => {
  const { dataQuestion, showResult } = props;
  const { t } = useTranslation();

  const handleChangeCheckbox = (e, aId, qId) => {
    props.handleCheckBox(aId, qId);
  };

  const checkCurrent = (isCorrect) => {
    if (showResult) {
      if (isCorrect) {
        return (
          <div className="isCorrectTrue">
            <TiTick />
          </div>
        );
      } else {
        return (
          <div className="isCorrectFalse">
            <IoIosClose />
          </div>
        );
      }
    }
  };

  if (_.isEmpty(dataQuestion)) {
    return <></>;
  } else {
    return (
      <>
        <div className="q-img">
          <img
            width={`200`}
            alt="s"
            src={`data:image/jpeg;base64, ${dataQuestion.questionImage}`}
          />
        </div>
        <div className="title-q-by-quiz">
          {t("admin.dashboard.t-question")} {dataQuestion.questionId} :{" "}
          {dataQuestion.questionDescription}
        </div>
        <div className="list-item-q-by-quiz">
          {!_.isEmpty(dataQuestion.answers) &&
            dataQuestion.answers.map((val, key) => {
              // console.log(val.isCorrect);
              return (
                <div className="item-q-by-quiz" key={`question-${key}`}>
                  <Form.Check type={"checkbox"} id={`question-${key}`}>
                    <Form.Check.Input
                      type={"checkbox"}
                      checked={val.isSelect}
                      onChange={(e, aId, qId) =>
                        handleChangeCheckbox(e, val.id, dataQuestion.questionId)
                      }
                    />
                    <Form.Check.Label>
                      {val.description} {checkCurrent(val.isCorrect)}
                    </Form.Check.Label>
                  </Form.Check>
                </div>
              );
            })}
        </div>
      </>
    );
  }
};

export default Question;
