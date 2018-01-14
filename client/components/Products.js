import React, { Component } from 'react';
import { connect } from 'react-redux';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import ActionInfo from 'material-ui/svg-icons/action/info';
import { fetchProducts } from '../store/products';
import SearchBar from 'material-ui-search-bar'

const styles = {}

export class Products extends Component {

  constructor(){
    super();
    this.state = {currentProducts: []};
  }

  componentDidMount(){
    this.props.getProducts()
    .then((action) => this.setState({currentProducts: action.products}))
    .catch(err => console.log(err))
  }

  render(){
    return(
      <div>
        <SearchBar onChange={event => this.props.handleOnChange.call(this, event)} 
          onRequestSearch={event => console.log('search pressed')}/>
        <div style={styles.root}>
          <GridList cellHeight={350} style={styles.gridList} >
            <Subheader className='subheader'>Products</Subheader>
            {this.state.currentProducts.map((product) => 
                <GridTile
                  containerElement={<Link to={`/products/${product.id}`} />}
                  key={product.id}
                  className="chocolate_grid_tile"
                  title={product.name}
                  subtitle={<span> See More </span>}
                  actionIcon={<IconButton><ActionInfo color="white" /></IconButton>}>
                  <img src={product.imageUrl} />
                </GridTile>
            )}
          </GridList>
        </div>
      </div>
  )}
}

function mapStateToProps(state){
  return {
    products: state.products,
  }
}

function mapDispatchToProps(dispatch){
  return {
    getProducts: function (){
      return dispatch(fetchProducts())
    },
    handleOnChange: function (event){
      let currentProducts = this.props.products.filter(function(product) {return product.name.toLowerCase().includes(event.toLowerCase())});
      this.setState({currentProducts});
    }
  }
}

const ProductsContainer = connect(mapStateToProps, mapDispatchToProps)(Products);
export default ProductsContainer;
