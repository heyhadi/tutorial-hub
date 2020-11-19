'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return  queryInterface.addConstraint('FavouriteTutorials', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'adding-user-fk-to-favoritTutorial',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeConstraint('FavouriteTutorials', 'adding-user-fk-to-favoritTutorial', {})
  }
};
