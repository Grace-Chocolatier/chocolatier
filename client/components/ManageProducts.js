import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { fetchProducts } from '../store/products';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Route, Link, Switch } from 'react-router-dom'
import ManageProducts_item from './ManageProducts_item';

const style = {}

class ManageProducts extends Component {

  constructor(props){
    super(props)
    this.state = {selectedRow: [-1], currentSelected: {}}
  }

  componentDidMount(){
    this.props.getProducts()
    this.props.clearSelectedProduct.call(this);
  }

  render() {
      console.log("state is", this.state)
      return (
        <div>
          <RaisedButton className="raised_button" label="Edit Selected Item" disabled={false} style={style} containerElement={<Link to={`/manage/products/${this.state.currentSelected.id}`} state={this.state.currentSelected}></Link>} />
          <Table
            onRowSelection={(row) => {
            this.props.handleRowSelection.call(this, row)} } >

            <TableHeader adjustForCheckbox={true} displaySelectAll={false}>
              <TableRow >
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
                <TableHeaderColumn>Price</TableHeaderColumn>
                <TableHeaderColumn>Inventory</TableHeaderColumn>
                <TableHeaderColumn>Image URL</TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody deselectOnClickaway={false} displayRowCheckbox={true}>
              {this.props.products.map((product, idx) => {
                return (
                  <TableRow key={product.id} selected={this.props.isSelected.call(this, idx)}>
                    <TableRowColumn>{product.id}</TableRowColumn>
                    <TableRowColumn>{product.name}</TableRowColumn>
                    <TableRowColumn>{product.description}</TableRowColumn>
                    <TableRowColumn>{product.price}</TableRowColumn>
                    <TableRowColumn>{product.inventory}</TableRowColumn>
                    <TableRowColumn>{product.imageUrl}</TableRowColumn>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <Switch>
            <Route path="/:id" render={() => <ManageProducts_item product={this.state.currentSelected} />} />
          </Switch>
        </div>
      )
  }
}

function mapStateToProps(state){
  return {
    products: state.products
  };
}

function mapDispatchToProps(dispatch){
  return {
    getProducts: function (){
      dispatch(fetchProducts())
    },
    clearSelectedProduct: function (){
      this.setState({selectedRow: [-1]});
    },
    handleRowSelection: function (row){
      this.setState({ selectedRow: row, currentSelected: this.props.products[row[0]]})
    },
    isSelected: function (index) {
      let selected = this.state.selectedRow.indexOf(index) !== -1;
      return selected
    },
    deleteProduct: function(product) {
      dispatch(deleteProduct(product))
      .then(() => this.setState({ selectedRow: [ -1 ], currentSelected: {}}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts);
