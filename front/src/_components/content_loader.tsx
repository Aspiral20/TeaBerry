import React, { FC } from 'react';
import Loader from "./loader";

interface ContentLoaderProps {
  loader?: string
}
const ContentLoader: FC<ContentLoaderProps> = ({
  loader = 'default-loader-circles'
}) => {
  return (
    <div className="content-loader">
      <Loader className={loader}/>
    </div>
  );
};

export default ContentLoader;