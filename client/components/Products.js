import React, { Component } from 'react';
import { connect } from 'react-redux';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import {Link} from 'react-router-dom';
import ActionInfo from 'material-ui/svg-icons/action/info';
import { fetchProducts } from '../store/products';
import SearchBar from 'material-ui-search-bar'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export class Products extends Component {

  constructor(){
    super();
    this.state = {currentProducts: []};
  }

  componentDidMount(){
    this.props.getProducts()
    .then((action) => this.setState({currentProducts: action.products}))
    .catch(err => console.log(err));
  }

  handleChange = (event, index, value) => {
    let currentProducts = this.props.products.filter(function(product) {return product.category === value});
    value ? this.setState({currentProducts}) : this.setState({currentProducts:this.props.products});
  }

  render(){
    return(
      <div>
        <h1 align="center">Chocolates</h1>
        <div style={{display: "flex", flewFlow:"row wrap", justifyContent:"space-between",margin: "25px"}}>
          <SearchBar onChange={event => this.props.handleSearchChange.call(this, event)} 
              onRequestSearch={event => console.log('search pressed')}
              style={{minWidth: 400, maxWidth: 800}}
              hintText="Search All Chocolates"/>
        <DropDownMenu 
          value={1} 
          style={{width:200}}
          autoWidth={false}
          onChange={this.handleChange}>
            <MenuItem value={1} primaryText="Packaging Types" />
            <MenuItem primaryText="All" />
            <MenuItem value="bar" primaryText="Candy Bar" />
            <MenuItem value="individual" primaryText="Individual Piece" />
            <MenuItem value="box" primaryText="Pre-Packaged Box" />
        </DropDownMenu>
        </div>
        <div>
          <GridList cellHeight={350}>
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
    handleSearchChange: function (event){
      let currentProducts = this.props.products.filter(function(product) {return product.name.toLowerCase().includes(event.toLowerCase())});
      this.setState({currentProducts});
    },
    handleCategoryChange: function(event, key, value){
      let currentProducts = this.props.products.filter(function(product) {return product.category === value})
      console.log(event.target)
      this.setState({currentProducts});
    }
  }
}

const ProductsContainer = connect(mapStateToProps, mapDispatchToProps)(Products);
export default ProductsContainer;
