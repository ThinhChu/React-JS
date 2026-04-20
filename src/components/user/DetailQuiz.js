import { useParams } from "react-router";
import { getDetailQuestionByQuizId } from "../../services/apiQuestion";
import { useEffect } from "react";
import _ from "lodash";

const DetailQuiz = () => {
  let params = useParams();
  const quizId = params.id;

  useEffect(() => {
    getDetailQuestionQuiz();
  }, [quizId]);

  const getDetailQuestionQuiz = async () => {
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
            answers.push(item.answers);
          });
          return { questionId, questionDescription, questionImage, answers };
        })
        .value();
      console.log(dataNew);
    }
  };

  return (
    <>
      <div>Detail Quiz {params.id}</div>
    </>
  );
};

export default DetailQuiz;
