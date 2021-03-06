'use strict';
const {
  Model
} = require('sequelize');
const productdetails = require('./productdetails');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ProductDetails, OrderItems}) {
      this.hasMany(ProductDetails)
      this.hasMany(OrderItems)
    }
    // static associate({OrderItems}) {
    //   this.hasMany(OrderItems)
    // }
  };
  Product.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};