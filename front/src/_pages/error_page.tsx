import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation()
  return (
    <div className={"not_found"}>
      <div className={"not_found__container"}>
        <div className="error_status">
          404
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