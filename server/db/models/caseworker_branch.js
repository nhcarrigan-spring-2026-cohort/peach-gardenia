'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caseworker_Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Caseworker_Branch.belongsTo(models.Caseworker, {
        foreignKey: 'caseworker_id'
      });
      Caseworker_Branch.belongsTo(models.Branch, {
        foreignKey: 'branch_id'
      });
    }
  }
  Caseworker_Branch.init({
    branch_id: DataTypes.INTEGER,
    caseworker_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Caseworker_Branch',
  });
  return Caseworker_Branch;
};