import Vue from 'vue';
import Vuex from 'vuex';
import post from './modules/post';
import auth from './modules/auth';
import shared from './modules/shared';

Vue.use(Vuex);

export default new Vuex.Store({
	actions: {},
	mutations: {},
	state: {},
	getters: {},
	modules: {
		post,
		auth,
		shared
	}
});
