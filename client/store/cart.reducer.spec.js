import reducer from './cart'
import {expect} from 'chai';
import {createStore} from 'redux';

// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

describe('Cart reducer', () => {
  let testStore;
  beforeEach('Create testing store', () => {
    testStore = createStore(reducer);
  });

  it('has expected initial state', () => {
    expect(testStore.getState()).to.be.deep.equal([])
  })
  it('successfully adds an item', () => {
    let product = {name: 'Product 1', quantity: 5}
    testStore.dispatch({ type: 'ADD_TO_CART', product })
    expect(testStore.getState()).to.be.deep.equal([product])
  })
  it('successfully adds multiple items', () => {
    let product = {id: 0, name: 'Product 1', quantity: 5}
    let product1 = {id: 1, name: 'Product 2', quantity: 2}
    let product2 = {id: 2, name: 'Product 3', quantity: 6}
    let product3 = {id: 3, name: 'Product 4', quantity: 7}
    let product4 = {id: 4, name: 'Product 5', quantity: 1}
    testStore.dispatch({ type: 'ADD_TO_CART', product })
    testStore.dispatch({ type: 'ADD_TO_CART', product: product1 })
    testStore.dispatch({ type: 'ADD_TO_CART', product: product2 })
    testStore.dispatch({ type: 'ADD_TO_CART', product: product3 })
    testStore.dispatch({ type: 'ADD_TO_CART', product: product4 })
    expect(testStore.getState()).to.be.deep.equal([product, product1, product2, product3, product4]);
  })

  it('successfully removes an item', () => {
    let product = {id: 0, name: 'Product 1', quantity: 5}
    let product1 = {id: 1, name: 'Product 2', quantity: 2}
    let product2 = {id: 2, name: 'Product 3', quantity: 6}
    let product3 = {id: 3, name: 'Product 4', quantity: 7}
    let product4 = {id: 4, name: 'Product 5', quantity: 1}
    testStore.dispatch({ type: 'ADD_TO_CART', product })
    testStore.dispatch({ type: 'ADD_TO_CART', product: product1 })
    testStore.dispatch({ type: 'ADD_TO_CART', product: product2 })
    testStore.dispatch({ type: 'ADD_TO_CART', product: product3 })
    testStore.dispatch({ type: 'ADD_TO_CART', product: product4 })
    testStore.dispatch({ type: 'REMOVE_FROM_CART', productId: 1 })
    expect(testStore.getState()).to.be.deep.equal([product, product2, product3, product4]);
  })
  it('updates the quantity of a non-unique item', () => {
    let product = {id: 0, name: 'Product 1', quantity: 5}
    let product1 = {id: 1, name: 'Product 2', quantity: 2}
    let product2 = {id: 1, name: 'Product 2', quantity: 6}
    let product3 = {id: 1, name: 'Product 2', quantity: 7}
    let product4 = {id: 1, name: 'Product 2', quantity: 1}
    testStore.dispatch({ type: 'ADD_TO_CART', product })
    testStore.dispatch({ type: 'ADD_TO_CART', product: product1 })
    testStore.dispatch({ type: 'ADD_TO_CART', product: product2 })
    testStore.dispatch({ type: 'ADD_TO_CART', product: product3 })
    testStore.dispatch({ type: 'ADD_TO_CART', product: product4 })
    expect(testStore.getState()).to.be.deep.equal([product, {id: 1, name: 'Product 2', quantity: 16}]);
  })
  it('can empties the cart', () => {
    let product = {id: 0, name: 'Product 1', quantity: 5}
    let product1 = {id: 1, name: 'Product 2', quantity: 2}
    testStore.dispatch({ type: 'ADD_TO_CART', product })
    testStore.dispatch({ type: 'ADD_TO_CART', product: product1 })
    testStore.dispatch({ type: 'CLEAR_CART'})
    expect(testStore.getState()).to.be.deep.equal([]);
  })
})
