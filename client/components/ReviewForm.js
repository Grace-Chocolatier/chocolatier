var Rating = require('react-rating');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeReview, postReview } from '../store/review'

class NewReview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentRating: 0,
      description: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleChange (value) {
    if (value) {
      this.setState({
        currentRating: Number(value)
      })
    }
  }

  handleDescriptionChange (evt) {
    evt.preventDefault();
    this.setState({
      description: evt.target.value
    })
  }

  render () {
    const { handleSubmit, newReview, productId } = this.props;
    return (
      <div>
        <Rating
          placeholderRating={this.state.currentRating}
          onChange={this.handleChange} />
        <form onSubmit={(e) => handleSubmit.call(this, e, productId, this.state.currentRating, this.state.description)}>
          <div className="form-group">
            <label htmlFor="name" style={{color:"white"}}>Create a Review</label>
            <input
              value={newReview}
              className="form-control"
              type="text"
              name="description"
              placeholder="Enter review"
              onChange={this.handleDescriptionChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-default">Create Review</button>
          </div>
        </form>
      </div>
    );
  }

}

const mapStateToProps = function (state) {
  return {
    newReview: state.newReview,
    productId: state.product.id
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    handleSubmit (evt, productId, rating, description) {
      evt.preventDefault();
      dispatch(postReview({description: description, rating: rating, productId: productId}))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewReview)
