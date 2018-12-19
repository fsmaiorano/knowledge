module.exports = {
  client: "postgresql",
  connection: {
    database: "knowledge",
    user: "postgres",
    password: "123456"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: "./src/database/postgres/migrations/",
    tableName: "knex_migrations"
  }
};
