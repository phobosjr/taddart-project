<template>
  <div v-if="username" class="article-comment">
    <textarea v-model="comment" class="article-comment__text" maxlength="255"
              :placeholder="$t('article_comment_placeholder')"></textarea>
    <button class="article-comment__btn" @click="submit()" :disabled="!validate">{{
        $t('article_comment_btn_send_label')
      }}
    </button>
  </div>
  <div v-else class="article-comment-disconnected">
    <p>{{ $t('article_comment_text_login_label') }}</p>
    <button class="article-comment-disconnected__btn" @click="connect()">{{
        $t('article_comment_btn_login_label')
      }}
    </button>
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
      user: 'user/userData',
      token: 'user/token',
    }),
    validate() {
      return this.comment.split(' ').join('') !== ''
    },
    username() {
      return this.user?.username;
    }
  },
  methods: {
    submit() {
      this.$axios.$post(`${this.$config.clientSide.strapiBackendUrl}/article-comments`,
        {
          comment: this.comment,
          article: this.articleId
        },
        {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        }).then((res) => {
        this.$store.dispatch('articleComments/add', {
          comment: res?.comment,
          created_at: res?.created_at,
          user: {
            username: res?.users_permissions_user?.username
          }
        })
        this.comment = '';
      })
    },
    connect() {
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
  align-items: flex-end;

  &__text {
    height: 120px;
    width: 100%;
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
    border-radius: 10px;

    &[disabled] {
      background-color: #7b7e85;
    }
  }
}

.article-comment-disconnected {
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

</style>
