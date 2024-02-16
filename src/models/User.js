const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize) => {
    Sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
    },{
        timestamps: true
    })
}