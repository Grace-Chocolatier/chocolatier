const router = require('express').Router()
const {Product, Review} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
	Product.findAll({ include: [{ all: true }]})
	.then(products => res.json(products))
	.catch(next)
})

router.post('/:id/reviews', (req, res, next) => {
	Review.create(req.body)
	.then(newReview => {
		console.log('***review***', newReview)
		res.json(newReview)
	})
	.catch(next)
})

router.get('/:id', (req, res, next) => {
	Product.findOne({where: {id: req.params.id}, include: [{all: true}]})
	.then(product => res.json(product))
	.catch(next)
})
