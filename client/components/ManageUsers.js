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
    this.state = {selectedRow: [-1]}
  }

  componentDidMount(){
    this.props.getUsers()
    // this.props.clearSelectedUser();
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
              </TableRow>
            </TableHeader>

            <TableBody deselectOnClickaway={false} displayRowCheckbox={true}>
              {this.props.users.map((user, idx) => {
                console.log(idx)
                return (
                  <TableRow key={user.id} selected={this.props.isSelected.call(this, idx)}>
                    <TableRowColumn>{user.id}</TableRowColumn>
                    <TableRowColumn>{user.email}</TableRowColumn>
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
    // selectedUser: state.selectedUser
  };
}

function mapDispatchToProps(dispatch){
  return {
    getUsers: function (){
      dispatch(fetchUsers())
    },
    // clearSelectedStudent: function (){
    //   dispatch(selectedUserFromList({}));
    // },
    handleRowSelection: function (row){
      // row.length ? dispatch(selectedUserFromList(student)) : dispatch(selectedUserFromList({}))
      this.setState({ selectedRow: row })
//       this.setState({selectedRow: row[0]})
    },
    isSelected: function (index) {
      let selected = this.state.selectedRow.indexOf(index) !== -1;
      return selected
    }
//     updatePage: function (nextProps){
//       this.setState({selectedRow: null})
//     }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
