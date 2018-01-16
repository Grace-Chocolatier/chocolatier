import React, { Component } from 'react';
import ReviewForm from './ReviewForm';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

export const Review = (props) => {

      return (
        <div>
          <ReviewForm />
          <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow >
                <TableHeaderColumn>Rating</TableHeaderColumn>
                <TableHeaderColumn>Review</TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody displayRowCheckbox={false}>
              {props.reviews && props.reviews.map(review => {
                return (
                  <TableRow key={review.id} >
                    <TableRowColumn>{review.rating}</TableRowColumn>
                    <TableRowColumn>{review.description}</TableRowColumn>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )
}

