import React from 'react';
import { Link } from "react-router-dom";
import { PageContainer } from "../_components";

const ErrorPage = () => {
  return (
    <PageContainer className="error">
      <div className="error__container">
        <div className="error_status">
          404
        </div>
        <div className="error_message">
          This page does not exist. Go to&nbsp;
          <Link className="error_link" to='/'>
            Main Page
          </Link>.
        </div>
      </div>
    </PageContainer>
  );
};

export default ErrorPage;