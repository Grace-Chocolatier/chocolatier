import axios from 'axios'

const GET_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
const dUser = user => ({type: DELETE_USER, user})
const upUser = user => ({type: UPDATE_USER, user})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () =>
  dispatch =>
    axios.get('/api/users')
      .then(res =>
        dispatch(getUsers(res.data || defaultUsers)))
      .catch(err => console.log(err))

export const deleteUser = user =>
  dispatch =>
    axios.delete(`/api/users/${user.id}`)
      .then(res =>
        dispatch(dUser(user)))
      .catch(err => console.log(err))

export const updateUser = user =>
  dispatch =>
    axios.put(`/api/users/${user.id}?isAdmin=true`)
      .then((updatedUser) => dispatch(upUser(updatedUser.data)))
      .catch(err => console.log(err))
/**
 * REDUCER
 */

 //bug with updating user getting the rihgt user on return
export default function (state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case DELETE_USER:
      return state.filter(user => user.id !== action.user.id)
    case UPDATE_USER:
      return state.map(user => {
        if (user.id === action.user.id) return action.user ;
        else return user;
      })
    default:
      return state
  }
}
