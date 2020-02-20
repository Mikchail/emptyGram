import Vue from "vue";
import App from "./App.vue";
import VueCookies from "vue-cookies"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'intersection-observer' // Optional
import router from "@/router";
import store from "@/store";
import Vuelidate from 'vuelidate';


Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import style from './style.scss'

Vue.config.productionTip = false;
Vue.use(VueCookies);

Vue.use(Vuelidate);

new Vue({
	store,
	router,
	style,
	render: h => h(App)
}).$mount("#app");
