import React, { FC } from 'react';
import { Container } from "../_components/general";
import { Fon } from "../_components";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  const currentYear = new Date().getFullYear()

  return (
    <Fon>
      <Container className="footer main_layout">
        {currentYear} © Admin | TeaBerry
      </Container>
    </Fon>
  );
};

export default Footer;