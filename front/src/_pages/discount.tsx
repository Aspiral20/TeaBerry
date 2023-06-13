import React, { FC, useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import cn from "classnames";
import { useTranslation, Trans } from "react-i18next";
import { StoreContext } from "../index";
import ErrorPage from "./error_page";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import UserService from "../services/UserService";
import FullScreenLoader from "../_components/full-screen_loader";

interface DiscountProps {
}

const Discount: FC<DiscountProps> = ({}) => {
  const { percent } = useParams()
  const { t } = useTranslation();
  const { store } = useContext(StoreContext);
  const { authStore, userStore } = store
  const [isLoading, setIsLoading] = useState(false);
  const [emailDiscount, setEmailDiscount] = useState("");
  const [emailIsValid, setEmailIsValid] = useState({ isEmail: true, wasClicked: false, isUserEmail: true });
  const [resEmailIsTrue, setResEmailIsTrue] = useState({ current: false, past: false });
  const [discountStep, setDiscountStep] = useState('step1')
  const [discountCode, setDiscountCode] = useState({ front: '', api: '' })

  const sendDiscount = async () => {
    try {
      setIsLoading(true)
      if (/^.+@\w+\.\w+/.test(emailDiscount)) {
        if (userStore.user.email === emailDiscount) {
          setEmailIsValid(prev => ({ ...prev, isUserEmail: true }))
          toast(t('actions.sent'))

          await UserService.sendDiscountMail({ email: emailDiscount, discount: parseInt(percent as string) || 0 })
            .then(res => {
              setDiscountCode(prev => ({ ...prev, api: res.data.discountCode }))
            })

          setResEmailIsTrue({ current: true, past: true })
          setTimeout(() => setResEmailIsTrue(prev => ({ ...prev, current: false })), 15000)
          setDiscountStep('step2')
        } else {
          setEmailIsValid(prev => ({ ...prev, isUserEmail: false }))
        }
      } else {
        setEmailIsValid(prev => ({ ...prev, isEmail: false, wasClicked: true }))
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const sendUpdateDiscount = async () => {
    try {
      setIsLoading(true)

      if (discountCode.api === discountCode.front) {

        await UserService.updateDiscount(userStore.user.id, { discount: parseInt(percent as string) || 0 })
          .then(() => {
            toast('Discount approved!')
            setDiscountCode(prev => ({ ...prev, front: '' }))
          })

      } else {
        toast.error(t('discount.invalid_discount_code'))
      }

    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: any) => {
    if (emailIsValid.wasClicked) {
      if (/^.+@\w+\.\w+/.test(emailDiscount)) {
        setEmailIsValid(prev => ({ ...prev, isEmail: true }))
      } else {
        setEmailIsValid(prev => ({ ...prev, isEmail: false }))
      }
    }
    setEmailDiscount(e.target.value)
  }

  const codeHandleChange = (e: any) => {
    setDiscountCode(prev => ({ ...prev, front: e.target.value }))
  }

  return authStore.isAuth && userStore.user.discount === 0 ? !isLoading ? (
    <div className="discount_container">
      <img className="shares_bg_absolute" src="/images/site/bkg/bkg_leaves_fon.png" alt="..."/>
      <div className="shares_container wow animate__flipInX">
        <div className="shares_leaves">
          <img className="shares_absolute_img" src="/images/site/bkg/mote_leaves.png" alt="..."/>
        </div>
        <h2 className="text_header title">
          {t('discount.promotion_new_clients')}
        </h2>
        <div className="shares_content">
          <img className="shares_relative_img" src="/images/site/pages/discount/tea_image_card.png" alt="..."/>
          <div className="shares_relative_content">
            <div className="info_discount">
              <Trans
                i18nKey="discount.discount_percent"
                values={{ discount: percent }}
                components={{ compDiscount: <span className="green_bold_span"/> }}
              />
            </div>
            <div className="info_discount">
              {t('discount.copy_discount_code')}
            </div>
            <div className="shares_form_block">
              <div className={cn("shares_true_discount", {
                hide_elem: !resEmailIsTrue.current,
                show_elem__flex: resEmailIsTrue.current
              })}
              >
                <span className="true_discount_description">
                  {t('discount.promo_code')}
                </span>
                <button className="resend_mail" onClick={sendDiscount}>
                  {t('actions.resend')}
                </button>
              </div>
              <div className={cn("shares_form", {
                hide_elem: resEmailIsTrue.current || discountStep !== 'step1',
                show_elem__block: !resEmailIsTrue.current && discountStep === 'step1'
              })}>
                <div className={cn("go_to_step", {
                  hide_elem: !resEmailIsTrue.past,
                  show_elem__block: resEmailIsTrue.past
                })} onClick={() => setDiscountStep('step2')}>
                  Step 2
                </div>
                <div className="shares_input_block">
                  <input
                    className={cn("shares_input", {
                      error: !emailIsValid.isEmail ? true : !emailIsValid.isUserEmail,
                      disabled: resEmailIsTrue.past
                    })}
                    type="email"
                    value={emailDiscount}
                    placeholder="example@gmail.com"
                    name="discount"
                    disabled={resEmailIsTrue.past}
                    onChange={handleChange}
                  />
                  {!emailIsValid.isEmail ? (
                    <p className="text_error">{t('discount.valid_fields')}</p>
                  ) : !emailIsValid.isUserEmail ? (
                    <p className="text_error">{t('discount.enter_your_email')}</p>
                  ) : null}
                </div>
                <button className="shares_button button_main" onClick={sendDiscount}>
                  {t('actions.submit_email')}
                  <img className="leaves_image_button" src="/images/site/bkg/compact_mote_leaves.png" alt="..."/>
                </button>
              </div>
              <div className={cn('shares_form', {
                hide_elem: resEmailIsTrue.current || discountStep !== 'step2',
                show_elem__block: !resEmailIsTrue.current && discountStep === 'step2'
              })}>
                <div className="go_to_step" onClick={() => setDiscountStep('step1')}>
                  Step 1
                </div>
                <div className="shares_input_block">
                  <input
                    className={cn("shares_input")}
                    type="text"
                    value={discountCode.front}
                    placeholder={t('discount.discount_code') as string}
                    name="discount_code"
                    onChange={codeHandleChange}
                  />
                </div>
                <button className="shares_button button_main" onClick={sendUpdateDiscount}>
                  {t('discount.get_discount')}
                  <img className="leaves_image_button" src="/images/site/bkg/compact_mote_leaves.png" alt="..."/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : <FullScreenLoader loader="default-loader-circles"/> : <ErrorPage/>;
};

export default observer(Discount);