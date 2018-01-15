import React, { Component } from 'react';

export default class ManageProducts_item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("this.props", this.props)
    return (
      <h1>works!</h1>
    )
  }
}