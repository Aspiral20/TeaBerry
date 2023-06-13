import React, { FC, useEffect, useState } from 'react';
import { DefaultTitle } from "../_components";
import { v4 as uuid } from 'uuid';
import cn from "classnames";
import { Trans, useTranslation } from "react-i18next";
import { DefaultObjectsItemType } from "../_types";

interface CircleTextProps {
  text: string
  className?: string
  direction?: string
  radius?: number
  start?: number
  interval?: number
  reverseText?: boolean
}

const directionValidator = [{ direction: 'top', origin: '0 5.875em' }, { direction: 'bottom', origin: '0 -4.5em' }];
const CircleText: FC<CircleTextProps> = ({
  className = '',
  direction = 'top',
  start = 0,
  interval = 1,
  text,
  radius = 5,
  reverseText = false
}) => {
  const [validDirection, setValidDirection] = useState(false);
  const [currentDirection, setCurrentDirection] = useState();
  let splitText = text.split("");
  if (reverseText) {
    splitText.reverse()
  }

  useEffect(() => {
    setValidDirection(directionValidator.some(item => item.direction === direction))
  }, [])

  return (
    <div className={cn(`${className} circle_text_container`)} style={{
      [validDirection ? direction : 'top']: 0
    }}>
      {splitText.map((char) => (
        <span className="circle_char" style={{
          transform: `rotate(${(start += interval) * radius}deg)`,
          transformOrigin: validDirection ? directionValidator.find(item => item.direction === direction)?.origin : ""
        }}>
          {char}
        </span>
      ))}
    </div>
  );
};

const initCircleBlocks = [
  {
    id: uuid(),
    textUp: 'about.delivery',
    textDown: 'about.anywhere_in_the_world',
    imagePath: '/images/site/pages/about/truck.png',
    upIntervalRU: 1.75,
    upStartRU: -8,
    downIntervalRU: 1.75,
    downStartRU: -16,

    upIntervalRO: 1.5,
    upStartRO: -7,
    downIntervalRO: 1.5,
    downStartRO: -12,

    upIntervalEN: 1.75,
    upStartEN: -8,
    downIntervalEN: 1.75,
    downStartEN: -18
  },
  {
    id: uuid(),
    textUp: 'about.discount_program',
    textDown: 'about.regular_promotions',
    imagePath: '/images/site/pages/about/box.png',
    upIntervalRU: 1.75,
    upStartRU: -19,
    downIntervalRU: 1.75,
    downStartRU: -16,

    upIntervalRO: 1.5,
    upStartRO: -15,
    downIntervalRO: 1.5,
    downStartRO: -15,

    upIntervalEN: 1.75,
    upStartEN: -15,
    downIntervalEN: 1.75,
    downStartEN: -19
  },
  {
    id: uuid(),
    textUp: 'about.exclusive',
    textDown: 'about.tea_mixes',
    imagePath: '/images/site/pages/about/jewel.png',
    upIntervalRU: 1.75,
    upStartRU: -11,
    downIntervalRU: 1.75,
    downStartRU: -12,

    upIntervalRO: 1.5,
    upStartRO: -8,
    downIntervalRO: 1.75,
    downStartRO: -17,

    upIntervalEN: 1.75,
    upStartEN: -10,
    downIntervalEN: 1.75,
    downStartEN: -9
  },
  {
    id: uuid(),
    textUp: 'about.manifold',
    textDown: 'about.tea_varieties',
    imagePath: '/images/site/pages/about/supermarket.png',
    upIntervalRU: 1.75,
    upStartRU: -11,
    downIntervalRU: 1.75,
    downStartRU: -11,

    upIntervalRO: 1.5,
    upStartRO: -8,
    downIntervalRO: 1.5,
    downStartRO: -14,

    upIntervalEN: 1.75,
    upStartEN: -9,
    downIntervalEN: 1.75,
    downStartEN: -12
  },
] as DefaultObjectsItemType

