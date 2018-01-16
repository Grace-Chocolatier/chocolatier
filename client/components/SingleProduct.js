import React, { Component } from 'react';
import { fetchProduct } from '../store/product';
import { connect } from 'react-redux';
import { postCart } from '../store/cart';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

class SingleProduct extends Component {

  constructor(props) {
    super(props);
    this.state = { quantity: 1 }
  }

  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.getProduct(productId);
    this.setState({ quantity: 1 });
  }

  render() {
    const { product } = this.props;
    return (
      <div className="product_item">
        <div className="product_img">
          <img src={product.imageUrl} />
        </div>
        <div className="product_info">
          <span className="product_name">{product.name}</span>
          <span className="product_description">{product.description}</span>
          <span className="product_price">${product.price}</span>
          <div className="line"></div>
          <form onSubmit={(e) => this.props.handleSubmit.call(this, e, this.props.product, this.state.quantity)}>
            <label className="subtext">
              Quantity:
                  <input onChange={this.props.handleChange.bind(this)} type="text" value={this.state.quantity} name="name" />
            </label>
          </form>
          <div className="listViewButtons">
            <RaisedButton className="raised_button" label="+" onClick={this.props.incrementQuantity.bind(this)} style={style} />
            <RaisedButton className="raised_button" label="-" disabled={!this.state.quantity > 0} style={style} onClick={this.props.decrementQuantity.bind(this)} />
          </div>
          <div className="product_add">
            <RaisedButton label="Add To Cart" disabled={!this.state.quantity > 0} onClick={e => this.props.handleSubmit.call(this, e, this.props.product, this.state.quantity)} style={style} />
          </div>
        </div>
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
    getProduct: function (productId) {
      dispatch(fetchProduct(productId));
    },
    handleSubmit: function (e, product, quantity) {
      quantity = +quantity
      e.preventDefault();
      dispatch(postCart(Object.assign({}, product, { quantity })))
      this.setState({ quantity: 0 })
    },
    handleChange: function (e) {
      e.preventDefault();
      this.setState({ quantity: Number(e.target.value) })
    },
    incrementQuantity: function (e) {
      e.preventDefault();
      let quantity = this.state.quantity + 1
      this.setState({ quantity })
    },
    decrementQuantity: function (e) {
      e.preventDefault();
      let quantity = this.state.quantity - 1
      this.setState({ quantity })
    }
  }
}

let SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
export default SingleProductContainer;
