import React, { FC, useContext, useEffect, useRef } from 'react';
import { Container, Fon } from "../_components";
import { useTranslation } from "react-i18next";
import { StoreContext } from "../index";
import cn from "classnames";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";

interface FooterProps {

}

const Footer: FC<FooterProps> = ({}) => {
  const { store } = useContext(StoreContext);
  const { pathname } = useLocation();
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  const footerRef = useRef<HTMLDivElement>(null);

  const fonImage = store.constStore.getData('fonImage');

  useEffect(() => {
    const footerRefCurrent = footerRef.current

    if (footerRef && footerRefCurrent) {
      store.constStore.setFooter({
        width: footerRefCurrent.clientWidth,
        height: footerRefCurrent.clientHeight
      })
    }
  }, [pathname])

  return (
    <Fon className={!!fonImage.id ? "filter" : ""}>
      <Container className={cn("footer", { image_fon: !!fonImage.id })} refContainer={footerRef}>
        <div className="info_container">
          <div className="rights info_item">
            <span className="description">
              © {year} {t('author.rights')}
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
    </Fon>
  );
};

export default observer(Footer);