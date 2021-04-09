module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('DATABASE_HOST', '0.0.0.0'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'td-strapi'),
        username: env('DATABASE_USERNAME', 'td-strapi'),
        password: env('DATABASE_PASSWORD', 'td-strapi'),
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      options: {
        autoMigration: true
      }
    },
  },
});
