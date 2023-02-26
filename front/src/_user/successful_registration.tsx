import React, { FC } from 'react';
import { SuccessfulRegistrationIcon } from "../_components";
import { useTranslation } from "react-i18next";
import ContinueButton from "../_components/continue_button";
import { Link } from "react-router-dom";

interface SuccessfulRegisteredProps {

}

const SuccessfulRegistration: FC<SuccessfulRegisteredProps> = ({}) => {
  const { t } = useTranslation()
  return (
    <div className="successful_registration">
      <div className="success_card">
        <div className="icon_container">
          <SuccessfulRegistrationIcon className="success_icon"/>
        </div>
        <div className="content_container">
          <div className="message">
            {t('auth.successful_registration.message')}
          </div>
          <Link to={'/auth/login'}>
            <ContinueButton/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulRegistration;