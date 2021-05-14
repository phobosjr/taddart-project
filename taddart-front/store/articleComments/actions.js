export default {
  async init(context, articleId) {
    const headers = context.rootState.user.token ? {'Authorization': `Bearer ${context.rootState.user.token}`} : {}
    const comments = await this.$axios.$get(`${this.$config.serverSide.strapiBackendUrl}/article-comments?articleId=${articleId}`,
      {
        headers
      });
   context.commit('init', comments);

  },
  add({commit}, comment) {
    commit('add', comment);
  }
}
