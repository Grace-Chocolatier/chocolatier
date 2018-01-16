import React, { Component } from 'react';
import { fetchOrder } from '../store/order';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const style = {
  margin: 12,
  alignText: 'center'
};

class SingleOrder extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const orderId = this.props.match.params.orderId;
    this.props.getOrder(Number(orderId));
  }

  render () {
    const { order } = this.props
    return (
      <div>
        <h1>ORDER #: {order.id}</h1>
        <h3>Details</h3>
        <h5>ORDER TOTAL: ${order.order_total}</h5>
        <h5>ORDER STATUS: {order.status}</h5>
        <h5>OWNER: {order.user && order.user.email || 'GUEST'}</h5>
        <h5>ORDER ITEMS: </h5>
        <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={style}>Order Item ID</TableHeaderColumn>
                <TableHeaderColumn style={style}>Price</TableHeaderColumn>
                <TableHeaderColumn style={style}>Quantity</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {order.order_items && order.order_items.map((product) => (
                <TableRow key={product.id}>
                  <TableRowColumn style={style}><Link to={`/products/${product.id}`}>{product.id}</Link></TableRowColumn>
                  <TableRowColumn style={style}>${product.item_total}</TableRowColumn>
                  <TableRowColumn style={style}>{product.quantity}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    order: state.singleOrder
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrder: function (orderId){
      dispatch(fetchOrder(orderId));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleOrder));
