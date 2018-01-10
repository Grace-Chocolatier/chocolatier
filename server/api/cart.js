const router = require('express').Router();
const cartMiddleware = require('../utils/cartMiddleware')
const {Order, Order_item} = require('../db/models')
module.exports = router;

router.get('/', (req, res, next) => {
  res.json(req.session.cart);
});

router.post('/', (req, res, next) => {
  req.session.cart = [...req.session.cart, req.body];
  res.json(req.body);
});

router.delete('/', (req, res, next) => {
  req.body ?
    req.session.cart = cartMiddleware.removeItemFromCart(req.session.cart, req.body)
    : req.session.cart = [];

  res.json(req.session.cart);
});

// Order POST
router.post('/order', (req, res, next) => {
  Order.create({userId: req.body})
  .then(receipt => console.log("receipt is", receipt))
  .catch(next)
});

// router.put('/', (req, res, next) => {
//   for updating the cart
// })

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});
