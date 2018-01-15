const router = require('express').Router();
const cartUtils = require('../../utils/cartUtils')
module.exports = router;

router.get('/', (req, res, next) => {
  res.json(req.session.cart);
});
// OB/EC: might be clearer to do POST /api/cart/items, so that API users know that it's an item being created, not a cart
router.post('/', (req, res, next) => {
  req.session.cart = cartUtils.addItem(req.session.cart, req.body);
  res.sendStatus(204); // OB/EC: could consider sending nothing back
});
// OB/EC: clearer to split this into two routes, this one for clearing the whole cart, and DELETE /api/cart/items/:itemId for removing a particular item
router.delete('/', (req, res, next) => {
  req.session.cart = [];
  res.sendStatus(204)
});

// add put method for deleting item from cart

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});
