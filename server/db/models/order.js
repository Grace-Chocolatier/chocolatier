const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING
  },
  order_total: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Order