const Sequelize = require('sequelize')
const db = require('../db')

const Order_item = db.define('order_item', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  item_total: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Order_item