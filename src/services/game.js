import { gameApi } from "./api";

export default {
  getHistory() {
    return gameApi().get("history");
  },
};
