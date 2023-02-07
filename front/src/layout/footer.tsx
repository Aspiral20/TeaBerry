import React, { FC } from 'react';
import { Container } from "../_components";
import { useTranslation } from "react-i18next";

interface FooterProps {

}

const Footer: FC<FooterProps> = ({}) => {
  const { t } = useTranslation()
  return (
    <Container className="footer">
      <div className="info_container">
        <div className="rights info_item">
          <span className="description">
            © 2023 {t('author.rights')}
          </span>
        </div>
        <div className="author info_item">
          <span className="description">
          {t('author.created')} Aspiral20
          </span>
        </div>
        <div className="author info_item">
          <span className="description">
           Victor Palanciuc
          </span>
        </div>
      </div>
    </Container>
  );
};

export default Footer;