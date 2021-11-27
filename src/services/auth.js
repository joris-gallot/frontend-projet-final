import { authenticationApi } from "./api";

export default {
  signin(body) {
    return authenticationApi().post("sign-in", body);
  },

  signup(body) {
    return authenticationApi().post("sign-up", body);
  },
};
