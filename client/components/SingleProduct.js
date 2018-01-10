import React, { Component } from 'react';
import { fetchProduct } from '../store/product';
import { connect } from 'react-redux';
import { postCart } from '../store/cart';

class SingleProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {quantity: 0}
  }

  componentDidMount() {
    // OB/EC: potential bug, consider doing this in `componentWillReceiveProps` and only when the nextProps.match.params.productId is different than the this.props.match.params.productId
    const productId = this.props.match.params.productId;
    this.props.getProduct(productId);
  }

  render () {
    const { product } = this.props;

    return (
      <div>

        <form onSubmit={(e) => this.props.handleSubmit(e, this.props.product, this.state.quantity)}>
            <label>
              Quantity:
                <input onChange={this.props.handleChange.bind(this)} type="text" value={this.state.quantity} name="name" />
            </label>
            <input type="submit" value="Submit" />
          </form>
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
    },
    handleSubmit: function (e, product, quantity) {
      console.log(quantity, product);
      e.preventDefault();
      dispatch(postCart(Object.assign(product, {quantity})))
    },
    handleChange: function (e) {
      e.preventDefault();
      this.setState({quantity: e.target.value})
    }
  }
}

let SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
export default SingleProductContainer;
