import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { fetchUsers } from '../store/users';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class ManageUsers extends Component {

  constructor(props){
    super(props)
    this.state = {selectedRow: [-1], currentSelected: {}}
  }

  componentDidMount(){
    this.props.getUsers()
    this.props.clearSelectedUser.call(this);
  }

  render() {
      return (
          <Table
            onRowSelection={(row) => {
            this.props.handleRowSelection.call(this, row)} }
            className="student_table">

            <TableHeader adjustForCheckbox={true} displaySelectAll={false}>
              <TableRow >
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Admin</TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody deselectOnClickaway={false} displayRowCheckbox={true}>
              {this.props.users.map((user, idx) => {
                return (
                  <TableRow key={user.id} selected={this.props.isSelected.call(this, idx)}>
                    <TableRowColumn>{user.id}</TableRowColumn>
                    <TableRowColumn>{user.email}</TableRowColumn>
                    <TableRowColumn>{user.isAdmin}</TableRowColumn>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
      )
  }
}

function mapStateToProps(state){
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch){
  return {
    getUsers: function (){
      dispatch(fetchUsers())
    },
    clearSelectedUser: function (){
      this.setState({selectedRow: [-1]});
    },
    handleRowSelection: function (row){
      this.setState({ selectedRow: row, currentSelected: this.props.users[row[0]]})
    },
    isSelected: function (index) {
      let selected = this.state.selectedRow.indexOf(index) !== -1;
      return selected
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
