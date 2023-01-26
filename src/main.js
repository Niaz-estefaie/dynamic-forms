import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Datepicker from "@vuepic/vue-datepicker";
import { VueDraggableNext } from "vue-draggable-next";
import "@vuepic/vue-datepicker/dist/main.css";

const app = createApp(App);

app.component("Datepicker", Datepicker);
app.component("Draggable", VueDraggableNext);

app.mount("#app");
