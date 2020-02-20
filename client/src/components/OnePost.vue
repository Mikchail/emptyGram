<template>
  <div>
    <div class="onepost">
      <div class="flex">
        <span>Aвтор:</span>
        <h5 v-if="post.user">{{post.user.name}}</h5>
      </div>
      <h2 class="onepost__title">{{post.title}}</h2>
      <div class="onepost__body" v-html="post.content"></div>
      <time>{{post.createdDate| getDate }}</time>
      <button
        v-if="getAuthorPost"
        type="button"
        aria-label="Close"
        class="close post__delete"
        @click="deletePost(post._id)"
      >×</button>
    </div>
    <!--	<pre>-->
    <!--			{{this.$store.getters.getComments(id)}}-->

    <!--				</pre>-->
    <div class="wrapper-comments">
      <div class="comments" v-for="(comment) in getComments" :key="comment._id">
        <div class="img-name" v-if="comment.user">
          <img :src="comment.user.avatar" alt class="com-avatar" />
        </div>
        <div class="img-name" v-else>
          <img src="../img/default.png" alt class="com-avatar" />
        </div>
        <p class="comment-body">{{comment.body }}</p>
        <div class="comments__data">
          <button
            v-if="getAuthorPost"
            type="button"
            aria-label="Close"
            class="close post__delete"
            @click="deleteComment(post._id,comment._id)"
          >×</button>
          <p v-if="post.user">Автор: {{post.user.name}}</p>
          <time>{{post.createdDate | getDate}}</time>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <!-- Like -->

      <form action @submit.prevent="addComment" class="form-comment">
        <b-form-textarea
          id="textarea"
          v-model="comment"
          placeholder="Здесь можно оставить комментарий..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        <b-button class="btn-comment" variant="outline-primary" type="submit">Оставить комментарий</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["id"],
  data() {
    return {
      comment: ""
    };
  },
  filters: {
    getDate(time) {
      const d = new Date(time);
      return moment(d).format("LL");
    }
  },
  computed: {
    post() {
      const id = this.id;
      return this.$store.getters.onePostbyId(id);
    },
    getComments() {
      return this.$store.getters.getComments(this.id);
    },
    getAuthorPost() {
      const userNow = this.$store.getters.getUser.email;
      let userAuthor;
      if (this.post.user) {
        userAuthor = this.post.user.email;
      }
      if (userNow === userAuthor) {
        return true;
      }
      return false;
    }
  },
  methods: {
    addComment(id) {
      this.$store.dispatch("addComment", {
        comment: this.comment,
        id: this.id
      });
    },
    deletePost(id) {
      this.$store.dispatch("deletePost", id);
    },
    deleteComment(postId,commentId){
        this.$store.dispatch('deleteComments',{postId,commentId});
    }
  }
};
</script>

<style lang="scss">
.comment-body {
  margin-left: 70px;
}
.com-avatar {
  display: block;
  height: 100%;
  max-width: 100px;
  width: 100%;
  border: 1px solid grey;
}
.img-name {
  min-height: 100px;
  max-width: 100px;
  width: 100%;
}
.post__delete {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
}
.form-comment {
  max-width: 500px;
  margin: 0 auto;
}
.wrapper-comments {
  max-width: 900px;
  width: 100%;
  margin: 20px auto 20px;
}
.comments {
  position: relative;
  max-width: 900px;
  width: 100%;
  display: flex;

  background-color: #ffffff;
  padding: 20px;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: box-shadow;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  margin: 5px auto;
  &__data {
    margin-left: auto;
  }
}
.onepost {
  position: relative;
  background-color: #ffffff;
  padding: 20px 40px;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: box-shadow;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &__title {
  }

  &__body {
  }
}
.btn-comment {
  width: 100%;
  max-width: 250px;
  display: block !important;
  margin-left: auto;
  margin-top: 20px;
}
</style>
