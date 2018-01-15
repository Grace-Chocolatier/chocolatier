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
    this.state = {quantity: 0}
  }

  componentDidMount() {
    // OB/EC: potential bug, consider doing this in `componentWillReceiveProps` and only when the nextProps.match.params.productId is different than the this.props.match.params.productId
    const productId = this.props.match.params.productId;
    this.props.getProduct(productId);
    this.setState({quantity: 0});
  }

  render () {
    const { product } = this.props;
    return (
      <div>

        <form onSubmit={(e) => this.props.handleSubmit.call(this, e, this.props.product, this.state.quantity)}>
            <label className="subtext">
              Quantity:
                <input onChange={this.props.handleChange.bind(this)} type="text" value={this.state.quantity} name="name" />
            </label>
        </form>
        <h1>{product.name}</h1>
        <div className="listViewButtons">
              <RaisedButton label="Add To Cart" disabled={!this.state.quantity > 0} onClick={e => this.props.handleSubmit.call(this, e, this.props.product, this.state.quantity)} style={style} />
              <RaisedButton className="raised_button" label="+" onClick={this.props.incrementQuantity.bind(this)} style={style} />
              <RaisedButton className="raised_button" label="-" disabled={!this.state.quantity > 0} style={style} onClick={this.props.decrementQuantity.bind(this)} />
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
    getProduct: function (productId){
      dispatch(fetchProduct(productId));
    },
    handleSubmit: function (e, product, quantity) {
      quantity = +quantity
      e.preventDefault();
      dispatch(postCart(Object.assign({}, product, {quantity})))
      this.setState({quantity: 0})
    },
    // add handleChange, incrementQuantity, decrementQuantity to class method
    handleChange: function (e) {
      e.preventDefault();
      this.setState({quantity: Number(e.target.value)})
    },
    incrementQuantity: function(e) {
      e.preventDefault();
      let quantity = this.state.quantity + 1
      this.setState({ quantity })
    },
    decrementQuantity: function(e) {
      e.preventDefault();
      let quantity = this.state.quantity - 1
      this.setState({ quantity })
    }
  }
}

let SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
export default SingleProductContainer;
