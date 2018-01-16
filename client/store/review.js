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
export function postReview (review) { // expecting review to be an object like: { rating: 0, description: 'description of review', productId: x }
  console.log(review)
  return function thunk (dispatch) {
    return axios.post(`/api/products/${review.productId}/reviews`, review)
      .then(function (res) {
        console.log('***deserialization***', res.data);
        return res.data
      })
      .then(function (newReview) {
        console.log('***review***', newReview);
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
