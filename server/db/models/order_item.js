const Sequelize = require('sequelize')
const db = require('../db')

const Order_item = db.define('order_item', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  item_total: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  getterMethods: {
    centsToDollars() {
      return this.item_total / 100;
    }
  },
  setterMethods: {
    dollarsToCents(dollars) {
      this.setDataValue('item_total', dollars * 100);
    }
  }
})

module.exports = Order_item