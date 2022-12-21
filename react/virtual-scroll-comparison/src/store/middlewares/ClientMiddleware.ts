/* eslint-disable no-console */
import { SUCCESS_DEFAULT, FAILURE_DEFAULT } from '../types';

export default function clientMiddleware(httpClient: any) {
  return ({ dispatch, getState }: any) => {
    return (next: any) => (action: any) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      const { promise, types, ...rest } = action;
      if (!promise) {
        return next(action);
      }
      const [REQUEST, SUCCESS = SUCCESS_DEFAULT, FAILURE = FAILURE_DEFAULT] = types;
      next({ ...rest, type: REQUEST });

      return promise(httpClient, { ...getState() })
        .then(
          (result: any) => {
            if (result && result.data) {
              next({ ...rest, result: result.data, type: SUCCESS });
            } else if (result && result.error && result.error.message) {
              const error = {
                message: result.error.message,
              };
              next({ ...rest, error, type: FAILURE });
            } else {
              const error = {
                message: 'Unexpected error occured, try again later',
              };
              next({ ...rest, error, type: FAILURE });
            }
          },
          (error: any) => {
            error.message = 'Unexpected error occured, try again later';
            next({ ...rest, error, type: FAILURE });
          }
        )
        .catch((error: any) => {
          console.error('MIDDLEWARE ERROR:', error);
        });
    };
  };
}
