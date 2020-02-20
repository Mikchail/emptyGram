import httpServices from '@/utils/httpService';

//
// const params = Object.assign(
// 	{
// 		skip: 1,
// 		limit: 6
// 	});

export default {
  state: {
    posts: [],
    post: null,
    totalCount: 0,
    activePage: 1,
  },
  actions: {
    async fetchPosts({ commit, getters, dispatch }, params) {

      commit('clearError');
      commit('setLoading', true);
      try {
        const posts = await httpServices.get('/posts', { params });
        commit('setLoading', false);
        commit('updatePosts', posts)
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.response.data);
        throw error
      }
    },
    async addPost({ commit, dispatch }, data) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const posts = await httpServices.post("/posts", data);
        commit('setLoading', false);
        commit('updatePosts', posts)
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.response.data);
        throw error
      }
    },
    async deletePost({ commit, dispatch, getters }, id) {
      commit('clearError');
      commit('setLoading', true);
      let user = getters.getUser.email;
      let post = getters.onePostbyId(id).user.email;
      if (user === post) {
        commit('clearError');
        commit('setLoading', true);
        try {
          const posts = await httpServices.delete(`/posts/${id}`);
          commit('setLoading', false);
          commit('setSuccess', posts.data.success);
          commit('deletePost', id);

        } catch (error) {
          commit('setLoading', false);
          commit('setError', error.response.data.error);
          throw error
        }

      } else {
        commit('setError', 'это не ваш пост');

        commit('setLoading', false);

      }

    },
    async getPost({ commit, dispatch }, id) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const posts = await httpServices.get(`/posts/${id}`);

        commit('setLoading', false);
        dispatch('fetchPosts')
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.response.data);
        throw error
      }
    },
    // /posts/:postId/comments/:commentId
    async deleteComments({ commit, dispatch, getters }, {postId,commentId}) {
      console.log(postId,commentId)
      commit('clearError');
      commit('setLoading', true);
      let user = getters.getUser.email;
      let post = getters.onePostbyId(postId).user.email;
      if (user === post) {
        commit('clearError');
        commit('setLoading', true);
        try {
          const posts = await httpServices.delete(`/posts/${postId}/comments/${commentId}`);
          commit('setLoading', false);
          commit('setSuccess', posts.data.success);
          commit('deletePost', id);

        } catch (error) {
          commit('setLoading', false);
          commit('setError', error.response.data.error);
          throw error
        }

      } else {
        commit('setError', 'это не ваш пост');

        commit('setLoading', false);

      }

    },
    async addComment({ commit, dispatch }, { id, comment }) {
      commit('clearError');
      commit('setLoading', true);
      commit('clearError');
      commit('setLoading', true);
      try {
        const posts = await httpServices.post(`/posts/${id}/comments`, { comment });
        commit('setLoading', false);
        commit('addComment', { id, comments: posts.data.comments });
        console.log(posts)
      } catch (error) {
        console.log(error)
        commit('setLoading', false);
        if (error.response) {
          commit('setError', error.response.data.error);
        }
        throw error
      }




    }
  },

  mutations: {
    updatePosts(state, posts) {
      state.posts = posts.data.posts;
      state.totalCount = +posts.headers['x-total-count'];
    },
    createPost(state, newPosts) {
      state.posts.unshift(newPosts);
    },
    deletePost(state, id) {
      const i = state.posts.findIndex(p => p._id === id);
      state.posts.splice(i, 1)
    },
    addComment(state, { id, comments }) {
      const i = state.posts.findIndex(p => p._id === id);
      state.posts[i].comments = [...comments]
    }
  },

  getters: {
    validPosts(state) {
      return state.posts.filter(p => {
        return p.title && p.body
      })
    },

    allPosts(state) {
      return state.posts;
    },
    getComments(state) {
      return (id) => {
        return state.posts.find(ad => {
          return ad._id === id
        }).comments;
      }
    },
    onePostbyId(state) {
      return (id) => {
        return state.posts.find(ad => {
          return ad._id === id
        });
      }
    },
    totalCount(state, getters) {
      return state.totalCount;
    }
  },

}
