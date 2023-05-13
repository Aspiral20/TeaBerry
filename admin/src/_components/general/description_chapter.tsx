import React, { FC, Fragment, HTMLAttributes } from 'react';
import { Link } from "react-router-dom";
import { JsxSpace } from "./index";

interface DescriptionChapterProps {
  className?: string,
  data?: Array<{id: string, to: string, name: string}>,
  children?: React.ReactNode
}

const DescriptionChapter: FC<DescriptionChapterProps & HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  data,
  children,
  ...props
}) => {
  return (
    <div className={"description_chapter " + className} {...props}>
      {data && data.map(({ id, to, name }, index) => (
        <Fragment key={id}>
          {index < data.length - 1 ? (
            <>
              <Link className="item_chapter description" to={to}>{name}</Link>
              <JsxSpace/>-<JsxSpace/>
            </>
          ): (
            <Link className="item_chapter description" to={to}>{name}</Link>
          )}
        </Fragment>
      ))}
      {children}
    </div>
  );
};

export default DescriptionChapter;