import React, { FC, useContext } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { StoreContext } from "../index";

interface ErrorPageProps {
  errorCode?: string | number
}

const ErrorPage: FC<ErrorPageProps> = ({
  errorCode = 404
}) => {
  const { store } = useContext(StoreContext)
  const { t } = useTranslation()
  const headerHeight = store.constStore.getData('header').height || 0
  const footerHeight = store.constStore.getData('footer').height || 0

  return (
    <div className={"not_found"} style={{
      minHeight: `calc(100vh - ${headerHeight + footerHeight}px)`
    }}>
      <div className={"not_found__container"}>
        <div className="error_status">
          {errorCode}
        </div>
        <div className="error_message">
          {t('errors.not-found-message')}&nbsp;
          <Link className="error_link" to={'/'}>
            {t('errors.not-found-link')}
          </Link>.
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;