'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caseworker_Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Caseworker_Address.belongsTo(models.Caseworker, {
        foreignKey: 'caseworker_id'
      });
      Caseworker_Address.belongsTo(models.Address, {
        foreignKey: 'address_id'
      });
    }
  }
  Caseworker_Address.init({
    caseworker_id: DataTypes.INTEGER,
    address_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Caseworker_Address',
  });
  return Caseworker_Address;
};