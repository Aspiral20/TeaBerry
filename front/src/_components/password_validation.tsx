import React, { FC, useEffect, useState } from 'react';
import { ValidPasswdConditionsType } from "../_types";
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "../_constants";
import { v4 as uuid } from 'uuid'
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { Check, XIcon } from "./icons";

interface PasswordValidationProps {
  password: ValidPasswdConditionsType,
  show?: boolean,
  timeout?: number
  isFilterEffect?: boolean
}

const initContent = {
  symbol: { id: uuid(), trans: "symbol", name: "symbol" },
  number: { id: uuid(), trans: "number", name: "number" },
  uppercase: { id: uuid(), trans: "uppercase", name: "uppercase" },
  lowercase: { id: uuid(), trans: "lowercase", name: "lowercase" },
  minLength: { id: uuid(), trans: "min_length", name: "minLength" },
  maxLength: { id: uuid(), trans: "max_length", name: "maxLength" },
}
const PasswordValidation: FC<PasswordValidationProps> = ({
  password,
  show,
  timeout,
  isFilterEffect
}) => {
  const { t } = useTranslation()
  const valuesPasswordByKey: { [p: string]: boolean } = password
  const content = Object.values(initContent).map(item => ({ ...item, isValid: valuesPasswordByKey[item.name] }))

  const [showAnimation, setShowAnimation] = useState(false);
  const [timeoutAnimation, setTimeoutAnimation] = useState(false);

  useEffect(() => {
    if (show) {
      setTimeout(() => setShowAnimation(show), 0)
      setTimeout(() => {
        setTimeoutAnimation(show)
      }, timeout)
    } else {
      setTimeout(() => setShowAnimation(false), timeout)
      setTimeout(() => {
        setTimeoutAnimation(false)
      }, 0)
    }
  }, [show])

  return (
    <div
      className={cn("password_valid_conditions", {
        show: show && !timeout ? show : showAnimation,
        timeout: timeout && timeoutAnimation,
        filter_effect: isFilterEffect
      })}
      style={{ transition: timeout ? `${timeout / 1000}s` : `none` }}
    >
      <div className="conditions_title title">{t('auth.password')}:</div>
      <div className="conditions_container text">
        {content.map(({ id, trans, isValid }) => (
          <div key={id} className={cn("conditions_item", { is_valid: isValid })}>
            <div className="condition_icon">
              {isValid ? <Check/> : <XIcon/>}
            </div>
            <div className="condition_text">
              {trans === 'min_length' ?
                <>{t(`auth.${trans}`)}: {MIN_PASSWORD_LENGTH}</>
                : trans === 'max_length' ?
                  <>{t(`auth.${trans}`)}: {MAX_PASSWORD_LENGTH}</> :
                  <> {t(`auth.${trans}`)} </>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordValidation;