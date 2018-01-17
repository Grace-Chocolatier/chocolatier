import reducer from './users'
import {expect} from 'chai';
import {createStore} from 'redux';

describe('Users Reducer', () => {
	let testStore;
	beforeEach('Create testing store', () => {
		testStore = createStore(reducer);
	});

	it('has expected initial state', () => {
		expect(testStore.getState()).to.be.deep.equal([])
	})

	it('successfully gets users', () => {
		let users = [
			{id: 0, email:'someone@email.com', isAdmin: false},
			{id: 1, email:'someoneElse@email.com', isAdmin: true}
		];
		testStore.dispatch({type: 'GET_USERS', users})
		expect(testStore.getState()).to.be.deep.equal(users);
	})

	it('sucessfully delete users', () => {
		let users = [
			{id: 0, email:'someone@email.com', isAdmin: false},
			{id: 1, email:'someoneElse@email.com', isAdmin: true}
		];
		testStore.dispatch({type: 'GET_USERS', users})
		testStore.dispatch({type:'DELETE_USER', user:users[0]})
		expect(testStore.getState()).to.be.deep.equal([users[1]]);
	})
})