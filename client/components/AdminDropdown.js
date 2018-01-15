import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom'

export default class AdminDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div id="admin_drop">
        <DropDownMenu value={1} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="Admin Console" />
          <Link to="/manage/users"><MenuItem value={2} primaryText="Users" /></Link>
          <Link to="/manage/orders"><MenuItem value={3} primaryText="Orders" /></Link>
          <Link to="/manage/products"><MenuItem value={4} primaryText="Products" /></Link>
        </DropDownMenu>
      </div>
    );
  }
}

