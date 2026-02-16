  'use strict';
  const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class Branch extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
        Branch.belongsToMany(models.Caseworker, {
          through: models.Caseworker_Branch,
          foreignKey: 'branch_id'
        });
        Branch.belongsTo(models.Address, {
          foreignKey: 'address_id'
        });
      }
    }
    Branch.init({
      organization_id: DataTypes.INTEGER,
      address_id: DataTypes.INTEGER,
      name: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'Branch',
    });
    return Branch;
  };