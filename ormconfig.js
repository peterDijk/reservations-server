module.exports = {
   "type": "postgres",
   "url": process.env.DATABASE_URL || "postgres://postgres:secret@localhost:5432/postgres",
   "synchronize": false,
   "logging": true,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}