import React, { FC } from 'react';
import { DefaultChildrenType } from "../../_types/general";
import { Link, To } from "react-router-dom";

interface LinkCardPaperProps {
  to: To
  headerTitle?: string | React.ReactNode
  headerDescription?: string | React.ReactNode
  headerChildren?: string | React.ReactNode
  SVGIcon?: React.ReactNode
  rightContent?: React.ReactNode
}

const LinkCardPaper: FC<LinkCardPaperProps & DefaultChildrenType> = ({
  children,
  to,
  headerChildren,
  headerTitle,
  headerDescription,
  SVGIcon,
  rightContent,
}) => {
  return (
    <Link className="link_card_paper" to={to}>
      <div className="hover_effect"/>
      <div className="paper_header text">
        <div className="title_chapter title card_title">
          {headerTitle}
        </div>
        <div className="title_description description_chapter">
          <div className="item_chapter description">{headerDescription}</div>
        </div>
        {headerChildren}
      </div>
      <div className="paper_body text">
        <div className="paper_svg_icon">
          {SVGIcon}
        </div>
        <div className="paper_across_svg_icon_content text">
          {rightContent}
        </div>
        <div className="paper_another_content text">
          {children}
        </div>
      </div>
    </Link>
  );
};

export default LinkCardPaper;