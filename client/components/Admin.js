import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router-dom'
import Admin_dashboard from './Admin_dashboard';

export default class Admin extends Component {
  render() {
    return (
        <div>
          <h1>Admin</h1>
          <Switch>
              <Route path="/dashboard" component={Admin_dashboard} />
          </Switch>
        </div>
    );
  }
}