const router = require('express').Router();
const {Order, Order_item} = require('../db/models')
module.exports = router;

router.post('/:id', (req, res, next) => {
  if (req.user && Number(req.user.id) === Number(req.params.id)) {
    console.log('made it through security auth', req.body)
    Order.createOrder(Number(req.params.id), req.body)
    .then(receipt => console.log("receipt is", receipt))
    .catch(next)
  }
  next()
});

