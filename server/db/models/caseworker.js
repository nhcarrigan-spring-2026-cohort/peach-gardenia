'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caseworker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Caseworker.belongsToMany(models.Branch, {
        through: models.Caseworker_Branch,
        foreignKey: 'caseworker_id'
      });
    }
  }
  Caseworker.init({
    first_name: DataTypes.STRING(200),
    last_name: DataTypes.STRING(200)
  }, {
    sequelize,
    modelName: 'Caseworker',
  });
  return Caseworker;
};