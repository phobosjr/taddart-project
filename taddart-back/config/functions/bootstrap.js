'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#bootstrap
 */

const translationKeys = require('../../dataMigration/translationKeys.json');

async function createKey(name, kbValue, frValue) {
  const entityDefaultLocale = await strapi.query('translation-key').create({
    keyName: name,
    value: kbValue,
    locale: 'kab'
  });
  const fr_entity = await strapi.query('translation-key').create({
    keyName: name,
    value: frValue,
    locale: 'fr',
    localizations: [{id: entityDefaultLocale.id, locale: 'kab'}]
  });

  await strapi.query('translation-key').update(
    {id: entityDefaultLocale.id},
    {
      localizations: [{id: fr_entity.id, locale: 'fr'}]
    });
}

module.exports = async () => {
  if (process.env.NODE_ENV === "development") {
    return;
  }
  for (const key of translationKeys.keys) {
    const entity = await strapi.query('translation-key').findOne({keyName: key.name});
    if (!entity) {
      await createKey(key.name, key.kabValue, key.frValue);
    }
  }
};
