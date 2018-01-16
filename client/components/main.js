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
  const {children, handleClick, isLoggedIn, email, id, isAdmin} = props

  return (
    <div>
      {(isLoggedIn && isAdmin) &&
        <div id="admin_bar">
          <AdminDropdown />
        </div>
      }
      <div className="container">
        <div id="logo"><Link to="/"><img src="chocolatier_logo.svg" /></Link></div>
            {
              isLoggedIn
                ? 
                <nav>
                  <div className="nav_left">
                    <Link to={`/users/${id}`}>Welcome {email} </Link>
                  </div>
                  {/* The navbar will show these links after you log in */}
                  <div className="nav_right">
                    <div className="nav_links">
                      <Link to="/">Home</Link>
                      <a href="#" onClick={handleClick}>Logout</a>
                      <Link to="/cart">Cart</Link>
                    </div>
                  </div>
                </nav>
                : <nav>
                    <div className="nav_right">
                      <div className="nav_links">
                  {/* The navbar will show these links before you log in */}
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/cart">Cart</Link>
                      </div>
                    </div>
                  </nav>
            }
        <div className="line"></div>
        {children}
        <div id="footer">
          <div className="line"></div>
        </div>
      </div>
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
    id: state.user.id,
    isAdmin: state.user.isAdmin
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
