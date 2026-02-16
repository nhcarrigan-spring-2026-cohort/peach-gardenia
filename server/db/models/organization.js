'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    static associate(models) {
      Organization.hasMany(models.Branch);
    }
  }
  Organization.init({
    name: DataTypes.STRING(200),
    email: DataTypes.TEXT,
    tel: DataTypes.STRING(30)
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};