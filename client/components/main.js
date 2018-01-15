import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import AdminDropdown from './AdminDropdown';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn, email, id} = props

  return (
    <div>
      <Link to="/"><h1 id="logo"><img src="chocolatier_logo.svg" /></h1></Link>
      <nav>
<<<<<<< HEAD
      {
        isLoggedIn
          ? <div>
            <h3>
              <Link to={`/users/${id}`}>Welcome {email} </Link>
            </h3>
            {/* The navbar will show these links after you log in */}
            <Link to="/">Home</Link>
            <a href="#" onClick={handleClick}>Logout</a>
            <Link to="/cart">Cart</Link>
          </div>
          : <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart</Link>
          </div>
      }
    </nav>
    <hr />
=======
        {
          isLoggedIn
            ? <div id="nav_links">
              <h3>
                <Link to={`/user/${id}`}>Welcome {email} </Link>
              </h3>
              {/* The navbar will show these links after you log in */}
              <Link to="/">Home</Link>
              <a href="#" onClick={handleClick}>Logout</a>
              <Link to="/cart">Cart</Link>
            </div>
            : <div id="nav_links">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/cart">Cart</Link>
              <AdminDropdown />
            </div>
        }
      </nav>
      <hr />
>>>>>>> 2b7ae772c9f8f11a2ddca9c812c8fa72740d9307
      {children}

      </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email,
    id: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
