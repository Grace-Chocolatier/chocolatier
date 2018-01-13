import axios from 'axios'
const cartUtils = require('../../utils/cartUtils')

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const GET_CART = 'GET_CART';
const CLEAR_CART = 'CLEAR_CART';

/**
 * INITIAL STATE
 */
const cart = []

/**
 * ACTION CREATORS
 */
const addToCart = product => ({type: ADD_TO_CART, product});
const removeFromCart = product => ({type: REMOVE_FROM_CART, product});
const getCart = products => ({type: GET_CART, products});
const empty = () => ({type: CLEAR_CART});

/**
 * THUNK CREATORS
 */

export const postCart = (product) =>
  dispatch =>
    axios.post('/api/cart', product)
      .then(res => res.data)
      .then(() => {
        dispatch(addToCart(product))
      })
      .catch(err => console.log(err))

export const deleteItem = (product) =>
      dispatch =>
        axios.put('/api/cart', product)
        .then(res => res.data)
        .then(deletedProduct => {
          dispatch(removeFromCart(deletedProduct))
        })
        .catch(err => console.log(err))

export const fetchCart = () =>
  dispatch =>
          axios.get('/api/cart')
          .then(res => res.data)
          .then(products => {
            dispatch(getCart(products))
          })
          .catch(err => console.log(err))

export const clearCart = () =>
  dispatch =>
          axios.delete('/api/cart')
          .then(() => dispatch(empty()))

export const makeOrder = (userId, currentCart) =>
    axios.post(`/api/orders/${userId}`, currentCart)
    .then(res => res.data)
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = cart, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return cartUtils.addItem(state, action.product)
    case REMOVE_FROM_CART:
      return cartUtils.removeItem(state, action.product)
    case GET_CART:
      return action.products
    case CLEAR_CART:
      return [];
    default:
      return state
  }
}
