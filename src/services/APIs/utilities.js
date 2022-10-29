import apiHandler from "../helper";

export const getLanguages = () => {
  return apiHandler("get", "/languages/", false, false);
};

export const setLanguage = (code) => {
  return apiHandler("get", `/set-language/${code}/`, false, false);
};

export const getCategoriess = () => {
  return apiHandler("get", "/categories/", true, false);
};

export const getSubCategoriess = ({ id }) => {
  return apiHandler("get", `/categories/${id}/sub_categories/`, true, false);
};

export const getAllSubCategoriess = () => {
  return apiHandler("get", `/offline/sub-categories/`, true, false);
};

export const getQuestions = ({ id }) => {
  return apiHandler("get", `/quiz/${id}/`, true, false);
};

export const getCategoryDetailss = ({ id }) => {
  return apiHandler("get", `/categories/${id}/`, true, false);
};

export const updateQuizAnswer = ({ id, data }) => {
  return apiHandler("post", `/quiz/answer-quiz/${id}/`, true, false, data);
};

export const finishQuizAnswer = ({ id, data }) => {
  return apiHandler("post", `/quiz/finish-quiz/${id}/`, true, false, data);
};

// export const finishQuizAnswerForBadgeImg = ({ id }) => {
//   return apiHandler("get", `/quiz/finish-quiz/${id}/`, true, false);
// };

export const remainingQuizCategories = () => {
  return apiHandler("get", `/categories/quiz/unfinished/`, true, false);
};

export const remainingQuizQuestions = ({ id }) => {
  return apiHandler("get", `/users/unfinished/${id}/quiz/`, true, false);
};

export const getAppUpdate = ({ id }) => {
  return apiHandler("get", `/devices/${id}/`, false, false);
};
