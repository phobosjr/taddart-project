'use strict';
const {sanitizeEntity} = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const _ = require('lodash');

module.exports = {
  async create(ctx) {
    let entity;
    ctx.request.body.users_permissions_user = ctx.state.user.id;
    entity = await strapi.services['article-comment'].create(ctx.request.body);
    return sanitizeEntity(entity, {model: strapi.models['article-comment']});
  },
  async find(ctx) {
    let entities;
    entities = await strapi.query('article-comment').find({article_eq: ctx.query.articleId, _sort:ctx.query._sort});
    if (ctx.state?.user) {
      entities = _.filter(entities, (entity) => {
        if (entity.commentStatus === 'refused') {
          return false;
        }

        if (entity.commentStatus === 'accepted') {
          return true;
        }
        return entity.commentStatus === 'waiting' && entity.users_permissions_user.id === ctx.state.user.id;

      })
    } else {
      entities = _.filter(entities, (entity) => entity.commentStatus === 'accepted');
    }
    return sanitizeEntity(entities, {model: strapi.models['article-comment']});
  }

};
