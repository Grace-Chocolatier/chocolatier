import React, { Component } from 'react';
import { fetchProduct } from '../store/product';
import { connect } from 'react-redux';

class SingleProduct extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.getProduct(productId);
  }
  render () {
    const { product } = this.props;

    return (
      <div>
        <h1>{product.name}</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProduct: function (productId){
      dispatch(fetchProduct(productId));
    }
  }
}

let SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
export default SingleProductContainer;
