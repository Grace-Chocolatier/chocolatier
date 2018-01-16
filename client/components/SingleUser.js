import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchOrders } from '../store/orders'
import { fetchProduct } from '../store/products';

class SingleUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getOrders(userId);

  }
  render () {
    const { user, orders } = this.props;
    return (
      <div>
        <h1>{user.email}</h1>
        <ul>
          {
            orders.map((order) => {
              return <li key={order.id}>{order.id}</li>
            })
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    orders: state.orders
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrders: function (userId) {
      dispatch(fetchOrders(userId))
    },
    getProduct: function(productId) {
      dispatch(fetchProduct(productId))
    }
  }
}

let SingleUserContainer = connect(mapStateToProps, mapDispatchToProps)(SingleUser);
export default SingleUserContainer;
