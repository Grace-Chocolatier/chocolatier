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
	inventory: {
		type: Sequelize.SMALLINT,
		allowNull: false
	},
	// OB/EC: the root of all evil floating point math, 1) you could use DECIMAL type (which is kind of for this); 2) use INTEGER and measure in cents
	price: {
		type: Sequelize.FLOAT, // Sequelize.DECIMAL
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	}
})

module.exports = Product
