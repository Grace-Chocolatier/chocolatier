const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

//import gatekeeper

router.get('/', (req, res, next) => {
    User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin']
    })
      .then(users => res.json(users))
      .catch(next)

})

//for deleting a user
router.delete('/:id', (req, res, next) => {
  User.destroy({ where: {id: Number(req.params.id)} })
  .then(numAffectedRows => {
    res.sendStatus(204)
  })
  .catch(next)
})

// for updating a user
router.put('/:id', (req, res, next) => {
  User.update({ isAdmin: Boolean(req.query.isAdmin) }, { where: { id: Number(req.params.id)}})
  .then(() => User.findById(Number(req.params.id), { attributes: ['id', 'email', 'isAdmin'] }))
  .then(user => res.json(user))
  .catch(next)
})

//for adding a new user
router.post('/', (req, res, next) => {
  User.create(req.body)
  .then(newUser => {
    res.json(newUser)
  })
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

