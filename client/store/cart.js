import axios from 'axios'
const cartUtils = require('../../utils/cartUtils')

/**
 * ACTION TYPES
 */
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const GET_CART = 'GET_CART';
export const CLEAR_CART = 'CLEAR_CART';

/**
 * INITIAL STATE
 */
const cart = []

/**
 * ACTION CREATORS
 */
const addToCart = product => ({type: ADD_TO_CART, product});
const removeFromCart = productId => ({type: REMOVE_FROM_CART, productId});
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

export const deleteItem = (productId) =>
      dispatch =>
        axios.delete(`/api/cart/${productId}`)
        .then(() => {
          dispatch(removeFromCart(productId))
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

/**
 * REDUCER
 */
export default function (state = cart, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return cartUtils.addItem(state, action.product)
    case REMOVE_FROM_CART:
      return cartUtils.removeItemFromCart(state, action.productId)
    case GET_CART:
      return action.products
    case CLEAR_CART:
      return [];
    default:
      return state
  }
}
