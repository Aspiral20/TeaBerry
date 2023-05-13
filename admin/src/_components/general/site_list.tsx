import React, { FC } from 'react';
import { DefaultChildrenType } from "../../_types/general";

interface SiteListProps {
  data: Array<string>
  listOnClick?: (e: any) => void
  listItemOnClickArr?: (e: any) => void
  parentNameList?: string
}

const SiteList: FC<SiteListProps & DefaultChildrenType> = ({
  data,
  listOnClick,
  listItemOnClickArr,
  parentNameList
}) => {
  return (
    <ul className="site_list" onClick={listOnClick}>
      {data.map((item, index) => (
        <li
          key={item + index}
          id={`${item} ${parentNameList}`}
          className="item_list text"
          onClick={listItemOnClickArr}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default SiteList;