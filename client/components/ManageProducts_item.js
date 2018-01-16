import React, { Component } from 'react';
import { fetchProduct } from '../store/product';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { updateProduct, fetchProducts } from '../store/products';

class ManageProducts_item extends Component {
  constructor(props) {
    super(props);
    this.state = { product: {
      name: "",
      inventory: "",
      description: "",
      price: ""
    } }
    this.handleTextChange = this.props.handleTextChange.bind(this);
  }

  componentDidMount() {
    const productId = this.props.match.params.id;
    this.props.getProduct.call(this, productId);
    this.props.getProducts()
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        <h1>Edit {this.props.product.name}</h1>
        <TextField
          id="name"
          value={product.name}
          onChange={event => this.handleTextChange(event, 'name')}
        /><br />
        <TextField
          id="inventory"
          value={product.inventory}
          onChange={event => this.handleTextChange(event, 'inventory')}
        /><br />
        <TextField
          id="description"
          value={product.description}
          onChange={event => this.handleTextChange(event, 'description')}
        /><br />
        <TextField
          id="price"
          value={product.price}
          onChange={event => this.handleTextChange(event, 'price')}
        /><br /><br />
        <RaisedButton className="raised_button" label="Edit Product" onClick={() => this.props.onEdit(this.state.product, this.props.product.id)} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    product: state.product,
    products: state.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProduct: function (productId){
      dispatch(fetchProduct(productId))
      .then(product => this.setState(product));
    },
    getProducts: function (){
      return dispatch(fetchProducts())
    },
    handleTextChange: function (event, stateProperty){
      const newStateObj = { product : {}};
      newStateObj.product[stateProperty] = event.target.value;
      this.setState(newStateObj);
    },
    onEdit: function (productChange, productId) {
      dispatch(updateProduct(productChange, productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts_item);


