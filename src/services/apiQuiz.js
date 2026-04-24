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

const getAllQuizForAdmin = () => {
  return axios.get("api/v1/quiz/all");
};

const deleteQuizById = (id) => {
  return axios.delete(`api/v1/quiz/${id}`);
};

const updateQuizById = (
  id,
  nameQuiz,
  descriptionQuiz,
  typeQuiz,
  thumbnailQuiz,
) => {
  const data = new FormData();
  data.append("id", id);
  data.append("name", nameQuiz);
  data.append("description", descriptionQuiz);
  data.append("difficulty", typeQuiz);
  if (thumbnailQuiz) {
    data.append("quizImage", thumbnailQuiz);
  }
  return axios.put("api/v1/quiz", data);
};

const getQuizById = (id) => {
  return axios.get(`api/v1/quiz/${id}`);
};

const postQuizAssignToUser = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", { quizId, userId });
};

const getQuizWithQuestionAnswer = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};

export {
  getQuizByUser,
  postSubmitQuiz,
  postCreateQuiz,
  getAllQuizForAdmin,
  deleteQuizById,
  updateQuizById,
  getQuizById,
  postQuizAssignToUser,
  getQuizWithQuestionAnswer,
};
