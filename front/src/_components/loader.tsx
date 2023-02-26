import React, { FC } from 'react';

interface LoaderProps {
  className?: string
}
const Loader: FC<LoaderProps> = ({
  className = 'loader_x'
}) => {
  // Check loaders.scss
  return (
    <span className={className}/>
  );
};

export default Loader;