const Sequelize = require('sequelize');
const db = require('../db');
const OrderItem = require('./order_item');

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'Created'
  },
  // OB/EC: this data is redundant with order_item's price, but you've thought about this, so yay!
  order_total: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    get() {
      return this.getDataValue('order_total') / 100;
    },
    set(dollars){
      this.setDataValue('order_total', dollars * 100);
    }
  }
})

Order.createOrder = function(userId, cart) {
  let newOrder;
  let order_total = 0;
  cart.forEach(item => { order_total += item.quantity * item.price });
  userId ? newOrder = Order.create({ userId, order_total }) : newOrder = Order.create({ order_total });
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
    .catch(err => console.error(err)); // no need catch

  return newOrder;
}

module.exports = Order
