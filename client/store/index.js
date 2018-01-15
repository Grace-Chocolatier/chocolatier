import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import products from './products'
import product from './product'
import cart from './cart';
<<<<<<< HEAD
import orders from './orders';


const reducer = combineReducers({user, products, product, cart, orders})
=======
import users from './users'
import orders from './orders'
import singleOrder from './order'


const reducer = combineReducers({user, products, product, cart, users, orders, singleOrder})
>>>>>>> 2b7ae772c9f8f11a2ddca9c812c8fa72740d9307
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './users'
export * from './orders'
export * from './order'
