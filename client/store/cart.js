import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const GET_CART = 'GET_CART';

/**
 * INITIAL STATE
 */
const cart = []

/**
 * ACTION CREATORS
 */
const addToCart = product => ({type: ADD_TO_CART, product})
const removeFromCart = product => ({type: REMOVE_FROM_CART, product})
const getCart = products => ({type: GET_CART, products})

/**
 * THUNK CREATORS
 */

export const postCart = (product) =>
  dispatch =>
    axios.post('/cart', product)
      .then(res => res.data)
      .then(addedProduct => {
        dispatch(addToCart(addedProduct))
      })
      .catch(err => console.log(err))

export const deleteCart = (product) =>
      dispatch =>
        axios.delete('/cart', product)
        .then(res => res.data)
        .then(deletedProduct => {
          dispatch(removeFromCart(deletedProduct))
        })
        .catch(err => console.log(err))

export const fetchCart = () =>
  dispatch =>
          axios.get('/cart')
          .then(res => res.data)
          .then(products => {
            dispatch(getCart(products))
          })
          .catch(err => console.log(err))

function remove(cart, product) {
  let newCart = [];
  for(var i = 0; i < cart.length; i++) {
    if(cart[i].id !== product.id) {
      newCart.push(product);
    }
  }
  return newCart;
}
/**
 * REDUCER
 */
export default function (state = cart, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...cart, action.product]
    case REMOVE_FROM_CART:
      return remove(cart, action.product)
    case GET_CART:
      return action.products
    default:
      return state
  }
}
