import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { fetchUsers, deleteUser, updateUser } from '../store/users';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

const style = {}

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
        <div>
          <Table
            onRowSelection={(row) => {
            this.props.handleRowSelection.call(this, row)} } >

            <TableHeader adjustForCheckbox={true} displaySelectAll={false}>
              <TableRow >
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Admin</TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody deselectOnClickaway={false} displayRowCheckbox={true}>
              {this.props.users.map((user, idx) => {
                return (
                  <TableRow key={user.id} selected={this.props.isSelected.call(this, idx)}>
                    <TableRowColumn>{user.id}</TableRowColumn>
                    <TableRowColumn>{user.email}</TableRowColumn>
                    <TableRowColumn>{user.isAdmin.toString()}</TableRowColumn>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <RaisedButton className="raised_button" label="Delete User" disabled={false} style={style} onClick={this.props.deleteUser.bind(this, this.state.currentSelected)} />
          <RaisedButton className="raised_button" label="Make An Admin" disabled={false} style={style} onClick={this.props.makeAdmin.bind(this, this.state.currentSelected)} />
        </div>
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
    },
    deleteUser: function(user) {
      dispatch(deleteUser(user))
      .then(() => this.setState({ selectedRow: [ -1 ], currentSelected: {}}))
    },
    makeAdmin: function(user) {
      dispatch(updateUser(user))
      .then(() => this.setState({ selectedRow: [ -1 ], currentSelected: {}}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
