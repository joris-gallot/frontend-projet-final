import axios from "axios";
import store from "../store";

export const authenticationApi = () => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_AUTHENTICATION_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (store.state.token) {
    api.defaults.headers.common.Authorization = `Bearer ${store.state.token}`;
  }

  return api;
};

export const questionApi = () => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_QUESTION_MS_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (store.state.token) {
    api.defaults.headers.common.Authorization = `Bearer ${store.state.token}`;
  }

  return api;
};

export const gameApi = () => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_GAME_MS_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (store.state.token) {
    api.defaults.headers.common.Authorization = `Bearer ${store.state.token}`;
  }

  return api;
};
