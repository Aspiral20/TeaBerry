import React, { ButtonHTMLAttributes, FC } from 'react';
import { useTranslation } from "react-i18next";
import cn from "classnames";

interface ContinueButtonProps {
  className?: string
}

const ContinueButton: FC<ContinueButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({className, ...rest}) => {
  const {t} = useTranslation()
  return (
    <button className={cn("continue_button " + className)} {...rest}>
      {t('actions.continue')}
    </button>
  );
};

export default ContinueButton;