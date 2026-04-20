import axios from "../utils/axiosCustomize";

const getDetailQuestionByQuizId = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

export { getDetailQuestionByQuizId };
