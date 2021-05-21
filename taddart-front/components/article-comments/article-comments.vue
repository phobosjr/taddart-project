<template>
  <div class="article-comments">
    <div class="article-comments__count"> {{ $t('comments_count_title_label') }} {{ comments.length }}</div>
    <div v-for="comment in comments" class="article-comments__row">
      <div class="article-comments__row__left">
        <img class="article-comments__row__left__img" src="~/assets/images/image_face_comment.jpg">
        <div class="article-comments__row__left__user"><strong>{{ comment.user.username }}</strong></div>
      </div>
      <div class="article-comments__row__right">
        <div class="article-comments__row__right__status">
          <span v-if="comment.commentStatus === 'waiting'" class="status">{{ $t('comment_status_waiting') }}</span>
          <span class="date">{{ comment.created_at | formatDate }}</span>
        </div>
        <p class="article-comments__row__right__comment">{{ comment.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "article-comments",
  props: {
    articleId: {type: String, required: true}
  },
  computed: {
    ...mapGetters({
      comments: 'articleComments/comments',
    })
  },
  async mounted() {
    if (process.client) {
      await this.$store.dispatch("articleComments/find-by-articleId", this.articleId);
    }
  }
}
</script>

<style lang="scss" scoped>
.article-comments {
  &__count {
    font-weight: bolder;
    margin: 10px 0;
  }

  &__row {
    display: flex;
    flex-direction: row;
    border-top: 1.5px solid $td-gray-61;
    border-radius: 5px;
    padding: 25px;
    max-width: 867px;

    @media screen and (max-width: 992px) {
      flex-direction: column;
      align-items: center;
    }

    &__left {
      width: 125px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 5px;

      &__img {
        max-width: 67px;
        margin-bottom: 10px;
      }

      &__user {
        color: $td-blue;
        font-size: 15px;
        word-break: break-all;
      }
    }

    &__right {
      width: calc(100% - 130px);
      @media screen and (max-width: 992px) {
        width: 100%;
      }

      &__status {
        font-size: 12px;
        text-align: right;
        margin: 2px;
        color: #7b7e85;

        .status {
          float: left;
        }

        .date {
          float: right;
        }
      }

      &__comment {
        color: black;
        padding: 25px;
        border-radius: 5px;
      }
    }
  }
}
</style>
