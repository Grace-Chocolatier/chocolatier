import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { fetchCart, clearCart } from '../store/cart';
import orderUtils from '/utils/orderUtils';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

class Cart extends Component {
  constructor(props){
    super(props);
    this.state = {madeOrder: false}
  }

	render() {
		return (
      <div>
       { this.state.madeOrder ?
      	<h3 className='subtext'>Order Successful!</h3> :
				<h3 className='subtext'>Confirm Your Order</h3> }

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

				<RaisedButton
					label="Confirm Order"
					style={style}
					onClick={event => this.props.onConfirm.call(this, event, this.props.user.id, this.props.cart)}
					disabled={!this.props.cart.length > 0} />

				<RaisedButton
					label="Clear Cart"
					style={style}
					onClick={this.props.onClear}
					disabled={!this.props.cart.length > 0} />
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

function mapDispatchToProps(dispatch) {
	return {
		onConfirm: function (event, userId, cart) {
			event.preventDefault();
      orderUtils.makeOrder(userId, cart);
      dispatch(clearCart())
      this.setState({madeOrder: true})
    },
    onClear: function (event) {
      event.preventDefault();
      dispatch(clearCart())
    }
	}
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);
export default CartContainer;
