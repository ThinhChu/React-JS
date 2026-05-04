import "../../assets/scss/rightContentQuiz.scss";
import TimeOut from "./TimeOut";
const RightContentQuiz = (props) => {
  const { dataQuiz } = props;
  const timeUp = () => {
    props.handleFinishQuiz();
  }
  return (
    <div className="countdown-container">
      <div className="time-quiz"><TimeOut timeUp={timeUp} /></div>
      <div className="list-quiz-container">
        {dataQuiz.map((item, key) => {
          return <div key={`quiz-key-`,+key + 1} className="item-quiz">{+key + 1}</div>;
        })}
      </div>
    </div>
  );
};

export default RightContentQuiz;
