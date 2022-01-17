'use strict';
const {
  Model
} = require('sequelize');
const orderitems = require('./orderitems');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({OrderItems}) {
      this.hasMany(OrderItems)
    }
  };
  Order.init({
    orderId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};