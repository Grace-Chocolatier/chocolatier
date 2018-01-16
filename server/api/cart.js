const router = require('express').Router();
const cartUtils = require('../../utils/cartUtils')
module.exports = router;

router.get('/', (req, res, next) => {
  res.json(req.session.cart);
});

router.post('/', (req, res, next) => {
  req.session.cart = cartUtils.addItem(req.session.cart, req.body);
  res.sendStatus(204);
});

router.delete('/', (req, res, next) => {
  req.session.cart = [];
  res.sendStatus(204);
});

router.delete('/:productId', (req, res, next) => {
	req.session.cart = cartUtils.removeItemFromCart(req.session.cart, Number(req.params.productId));
	res.sendStatus(204);
});

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});
