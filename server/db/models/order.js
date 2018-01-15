const Sequelize = require('sequelize');
const db = require('../db');
const OrderItem = require('./order_item');

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'Created'
  },
  order_total: {
    type: Sequelize.INTEGER,
    defaultValue: 0
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

Order.createOrder = function(userId, cart) {
  let newOrder;
  userId ? newOrder = Order.create({ userId }) : newOrder = Order.create();
    newOrder.then(order => {
      let orderItems = cart.map(item => {
        let orderItem = {
          orderId: order.id,
          quantity: item.quantity,
          productId: item.id,
          item_total: item.quantity * item.price
        }
        return orderItem
      })

      return OrderItem.bulkCreate(orderItems)
    })
    .catch(err => console.error(err));

  return newOrder;
}

module.exports = Order
