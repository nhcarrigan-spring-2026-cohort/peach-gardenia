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
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING(200),
    email: DataTypes.TEXT,
    tel: DataTypes.STRING(30)
  }, {
    sequelize,
    modelName: 'Organization',
    // default
    // createdAt: DataTypes.DATE,
    // updatedAt: DataTypes.DATE,
  });
  return Organization;
};