import React, { FC, useEffect, useRef } from 'react';
import { Container } from "../_components/general";
import { Fon } from "../_components";
import { JSXElementsActionType } from "../_types/store";
import { useDispatch } from "react-redux";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const footerRefCurrent = footerRef.current

    if (footerRef && footerRefCurrent) {
      dispatch<JSXElementsActionType>({
        type: 'jsx_elements/',
        field: 'footer',
        ref: footerRef,
        params: {
          width: footerRefCurrent.clientWidth,
          height: footerRefCurrent.clientHeight
        }
      })
    }
  }, [])

  return (
    <Fon>
      <Container className="footer main_layout" refContainer={footerRef}>
        {currentYear} © Admin | TeaBerry
      </Container>
    </Fon>
  );
};

export default Footer;