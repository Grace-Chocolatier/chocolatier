const router = require('express').Router();
const { Order } = require('../db/models')
module.exports = router;

// add gatekeepermiddleware here
router.get('/', (req, res, next) => {
	Order.findAll({ include: [{ all: true }]})
	.then(orders => res.json(orders))
	.catch(next)
})

router.get('/:orderId', (req, res, next) => {
	Order.findById(Number(req.params.orderId),{ include: [{ all: true }]})
	.then(order => res.json(order))
	.catch(next)
})
// OB/EC: consider making a model method, e.g. a class method Order.createFromCart(cartData) which handles all of the "checkout" logic
// OB/EC: the standard might suggest making this a POST /api/orders?fromMyCart=true
router.post('/:id', (req, res, next) => {
  if (req.user && Number(req.user.id) === Number(req.params.id) || req.user.isAdmin) {
    Order.createOrder(Number(req.params.id), req.body) // OB/EC: the user id shouldn't be on the body, could get the the user id from req.user.id
    // OB/EC: burn your logs
    res.sendStatus(204)
  } else if (!req.user) {
    Order.createOrder(null, req.body)
    res.sendStatus(204)
  } else {
    let err = new Error(404);
    next(err)
  }
});

