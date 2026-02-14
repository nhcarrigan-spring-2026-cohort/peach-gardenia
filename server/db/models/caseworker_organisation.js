'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caseworker_Organisation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Caseworker_Organisation.belongsTo(models.Caseworker, {
        foreignKey: 'caseworker_id'
      });
      Caseworker_Organisation.belongsTo(models.Organisation, {
        foreignKey: 'organisation_id'
      });
    }
  }
  Caseworker_Organisation.init({
    caseworker_id: DataTypes.INTEGER,
    organisation_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Caseworker_Organisation',
  });
  return Caseworker_Organisation;
};