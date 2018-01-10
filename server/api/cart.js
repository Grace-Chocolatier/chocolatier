const router = require('express').Router();
const cartMiddleware = require('../utils/cartMiddleware')
module.exports = router;

router.get('/', (req, res, next) => {
  res.json(req.session.cart);
});

router.post('/', (req, res, next) => {
  console.log('IN THE POST', req.body)
  req.session.cart = [...req.session.cart, req.body];
  res.json(req.body);
});

router.delete('/', (req, res, next) => {
  req.body ?
    req.session.cart = cartMiddleware.removeItemFromCart(req.session.cart, req.body)
    : req.session.cart = [];

  res.json(req.session.cart);
});

// router.put('/', (req, res, next) => {
//   for updating the cart
// })

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});
