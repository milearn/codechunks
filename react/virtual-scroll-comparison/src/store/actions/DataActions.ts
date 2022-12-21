import * as types from '../types';
const TENOR_API_KEY = 'KNBPX4JGLION';
const URL_TENOR = `https://g.tenor.com/v1/random?q=excited&&contentfilter=high&media_filter=basic&limit=20&key=${TENOR_API_KEY}`;

const URL_PICSUM = 'https://picsum.photos/v2/list?limit=50';

export function fetchPicsumDataList(nextBool = false) {
  return {
    types: [
      types.FETCH_PICSUM_DATA_LIST,
      types.FETCH_PICSUM_DATA_LIST_SUCCESS,
      types.FETCH_PICSUM_DATA_LIST_FAILURE,
    ],
    promise: (client: any, { data: { next } }: any) => {
      let nextURL = URL_PICSUM;
      if (nextBool) nextURL = `${URL_PICSUM}&page=${next}`;

      return client.get(nextURL);
    },
  };
}

export function fetchTenorDataList(nextBool = false) {
  return {
    types: [
      types.FETCH_TENOR_DATA_LIST,
      types.FETCH_TENOR_DATA_LIST_SUCCESS,
      types.FETCH_TENOR_DATA_LIST_FAILURE,
    ],
    promise: (client: any, { data: { next } }: any) => {
      let nextURL = URL_TENOR;
      if (nextBool) nextURL = `${URL_TENOR}&pos=${next}`;

      return client.get(nextURL);
    },
  };
}

export function clearData() {
  return {
    type: types.CLEAR_DATA,
  };
}
