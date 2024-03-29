'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Units', 'agency_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Agencies',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Units', 'agency_id')
  }
}
