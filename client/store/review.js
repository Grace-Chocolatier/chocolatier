import axios from 'axios';

// action types
const WRITE_REVIEW = 'WRITE_REVIEW';

// action creators
export function writeReview (review) {
  const action = { type: WRITE_REVIEW, review };
  return action;
}

const initialState = '';

// thunk creator
export function postReview (review) {
  return function thunk (dispatch) {
    return axios.post(`/api/products/${review.productId}/reviews`, review)
      .then(function (res) {
        return res.data
      })
      .then(function (newReview) {
        dispatch(writeReview(newReview));
      });
  };
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case WRITE_REVIEW:
    return {
      ...state,
      newReview: action.review
    };
  default:
    return state;
  }
}
