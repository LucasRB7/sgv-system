// Update with your config settings.
const {knexSnakeCaseMappers} = require("objection")
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: ''/*insira aqui o seu banco de dados */,
    connection: {
      database: 'gerenciamento_vendas',
      user: '' /*insira usuario */,
      password: '' /*insira senha */
    },pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    },
    ...knexSnakeCaseMappers
  },
};
