'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavouriteTutorial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FavouriteTutorial.belongsTo(models.User)
      FavouriteTutorial.belongsTo(models.Tutorial)
    }
  };
  FavouriteTutorial.init({
    TutorialId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'FavouriteTutorial',
  });
  return FavouriteTutorial;
};