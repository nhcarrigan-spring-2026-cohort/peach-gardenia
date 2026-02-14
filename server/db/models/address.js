'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.belongsTo(models.Organisation, {
        foreignKey: {
          name: 'organisation_id'
        }
      })
      Address.belongsToMany(models.Caseworker, {
        through: 'Caseworker_Address',
        foreignKey: ''
      })
    }
  }
  Address.init({
    organisation_id: DataTypes.INTEGER,
    row_1: DataTypes.STRING,
    row_2: DataTypes.STRING,
    city: DataTypes.STRING,
    state_county: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    country: DataTypes.STRING,
    locale: DataTypes.STRING,
    address_type: DataTypes.ENUM('headquarters', 'billing', 'shipping', 'misc'),
    local_email: DataTypes.STRING,
    local_tel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};