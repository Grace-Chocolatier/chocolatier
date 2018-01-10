const router = require('express').Router();
const cartMiddleware = require('../utils/cartMiddleware')
const {Order, Order_item} = require('../db/models')
module.exports = router;

router.get('/', (req, res, next) => {
  res.json(req.session.cart);
});

// OB/EC: might be clearer to do POST /api/cart/items, so that API users know that it's an item being created, not a cart
router.post('/', (req, res, next) => {
  req.session.cart = [...req.session.cart, req.body];
  res.json(req.body); // OB/EC: could consider sending nothing back
});

// OB/EC: clearer to split this into two routes, this one for clearing the whole cart, and DELETE /api/cart/items/:itemId for removing a particular item
router.delete('/', (req, res, next) => {
  req.body ?
    req.session.cart = cartMiddleware.removeItemFromCart(req.session.cart, req.body) // OB/EC: delete request bodies will always be empty
    : req.session.cart = [];

  res.json(req.session.cart);
});

// OB/EC: consider making a model method, e.g. a class method Order.createFromCart(cartData) which handles all of the "checkout" logic
// OB/EC: the standard might suggest making this a POST /api/orders?fromMyCart=true
// Order POST
router.post('/order', (req, res, next) => {
  Order.create({userId: req.body}) // OB/EC: the user id shouldn't be on the body, could get the the user id from req.user.id
  .then(receipt => console.log("receipt is", receipt)) // OB/EC: burn your logs
  .catch(next)
});

// OB/EC: undead code will rise up and kill you
// router.put('/', (req, res, next) => {
//   for updating the cart
// })

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});
