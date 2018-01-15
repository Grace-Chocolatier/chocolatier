import React, { Component } from 'react';
import { connect } from 'react-redux';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import {Link} from 'react-router-dom';
import ActionInfo from 'material-ui/svg-icons/action/info';
import { fetchProducts } from '../store/products';
import { fetchCategories } from '../store/categories';
import SearchBar from 'material-ui-search-bar'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export class Products extends Component {

  constructor(){
    super();
    this.state = {
      currentProducts: [],
      dropDownValue: 0
    };
  }

  componentDidMount(){
    this.props.getProducts()
    .then((action) => this.setState({currentProducts: action.products}))
    .then(() => this.props.getCategories())
    .catch(err => console.log(err));
  }

  handleCategoryChange = (event, index, value) => {
    let currentProducts = this.props.products.filter(function(product) {return product.categoryId === value});
    value !== 0 ?
    this.setState({currentProducts, dropDownValue: value})
    :
    this.setState({currentProducts: this.props.products, dropDownValue: value});
  }

  render(){
<<<<<<< HEAD
    return(
      <div id="products_container">
        <div style={styles.root}>
          <GridList cellHeight={250} padding={20} cols={4} style={styles.gridList} >
            <Subheader className='subheader'>Products</Subheader>
            {this.props.products.map((product) => (
              <GridTile
                containerElement={<Link to={`/products/${product.id}`} />}
                key={product.id}
                className="chocolate_grid_tile"
                title={product.name}
                subtitle={<span> See More </span>}
                actionIcon={<IconButton><ActionInfo color="white" /></IconButton>}
              >
                <img src={product.imageUrl} />
              </GridTile>
            ))}
=======
    return (
      <div>
        <h1 align="center">Chocolates</h1>
        <div style={{display: "flex", flewFlow:"row wrap", justifyContent:"space-between",margin: "25px"}}>
          <SearchBar onChange={event => this.props.handleSearchChange.call(this, event)} 
              onRequestSearch={event => console.log('search pressed')}
              style={{minWidth: 400, maxWidth: 800}}
              hintText="Search All Chocolates"/>
        <DropDownMenu 
          value={this.state.dropDownValue}
          style={{width:200}}
          autoWidth={false}
          onChange={this.handleCategoryChange}>
            <MenuItem value={0} primaryText="All Packaging Types" />
            {
              this.props.categories.map((category) => 
                <MenuItem 
                  key={category.id}
                  value={category.id}
                  primaryText={category.name} />)
            }
        </DropDownMenu>
        </div>
        <div id="products_container">
          <GridList cellHeight={250} padding={20} cols={4} style={styles.gridList} >
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
>>>>>>> b81553cd60288b6ac88c5a84d7f5106df4206bde
          </GridList>
        </div>
      </div>
  )}
}

function mapStateToProps(state){
  return {
    products: state.products,
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch){
  return {
    getProducts: function (){
      return dispatch(fetchProducts())
    },
    getCategories: function(){
      return dispatch(fetchCategories())
    },
    handleSearchChange: function (event){
      let currentProducts = this.props.products.filter(function(product) {return product.name.toLowerCase().includes(event.toLowerCase())});
      this.setState({currentProducts});
    }
  }
}

const ProductsContainer = connect(mapStateToProps, mapDispatchToProps)(Products);
export default ProductsContainer;
