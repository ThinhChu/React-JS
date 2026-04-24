import axios from "../utils/axiosCustomize";

const postCreateQuestionByAnswers = (
  question_id,
  description,
  correct_answer,
) => {
  return axios.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};

export { postCreateQuestionByAnswers };
