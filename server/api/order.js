const router = require('express').Router();
const { Order } = require('../db/models')
module.exports = router;

router.post('/:id', (req, res, next) => {
  if (req.user && Number(req.user.id) === Number(req.params.id)) {
    Order.createOrder(Number(req.params.id), req.body)
    res.sendStatus(204)
  } else if (!req.user) {
    Order.createOrder(null, req.body)
    res.sendStatus(204)
  } else {
    let err = new Error(404);
    next(err)
  }
});

