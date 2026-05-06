import _ from "lodash";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";

const Question = (props) => {
  const { dataQuestion } = props;
  const { t } = useTranslation();
  // console.log(dataQuestion);

  const handleChangeCheckbox = (e, aId, qId) => {
    props.handleCheckBox(aId, qId);
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
              // console.log(val);
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
                    <Form.Check.Label>{val.description}</Form.Check.Label>
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
