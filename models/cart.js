const Sequelize = require('sequelize');

const sequelize = require('../utils/datatbase');

const Cart = sequelize.define('cart', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Cart;