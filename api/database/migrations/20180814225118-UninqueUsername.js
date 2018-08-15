'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('users', ['username'], {
      type: 'unique',
      name: 'constraint_username_unique',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'users',
      'constraint_username_unique',
    );
  },
};
