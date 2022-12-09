require('dotenv').config();
const { Sequelize } = require('sequelize');

// const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE, PGPORT } = process.env;

const DATABASE_URL = process.env;

console.log('database', DATABASE_URL);

// old version, only local
// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//     freezeTableName: true //prevent sequelize from pluralizing table names
// });

const sequelize =
  process.env.NODE_ENV === 'production'
    ? new Sequelize({
        database: PGDATABASE,
        dialect: 'postgres',
        host: PGHOST,
        port: PGPORT,
        username: PGUSER,
        password: PGPASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`,
        { logging: false, native: false }
      );

module.exports = sequelize;
