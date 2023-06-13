import React, { FC } from 'react';
import cn from "classnames";
import { DefaultCnPropsType } from "../../_types";

interface DefaultTagProps {
  name: string
  cnParams?: DefaultCnPropsType
  className?: string
  iconUrl?: string
  onClick?: () => void
}

const DefaultTag: FC<DefaultTagProps> = ({
  name,
  iconUrl,
  className = '',
  cnParams,
  onClick
}) => {
  return (
    <div className={cn(`default_tag ${className}`, cnParams)} onClick={onClick}>
      {iconUrl ? (
        <div className="default_tag__image">
          <img className="image" src={iconUrl} alt=""/>
        </div>
      ) : null}
      <div className="default_tag__name text">
        {name}
      </div>
    </div>
  );
};

export default DefaultTag;