module.exports = {
  development: {
    username: 'postgres',
    password: 'admin',
    database: 'GWM',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  },
  test: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
  },
  production: {
    username: 'postgres',
    password: 'admin',
    database: 'GWM',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  },
};
