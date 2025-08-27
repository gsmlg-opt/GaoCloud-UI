import React, { Suspense, lazy } from 'react';
import Loading from './CircularLoading';

export default (func, options = {}) => {
  const LazyComponent = lazy(func);
  return (props) => (
    <Suspense fallback={options.fallback || <Loading />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
