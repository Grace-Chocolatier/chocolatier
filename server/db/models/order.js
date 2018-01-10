const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    allowNull: true
  },
  // OB/EC: this data is redundant with order_item's price, but you've thought about this, so yay!
  order_total: {
    type: Sequelize.FLOAT,
    allowNull: true
  }
})

module.exports = Order