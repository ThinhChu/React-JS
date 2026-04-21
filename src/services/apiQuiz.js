import axios from "../utils/axiosCustomize";

const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};

const postSubmitQuiz = (data) => {
  return axios.post("api/v1/quiz-submit", { ...data });
};

const postCreateQuiz = (nameQuiz, descriptionQuiz, typeQuiz, thumbnailQuiz) => {
  const data = new FormData();
  data.append("name", nameQuiz);
  data.append("description", descriptionQuiz);
  data.append("difficulty", typeQuiz);
  data.append("quizImage", thumbnailQuiz);
  return axios.post("api/v1/quiz", data);
};

export { getQuizByUser, postSubmitQuiz, postCreateQuiz };
