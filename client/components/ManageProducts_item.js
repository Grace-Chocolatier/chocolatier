import React, { Component } from 'react';
import { fetchProduct } from '../store/product';
import { connect } from 'react-redux';

class ManageProducts_item extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const productId = this.props.match.params.productId;
    this.props.getProduct(productId);
  }

  render() {
    console.log("ManageProducts_item.product", this.props.product)
    return (
      <h1>{this.props.product.name}</h1>
    )
  }
}

function mapStateToProps(state) {
  return {
    product: state.product
  };
}

function mapDispatchToProps(dispatch){
  return {
    getProduct: function (productId){
      dispatch(fetchProduct(productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts_item);