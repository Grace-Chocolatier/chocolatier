import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SingleUser extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  render () {
    return (
      <div>
        <h1>Single User Will Go Here</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {}

let SingleUserContainer = connect(mapStateToProps, mapDispatchToProps)(SingleUser);
export default SingleUserContainer;
