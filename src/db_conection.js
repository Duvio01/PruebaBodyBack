require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const ProductModel = require('./models/product')
const UserModel = require('./models/User')

const sequelize = new Sequelize(
   `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/crud_body`,
   { logging: false, native: false }
);

ProductModel(sequelize)
UserModel(sequelize)

const { Product } = sequelize.models;
const { User } = sequelize.models;

User.hasMany(Product)
Product.belongsTo(User)

module.exports = {
   Product,
   User,
   conn: sequelize,
};
