import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { fetchCart } from '../store/cart';

class Cart extends Component {
	render() {
		return(
			<div>
				{console.log(this.props)}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		cart: state.cart,
		user: state.user
	};
}

const CartContainer = connect(mapStateToProps)(Cart);
export default CartContainer;