const router = require('express').Router();
const {Product} = require('../db/models')

module.exports = router;

router.get('/:category', (req, res, next) => {
	Product.findAll({where: {category: req.params.category}, include: {all: true}})
	.then((products) => res.json(products))
	.catch(next);
})
