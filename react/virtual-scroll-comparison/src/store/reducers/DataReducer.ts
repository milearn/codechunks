import * as types from '../types';

const initialState = {
  picsumResults: [],
  tenorResults: [],
  next: '',
  error: '',
};

const DataReducer = (state = initialState, action: any) => {
  let response;
  switch (action.type) {
    case types.CLEAR_DATA:
      return {
        ...state,
        picsumResults: [],
        tenorResults: [],
        next: '',
      };

    case types.FETCH_PICSUM_DATA_LIST:
    case types.FETCH_TENOR_DATA_LIST:
      return {
        ...state,
        loading: true,
        error: '',
      };

    case types.FETCH_TENOR_DATA_LIST_SUCCESS: {
      response = action.result || { results: [], next: '' };
      return {
        ...state,
        tenorResults: [...state.tenorResults, ...response.results],
        next: response?.next,
        loading: false,
      };
    }

    case types.FETCH_PICSUM_DATA_LIST_SUCCESS: {
      response = action.result || { results: [], next: '' };
      return {
        ...state,
        picsumResults: [...state.picsumResults, ...response],
        next: response?.next,
        loading: false,
      };
    }

    case types.FETCH_PICSUM_DATA_LIST_FAILURE:
    case types.FETCH_TENOR_DATA_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };

    default:
      return state;
  }
};

export default DataReducer;
