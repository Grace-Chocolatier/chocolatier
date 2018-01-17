const router = require('express').Router()
const {Product, Review} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
	Product.findAll({ include: [{ all: true }]})
	.then(products => res.json(products))
	.catch(next)
})

router.get('/:id', (req, res, next) => {
	Product.findOne({where: {id: req.params.id}, include: [{all: true}]})
	.then(product => res.json(product))
	.catch(next)
})

router.put('/:id', (req, res, next) => {
  Product.update(req.body, { where: {id: req.params.id} })
  .then(() => Product.findById(Number(req.params.id)))
  .then(product => res.json(product))
  .catch(err => console.error(err));
})

router.post('/:id/reviews', (req, res, next) => {
	Review.create(req.body)
	.then(newReview => {
		res.json(newReview)
	})
	.catch(next)
})