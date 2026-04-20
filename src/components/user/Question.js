import _ from "lodash";
import Form from "react-bootstrap/Form";

const Question = (props) => {
  const { dataQuestion } = props;

  if (_.isEmpty(dataQuestion)) {
    return <></>;
  } else {
    return (
      <>
        <div className="title-q-by-quiz">
          Question {dataQuestion.questionId} :{" "}
          {dataQuestion.questionDescription}
        </div>
        <div className="list-item-q-by-quiz">
          {!_.isEmpty(dataQuestion.answers) &&
            dataQuestion.answers.map((val, key) => {
              return (
                <div className="item-q-by-quiz" key={`question-${key}`}>
                  <Form.Check type={"checkbox"} id={`question-${key}`}>
                    <Form.Check.Input type={"checkbox"} />
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
