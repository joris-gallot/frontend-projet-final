import { questionApi } from "./api";

export default {
  getCategory() {
    return questionApi().get("category");
  },

  getQuestions(params) {
    return questionApi().get("questions", { params });
  },

  sendAnswers(gameId, answers) {
    return questionApi().post(`games/${gameId}/answers`, { answers });
  },
};
