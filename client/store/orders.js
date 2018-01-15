import axios from 'axios'
<<<<<<< HEAD
import history from '../history'
=======
>>>>>>> 2b7ae772c9f8f11a2ddca9c812c8fa72740d9307

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
<<<<<<< HEAD
/**
 * INITIAL STATE
 */
const orders = [];
=======

/**
 * INITIAL STATE
 */
const defaultOrders = []
>>>>>>> 2b7ae772c9f8f11a2ddca9c812c8fa72740d9307

/**
 * ACTION CREATORS
 */
<<<<<<< HEAD
const getOrders = (orders) => ({ type: GET_ORDERS, orders})
/**
 * THUNK CREATORS
 */
export const fetchOrders = (userId) => {
  return (dispatch) => {
    axios.get(`/api/users/${userId}/orders`)
      .then(res => res.data)
      .then(orders => dispatch(getOrders(orders)))
      .catch(err => console.log(err))
    }
}
/**
 * REDUCER
 */
export default function (state = orders, action) {
=======
const getOrders = orders => ({type: GET_ORDERS, orders})

/**
 * THUNK CREATORS
 */
export const fetchOrders = () =>
  dispatch =>
    axios.get('/api/orders')
      .then(res =>
        dispatch(getOrders(res.data || defaultOrders)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultOrders, action) {
>>>>>>> 2b7ae772c9f8f11a2ddca9c812c8fa72740d9307
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