const infoContent = [
  {
    id: uuid(),
    title: 'about.high_quality_fresh_tea',
    imgPath: '/images/site/pages/about/info_tea1.png',
    block: 'block1',
    orderClass: { order1: '', order2: '' },
    text: 'about.quality_fresh_tea_text',
    imgBkgComp: <></>,
  },
  {
    id: uuid(),
    title: 'about.gift_baskets',
    imgPath: '/images/site/pages/about/info_tea2.png',
    block: 'block2',
    orderClass: { order1: '', order2: '' },
    text: 'about.gift_baskets_text',
    imgBkgComp: <img className="fifth" src="/images/site/pages/about/info_leave5.png" alt=""/>,
  },
  {
    id: uuid(),
    title: 'about.exclusive_tea_mixes',
    imgPath: '/images/site/pages/about/info_tea3.png',
    block: 'block3',
    orderClass: { order1: 'order1', order2: 'order2' },
    text: 'about.exclusive_tea_mixes_text',
    imgBkgComp: <img className="fourth" src="/images/site/pages/about/info_leave4.png" alt=""/>,
  },
  {
    id: uuid(),
    title: 'about.tea_accessories',
    imgPath: '/images/site/pages/about/info_tea4.png',
    block: 'block4',
    orderClass: { order1: 'order1', order2: 'order2' },
    text: 'about.tea_accessories_text',
    imgBkgComp: <img className="info-leaves" src="/images/site/pages/about/info_leaves.png" alt=""/>,
  },
]

const collectParagraphs = [
  'about.collect_paragraph_1',
  'about.collect_paragraph_2',
  'about.collect_paragraph_3',
]

interface AboutProps {
}

