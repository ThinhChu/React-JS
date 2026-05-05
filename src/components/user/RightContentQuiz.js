import "../../assets/scss/rightContentQuiz.scss";
import TimeOut from "./TimeOut";
const RightContentQuiz = (props) => {
  const { dataQuiz, numberQuestion, handleChangeQuestion } = props;
  const timeUp = () => {
    props.handleFinishQuiz();
  };

  return (
    <div className="countdown-container">
      <div className="time-quiz">
        <TimeOut timeUp={timeUp} />
      </div>
      <div className="list-quiz-container">
        {dataQuiz.map((item, key) => {
          let check = item.answers.findIndex((item) => item.isSelect === true);
          let number = +key + 1;
          let classN = "item-quiz";
          if (check === 0) {
            classN += " isSelected";
          }
          if (numberQuestion === key) {
            classN += " active";
          }
          return (
            <div
              key={`quiz-key-${number}`}
              onClick={() => handleChangeQuestion(key)}
              className={classN}
            >
              {number}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightContentQuiz;
