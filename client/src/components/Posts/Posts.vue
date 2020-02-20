<template>
  <div class="posts">
    <router-link :to="'/post/'+post._id" tag="div" v-for="(post) in allPosts" :key="post._id" class="post">
        <div class="flex">
          <span>Aвтор:</span>

          <h5 v-if="post.user && post.user.name">{{post.user.name}}</h5>
            <h5 v-else>пользователь был удален</h5>
        </div>
       
        <h2>{{post.title}}</h2>

        <p class="post__desc" v-html="$options.filters.transformHtml(post.content)"></p>

    </router-link>

    <!--		<button @click="filterPosts">filter</button>-->
    <paginate
      :page-count="page"
      :page-range="3"
      :margin-pages="2"
      :click-handler="onPageChange"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    ></paginate>
  </div>
</template>


<script>
import Paginate from "vuejs-paginate";

const LIMIT = 3;
export default {
  data() {
    return {
      activePage: 1
    };
  },
  components: {
    Paginate
  },
  filters: {
    transformHtml(html) {
      var string = "";
      for (let i = 0; i < 100; i++) {
        if (!html[i]) {
          continue;
        }
        string += html[i];
      }
      if (string[string.length - 1] !== " ") {
      }
      return string + "...";
    }
  },
  computed: {
    allPosts() {
      return this.$store.getters.allPosts;
    },
    page() {
      return Math.round(this.$store.getters.totalCount / LIMIT +1 );
    }
  },
  methods: {
    onPageChange(activePage) {
      this.$store.dispatch("fetchPosts", {
        skip: (activePage - 1) * LIMIT,
        limit: LIMIT
      });
    },

   
  },

  // async mounted() {
  // 	this.$store.dispatch('fetchPosts', this.getQueryParams());
  //
  // },

  created() {
    this.$store.dispatch("fetchPosts", { skip: 0, limit: LIMIT });
  }
};
</script>

<style lang="scss">
.posts {
  max-width: 780px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}

.flex {
  display: flex;

  span {
    margin-right: 10px;
  }
}

.post {
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: box-shadow;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &:hover {
    box-shadow: 0px 7px 1px -2px rgba(0, 0, 0, 0.2),
      0px 6px 43px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }

  &__desc {
    max-width: 100%;
    overflow-wrap: break-word;
  }

  
}

.button-m {
  margin-top: auto;
}

.pagination {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;

  li {
    cursor: pointer;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #039be5;
      border-radius: 16px;
      padding: 5px;
      min-height: 15px;
      min-width: 40px;
      margin: 0 5px;
      transition: background-color 0.2s ease;
    }

    &:hover {
      a {
        background-color: #039be5;
        color: white;
      }
    }
    &.disabled {
      opacity: 0.5;
      a {
        background-color: transparent;
        color: black;
      }
    }
  }
}

.page-item {
  /*a {*/
  /*	display: flex;*/
  /*	align-items: center;*/
  /*	justify-content: center;*/
  /*	border: 1px solid #039be5;*/
  /*	border-radius: 16px;*/
  /*	padding: 5px;*/
  /*	min-height: 15px;*/
  /*	min-width: 40px;*/
  /*	margin: 0 5px;*/
  /*	transition: background-color 0.2s ease;*/
  /*}*/

  /*&:hover {*/
  /*	a {*/
  /*		background-color: #039be5;*/
  /*		color: white;*/
  /*	}*/

  /*}*/

  &.disabled {
    a {
      border: none;
    }

    &:hover {
      a {
        background-color: transparent;
      }
    }
  }
}
</style>
