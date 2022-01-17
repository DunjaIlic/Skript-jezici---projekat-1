'use strict';
const {
  Model
} = require('sequelize');
const measure = require('./measure');
module.exports = (sequelize, DataTypes) => {
  class ProductDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Measure, Product}) {
    }
  };
  ProductDetails.init({
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductDetails',
  });
  return ProductDetails;
};