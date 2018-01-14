const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

//need to add a single middleware gatekeeper function for these admin actions

function isAdmin(req,res,next){
  return req.user && req.user.isAdmin
}

router.get('/', (req, res, next) => {
  // if (req.user.isAdmin){
    User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin']
    })
      .then(users => res.json(users))
      .catch(next)
  // }

})

//for deleting a user
router.delete('/:id', (req, res, next) => {
  // if (req.user.isAdmin){
  User.destroy({ where: {id: Number(req.params.id)} })
  .then(numAffectedRows => {
    res.sendStatus(204)
  })
  .catch(next)
  //}
})

// for updating a user
router.put('/:id', (req, res, next) => {
  // if (req.user.isAdmin) {
    console.log(req.query.isAdmin)
  User.update({ isAdmin: Boolean(req.query.isAdmin) }, { where: { id: Number(req.params.id)}})
  .then(updatedUser => {
    res.json(updatedUser)
  })
  .catch(next)
  // }
})

//for adding a new user
router.post('/', (req, res, next) => {
  User.create(req.body)
  .then(newUser => {
    res.json(newUser)
  })
  .catch(next)
})
