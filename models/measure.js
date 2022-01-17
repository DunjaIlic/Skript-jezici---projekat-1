'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Measure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ProductDetails}) {
      this.hasMany(ProductDetails)
    }
  };
  Measure.init({
    ml: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Measure',
  });

  return Measure;
};