import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { fetchCart, makeOrder } from '../store/cart';
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
	render() {
		return (
			<div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn> </TableHeaderColumn>
		   					<TableHeaderColumn>Name</TableHeaderColumn>
					        <TableHeaderColumn>Price</TableHeaderColumn>
					        <TableHeaderColumn>Quantity</TableHeaderColumn>
	 					</TableRow>
					</TableHeader>
					<TableBody>
					{this.props.cart.map((product) => (
						<TableRow key={product.id}>
					        <TableRowColumn><img src={product.imgUrl} /></TableRowColumn>
					        <TableRowColumn><Link to={`/products/${product.id}`}>{product.name}</Link></TableRowColumn>
					        <TableRowColumn>${product.price}</TableRowColumn>
					        <TableRowColumn>{product.quantity}</TableRowColumn>
				      	</TableRow>
					))}
					</TableBody>
				</Table>
				<RaisedButton label="Confirm Order" style={style} onClick={event => this.props.onClick(event, this.props.user.id)} />
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
		onClick: function (event, user) {
			event.preventDefault();
			(user && user.id) ? makeOrder(user) : makeOrder(null);
		}
	}
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);
export default CartContainer;
