'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Unit.belongsTo(models.Agency, { foreignKey: 'agencyId' })
    }
  }
  Unit.init({
    address: DataTypes.STRING,
    income: DataTypes.INTEGER,
    annualIncome: DataTypes.INTEGER,
    startDate: DataTypes.DATE(6),
    endDate: DataTypes.DATE(6),
    note: DataTypes.TEXT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Unit',
    tableName: 'Units',
    underscored: true
  })
  return Unit
}
