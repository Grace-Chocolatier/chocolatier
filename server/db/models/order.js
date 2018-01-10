const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    allowNull: true
  },
  order_total: {
    type: Sequelize.FLOAT,
    allowNull: true
  }
})

module.exports = Order