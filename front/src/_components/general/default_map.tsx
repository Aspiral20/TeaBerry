import React, { FC } from 'react';
import { MapCoordsType, MapLocationType } from "../../_types";
import cn from "classnames";

interface DefaultMapProps {
  className?: string
  link?: string
}

const DefaultMap: FC<DefaultMapProps> = ({
  className = '',
  link
}) => {
  return (
    <div className={cn(`${className} default_map`)}>
      <iframe
        className={cn("default_map_iframe")}
        src={link}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  );
};

export default DefaultMap;