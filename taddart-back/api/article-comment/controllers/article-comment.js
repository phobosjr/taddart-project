'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    ctx.request.body.users_permissions_user = ctx.state.user.id;
    ctx.request.body.published_at = null;
    entity = await strapi.services['article-comment'].create(ctx.request.body);
    return sanitizeEntity(entity, {model: strapi.models['article-comment']});
  },
};
