import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'

/**
 * INITIAL STATE
 */
const orders = [];

/**
 * ACTION CREATORS
 */
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
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
