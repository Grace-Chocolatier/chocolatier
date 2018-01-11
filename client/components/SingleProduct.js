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
    const productId = this.props.match.params.productId;
    this.props.getProduct(productId);
    this.setState({quantity: 0});
  }

  render () {
    const { product } = this.props;

    return (
      <div>

        <form onSubmit={(e) => this.props.handleSubmit.call(this, e, this.props.product, this.state.quantity)}>
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
      //I CAN'T FIGURE THIS OUT FOR THE LIFE OF ME
      // 1. CLEAR BROWSER HISTORY
      // 2. ADD 10 TO THE QUANTITY AND SUBMIT 3 TIMES
      // 3. THE QUANTITY === 20 EACH TIME???? WHY???
      // 4. WORKS PROPERLY AFTER PAGE REFRESH
      // observation - somehow the product already has a quantity key on it when it hits this function? but i don't know how?
      console.log('Product before adding quantity: ', product, "quantity: ", quantity)
      product.quantity = +quantity
      console.log('PRODUCT after adding quantity', product, 'quantity: ', quantity)
      e.preventDefault();
      dispatch(postCart(product))
      this.setState({quantity: 0})
    },
    handleChange: function (e) {
      e.preventDefault();
      this.setState({quantity: e.target.value})
    }
  }
}

let SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
export default SingleProductContainer;
