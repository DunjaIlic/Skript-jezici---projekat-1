'use strict';
const {
  Model
} = require('sequelize');
const order = require('./order');
const product = require('./product');
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product}) {
    }
  };
  OrderItems.init({
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderItems',
  });
  return OrderItems;
};