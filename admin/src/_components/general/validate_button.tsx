import React, { FC } from 'react';
import cn from "classnames";

interface ValidateButtonProps {
  children: React.ReactNode
  data?: Array<any>
  className?: string
  onClick?: () => void
  validateCondition?: () => boolean
}

const ValidateButton: FC<ValidateButtonProps> = ({
  children,
  data,
  className,
  onClick,
  validateCondition = () => false,
}) => {
  const resValidateCondition = validateCondition()
  const isDisabled = resValidateCondition || (data && !data.every(item => item))

  return (
    <button
      className={cn('validate_button ' + className, { disabled: isDisabled })}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default ValidateButton;