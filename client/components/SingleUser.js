import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../store/user'

class SingleUser extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getUser(userId);
    console.log(this.props.user)
  }
  render () {
    return (
      <div>
        <h1>{this.props.user.email}</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: function (user){
      dispatch(fetchUser(user));
    },
  }
}

let SingleUserContainer = connect(mapStateToProps, mapDispatchToProps)(SingleUser);
export default SingleUserContainer;
