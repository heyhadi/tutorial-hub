'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tutorial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tutorial.belongsToMany(models.User, {through:models.FavouriteTutorial})
    }
  };
  Tutorial.init({
    title: DataTypes.STRING,
    uploader_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tutorial',
  });
  return Tutorial;
};