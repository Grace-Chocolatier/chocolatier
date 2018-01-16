import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { fetchCart, clearCart, deleteItem } from '../store/cart';
import orderUtils from '../../utils/orderUtils';
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
  textAlign: 'center'
};

class Cart extends Component {
	constructor(props){
		super(props);
		this.state = {
			madeOrder: false
		}
	}

	render() {
		return (
	      <div>
	       { this.state.madeOrder ?
	      	<h3 className='subtext'>Order Successful!</h3> :
					<h3 className='subtext'>Confirm Your Order</h3> }
					<Table>
						<TableHeader adjustForCheckbox={false} displaySelectAll={false}>
							<TableRow>
								<TableHeaderColumn style={style}>Name</TableHeaderColumn>
								<TableHeaderColumn style={style}>Price</TableHeaderColumn>
								<TableHeaderColumn style={style}>Quantity</TableHeaderColumn>
								<TableHeaderColumn style={style}>Delete/Edit</TableHeaderColumn>
							</TableRow>
						</TableHeader>

						<TableBody displayRowCheckbox={false}>
							{this.props.cart.map((product) => (
								<TableRow key={product.id}>
									<TableRowColumn style={style}><Link to={`/products/${product.id}`}>{product.name}</Link></TableRowColumn>
									<TableRowColumn style={style}>${product.price}</TableRowColumn>
									<TableRowColumn style={style}>{product.quantity}</TableRowColumn>
									<TableRowColumn style={style}>
										<RaisedButton 
											label="Delete"
											onClick={(event) => this.props.onDelete.call(this, event, product.id)} />
										<RaisedButton label="Edit" style={style} />
									</TableRowColumn>
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
		},
		onDelete: function(event, productId) {
			event.preventDefault();
			dispatch(deleteItem(productId))
		}
	}
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);
export default CartContainer;
