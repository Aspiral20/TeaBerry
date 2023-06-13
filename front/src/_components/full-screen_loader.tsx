import React, { FC } from 'react';
import Loader from "./loader";

interface FullScreenLoaderProps {
  loader?: string
}

const FullScreenLoader: FC<FullScreenLoaderProps> = ({
  loader = 'loader_puls-in-out'
}) => {
  return (
    <div className="full-screen-loader">
      <Loader className={loader}/>
    </div>
  );
};

export default FullScreenLoader;