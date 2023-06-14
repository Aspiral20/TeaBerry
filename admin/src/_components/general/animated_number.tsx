import React, { FC } from 'react';
import cn from "classnames";
import { animated, useSpring } from "react-spring";
import { DefaultCnPropsType } from "../../_types/general";

interface AnimatedNumberProps {
  className?: string
  cnProps?: DefaultCnPropsType
  params: { num: number, delay?: number, config?: { mass: number, tension: number, friction: number } }
}

const AnimatedNumber: FC<AnimatedNumberProps> = ({
  className = '',
  cnProps,
  params,
}) => {
  const { num, delay, config } = params

  const { number } = useSpring({
    from: { number: 0 },
    number: num,
    delay: delay ? delay : 200,
    config: config ? config : { mass: 1, tension: 20, friction: 10 }
  })

  return (
    <animated.span className={cn(`${className} animated_numbers`, cnProps)}>
      {number.to(num => num.toFixed(0))}
    </animated.span>
  );
};

export default AnimatedNumber;