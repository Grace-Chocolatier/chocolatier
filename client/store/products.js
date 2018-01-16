import axios from 'axios'
import productUtils from '../../utils/productUtils'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProducts = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})
const editProduct = product => ({type: EDIT_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res =>
        dispatch(getProducts(res.data || defaultProducts)))
      .catch(err => console.log(err))

export const updateProduct = (product, productId) =>
  dispatch =>
    axios.put(`/api/products/${productId}`, product)
      .then(res =>
        dispatch(editProduct(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case EDIT_PRODUCT:
      return productUtils.edit(state, action.product);
    default:
      return state
  }
}
