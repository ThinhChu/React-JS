import "../../assets/scss/rightContentQuiz.scss";
import TimeOut from "./TimeOut";
const RightContentQuiz = (props) => {
  const { dataQuiz, numberQuestion, handleChangeQuestion } = props;
  const timeUp = () => {
    props.handleFinishQuiz();
  }
  
  return (
    <div className="countdown-container">
      <div className="time-quiz"><TimeOut timeUp={timeUp} /></div>
      <div className="list-quiz-container">
        {dataQuiz.map((item, key) => {
          let number = +key + 1;
          return <div key={`quiz-key-`,number} onClick={() => handleChangeQuestion(key)} className={numberQuestion === key ? "item-quiz active" : "item-quiz"}>{number}</div>;
        })}
      </div>
    </div>
  );
};

export default RightContentQuiz;
