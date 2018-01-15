import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { fetchOrders } from '../store/orders';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'

const style = {}

class ManageOrders extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.getOrders()
  }

  render() {
      return (
        <div>
          <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow >
                <TableHeaderColumn>Order Number</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
                <TableHeaderColumn>Order Total</TableHeaderColumn>
                <TableHeaderColumn>Order Details</TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody displayRowCheckbox={false}>
              {this.props.orders.map(order => {
                return (
                  <TableRow key={order.id} >
                    <TableRowColumn>{order.id}</TableRowColumn>
                    <TableRowColumn>{order.status}</TableRowColumn>
                    <TableRowColumn>{order.orderTotal || '$'}
                    </TableRowColumn>
                    <TableRowColumn>{<Link to={`/manage/orders/${order.id}`}>Details</Link>}</TableRowColumn>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )
  }
}

function mapStateToProps(state){
  return {
    orders: state.orders
  };
}

function mapDispatchToProps(dispatch){
  return {
    getOrders: function (){
      dispatch(fetchOrders())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrders);
