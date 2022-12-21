import * as React from 'react';
import clsx from 'clsx';
import './Shimmer.css';
import { style } from '@mui/system';

const Shimmer = (props: any): any => {
  const { width, height, className, style } = props;

  return <div className={clsx('shine', className)} style={{width, height, ...style }}></div>;
};
export default Shimmer;