const About: FC<AboutProps> = ({}) => {
  const { t, i18n } = useTranslation();
  const [handle, setHandle] = useState({
    videoCollect: false
  })

  const openVideo = () => {
    setHandle(prev => ({ ...prev, videoCollect: true }))
  }

  return (
    <div className="about">
      <div className="strengths">
        <img className="leaves1" src="/images/site/bkg/start_leaves.png" alt=""/>
        <img className="leaves2" src="/images/site/bkg/end_leaves.png" alt=""/>
        <DefaultTitle className="about_strengths__title text-header center">{t('about.whyChooseUs')}</DefaultTitle>
        <div className="strengths-container">
          {initCircleBlocks.map(({ id, textUp, textDown, imagePath, ...rest }) => (
            <div key={id} className="strength-item">
              {/*<div className="strItem-firstText" id="fir-stTop">Доставка</div>*/}
              <CircleText
                interval={rest[`upInterval${i18n.language.toUpperCase()}`]}
                start={rest[`upStart${i18n.language.toUpperCase()}`]}
                direction="top"
                className="strItem-firstText"
                text={t(textUp)}
              />
              <div className="strItem-img">
                <img src={imagePath} alt=""/>
              </div>
              <CircleText
                reverseText={true}
                interval={rest[`downInterval${i18n.language.toUpperCase()}`]}
                start={rest[`downStart${i18n.language.toUpperCase()}`]}
                direction="bottom"
                className="strItem-secondText"
                text={t(textDown)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="info">
        <div className="info_leaves_container">
          <img className="first" src="/images/site/pages/about/info_leave1.png" alt=""/>
          <img className="second" src="/images/site/pages/about/info_leave2.png" alt=""/>
          <img className="third" src="/images/site/pages/about/info_leave3.png" alt=""/>
        </div>
        <DefaultTitle className="about_info__title text-header center">{t('about.find_here')}</DefaultTitle>
        <div className="info-container">

          {infoContent.map(item => (
            <div key={item.id} className={`block-content info-${item.block}`}>
              {item.imgBkgComp}
              <div className={`content-image ${item.orderClass.order2}`}>
                <div className="circle"/>
                <img src={item.imgPath} alt="..."/>
              </div>
              <div className={`content-text ${item.orderClass.order1} text-${item.block}`}>
                <h3 className="header">
                  {t(item.title)}
                </h3>
                <div className="text">
                  {t(item.text)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="properties">
        <DefaultTitle
          className="about_properties__title text-header center">{t('about.useful_properties_of_tea')}</DefaultTitle>
        <div className="properties-container">
          <div className="center-container">
            {/*<div id="properties-circle-768">*/}
            {/*  <div className="circle-max" className="property1">*/}
            {/*    <div className="animation-circle-max"></div>*/}
            {/*    <div className="circle-min">*/}
            {/*      <svg className="layer" height="512" viewBox="0 0 512 512" width="512"*/}
            {/*           xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">*/}
            {/*        <path*/}
            {/*          d="m264.053 129.834a5.978 5.978 0 0 0 4.243-1.757l32.937-32.937a6 6 0 1 0 -8.485-8.486l-32.937 32.938a6 6 0 0 0 4.242 10.242z"/>*/}
            {/*        <path*/}
            {/*          d="m203.624 92.7a6.1 6.1 0 0 0 .859.062 6 6 0 0 0 5.931-5.15l7.534-52.535a6 6 0 1 0 -11.878-1.7l-7.534 52.535a6 6 0 0 0 5.088 6.788z"/>*/}
            {/*        <path*/}
            {/*          d="m128.077 259.811a6 6 0 0 0 -8.485 0l-32.938 32.937a6 6 0 1 0 8.486 8.485l32.937-32.933a6 6 0 0 0 0-8.489z"/>*/}
            {/*        <path*/}
            {/*          d="m92.7 203.624a6 6 0 0 0 -6.791-5.088l-52.539 7.534a6 6 0 0 0 .844 11.94 6.115 6.115 0 0 0 .859-.061l52.536-7.534a6 6 0 0 0 5.091-6.791z"/>*/}
            {/*        <path d="m125.548 134.377a6 6 0 0 0 8.486-8.485l-37.477-37.476a6 6 0 0 0 -8.485 8.484z"/>*/}
            {/*        <path d="m255.891 325.2-1.53-4.8a6 6 0 0 0 -11.434 3.643l1.53 4.8a6 6 0 0 0 11.434-3.644z"/>*/}
            {/*        <path d="m272.958 418.271a6 6 0 1 0 11.433-3.644l-21.512-67.5a6 6 0 1 0 -11.433 3.643z"/>*/}
            {/*        <path*/}
            {/*          d="m396.394 347.491 73.748-59.036a16.393 16.393 0 0 0 6.2-14.673 15.954 15.954 0 0 0 -11-13.319l-106.522-33.9a6 6 0 0 0 -3.64 11.437l106.52 33.9a4 4 0 0 1 1.266 6.935l-79.282 63.465a6 6 0 0 0 -.51 8.913l88.605 89.175-31.394 31.394-89.175-88.609a6 6 0 0 0 -4.229-1.743c-.113 0-.227 0-.341.009a6 6 0 0 0 -4.343 2.241l-63.464 79.281a4 4 0 0 1 -6.935-1.287l-88.534-278.338 129.817 41.3a6 6 0 0 0 7.819-5.721 6 6 0 0 0 -4.181-5.718l-129.819-41.297a12.01 12.01 0 0 0 -15.095 15.073l88.559 278.338a16 16 0 0 0 27.736 5.149l59.289-74.066 84.436 83.9a12.022 12.022 0 0 0 16.943-.028l31.394-31.394a12 12 0 0 0 .027-16.943z"/>*/}
            {/*      </svg>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="circle-max" id="property2">*/}
            {/*    <div className="animation-circle-max"></div>*/}
            {/*    <div className="circle-min">*/}
            {/*      <svg className="layer" height="512" viewBox="0 0 512 512" width="512"*/}
            {/*           xmlns="http://www.w3.org/2000/svg" data-name="Layer 2">*/}
            {/*        <path*/}
            {/*          d="m264.053 129.834a5.978 5.978 0 0 0 4.243-1.757l32.937-32.937a6 6 0 1 0 -8.485-8.486l-32.937 32.938a6 6 0 0 0 4.242 10.242z"/>*/}
            {/*        <path*/}
            {/*          d="m203.624 92.7a6.1 6.1 0 0 0 .859.062 6 6 0 0 0 5.931-5.15l7.534-52.535a6 6 0 1 0 -11.878-1.7l-7.534 52.535a6 6 0 0 0 5.088 6.788z"/>*/}
            {/*        <path*/}
            {/*          d="m128.077 259.811a6 6 0 0 0 -8.485 0l-32.938 32.937a6 6 0 1 0 8.486 8.485l32.937-32.933a6 6 0 0 0 0-8.489z"/>*/}
            {/*        <path*/}
            {/*          d="m92.7 203.624a6 6 0 0 0 -6.791-5.088l-52.539 7.534a6 6 0 0 0 .844 11.94 6.115 6.115 0 0 0 .859-.061l52.536-7.534a6 6 0 0 0 5.091-6.791z"/>*/}
            {/*        <path d="m125.548 134.377a6 6 0 0 0 8.486-8.485l-37.477-37.476a6 6 0 0 0 -8.485 8.484z"/>*/}
            {/*        <path d="m255.891 325.2-1.53-4.8a6 6 0 0 0 -11.434 3.643l1.53 4.8a6 6 0 0 0 11.434-3.644z"/>*/}
            {/*        <path d="m272.958 418.271a6 6 0 1 0 11.433-3.644l-21.512-67.5a6 6 0 1 0 -11.433 3.643z"/>*/}
            {/*        <path*/}
            {/*          d="m396.394 347.491 73.748-59.036a16.393 16.393 0 0 0 6.2-14.673 15.954 15.954 0 0 0 -11-13.319l-106.522-33.9a6 6 0 0 0 -3.64 11.437l106.52 33.9a4 4 0 0 1 1.266 6.935l-79.282 63.465a6 6 0 0 0 -.51 8.913l88.605 89.175-31.394 31.394-89.175-88.609a6 6 0 0 0 -4.229-1.743c-.113 0-.227 0-.341.009a6 6 0 0 0 -4.343 2.241l-63.464 79.281a4 4 0 0 1 -6.935-1.287l-88.534-278.338 129.817 41.3a6 6 0 0 0 7.819-5.721 6 6 0 0 0 -4.181-5.718l-129.819-41.297a12.01 12.01 0 0 0 -15.095 15.073l88.559 278.338a16 16 0 0 0 27.736 5.149l59.289-74.066 84.436 83.9a12.022 12.022 0 0 0 16.943-.028l31.394-31.394a12 12 0 0 0 .027-16.943z"/>*/}
            {/*      </svg>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="circle-max" id="property3">*/}
            {/*    <div className="animation-circle-max"></div>*/}
            {/*    <div className="circle-min">*/}
            {/*      <svg className="layer" height="512" viewBox="0 0 512 512" width="512"*/}
            {/*           xmlns="http://www.w3.org/2000/svg" data-name="Layer 3">*/}
            {/*        <path*/}
            {/*          d="m264.053 129.834a5.978 5.978 0 0 0 4.243-1.757l32.937-32.937a6 6 0 1 0 -8.485-8.486l-32.937 32.938a6 6 0 0 0 4.242 10.242z"/>*/}
            {/*        <path*/}
            {/*          d="m203.624 92.7a6.1 6.1 0 0 0 .859.062 6 6 0 0 0 5.931-5.15l7.534-52.535a6 6 0 1 0 -11.878-1.7l-7.534 52.535a6 6 0 0 0 5.088 6.788z"/>*/}
            {/*        <path*/}
            {/*          d="m128.077 259.811a6 6 0 0 0 -8.485 0l-32.938 32.937a6 6 0 1 0 8.486 8.485l32.937-32.933a6 6 0 0 0 0-8.489z"/>*/}
            {/*        <path*/}
            {/*          d="m92.7 203.624a6 6 0 0 0 -6.791-5.088l-52.539 7.534a6 6 0 0 0 .844 11.94 6.115 6.115 0 0 0 .859-.061l52.536-7.534a6 6 0 0 0 5.091-6.791z"/>*/}
            {/*        <path d="m125.548 134.377a6 6 0 0 0 8.486-8.485l-37.477-37.476a6 6 0 0 0 -8.485 8.484z"/>*/}
            {/*        <path d="m255.891 325.2-1.53-4.8a6 6 0 0 0 -11.434 3.643l1.53 4.8a6 6 0 0 0 11.434-3.644z"/>*/}
            {/*        <path d="m272.958 418.271a6 6 0 1 0 11.433-3.644l-21.512-67.5a6 6 0 1 0 -11.433 3.643z"/>*/}
            {/*        <path*/}
            {/*          d="m396.394 347.491 73.748-59.036a16.393 16.393 0 0 0 6.2-14.673 15.954 15.954 0 0 0 -11-13.319l-106.522-33.9a6 6 0 0 0 -3.64 11.437l106.52 33.9a4 4 0 0 1 1.266 6.935l-79.282 63.465a6 6 0 0 0 -.51 8.913l88.605 89.175-31.394 31.394-89.175-88.609a6 6 0 0 0 -4.229-1.743c-.113 0-.227 0-.341.009a6 6 0 0 0 -4.343 2.241l-63.464 79.281a4 4 0 0 1 -6.935-1.287l-88.534-278.338 129.817 41.3a6 6 0 0 0 7.819-5.721 6 6 0 0 0 -4.181-5.718l-129.819-41.297a12.01 12.01 0 0 0 -15.095 15.073l88.559 278.338a16 16 0 0 0 27.736 5.149l59.289-74.066 84.436 83.9a12.022 12.022 0 0 0 16.943-.028l31.394-31.394a12 12 0 0 0 .027-16.943z"/>*/}
            {/*      </svg>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="circle-max" id="property4">*/}
            {/*    <div className="animation-circle-max"></div>*/}
            {/*    <div className="circle-min">*/}
            {/*      <svg className="layer" height="512" viewBox="0 0 512 512" width="512"*/}
            {/*           xmlns="http://www.w3.org/2000/svg" data-name="Layer 4">*/}
            {/*        <path*/}
            {/*          d="m264.053 129.834a5.978 5.978 0 0 0 4.243-1.757l32.937-32.937a6 6 0 1 0 -8.485-8.486l-32.937 32.938a6 6 0 0 0 4.242 10.242z"/>*/}
            {/*        <path*/}
            {/*          d="m203.624 92.7a6.1 6.1 0 0 0 .859.062 6 6 0 0 0 5.931-5.15l7.534-52.535a6 6 0 1 0 -11.878-1.7l-7.534 52.535a6 6 0 0 0 5.088 6.788z"/>*/}
            {/*        <path*/}
            {/*          d="m128.077 259.811a6 6 0 0 0 -8.485 0l-32.938 32.937a6 6 0 1 0 8.486 8.485l32.937-32.933a6 6 0 0 0 0-8.489z"/>*/}
            {/*        <path*/}
            {/*          d="m92.7 203.624a6 6 0 0 0 -6.791-5.088l-52.539 7.534a6 6 0 0 0 .844 11.94 6.115 6.115 0 0 0 .859-.061l52.536-7.534a6 6 0 0 0 5.091-6.791z"/>*/}
            {/*        <path d="m125.548 134.377a6 6 0 0 0 8.486-8.485l-37.477-37.476a6 6 0 0 0 -8.485 8.484z"/>*/}
            {/*        <path d="m255.891 325.2-1.53-4.8a6 6 0 0 0 -11.434 3.643l1.53 4.8a6 6 0 0 0 11.434-3.644z"/>*/}
            {/*        <path d="m272.958 418.271a6 6 0 1 0 11.433-3.644l-21.512-67.5a6 6 0 1 0 -11.433 3.643z"/>*/}
            {/*        <path*/}
            {/*          d="m396.394 347.491 73.748-59.036a16.393 16.393 0 0 0 6.2-14.673 15.954 15.954 0 0 0 -11-13.319l-106.522-33.9a6 6 0 0 0 -3.64 11.437l106.52 33.9a4 4 0 0 1 1.266 6.935l-79.282 63.465a6 6 0 0 0 -.51 8.913l88.605 89.175-31.394 31.394-89.175-88.609a6 6 0 0 0 -4.229-1.743c-.113 0-.227 0-.341.009a6 6 0 0 0 -4.343 2.241l-63.464 79.281a4 4 0 0 1 -6.935-1.287l-88.534-278.338 129.817 41.3a6 6 0 0 0 7.819-5.721 6 6 0 0 0 -4.181-5.718l-129.819-41.297a12.01 12.01 0 0 0 -15.095 15.073l88.559 278.338a16 16 0 0 0 27.736 5.149l59.289-74.066 84.436 83.9a12.022 12.022 0 0 0 16.943-.028l31.394-31.394a12 12 0 0 0 .027-16.943z"/>*/}
            {/*      </svg>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="circle-max" id="property5">*/}
            {/*    <div className="animation-circle-max"></div>*/}
            {/*    <div className="circle-min">*/}
            {/*      <svg className="layer" height="512" viewBox="0 0 512 512" width="512"*/}
            {/*           xmlns="http://www.w3.org/2000/svg" data-name="Layer 5">*/}
            {/*        <path*/}
            {/*          d="m264.053 129.834a5.978 5.978 0 0 0 4.243-1.757l32.937-32.937a6 6 0 1 0 -8.485-8.486l-32.937 32.938a6 6 0 0 0 4.242 10.242z"/>*/}
            {/*        <path*/}
            {/*          d="m203.624 92.7a6.1 6.1 0 0 0 .859.062 6 6 0 0 0 5.931-5.15l7.534-52.535a6 6 0 1 0 -11.878-1.7l-7.534 52.535a6 6 0 0 0 5.088 6.788z"/>*/}
            {/*        <path*/}
            {/*          d="m128.077 259.811a6 6 0 0 0 -8.485 0l-32.938 32.937a6 6 0 1 0 8.486 8.485l32.937-32.933a6 6 0 0 0 0-8.489z"/>*/}
            {/*        <path*/}
            {/*          d="m92.7 203.624a6 6 0 0 0 -6.791-5.088l-52.539 7.534a6 6 0 0 0 .844 11.94 6.115 6.115 0 0 0 .859-.061l52.536-7.534a6 6 0 0 0 5.091-6.791z"/>*/}
            {/*        <path d="m125.548 134.377a6 6 0 0 0 8.486-8.485l-37.477-37.476a6 6 0 0 0 -8.485 8.484z"/>*/}
            {/*        <path d="m255.891 325.2-1.53-4.8a6 6 0 0 0 -11.434 3.643l1.53 4.8a6 6 0 0 0 11.434-3.644z"/>*/}
            {/*        <path d="m272.958 418.271a6 6 0 1 0 11.433-3.644l-21.512-67.5a6 6 0 1 0 -11.433 3.643z"/>*/}
            {/*        <path*/}
            {/*          d="m396.394 347.491 73.748-59.036a16.393 16.393 0 0 0 6.2-14.673 15.954 15.954 0 0 0 -11-13.319l-106.522-33.9a6 6 0 0 0 -3.64 11.437l106.52 33.9a4 4 0 0 1 1.266 6.935l-79.282 63.465a6 6 0 0 0 -.51 8.913l88.605 89.175-31.394 31.394-89.175-88.609a6 6 0 0 0 -4.229-1.743c-.113 0-.227 0-.341.009a6 6 0 0 0 -4.343 2.241l-63.464 79.281a4 4 0 0 1 -6.935-1.287l-88.534-278.338 129.817 41.3a6 6 0 0 0 7.819-5.721 6 6 0 0 0 -4.181-5.718l-129.819-41.297a12.01 12.01 0 0 0 -15.095 15.073l88.559 278.338a16 16 0 0 0 27.736 5.149l59.289-74.066 84.436 83.9a12.022 12.022 0 0 0 16.943-.028l31.394-31.394a12 12 0 0 0 .027-16.943z"/>*/}
            {/*      </svg>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="circle-max" id="property6">*/}
            {/*    <div className="animation-circle-max"></div>*/}
            {/*    <div className="circle-min">*/}
            {/*      <svg className="layer" height="512" viewBox="0 0 512 512" width="512"*/}
            {/*           xmlns="http://www.w3.org/2000/svg" data-name="Layer 6">*/}
            {/*        <path*/}
            {/*          d="m264.053 129.834a5.978 5.978 0 0 0 4.243-1.757l32.937-32.937a6 6 0 1 0 -8.485-8.486l-32.937 32.938a6 6 0 0 0 4.242 10.242z"/>*/}
            {/*        <path*/}
            {/*          d="m203.624 92.7a6.1 6.1 0 0 0 .859.062 6 6 0 0 0 5.931-5.15l7.534-52.535a6 6 0 1 0 -11.878-1.7l-7.534 52.535a6 6 0 0 0 5.088 6.788z"/>*/}
            {/*        <path*/}
            {/*          d="m128.077 259.811a6 6 0 0 0 -8.485 0l-32.938 32.937a6 6 0 1 0 8.486 8.485l32.937-32.933a6 6 0 0 0 0-8.489z"/>*/}
            {/*        <path*/}
            {/*          d="m92.7 203.624a6 6 0 0 0 -6.791-5.088l-52.539 7.534a6 6 0 0 0 .844 11.94 6.115 6.115 0 0 0 .859-.061l52.536-7.534a6 6 0 0 0 5.091-6.791z"/>*/}
            {/*        <path d="m125.548 134.377a6 6 0 0 0 8.486-8.485l-37.477-37.476a6 6 0 0 0 -8.485 8.484z"/>*/}
            {/*        <path d="m255.891 325.2-1.53-4.8a6 6 0 0 0 -11.434 3.643l1.53 4.8a6 6 0 0 0 11.434-3.644z"/>*/}
            {/*        <path d="m272.958 418.271a6 6 0 1 0 11.433-3.644l-21.512-67.5a6 6 0 1 0 -11.433 3.643z"/>*/}
            {/*        <path*/}
            {/*          d="m396.394 347.491 73.748-59.036a16.393 16.393 0 0 0 6.2-14.673 15.954 15.954 0 0 0 -11-13.319l-106.522-33.9a6 6 0 0 0 -3.64 11.437l106.52 33.9a4 4 0 0 1 1.266 6.935l-79.282 63.465a6 6 0 0 0 -.51 8.913l88.605 89.175-31.394 31.394-89.175-88.609a6 6 0 0 0 -4.229-1.743c-.113 0-.227 0-.341.009a6 6 0 0 0 -4.343 2.241l-63.464 79.281a4 4 0 0 1 -6.935-1.287l-88.534-278.338 129.817 41.3a6 6 0 0 0 7.819-5.721 6 6 0 0 0 -4.181-5.718l-129.819-41.297a12.01 12.01 0 0 0 -15.095 15.073l88.559 278.338a16 16 0 0 0 27.736 5.149l59.289-74.066 84.436 83.9a12.022 12.022 0 0 0 16.943-.028l31.394-31.394a12 12 0 0 0 .027-16.943z"/>*/}
            {/*      </svg>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="property-center">
              <img src="/images/site/pages/about/property_center.png" alt=""/>
            </div>
            {/*<div className="properties-show-text-container">*/}
            {/*  <div className="text-left-container">*/}
            {/*    <div className="text-left">*/}
            {/*      Чай богат полезными микроэлементами*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="text-left-container">*/}
            {/*    <div className="text-left">*/}
            {/*      Чай бодрит дух, повышает активность мозга, улучшает память*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="text-left-container">*/}
            {/*    <div className="text-left">*/}
            {/*      Чай нормализует деятельность сердца, кровеносных сосудов, пищеварительной системы*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="text-right-container">*/}
            {/*    <div className="text-right">*/}
            {/*      Чай эффективно предотвращает кариес*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="text-right-container">*/}
            {/*    <div className="text-right">*/}
            {/*      Чай снимает усталость и стимулирует обмен веществ*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="text-right-container">*/}
            {/*    <div className="text-right">*/}
            {/*      Чай подавляет рост злокачественных опухолей, и существенно снижает риск перерождения клеток*/}
            {/*      в раковые*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="property-circle-pulse"></div>*/}
            {/*</div>*/}
          </div>

          <div className="properties-content-circle">
            <div className="content-circle-left first">
              <div className="text-left">
                {t('about.rich_beneficial_elements')}
              </div>
              <div className="left-bar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="262.5px" height="55.5px">
                  <path fill-rule="evenodd" stroke="rgb(128, 165, 6)" stroke-width="1px" stroke-linecap="butt"
                        stroke-linejoin="miter" fill="none"
                        d="M261.500,1.500 L222.500,54.500 L0.500,54.500 "/>
                </svg>
                <div className="circle-max">
                  <div className="circle-min"></div>
                </div>
              </div>
            </div>
            <div className="content-circle-left second">
              <div className="text-left">
                {t('about.invigorates_the_spirit')}
              </div>
              <div className="left-bar">
                <svg className="second-svg-1200"
                     xmlns="http://www.w3.org/2000/svg"
                     width="322.5px" height="55.5px">
                  <path fill-rule="evenodd" stroke="rgb(128, 165, 6)" stroke-width="1px" stroke-linecap="butt"
                        stroke-linejoin="miter" fill="none"
                        d="M321.500,1.500 L282.500,54.500 L0.500,54.500 "/>
                </svg>
                <svg className="second-svg-1024"
                     xmlns="http://www.w3.org/2000/svg"
                     width="322.5px" height="55.5px">
                  <path fillRule="evenodd" stroke="rgb(128, 165, 6)" strokeWidth="1px" strokeLinecap="butt"
                        strokeLinejoin="miter" fill="none"
                        d="M221.500,1.500 L190.500,54.500 L0.500,54.500 "/>
                </svg>
                <div className="circle-max">
                  <div className="circle-min"></div>
                </div>
              </div>
            </div>
            <div className="content-circle-left third">
              <div className="text-left">
                {t('about.normalizes_activity_of_heart')}
              </div>
              <div className="left-bar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="352.5px" height="55.5px">
                  <path fill-rule="evenodd" stroke="rgb(128, 165, 6)" stroke-width="1px" stroke-linecap="butt"
                        stroke-linejoin="miter" fill="none"
                        d="M351.500,1.500 L312.500,54.500 L0.500,54.500 "/>
                </svg>
                <div className="circle-max">
                  <div className="circle-min"></div>
                </div>
              </div>
            </div>
            <div className="content-circle-right first">
              <div className="text-right">
                {t('about.tea_prevents_cavities')}
              </div>
              <div className="right-bar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="284.5px" height="42.5px">
                  <path fill-rule="evenodd" stroke="rgb(128, 165, 6)" stroke-width="1px" stroke-linecap="butt"
                        stroke-linejoin="miter" fill="none"
                        d="M1.500,0.500 L32.500,40.500 L283.500,40.500 "/>
                </svg>
                <div className="circle-max">
                  <div className="circle-min"></div>
                </div>
              </div>
            </div>
            <div className="content-circle-right second">
              <div className="text-right">
                {t('about.tea_relieves_fatigue')}
              </div>
              <div className="right-bar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="324.5px" height="55.5px">
                  <path fill-rule="evenodd" stroke="rgb(128, 165, 6)" stroke-width="1px" stroke-linecap="butt"
                        stroke-linejoin="miter" fill="none"
                        d="M1.500,0.500 L40.500,53.500 L323.500,53.500 "/>
                </svg>
                <div className="circle-max">
                  <div className="circle-min"></div>
                </div>
              </div>
            </div>
            <div className="content-circle-right third">
              <div className="text-right">
                {t('about.tea_inhibits_malignant_tumors')}
              </div>
              <div className="right-bar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="410.5px" height="55.5px">
                  <path fill-rule="evenodd" stroke="rgb(128, 165, 6)" stroke-width="1px" stroke-linecap="butt"
                        stroke-linejoin="miter" fill="none"
                        d="M1.500,0.500 L40.500,53.500 L409.500,53.500 "/>
                </svg>
                <div className="circle-max">
                  <div className="circle-min"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="collect">
        <DefaultTitle
          className="about_properties__title text-header center">{t('about.how_collect_our_tea')}</DefaultTitle>
        <img className="collect-leaves" src="/images/site/bkg/collect_leaves.png" alt=""/>
        <div className="collect-container">
          <div className="collect-video">
            <iframe
              src={handle.videoCollect ? "https://www.youtube.com/embed/lQLCZthzbEQ?autoplay=1" : "https://www.youtube.com/embed/lQLCZthzbEQ"}
              title="YouTube video player" frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            >
            </iframe>
            {!handle.videoCollect ? (
              <div
                className="collect-photo-video"
                style={{ backgroundImage: 'url(/images/site/pages/about/collect_video.png)' }}
                onClick={openVideo}
              >
                <div className="click-triangle-max-circle">
                  <div className="click-triangle-min-circle">
                    <img src="/images/site/pages/about/click_triangle.png" alt="" className="click-triangle"/>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="rightbot-image">
              <div className="collect-circle">
                {!handle.videoCollect ?
                  <img src="/images/site/bkg/compact_mote_leaves.png" alt="" onClick={openVideo}/> : null}
              </div>
            </div>
          </div>
          <div className="collect-content">
            {collectParagraphs.map(item => (
              <div className="collect-text">
                <Trans
                  i18nKey={item}
                  components={{ span: <span/> }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;