const router = require('express').Router();
module.exports = router;
const session = require('express-session');

router.get('/', (req, res, next) => {
  res.json(req.session.cart);
});

// router.post('/', (req, res, next) => {

// });

// router.delete('/', (req, res, next) => {

// });

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});
