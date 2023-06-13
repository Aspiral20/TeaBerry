import React, { FC, Fragment } from 'react';
import cn from "classnames";
import { ContentGeneratorDataType } from "../../_types";
import { Trans, useTranslation } from "react-i18next";

interface ContentGeneratorProps {
  className?: string
  data: ContentGeneratorDataType
}

const ContentGenerator: FC<ContentGeneratorProps> = ({
  className = '',
  data
}) => {
  const { t } = useTranslation();

  return (
    <div className={cn(`${className} content_generator`)}>
      {data.map(({ id, name, list, value, imgUrl, font }) => (
        <Fragment key={id}>
          {name === 'title' && value && (
            <div className="title">
              {value}
            </div>
          )}
          {name === 'content' && value && (
            <div className="content">
              <Trans
                i18nKey={value}
                components={{ font: <div className="font"/> }}
              />
            </div>
          )}
          {name === 'list' && list && (
            <ul className="head-list content">
              {list.map(item => (
                <li className="item-list">{item}</li>
              ))}
            </ul>
          )}
          {name === 'image' && imgUrl && (
            <img className="image content" src={imgUrl} alt=""/>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default ContentGenerator;