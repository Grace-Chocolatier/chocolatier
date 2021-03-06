import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_USER_ORDERS = 'GET_USER_ORDERS'
/**
 * INITIAL STATE
 */
const defaultUser = {
  user: {}
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getUserOrders = (orders) => ({ type: GET_USER_ORDERS, orders})
/**
 * THUNK CREATORS
 */
export const fetchUserOrders = (userId) =>
  dispatch =>
    axios.get(`/api/users/${userId}/orders`)
      .then(res =>
        dispatch(getUserOrders(res.data)))
        .catch(err => console.log(err))

export const fetchUser = (userId)  =>
  dispatch =>
    axios.get(`/api/users/${userId}`)
      .then(res =>
        dispatch(getUser(res.data)))
      .catch(err => console.log(err))

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser
    case GET_USER_ORDERS:
      return action.order
    default:
      return state
  }
}
