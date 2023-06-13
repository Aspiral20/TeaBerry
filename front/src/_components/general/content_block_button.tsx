import React, { FC, useEffect, useState } from 'react';
import cn from "classnames";
import { observer } from "mobx-react-lite";

interface ContentBlockButtonProps {
  className?: string
  onClick?: () => void
  data: Array<{ id: string, name: string, description: string }>
  icon?: React.ReactNode
  params?: { [p: string]: boolean }
  direction?: string
}

const ContentBlockButton: FC<ContentBlockButtonProps> = ({
  className,
  onClick,
  icon,
  data,
  params,
  direction = 'left',
}) => {
  const [includeDirection, setIncludeDirection] = useState(false);

  const directionsValidator = [
    'left',
    'right'
  ]
  useEffect(() => {
    if (direction && directionsValidator.includes(direction)) {
      setIncludeDirection(true)
    }
  }, [])

  return (
    <div className={cn("content_block_button " + className, {
      [direction || ""]: includeDirection,
      ...params
    })} onClick={onClick}>
      <div className={cn("icon")}>
        {icon}
      </div>
      <div className={cn("content_block_data")}>
        {data.map(item => (
          <div key={item.id} className={cn(`data_item text ${item.name}`)}>
            {item.description}
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(ContentBlockButton);