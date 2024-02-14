require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const ProductModel = require('./models/product')

const sequelize = new Sequelize(
   `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/crud_body`,
   { logging: false, native: false }
);

ProductModel(sequelize)

const { Product } = sequelize.models;

module.exports = {
   Product,
   conn: sequelize,
};
