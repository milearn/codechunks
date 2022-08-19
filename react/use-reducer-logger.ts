import { useCallback } from 'react';
// source: https://github.com/Zaelot-Inc/use-reducer-logger
const getCurrentTimeFormatted = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const milliseconds = currentTime.getMilliseconds();
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

const Logger = (reducer: any) => {
  const reducerWithLogger = useCallback(
    (state, action) => {
      // diff checker:
      const next = reducer(state, action);
      // Get all keys from previous and current
      const allKeys = Object.keys({ ...state, ...next });
      // Use this object to keep track of changed
      const changesObj: any = {};
      // Iterate through keys
      allKeys.forEach((key) => {
        // If previous is different from current
        if (!Object.is(state[key], next[key])) {
          // Add to changesObj
          changesObj[key] = {
            from: state[key],
            to: next[key],
          };
        }
      });
      console.group(
        `%cAction: %c${action.type} %cat ${getCurrentTimeFormatted()}`,
        'color: lightgreen; font-weight: bold;',
        'color: white; font-weight: bold;',
        'color: lightblue; font-weight: lighter;',
      );
      console.log(
        '%cPrevious State:',
        'color: #9E9E9E; font-weight: 700;',
        state,
      );
      console.log('%cNext State:', 'color: #47B04B; font-weight: 700;', next);
      if (Object.keys(changesObj).length) {
        console.log('%cDiff:', 'color: #00A7F7; font-weight: 700;', changesObj);
      }

      console.groupEnd();
      return next;
    },
    [reducer],
  );

  return reducerWithLogger;
};

export default Logger;
