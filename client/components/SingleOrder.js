import React, { Component } from 'react';
import { fetchOrder } from '../store/order';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom'

const style = {
  margin: 12,
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
        <h5>OWNER: {order.user || 'GUEST'}</h5>
        <h5>ORDER ITEMS: </h5>
        {/*
          let's figure out the best way to approach handling the order items
          order.order_items.map(orderItem => (
          <textarea key={orderItem.id}>orderItem</textarea>)
        )*/}
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
