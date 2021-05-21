<template>
  <div class="article-comment">
    <div v-if="isAuthenticated" class="article-comment__connected">
    <textarea v-model="comment" class="article-comment__connected__text" maxlength="255"
              :placeholder="$t('article_comment_placeholder')"></textarea>
      <button class="article-comment__connected__btn" @click="submit()" :disabled="!validate">{{
          $t('article_comment_btn_send_label')
        }}
      </button>
    </div>

    <div v-else class="article-comment__disconnected">
      <p>{{ $t('article_comment_text_login_label') }}</p>
      <button class="article-comment__disconnected__btn" @click="showProvidersConnect()">{{
          $t('article_comment_btn_login_label')
        }}
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "article-comment",
  props: {
    articleId: {type: String, required: true}
  },
  data() {
    return {
      comment: ''
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'user/isAuthenticated',
    }),
    validate() {
      return this.comment.split(' ').join('') !== ''
    }
  },
  methods: {
    async submit() {
      await this.$store.dispatch("articleComments/add-comment", {
        comment: this.comment,
        article: this.articleId
      });
      this.comment = '';
    },
    showProvidersConnect() {
      this.$store.dispatch('providers/show');
    }
  }
}
</script>

<style lang="scss" scoped>
.article-comment {
  display: flex;
  flex-direction: column;
  border: 1.5px solid $td-gray-61;
  background-color: $td-gray-61;
  border-radius: 5px;
  padding: 25px;
  max-width: 867px;

  &__connected {
    overflow: hidden;

    &__text {
      height: 120px;
      min-width: 100%;
      max-height: 350px;
      min-height: 120px;
      background-color: white;
      margin-bottom: 10px;
      border-radius: 12px;
      padding: 10px;
    }

    &__btn {
      width: 100px;
      height: 50px;
      padding: 10px;
      background-color: $td-blue;
      color: white;
      font-size: 15px;
      border-radius: 10px;
      cursor: pointer;

      &:hover {
        background-color: transparent;
        border: 1px solid $td-blue;
        color: black;

      }

      &[disabled] {
        background-color: #7b7e85;
      }
    }
  }

  &__disconnected {
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    border: 1.5px solid $td-gray-61;
    border-radius: 5px;
    padding: 25px;
    max-width: 867px;
    align-items: center;

    &__btn {
      width: 150px;
      height: 50px;
      padding: 10px;
      background-color: $td-yellow;
      border: 1px solid $td-yellow;
      color: white;
      font-weight: bold;
      border-radius: 10px;

      &:hover {
        background-color: transparent;
        color: black;
      }
    }
  }

}

</style>
