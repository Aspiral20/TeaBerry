import React, { FC } from 'react';
import Loader from "./loader";

interface FullScreenLoaderProps {}

const FullScreenLoader: FC<FullScreenLoaderProps> = ({}) => {
  return (
    <div className="full-screen-loader">
      <Loader className="loader_puls-in-out"/>
    </div>
  );
};

export default FullScreenLoader;