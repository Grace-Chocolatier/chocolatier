import axios from 'axios'

const GET_CATEGORIES = 'GET_CATEGORIES'
const getCategories = categories => ({type: GET_CATEGORIES, categories})

const defaultCategories = [];
export const fetchCategories = () =>
  dispatch =>
    axios.get('/api/categories')
    .then(res => dispatch(getCategories(res.data || defaultCategories)))
    .catch(err => console.log(err))

export default function (state = defaultCategories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
