import httpServices from "../../utils/httpService";

export default {
	state: {
		user: null,
	},
	actions: {
		async getUserData({commit, getters, dispatch}) {

			commit('clearError');
			commit('setLoading', true);
			try {
				const user = await httpServices.post("/user");
				commit('setLoading', false);
				commit('updateStatus', user.data.user)
			} catch (error) {
				commit('setLoading', false);
				commit('setError',  error.response.data);
				throw(error)
			}
		},

		async login({commit}, data) {
			commit('clearError');
			commit('setLoading', true);
			try {
				const user = await httpServices.post("/login", data);
				commit('setLoading', false);
				commit('updateStatus', user.data.user)
			} catch (error) {
				commit('setLoading', false);
				commit('setError',  error.response.data.error);
				throw(error)
			}
		},

		async registration({commit}, data) {
			commit('clearError');
			commit('setLoading', true);

			try {
				const user = await httpServices.post("/register", data);
				commit('updateStatus', user.data.user)
				commit('setLoading', false);
			} catch (error) {
				commit('setLoading', false);
				commit('setError', error.response.data.error);
				throw(error)
			}


		},
		async logout({commit, dispatch}) {
			commit('clearError');
			commit('setLoading', true);
			try {
        await httpServices.get("/logout");
        commit('updateStatus', null)
        commit('setLoading', false);
        
			} catch (error) {
        console.log(error);
				commit('setLoading', false);
				commit('setError', error);
				throw(error)
			}

		}
	},
	mutations: {
		updateStatus(state, user) {
			state.user = user;
		}
	},

	getters: {
		// getUser(state) {
		// 	return state.user !== null;
		// },
		getUser(state) {
			return state.user;
		}
	}
};
