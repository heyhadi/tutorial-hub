'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addConstraint('FavouriteTutorials', {
      fields: ['TutorialId'],
      type: 'foreign key',
      name: 'adding-tutrial-fk-to-favorit-tutorial',
      references: {
        table: 'Tutorials',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })

  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return queryInterface.removeConstraint('FavouriteTutorials', 'adding-tutrial-fk-to-favorit-tutorial', {})
  }
};
