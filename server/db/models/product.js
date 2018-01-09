const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	imageUrl: {
		type: Sequelize.TEXT,
		defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png'
	},
	category: {
		type: Sequelize.STRING,
		allowNull: false
	},
	price: {
		type: Sequelize.FLOAT,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	}
})

//**NEED TO CREATE A MODEL FOR REVIEWS**