'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Units', 'annualIncome', { type: Sequelize.INTEGER })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Units', 'annualIncome')
  }
}
