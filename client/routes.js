import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome } from './components'
import {me} from './store'
import Products from './components/Products';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import SingleProduct from './components/SingleProduct';
import SingleUser from './components/SingleUser';
import Admin from './components/Admin';
import Cart from './components/cart';
import {fetchCart} from './store/cart';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    return (
      <Router history={history}>
        <MuiThemeProvider >
          <Main>
            <Switch>
              <Route path="/admin" component={Admin} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/cart" component={Cart}/>
              <Route exact path='/products/:productId' component={SingleProduct} />
              <Route exact path='/users/:userId' component={SingleUser} />
              <Route component={Products} />
            </Switch>
          </Main>
        </MuiThemeProvider>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(fetchCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
