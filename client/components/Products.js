import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import ActionInfo from 'material-ui/svg-icons/action/info';
import { fetchProducts } from '../store/product';

class Products extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getProducts();
  }

  render(){
    return(
      <div>
        <div style={styles.root}>
          <GridList cellHeight={350} style={styles.gridList} >
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
          </GridList>
        </div>
      </div>
  )}
}

function mapStateToProps(state){
  return {
    products: state.products
  };
}

function mapDispatchToProps(dispatch){
  return {
    getProducts: function (){
      dispatch(fetchProducts());
    },
  }
}
