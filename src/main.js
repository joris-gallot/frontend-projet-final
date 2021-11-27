import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import api from "./services";
import store from "./store";
import "./style.css";

const app = createApp(App);

app.provide("api", api).use(store).use(router).mount("#app");
