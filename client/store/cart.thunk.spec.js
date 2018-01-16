import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { fetchCart, postCart } from './cart'
import axios from 'axios'
import {expect} from 'chai'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('cart thunks', () => {
  let store
  let mockAxios

  const fakeCart = [
    {id: 0, name: 'Product 1', quantity: 5},
    {id: 1, name: 'Product 2', quantity: 6},
    {id: 2, name: 'Product 3', quantity: 7},
    {id: 3, name: 'Product 4', quantity: 1},
    {id: 4, name: 'Product 5', quantity: 2}]

  const initialState = {cart: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

    describe('fetchCart', () => {
      it('gets items from the cart', () => {
        mockAxios.onGet('/api/cart').replyOnce(200, fakeCart)
        return store.dispatch(fetchCart())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_CART')
          expect(actions[0].products).to.be.deep.equal(fakeCart)
        })
      })
    })

    describe('postCart', () => {
      it('adds items the cart', () => {
        let fakeProduct = {id: 5, name: 'Product 5', quantity: 2}
        mockAxios.onPost('/api/cart', fakeProduct).replyOnce(200, fakeProduct)
        return store.dispatch(postCart(fakeProduct))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('ADD_TO_CART')
          expect(actions[0].product).to.be.deep.equal(fakeProduct)
        })
      })
    })
})
