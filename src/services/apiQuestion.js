import axios from "../utils/axiosCustomize";

const getDetailQuestionByQuizId = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postCreateQuestion = (quiz_id, description, questionImage) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return axios.post("api/v1/question", data);
};

export { getDetailQuestionByQuizId, postCreateQuestion };
