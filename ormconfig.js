const CustomNamingStrategy = require('./src/__init__/db').CustomNamingStrategy;

module.exports = {
   type: 'postgres',
   url: process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres',
   synchronize: false,
   logging: true,
   namingStrategy: new CustomNamingStrategy(),
   entities: ['src/entity/**/*.ts'],
   migrations: ['src/migration/**/*.ts'],
   subscribers: ['src/subscriber/**/*.ts'],
   cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
   },
};