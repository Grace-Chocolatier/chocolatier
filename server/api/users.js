const router = require('express').Router()
const {User, Order} = require('../db/models')
const gatekeeperMiddleware = require('../../utils/gatekeeperMiddleware');
module.exports = router

//import gatekeeper

router.get('/',
  gatekeeperMiddleware.isAdmin,
  (req, res, next) => {
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
router.delete('/:id',
  gatekeeperMiddleware.isAdmin,
  (req, res, next) => {
    User.destroy({ where: {id: Number(req.params.id)} })
    .then(numAffectedRows => {
      res.sendStatus(204)
    })
    .catch(next)
})

// for updating a user
router.put('/:id',
  gatekeeperMiddleware.isAdmin,
  (req, res, next) => {
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

router.get('/:userId/orders',
  gatekeeperMiddleware.isUser,
  gatekeeperMiddleware.isAdmin,
  (req, res, next) => {
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
})

router.get('/:userId',
  gatekeeperMiddleware.isUser,
  gatekeeperMiddleware.isAdmin,
  (req, res, next) => {
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
})

