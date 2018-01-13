const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId/orders', (req, res, next) => {
  console.log('----------', req.user.id, req.params.userId)
  if (req.user && Number(req.user.id) === Number(req.params.userId)) {
    Order.findAll({
      where: {
          userId: req.params.userId
      },
      include: [{
        all: true
      }]
    })
    .then(orders => res.json(orders))
    .catch(next)
  } else {
    let err = new Error(404);
    next(err)
  }
})

router.get('/:userId', (req, res, next) => {
  console.log('----------', req.user.id, req.params.userId)
  if (req.user && Number(req.user.id) === Number(req.params.userId)) {
    User.findAll({
      where: {
          id: req.params.userId
      },
      include: [{
          all: true
      }]
    })
    .then(user => res.json(user))
    .catch(next)
  } else {
    let err = new Error(404);
    next(err)
  }
})

