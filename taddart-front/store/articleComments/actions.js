import articleCommentsQuery from "@/apollo/queries/article/article-comments";
import createArticleComments from "@/apollo/queries/article/create-article-comments.gql";

export default {
  async 'find-by-articleId'({commit, rootState}, articleId) {
    const headers = rootState.user.token ? {'Authorization': `Bearer ${rootState.user.token}`} : {}
    try {
      const result = await this.app.apolloProvider.clients.clientSideClient.query({
        query: articleCommentsQuery,
        variables: {
          article: articleId,
        },
        context: {
          headers
        }
      })
      commit('SET_COMMENTS', result.data.articleComments);
    } catch (err) {
      console.error(err);
    }
  },
  async 'add-comment'({commit, rootState}, payload) {
    const headers = rootState.user.token ? {'Authorization': `Bearer ${rootState.user.token}`} : {}
    try {
      const result = await this.app.apolloProvider.clients.clientSideClient.mutate({
        mutation: createArticleComments,
        variables: {
          comment: payload.comment,
          article: payload.articleId,
        },
        context: {
          headers
        }
      })
      commit('ADD_COMMENT', result.data.createArticleComment.articleComment);
    } catch (err) {
      console.error(err);
    }
  }
}
