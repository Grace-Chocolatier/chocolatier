import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Products} from './Products'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Products', () => {

	let products

	beforeEach(() => {
		products = shallow(<Products products={[
				{name: 'Butterscotch Square'},
				{name: 'Cafe au Lait Truffle'},
				{name: 'Chelsea'}
			]} categories={[]} />)
	})

	it('renders something', () => {
		expect(products.find('GridTile').nodes.length.to.be.equal(3))
	})
})
