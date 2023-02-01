import React from 'react';
import cn from "classnames";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className={cn("not-found")}>
      <div className="error-status">
        404
      </div>
      <div className="error-description">
        Aceasta pagina nu exista. Treceti pe <Link to={'/'}>Principal</Link>
      </div>
    </div>
  );
};

export default ErrorPage;