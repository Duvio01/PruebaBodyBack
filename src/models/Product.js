const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Product', {
        idProduct: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        price: {
            type: DataTypes.DOUBLE(26,2),
            defaultValue: 0,
            allowNull: true,
        },
        status: {
            type: DataTypes.SMALLINT,
            defaultValue: 1,
            allowNull: true,
        },
        user_last_update: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    }, { 
        timestamps: true,
        paranoid: true
    });
};
