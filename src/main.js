import Vue from "vue";
import App from "./App.vue";

new Vue({
  mounted() {
    AOS.init();
  },
  render: h => h(App)
}).$mount("#app");
