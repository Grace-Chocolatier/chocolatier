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
const {User, Product} = require('../server/db/models')

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

  const products = await Promise.all([
    Product.create({name: 'Butterscotch Square', imageUrl: 'item_ButterscotchSquare.jpg', category: 'individual', price: 3.5, description: 'A soft center of grained brown sugar and cream with a touch of vanilla covered in milk chocolate.'}),
    Product.create({name: 'Cafe au Lait Truffle', imageUrl: 'item_CafeauLaitTruffle.jpg', category: 'individual', price: 3.5, description: 'Smooth, rich truffle center of white chocolate, cream and coffee covered in rich dark chocolate and decorated with milk chocolate lace.'}),
    Product.create({name: 'Chelsea', imageUrl: 'item_Chelsea.jpg', category: 'individual', price: 3.5, description: 'Creamy soft center with chocolate liquor and pecans covered in smooth milk chocolate.'}),
    Product.create({name: 'Mocha', imageUrl: 'item_Mocha.jpg', category: 'individual', price: 3.5, description: 'Creamy center flavored with coffee and cream covered in smooth milk chocolate and decorated with chocolate rice.'}),
    Product.create({name: 'Normandie', imageUrl: 'item_Normandie.jpg', category: 'individual', price: 3.5, description: 'Creamy vanilla brown sugar soft center with English walnuts and almonds, coated in rich dark chocolate.'}),
    Product.create({name: 'Scotchmallow', imageUrl: 'item_Scotchmallow.jpg', category: 'individual', price: 3.5, description: 'A layer of caramel with a layer of honey marshmallow covered in rich, dark chocolate.'}),
    Product.create({name: 'Akosombo Bar 68%', imageUrl: 'bar_Acosombo.jpg', category: 'bar', price: 7, description: 'Intense dark chocolate with notes of roasted coffee.'}),
    Product.create({name: 'Coro Bar 100%', imageUrl: 'bar_Coro.jpg', category: 'bar', price: 7, description: 'Pure cocoa, this bar is the most intense.'}),
    Product.create({name: 'Cuana Bar 74%', imageUrl: 'bar_Cuana.jpg', category: 'bar', price: 7, description: 'Robust pure dark chocolate.'}),
    Product.create({name: 'Marao Bar 60%', imageUrl: 'bar_Marao.jpg', category: 'bar', price: 7, description: 'Dark chocolate with bursts of roasted almond.'}),
    Product.create({name: 'Monsera Bar 37%', imageUrl: 'bar_Monsera.jpg', category: 'bar', price: 7, description: 'Milk chocolate with pronounced notes of cacao.'}),
    Product.create({name: 'Orinoco Bar 60%', imageUrl: 'bar_Orinoco.jpg', category: 'bar', price: 7, description: 'Floral and full-bodied dark chocolate.'}),
    Product.create({name: 'Tolima Bar 37%', imageUrl: 'bar_Tolima.jpg', category: 'bar', price: 7, description: 'Milk chocolate with crispy cereals.'}),
    Product.create({name: 'Gesture Gift Box, 14 pieces ', imageUrl: 'box_14pc.jpg', category: 'box', price: 30, description: 'Irresistible Miniature Gift Boxes.'}),
    Product.create({name: 'Assorted Box, 29 pieces', imageUrl: 'box_29pc.jpg', category: 'box', price: 65, description: 'A selection of ganaches and pralinés in dark and milk chocolate.'}),
    Product.create({name: 'Assorted Box, 40 pieces', imageUrl: 'box_40pc.jpg', category: 'box', price: 85, description: 'A selection of ganaches and pralinés in dark and milk chocolate.'}),
    Product.create({name: 'Assorted Box, 63 pieces', imageUrl: 'box_63pc.jpg', category: 'box', price: 130, description: 'A selection of ganaches and pralinés in dark and milk chocolate.'}),
    Product.create({name: 'Assorted Box, 103 pieces', imageUrl: 'box_103pc.jpg', category: 'box', price: 215, description: 'A selection of ganaches and pralinés in dark and milk chocolate.'})
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
