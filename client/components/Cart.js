import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { fetchCart, makeOrder ,deleteItem} from '../store/cart';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

class Cart extends Component {

	// constructor(props) {
	// 	super(props)
	// 	this.state = {selectedRow: null}
	// }

	render() {
		return (
			<div>
				<Table>
					<TableHeader adjustForCheckbox={true} displaySelectAll={false}>
						<TableRow>
		   					<TableHeaderColumn>Name</TableHeaderColumn>
					        <TableHeaderColumn>Price</TableHeaderColumn>
					        <TableHeaderColumn>Quantity</TableHeaderColumn>
							<TableHeaderColumn> </TableHeaderColumn>
	 					</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
					{this.props.cart.map((product) => (
						<TableRow key={product.id}>
					        <TableRowColumn><Link to={`/products/${product.id}`}>{product.name}</Link></TableRowColumn>
					        <TableRowColumn>${product.price}</TableRowColumn>
					        <TableRowColumn>{product.quantity}</TableRowColumn>
					        <TableRowColumn><button onClick={event => this.props.handleDeleteItem(event, product.id)}>Remove Item</button></TableRowColumn>
				      	</TableRow>
					))}
					</TableBody>
				</Table>
				<RaisedButton label="Confirm Order" style={style} onClick={event => this.props.handleConfirm(event, this.props.user.id, this.props.cart)} />
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

function mapDispatchToProps() {
	return {
		handleConfirm: function (event, userId, cart) {
			event.preventDefault();
			makeOrder(userId, cart);
		},
		handleDeleteItem: function (event, productId) {
			event.preventDefault();
			deleteItem(productId);
		}
	}
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);
export default CartContainer;
