'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organisation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organisation.hasMany(models.Address);
      Organisation.belongsToMany(models.Caseworker, {
        through: 'caseworker_organisations',
        foreignKey: 'organisation_id'
      });
    }
  }
  Organisation.init({
    name: DataTypes.STRING(200),
    email: DataTypes.TEXT,
    tel: DataTypes.STRING(30)
  }, {
    sequelize,
    modelName: 'Organisation',
  });
  return Organisation;
};