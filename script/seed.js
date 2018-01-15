/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Product, Category} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  const categories = await Promise.all([
    Category.create({name: 'Individual Piece'}),
    Category.create({name: 'Candy Bar'}),
    Category.create({name: 'Pre-Packaged Box'})
  ])

  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded successfully`)

  const products = await Promise.all([
    Product.create({name: 'Butterscotch Square', imageUrl: 'item_ButterscotchSquare.jpg', categoryId: 1, price: 3.5, description: 'A soft center of grained brown sugar and cream with a touch of vanilla covered in milk chocolate.', inventory: 186}),
    Product.create({name: 'Cafe au Lait Truffle', imageUrl: 'item_CafeauLaitTruffle.jpg', categoryId: 1, price: 3.5, description: 'Smooth, rich truffle center of white chocolate, cream and coffee covered in rich dark chocolate and decorated with milk chocolate lace.', inventory: 254}),
    Product.create({name: 'Chelsea', imageUrl: 'item_Chelsea.jpg', categoryId: 1, price: 3.5, description: 'Creamy soft center with chocolate liquor and pecans covered in smooth milk chocolate.', inventory: 385}),
    Product.create({name: 'Mocha', imageUrl: 'item_Mocha.jpg', categoryId: 1, price: 3.5, description: 'Creamy center flavored with coffee and cream covered in smooth milk chocolate and decorated with chocolate rice.', inventory: 264}),
    Product.create({name: 'Normandie', imageUrl: 'item_Normandie.jpg', categoryId: 1, price: 3.5, description: 'Creamy vanilla brown sugar soft center with English walnuts and almonds, coated in rich dark chocolate.', inventory: 263}),
    Product.create({name: 'Scotchmallow', imageUrl: 'item_Scotchmallow.jpg', categoryId: 1, price: 3.5, description: 'A layer of caramel with a layer of honey marshmallow covered in rich, dark chocolate.', inventory: 211}),
    Product.create({name: 'Akosombo Bar 68%', imageUrl: 'bar_Acosombo.jpg', categoryId: 2, price: 7, description: 'Intense dark chocolate with notes of roasted coffee.', inventory: 86}),
    Product.create({name: 'Coro Bar 100%', imageUrl: 'bar_Coro.jpg', categoryId: 2, price: 7, description: 'Pure cocoa, this bar is the most intense.', inventory: 101}),
    Product.create({name: 'Cuana Bar 74%', imageUrl: 'bar_Cuana.jpg', categoryId: 2, price: 7, description: 'Robust pure dark chocolate.', inventory: 56}),
    Product.create({name: 'Marao Bar 60%', imageUrl: 'bar_Marao.jpg', categoryId: 2, price: 7, description: 'Dark chocolate with bursts of roasted almond.', inventory: 62}),
    Product.create({name: 'Monsera Bar 37%', imageUrl: 'bar_Monsera.jpg', categoryId: 2, price: 7, description: 'Milk chocolate with pronounced notes of cacao.', inventory: 73}),
    Product.create({name: 'Orinoco Bar 60%', imageUrl: 'bar_Orinoco.jpg', categoryId: 2, price: 7, description: 'Floral and full-bodied dark chocolate.', inventory: 94}),
    Product.create({name: 'Tolima Bar 37%', imageUrl: 'bar_Tolima.jpg', categoryId: 2, price: 7, description: 'Milk chocolate with crispy cereals.', inventory: 35}),
    Product.create({name: 'Gesture Gift Box, 14 pieces ', imageUrl: 'box_14pc.jpg', categoryId: 3, price: 30, description: 'Irresistible Miniature Gift Boxes.', inventory: 34}),
    Product.create({name: 'Assorted Box, 29 pieces', imageUrl: 'box_29pc.jpg', categoryId: 3, price: 65, description: 'A selection of ganaches and pralinés in dark and milk chocolate.', inventory: 46}),
    Product.create({name: 'Assorted Box, 40 pieces', imageUrl: 'box_40pc.jpg', categoryId: 3, price: 85, description: 'A selection of ganaches and pralinés in dark and milk chocolate.', inventory: 24}),
    Product.create({name: 'Assorted Box, 63 pieces', imageUrl: 'box_63pc.jpg', categoryId: 3, price: 130, description: 'A selection of ganaches and pralinés in dark and milk chocolate.', inventory: 14}),
    Product.create({name: 'Assorted Box, 103 pieces', imageUrl: 'box_103pc.jpg', categoryId: 3, price: 215, description: 'A selection of ganaches and pralinés in dark and milk chocolate.', inventory: 8})
  ])
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}


// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
