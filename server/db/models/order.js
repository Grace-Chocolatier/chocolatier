const Sequelize = require('sequelize');
const db = require('../db');
const OrderItem = require('./order_item');

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
  },
  order_total: {
    type: Sequelize.FLOAT
  }
})

Order.createOrder = function(userId, cart) {
  let newOrder = Order.create({ userId })
    .then(order => {
      let orderItems = cart.map(item => {
        let orderItem = {
          orderId: order.id,
          quantity: item.quantity,
          productId: item.id,
          item_total: item.quantity * item.price
        }
        return orderItem
      })

      OrderItem.bulkCreate(orderItems)
    })
    .catch(err => console.error(err));

  return newOrder;
}

module.exports = Order
